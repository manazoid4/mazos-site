# Maz Works Progress

## Current state

A coherent Maz Works redesign is complete on `agents/maz-works-framework`, and PR #8 remains open, clean, and fully green. The remaining work is now decomposed into an implementation-ready review, launch, production-verification, distribution, and maintenance plan.

## Completed

- Recovered a clean starting state from `main` at `d1fdf06` and pulled the Maz Works Knowledge Vault.
- Added the persistent plan, progress, handoff, and next-step documents.
- Recorded the FRAMEWORK visual contract in `DESIGN.md`.
- Rebranded the site as Maz Works while keeping Manazir Hussain explicit.
- Rebuilt the homepage with ivory architectural planes, charcoal frames, crisp dividers, yellow signals, and evidence-led project bays.
- Set hierarchy: JobFilter and Scrap Finance Partners are flagships; Agent Nudge and OpenFlowKit are featured work.
- Moved project content into typed structured data in `app/projects.ts`.
- Added Problem / Insight / What I built / Proof / Current limitation storytelling and real evidence links.
- Added Problem → Demo → Build → Proof process, bounded free demo, £150 founding implementation split into £75 + £75, and explicit separate-scope protection.
- Added distinct Hire / Client / Collaborate contact pathways.
- Updated metadata, JSON-LD, favicon, sitemap date, README, and social preview for Maz Works.
- Preserved and restyled the no-index `/mazos` legacy handoff.
- Updated production dependencies through the lockfile to clear the current audit findings.
- Added `tasks/plan.md` with ten task-sized steps, acceptance criteria, verification, dependencies, risks, human gates, and three checkpoints.
- Added `tasks/todo.md` as the executable launch checklist.
- Expanded HANDOFF.md, PLAN.md, and NEXT-STEPS.md to cover the full path through production and post-launch maintenance.

## Partial

- A real Scrap Finance Partners screenshot is not embedded. The live page and its service/enquiry structure were verified, but image capture timed out twice.
- Canonical metadata still uses `mazos-site.vercel.app` pending a final Maz Works domain.
- LinkedIn is intentionally omitted until a verified profile URL is supplied.

## Broken / blockers

- The local Codex patch helper rejected edits because the installed client is older than its configured review hook. Work continued through explicit Git patches and narrow file replacements.
- The available browser timed out twice while capturing the public Scrap Finance Partners page. Do not repeat the same capture path without changing the method.

## Important decisions

- JobFilter and Scrap Finance Partners receive disproportionate flagship treatment.
- Maz Works remains clearly a one-person umbrella identity, not an agency claim.
- Existing honest project limitations and evidence links were preserved and strengthened.
- The £150 offer is bounded founding implementation pricing, not permanent unlimited custom-software pricing.
- The frontend-design skill's FRAMEWORK contract drove the ivory/charcoal geometry, restrained yellow, and anti-gradient/anti-card choices.

## Verification

- `npm run verify` — pass: typecheck, production build, 13/13 static-export tests, and local server smoke.
- `npm audit --omit=dev` — 0 vulnerabilities after lockfile update.
- Eight live project/repository evidence URLs — all HTTP 200.
- Browser: 390×844 mobile, 768×1024 tablet, and available 1280×720 laptop viewport checked.
- Browser: no horizontal overflow at all checked widths; no console warnings/errors; 52px mobile CTAs; pricing and scope visible/readable.
- Browser captures: `review-desktop.png`, `review-mobile.png`, and `review-mobile-client.png` in this directory.
- Keyboard focus CSS is explicit; the in-app browser could not reliably dispatch a Tab event for runtime confirmation.

## Current files/areas

- `DESIGN.md`
- `app/page.tsx`
- `app/projects.ts`
- `app/globals.css`
- `app/layout.tsx`
- `app/mazos/page.tsx`
- `app/icon.svg`
- `public/social-card.svg`
- `public/social-card.png`
- `tests/static-export.test.mjs`
- `docs/maz-works/`
- `tasks/plan.md`
- `tasks/todo.md`

## Immediate next action

Claude executes Task 1 in `tasks/plan.md`: review PR #8, the preview, diff, and browser captures; record reproducible P0/P1 findings, then continue to the Scrap screenshot task with a different capture method.