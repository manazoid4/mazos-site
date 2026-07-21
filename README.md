# Manazir Hussain — portfolio

Public engineering portfolio at [mazos-site.vercel.app](https://mazos-site.vercel.app).

The homepage is a recruiter-readable evidence surface for junior applied-AI engineering roles. It maps Agent Nudge, JobFilter, and OpenFlowKit directly to agent infrastructure, data pipelines, integrations, evaluation, and production reliability.

## Structure

- `/` — role positioning, applied-AI evidence, three project case studies, demonstrated capabilities, growth direction, and contact
- `/mazos` — no-index legacy handoff into the main portfolio; the internal MAZos concept is no longer part of recruiter navigation

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
