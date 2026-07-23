# Manazir Hussain — portfolio

Public portfolio and digital CV at [mazos-site.vercel.app](https://mazos-site.vercel.app).

The homepage positions Manazir as a UK-based software builder open to roles, contract projects, and partnerships. It features four shipped projects — JobFilter, Scrap Finance Partners, Agent Nudge, and OpenFlowKit — each with a stated status, evidence link, and limitation, plus routes for hiring, commissioning work, and collaborating.

## Structure

- `/` — hero, what-I-can-build categories, four project case studies (in order: JobFilter, Scrap Finance Partners, Agent Nudge, OpenFlowKit), plain technical capability list, about, and three-route contact section
- `/mazos` — no-index legacy handoff for the retired internal MAZos concept page; not part of site navigation or the sitemap

## Stack

Next.js App Router · TypeScript · plain CSS · static export

## Run

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm test
npm run smoke
npm start
```

`npm start` serves the generated `out/` directory after a build. `npm run verify` runs the local typecheck, build, deterministic HTML/link tests, and local-server smoke check. CI also audits production dependencies.

The repository has no runtime analytics or form submission. External product and repository links open their respective public sources. Vercel headers restrict framing, sensitive browser capabilities, MIME sniffing, referrer leakage, and unexpected content sources.
