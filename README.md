# Maz Works

Public portfolio and client-acquisition site for [Maz Works](https://mazos-site.vercel.app), Manazir Hussain's umbrella identity for useful software, AI tools, automation, products, experiments, and client work.

The homepage leads with shipped evidence rather than a technology list. JobFilter and Scrap Finance Partners are flagships; Agent Nudge and OpenFlowKit are featured work. It also explains the bounded free-demo route, the founding implementation offer, and separate hire, client, and collaboration pathways.

## Structure

- `/` — Maz Works identity, proof ledger, flagship and featured projects, build areas, process, founding client offer, about, and contact pathways
- `/mazos` — no-index legacy handoff for the retired internal MAZos concept page; omitted from navigation and sitemap
- `app/projects.ts` — typed project content and evidence links
- `docs/maz-works/` — persistent progress, handoff, plan, next steps, and browser review captures
- `DESIGN.md` — FRAMEWORK visual-direction contract

## Stack

Next.js App Router · TypeScript · plain CSS · static export · Vercel Analytics

## Run

```bash
npm ci
npm run dev
npm run verify
npm start
```

`npm run verify` runs typecheck, production build, deterministic static HTML/link tests, and a local-server smoke check. Security headers are defined in `vercel.json`. The site has no form backend; contact pathways use explicit `mailto:` links.