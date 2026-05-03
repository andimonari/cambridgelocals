# Cambridge Experts

A website where local experts share information about Cambridge, England — for new students, tourists, and professionals.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) | Full-stack React with Server Components for fast content rendering and API routes for expert contributions (auth, forms, CMS). Scales better than a pure static framework when users need to submit and manage content. |
| Language | TypeScript | Type safety across the full stack. |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration, no unused CSS in production. |
| Runtime | Node.js / Vercel-ready | Easy zero-config deployment. Database choice deferred to content system phase. |

Astro was considered but ruled out because the site will need dynamic user contributions (expert logins, content submission flows) where Next.js's API routes and auth ecosystem are a better fit.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Reusable UI components
  lib/          # Shared utilities and helpers
  types/        # TypeScript type definitions
public/         # Static assets
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
