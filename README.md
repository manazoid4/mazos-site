# Maz Works

Public portfolio and client-acquisition site for [Maz Works](https://mazos-site.vercel.app), Manazir Hussain's umbrella identity for useful software, AI tools, automation, products, experiments, and client work.

The site uses a Quiet Framework direction: restrained ivory/charcoal structure, real project imagery, concise proof, and explicit Product / Client work / Lab relationships. JobFilter and Scrap Finance Partners are the flagships; Agent Nudge and OpenFlowKit remain compact selected work.

## Structure

- `/` — identity, selected work, build/process, bounded client offer, about, and contact
- `/work/jobfilter` — deep, static JobFilter case study
- `/work/scrap-finance-partners` — deep, static client-work case study
- `/mazos` — no-index legacy handoff; omitted from navigation and sitemap
- `app/projects.ts` — typed project truth, proof, images, case-study content, status, and limitations
- `app/project-elements.tsx` — shared project media and evidence links
- `app/site-chrome.tsx` — shared header/footer
- `app/site.ts` — canonical identity and contact constants
- `docs/maz-works/` — persistent state, browser evidence, and peer benchmark
- `DESIGN.md` — Quiet Framework visual contract

## Add or update work

1. Add the project to `FLAGSHIP_PROJECTS` or `FEATURED_PROJECTS` in `app/projects.ts`.
2. Set an explicit `relationship`: `Product`, `Client work`, or `Lab`.
3. Include truthful status, problem, insight, proof, limitation, and at least one inspectable link.
4. Add an optimized image under `public/` only when it is real, approved evidence; record dimensions and useful alt text.
5. Add `caseStudy` data only when the project has enough evidence for a dedicated route. Flagship case studies are exported automatically at `/work/[id]` and added to the sitemap.
6. Run `npm run verify` and inspect mobile/desktop output before publishing.

Do not add private client data, credentials, invented outcomes, unapproved testimonials/logos, or a project solely because a repository exists.

## Commercial truth

The free tailored demo covers one bounded problem. Founding implementation is £150 total: £75 after demo/scope agreement and £75 after the agreed implementation is complete and presented. Additional workflows, integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds are quoted separately.

## Stack

Next.js App Router · TypeScript · plain CSS · static export · Vercel Analytics

## Run

```bash
npm ci
npm run dev
npm run verify
npm start
```

`npm run verify` runs typecheck, production build, deterministic static HTML/link tests, and a local-server smoke check. Security headers are defined in `vercel.json`. Contact pathways use explicit `mailto:` links; the site has no contact backend.

## Project memory

The canonical cross-project knowledge system is **Maz Works Knowledge Vault**. It covers every Maz Works product, client, experiment, and operating decision; JobFilter is one project inside it. Legacy `JobFilter-Obsidian-Vault` naming may remain as repository/archive provenance but must not be used as the vault's active identity. Repository-local continuation state lives in `docs/maz-works/`.
