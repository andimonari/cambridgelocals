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

npm run db:migrate   # prisma migrate dev — creates/applies a migration from schema.prisma
npm run db:push      # prisma db push — sync schema without a migration (quick local iteration)
npm run db:seed      # npx tsx prisma/seed.ts — populate locations/categories/experts/guides/reviews
npm run db:studio    # prisma studio — browse the DB
```

There is no test suite configured. There is no `npm run start` health check beyond building first.

Prisma client is generated to `src/generated/prisma` (not the default `node_modules/@prisma/client`), via `postinstall: prisma generate`. Import it as `@/generated/prisma/client` (or via `src/lib/db.ts`), never `@prisma/client` directly. Regenerate after any `schema.prisma` change (`npx prisma generate`, or just re-run one of the `db:*` scripts).

Database is Postgres via Neon. `DATABASE_URL` (pooled) is used at runtime by `src/lib/db.ts`; `DATABASE_DIRECT_URL` (direct) is used by the Prisma CLI for migrations (see `prisma.config.ts`). Both must be set — see `.env.example`.

## Architecture

**Domain model** (`prisma/schema.prisma`): `User` (NextAuth identity) 1:1 optionally with `Expert` (a public contributor profile — every logged-in contributor is an `Expert`, but not every `User` has one yet). `Expert` has many `Guide`s and `Review`s, and optionally belongs to a `Location`. `Guide` belongs to a `Category` and optionally a `Location`, and moves through `GuideStatus`: `draft → submitted → published` (or `rejected`, which can be resubmitted). `Review`s can attach to either a `Guide` or an `Expert` directly.

**Auth** (`src/lib/auth.ts`, NextAuth v5 beta / Auth.js): Two providers — `Resend` (magic-link email, needs `AUTH_RESEND_KEY`) and `Credentials` (email-only lookup, for local dev without sending real email). JWT sessions. On `createUser`, an `Expert` row is auto-created for the new `User` with a slug derived from their name (`role: "Local Expert"` by default — admins are promoted manually, there's no self-serve admin signup). Route protection is centralized in `src/proxy.ts`, which redirects unauthenticated requests to protected prefixes (currently `/dashboard`) to sign-in with a `callbackUrl`. Admin-only pages/routes (e.g. `/admin/guides`) do their own `expert.role === "admin"` check server-side — the proxy does not know about admin routes.

**Route constants**: `src/lib/routes.ts` exports `ROUTES`, the single source of truth for internal paths (including a couple of param-taking helpers like `ROUTES.expert(slug)`). Always use this instead of hardcoding paths — `src/proxy.ts` and `AGENTS.md` both depend on it staying authoritative.

**Guide publishing workflow**: Contributors create guides as `draft` via `POST /api/guides` (colocated with the route, not a server action), then move them to `submitted` via `PATCH /api/guides/[id]` (self-serve, author-only, draft/rejected → submitted only). Admins use the same `PATCH` endpoint to move `submitted → published` (stamps `publishedAt`) or `submitted → rejected` (clears `publishedAt`). All of this authorization logic lives inline in the route handlers, not in middleware.

**Slugs**: Both guide titles and (auto-created) expert names are slugified with a local `toSlug()` helper duplicated in `src/lib/auth.ts` and `src/app/api/guides/route.ts`, with numeric-suffix collision handling (`foo`, `foo-1`, `foo-2`, ...). If you add a third place that needs slugs, consider extracting this to `src/lib/`.

**Rendering**: Guide bodies are stored as a constrained markdown-like subset (headings `#`/`##`/`###`, `-`/`*` lists, `**bold**`, `*italic*`, `` `code` ``, `[text](url)` links) and rendered server-side to Tailwind-classed HTML strings by the hand-rolled `renderMarkdown()` in `src/lib/markdown.ts` — no markdown library. Extend that function (carefully — it's a line-by-line state machine) rather than introducing a new markdown dependency, unless the user asks for that.

**Contributor model**: The current seed data models a single family ("Cambridge Family": Andy, Teresa, and their three kids) as the site's core contributors rather than a roster of unrelated local experts — this is a recent, deliberate direction (see git log / `plan.md` for the LEO-26 migration rationale) and not a bug if profile copy reads as family-oriented.

## Working notes

- Server Components are the default; add `"use client"` only where interactivity is needed (e.g. `AdminGuideActions.tsx`, `NewGuideForm.tsx`).
- Page-specific components live inside their route folder (e.g. `src/app/admin/guides/AdminGuideActions.tsx`); only things reused across routes belong in `src/components/`.
- `plan.md` at the repo root tracks the in-progress LEO-26 migration plan — check it for context on why seed data/copy may look mid-transition.
