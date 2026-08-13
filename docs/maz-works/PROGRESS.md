# Maz Works Progress

## Current state

The Quiet Framework refinement is implementation-complete on `agents/maz-works-quiet-framework`, based on the merged Maz Works foundation in `origin/main`. The homepage, two flagship case studies, real Scrap Finance Partners evidence, structured project data, commercial route, metadata, mobile behavior, accessibility safeguards, tests, and reviewer captures are all in place. No known P0/P1 engineering issue remains locally. Publishing the branch and opening the independent-refinement PR is the exact next operation.

## Completed

- Recovered the current merged baseline without discarding useful work.
- Restructured the homepage into a calm proof-first sequence: identity, JobFilter, Scrap Finance Partners, selected work, build/process, client offer, About, and contact.
- Reduced repeated claims, large yellow surfaces, equal-card treatment, and sales-funnel repetition.
- Kept Manazir Hussain explicit and Maz Works truthful as one independent builder.
- Added reusable static case-study routes for JobFilter and Scrap Finance Partners.
- Captured the live Scrap Finance Partners site at desktop and mobile, then shipped optimized WebP evidence assets.
- Kept JobFilter and Scrap as flagships; retained Agent Nudge and OpenFlowKit in proportion after auditing current repositories.
- Benchmarked ten current founder-led software/automation peers using first-party sites and applied only the useful shared patterns.
- Centralized site identity/contact constants and reusable site chrome/project media components.
- Added case-study routes to metadata, canonical output, and sitemap; documented the project maintenance path.
- Verified keyboard entry, focus visibility, headings, alt text, 44px targets, responsive images, overflow, console, and request health in a visible browser.
- Refreshed desktop, mobile, client-offer, and case-study captures under `docs/maz-works/`.

## Partial

- None in the agreed website implementation scope.
- A final public domain and LinkedIn URL remain intentionally unguessed human identity inputs, not engineering gaps.
- Independent review, PR checks, merge, and production verification are external delivery gates.

## Broken / blockers

- No product blocker.
- The local Codex patch hook intermittently rejects calls because the installed client is older than the configured model. Narrow fallback patches were used where needed; the repository itself verifies cleanly.

## Important decisions

- Quiet Framework remains the selected direction: warm ivory, near-black structure, thin rules, large real evidence, restrained signal yellow, and minimal motion.
- Proof precedes services and pricing.
- Visible work is explicitly classified as Product, Client work, or Lab.
- JobFilter and Scrap Finance Partners carry disproportionate weight; Agent Nudge and OpenFlowKit remain compact selected work.
- The wider repository audit did not justify promoting FlowLens, VoxPane, Khutba.io, Furby AI, Recall, or SecureShift over the current four because their public shipped/evidence state is weaker.
- The client path states ownership and handoff, one bounded free demo, and the settled £150 founding implementation split £75 + £75 with scope protection.
- No CMS, font dependency, animation library, analytics replacement, or invented proof was added.

## Verification

- `npm run verify` — pass: TypeScript, production static build, 16/16 tests, local smoke.
- Static output — `/`, `/mazos`, `/work/jobfilter`, `/work/scrap-finance-partners`, robots, sitemap.
- `npm audit --omit=dev` — 0 vulnerabilities.
- `git diff --check` — pass.
- External evidence audit — 12/12 public links returned HTTP 200.
- Visible-browser pass — 360×800, 390×844, 768×1024, 1280×720, and 1440×1000; no horizontal overflow, console errors, or failed requests.
- Browser accessibility checks — first Tab reaches a visible skip link; focus outline is visible; heading order is valid; all rendered links are at least 44px high; all project images load with meaningful alt text.

## Current files/areas

- `app/page.tsx` — proof-first Quiet Framework homepage.
- `app/work/[slug]/page.tsx` — reusable flagship case-study route.
- `app/projects.ts` — typed project and case-study truth.
- `app/site.ts`, `app/site-chrome.tsx`, `app/project-elements.tsx` — shared identity, chrome, links, and media.
- `app/globals.css` — responsive visual system and accessibility states.
- `public/scrap-finance-partners*.webp` — optimized client evidence.
- `docs/maz-works/PEER-BENCHMARK.md` — first-party peer research and applied conclusions.
- `docs/maz-works/quiet-framework-*.png` — final reviewer captures.

## Immediate next action

Commit and push `agents/maz-works-quiet-framework`, open a PR against `main`, wait for GitHub/Vercel checks, then hand that PR and `docs/maz-works/HANDOFF.md` to the next agent for an independent multi-perspective refinement review. The next agent should patch only reproducible P0/P1 findings; if none are found, recommend merge.
