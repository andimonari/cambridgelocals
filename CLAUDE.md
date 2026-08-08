# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Important: unfamiliar Next.js version

This repo pins `next@16.2.4`, a version with breaking changes relative to your training data. Notably, middleware lives in `src/proxy.ts` (not `middleware.ts`) and exports `proxy` (not `middleware`) — see that file before touching request interception/auth guarding. Check `node_modules/next/dist/docs/` for other API differences before relying on prior Next.js knowledge.

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run lint         # eslint (flat config, eslint.config.mjs)

npm run db:seed      # npx tsx scripts/seed-firestore.ts — populate locations/categories/experts/guides/reviews
npm run emulators    # firebase emulators:start — local Firestore + Auth, no real project needed
```

There is no test suite configured. There is no `npm run start` health check beyond building first.

Backend is Firebase: Firestore (data) + Firebase Auth (email-link sign-in), deployed via Firebase App Hosting. See `FIREBASE.md` for the full project-setup and deploy command reference. `.env.example` documents the required env vars; set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` to point local dev at the emulators instead of a real project.

## Architecture

**Domain model** (`src/types/firestore.ts`, data access in `src/lib/db.ts`): Firestore collections `experts`, `guides`, `categories`, `locations`, `reviews` — all keyed by **slug as the document ID** (no separate cuid/FK layer), so `getExpertBySlug`/`getGuideBySlug` are direct `doc().get()` calls, not queries. `Guide` denormalizes its author/category/location display fields (`authorName`, `categoryName`, `locationName`, etc.) at write time, since Firestore has no joins — there's no guide-edit flow today, so these can't drift out of sync; if one gets added, renaming a category/location/expert will need to back-fill affected guides. `Guide.status` moves through `draft → submitted → published` (or `rejected`, which can be resubmitted); visibility everywhere is gated on `status === "published"`, not on `publishedAt` alone. `Review` docs carry either a `guideSlug` or an `expertSlug` (mirroring the old nullable dual-FK design), and are fetched with a single equality filter, sorted client-side.

Listing queries (`getPublishedGuides`, `getSubmittedGuides`, `getGuidesByAuthor`) deliberately use only single-field Firestore filters and sort/filter the rest in JS, rather than declaring composite indexes — a fine trade at this site's scale (one family, at most low hundreds of guides), but revisit with `firestore.indexes.json` if that changes.

**Auth** (`src/lib/firebase-admin.ts`, `src/lib/firebase-client.ts`, `src/lib/session.ts`): Firebase Auth email-link (passwordless) sign-in — `src/app/sign-in/SignInForm.tsx` is a Client Component using the `firebase/auth` browser SDK to send and complete the link, then exchanges the resulting ID token for an httpOnly session cookie via `POST /api/auth/session` (`src/app/api/auth/session/route.ts`), which also auto-creates an `Expert` profile for first-time sign-ins (`ensureExpertForUser` in `src/lib/db.ts`, mirroring the old NextAuth `createUser` hook). `src/lib/session.ts`'s `getCurrentUser()` is the **authoritative** server-side check (verifies the cookie via the Admin SDK) — every protected page/route calls it. `src/proxy.ts` only checks whether the session cookie is *present* (cheap, Edge-safe redirect for the common case), because the Admin SDK isn't Edge-compatible; don't mistake that for real authorization. `src/lib/session-constants.ts` exists solely to keep the cookie name importable from `proxy.ts` without pulling `firebase-admin` into the Edge bundle — don't import `firebase-admin` (directly or transitively) from `src/proxy.ts`.

**Route constants**: `src/lib/routes.ts` exports `ROUTES`, the single source of truth for internal paths (including a couple of param-taking helpers like `ROUTES.expert(slug)`). Always use this instead of hardcoding paths.

**Guide publishing workflow**: Contributors create guides as `draft` via `POST /api/guides`, then move them to `submitted` via `PATCH /api/guides/[slug]` (self-serve, author-only, draft/rejected → submitted only). Admins use the same `PATCH` endpoint to move `submitted → published` (stamps `publishedAt`, emails the author via `sendGuideStatusEmail`) or `submitted → rejected` (clears `publishedAt`, also emails). All of this authorization logic lives inline in the route handlers, not in middleware. There's no seeded admin account today — `expert.role === "admin"` never matches out of the box, so `/admin/guides` is unreachable until an `Expert` doc's `role` is hand-edited in Firestore.

**Reviews**: Visitors can leave a rating + review on a published guide via `POST /api/guides/[slug]/reviews` (no auth required, matches the original open-review design) — see `src/app/guides/[slug]/ReviewForm.tsx`.

**Email**: `src/lib/mailer.ts` calls the Resend REST API directly with `fetch` (no SDK dependency) and falls back to a console log when `AUTH_RESEND_KEY` is unset.

**Slugs**: Guide titles and (auto-created) expert names are slugified with the shared `toSlug()` helper in `src/lib/slug.ts`, with numeric-suffix collision handling (`foo`, `foo-1`, `foo-2`, ...) since the slug doubles as the Firestore document ID.

**Rendering**: Guide bodies are stored as a constrained markdown-like subset (headings `#`/`##`/`###`, `-`/`*` lists, `**bold**`, `*italic*`, `` `code` ``, `[text](url)` links) and rendered server-side to Tailwind-classed HTML strings by the hand-rolled `renderMarkdown()` in `src/lib/markdown.ts` — no markdown library. Extend that function (carefully — it's a line-by-line state machine) rather than introducing a new markdown dependency, unless the user asks for that.

**Contributor model**: The seed data models a single family ("Cambridge Family": Andy, Teresa, and their three kids) as the site's core contributors rather than a roster of unrelated local experts — this is a deliberate direction (see git log / `plan.md` for the LEO-26 migration rationale), not a bug if profile copy reads as family-oriented.

**Seed script** (`scripts/seed-firestore.ts`): Ported from the original Prisma `seed.ts` via a small Prisma-shaped compatibility shim (`db.location.upsert(...)`, `db.guide.upsert(...)`, etc., backed by Firestore) specifically so the actual content — 35 guide bodies, 20 reviews — could be carried over unchanged rather than hand-retyped. If you're adding new seed content, follow the existing `upsert`-by-slug call shape already in the file.

## Working notes

- Server Components are the default; add `"use client"` only where interactivity is needed (e.g. `AdminGuideActions.tsx`, `NewGuideForm.tsx`, `SignInForm.tsx`, `SignOutButton.tsx`).
- Page-specific components live inside their route folder (e.g. `src/app/admin/guides/AdminGuideActions.tsx`); only things reused across routes belong in `src/components/`.
- `plan.md` at the repo root tracks the in-progress LEO-26 migration plan — check it for context on why seed data/copy may look mid-transition.
