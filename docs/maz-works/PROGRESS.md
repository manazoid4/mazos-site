# Maz Works Progress

## Current state

PR #8 contains a coherent first Maz Works implementation and remains the working baseline. A new multi-perspective design review found that the site is truthful and structurally strong but visually and editorially over-explains itself. The next milestone is a focused “Quiet Framework” refinement before launch, not immediate merge and not a disconnected rebuild.

## Completed

- Recovered and preserved the existing Maz Works implementation on `agents/maz-works-framework`.
- Established Maz Works and Manazir Hussain's identity, project hierarchy, typed project data, commercial rules, metadata, tests, and persistent handoff files.
- Verified the baseline build, static export, audit, external evidence links, responsive layouts, and preview deployment.
- Reviewed current desktop and mobile captures through employer, client, collaborator, LinkedIn, conversion, editorial, accessibility, performance, and maintainability lenses.
- Researched restrained architectural/editorial references and translated principles rather than copying visual assets.
- Compared three directions: Quiet Framework, Evidence Index, and Builder's Journal.
- Selected Quiet Framework and replaced the launch-only plan with a staged refinement plan in `tasks/plan.md`.

## Partial

- The current UI still contains the large hero proof ledger, proof strip, repeated service/process/pathway sections, highly prominent yellow pricing treatment, and a crowded mobile header.
- A real Scrap Finance Partners screenshot is still missing from the portfolio.
- The flagships do not yet have dedicated, stable case-study routes for LinkedIn and deeper review.
- Canonical metadata still uses `mazos-site.vercel.app` pending a final domain.
- LinkedIn remains intentionally omitted until a verified public URL is supplied.

## Broken / blockers

- The previous in-app browser path timed out twice while capturing Scrap Finance Partners. Use a different capture method or an approved supplied asset.
- End-to-end keyboard Tab order was not confirmed because the prior browser could not reliably dispatch Tab. Recheck with a different real-browser method during the refinement.

## Important decisions

- The existing implementation is a valuable baseline; evolve it in place.
- Quiet Framework is the chosen direction: image-led, calm, architectural, editorial, and human.
- Reduce homepage copy and repeated modules by roughly one third while preserving all material truths.
- Keep JobFilter and Scrap Finance Partners as flagships; keep Agent Nudge and OpenFlowKit as selected work unless a fresh evidence audit justifies a change.
- Place the commercial offer after commissioned-work proof and use yellow as a small signal, not a dominant sales surface.
- Dedicated case-study routes are justified only for the two flagships in the next refinement.
- The bounded free demo and £150 founding implementation (£75 + £75) remain settled.

## Verification

Baseline before the planned refinement:

- `npm run verify` — pass: typecheck, production build, 13/13 static-export tests, and local smoke.
- `npm audit --omit=dev` — 0 vulnerabilities.
- GitHub `verify` jobs and Vercel preview — pass.
- Responsive captures exist at `docs/maz-works/review-*.png`; no horizontal overflow or console errors were observed.
- This planning checkpoint changes documentation only; implementation verification must be rerun after Phase 1.

## Current files/areas

- `DESIGN.md` — selected Quiet Framework contract
- `tasks/plan.md` — full staged refinement plan
- `tasks/todo.md` — short execution checklist
- `app/page.tsx` — next implementation focus
- `app/globals.css` — next visual/mobile focus
- `app/projects.ts` — preserve truth; extend only for evidence/case studies
- `docs/maz-works/review-*.png` — current-state evidence

## Immediate next action

The next agent implements only Phase 1 / Task 1 from `tasks/plan.md`: simplify the homepage information architecture and copy into the Quiet Framework structure, preserve all project and commercial truths, run `npm run verify`, capture 390px and 1280px views, update the four memory files, and stop at the visual checkpoint for review.
