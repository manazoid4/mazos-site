# Maz Works

Public portfolio and client-acquisition site for [Maz Works](https://mazos-site.vercel.app), Manazir Hussain's independent web, automation and AI/software studio.

The homepage is intentionally simple: explain what Maz Works does, show a small amount of real work, make the process and founding offer clear, then give the visitor one obvious route to contact.

## Homepage structure

- Hero — websites, automation and AI tools around real business problems
- Services — Websites, Automation, AI & software
- Selected work — JobFilter, Scrap Finance Partners, Agent Nudge and MAZ Pocket
- How it works — problem → free demo → agreed build → delivery
- Founding offer — £150 total, split £75 / £75
- About — direct founder context
- Contact — one primary "Get a free demo" route

Large project screenshots are deliberately omitted from the homepage so the work is easier to scan. Deeper detail remains available through case-study and project links.

## Routes

- `/` — client-first portfolio and acquisition page
- `/work/jobfilter` — JobFilter case study
- `/work/scrap-finance-partners` — Scrap Finance Partners case study
- `/mazos` — no-index legacy handoff; omitted from navigation and sitemap
- `app/projects.ts` — typed project truth, proof, detailed case-study content, status and limitations
- `app/project-elements.tsx` — shared project evidence links and optional media helper
- `app/site-chrome.tsx` — shared header/footer
- `app/site.ts` — canonical identity and contact constants
- `app/simplified.css` — client-first homepage refinements
- `docs/maz-works/` — persistent project state

## Content rules

Use plain language on the homepage. Technical detail belongs in case studies, GitHub or product documentation when it helps the reader.

Do not add private client data, credentials, invented outcomes, unapproved testimonials/logos, revenue claims, performance claims or team members that do not exist.

## Commercial offer

For suitable projects, Maz Works can show a small tailored demo first. Founding implementation is £150 total: £75 after the demo/scope are agreed and £75 when the agreed implementation is complete and presented. Larger builds, ongoing work and additional features are quoted separately.

## Stack

Next.js App Router · TypeScript · plain CSS · static export · Vercel Analytics

## Run

```bash
npm ci
npm run dev
npm run verify
npm start
```

`npm run verify` runs typecheck, production build, deterministic static HTML/link tests and a local-server smoke check. Security headers are defined in `vercel.json`. Contact pathways use explicit `mailto:` links; the site has no contact backend.

## Project memory

The canonical cross-project knowledge system is **Maz Works Knowledge Vault**. It covers every Maz Works product, client, experiment and operating decision; JobFilter is one project inside it. Legacy `JobFilter-Obsidian-Vault` naming may remain as repository/archive provenance but must not be used as the vault's active identity. Repository-local continuation state lives in `docs/maz-works/`.
