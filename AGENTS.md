<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Cambridge Experts — project conventions

**What this is:** A website where local experts share insights about Cambridge, England, for students, tourists, and professionals.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React 19

**Source layout:**
- `src/app/` — App Router pages and layouts (file-system routing)
- `src/components/` — shared React components
- `src/lib/` — utility functions and server-side helpers
- `src/types/` — shared TypeScript interfaces and types

**Key rules:**
- Use Server Components by default; add `"use client"` only when browser APIs or interactivity require it.
- Colocate page-specific components inside the relevant `src/app/` route folder; only promote to `src/components/` if reused elsewhere.
- No magic strings for routes — export route constants from `src/lib/routes.ts` when that file exists.
- Never commit secrets or `.env.local` values. Use environment variables documented in `.env.example`.

