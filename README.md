# Manazir Hussain — portfolio

Public engineering portfolio at [mazos-site.vercel.app](https://mazos-site.vercel.app).

The homepage is a recruiter-readable engineering evidence surface. It leads with the released Agent Nudge Windows MVP and describes JobFilter as being in source repair and product validation. `/mazos` is a separate factual case study for the local-first agent-loop cockpit.

## Structure

- `/` — positioning, Agent Nudge technical flagship, truth-aligned product evidence, engineering approach, and contact
- `/mazos` — MAZos scope, workflow, verification receipt, safety model, and implementation links

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
