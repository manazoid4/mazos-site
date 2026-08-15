# Maz Works Progress

## Current state

The Quiet Framework refinement is live on `main`. PR [#9](https://github.com/manazoid4/mazos-site/pull/9) was merged by `manazoid4` at commit `c10dc7b`; the main-branch GitHub workflow and Vercel production deployment pass. Production was then verified at 390px and 1440px across the homepage, both flagship case studies, `/mazos`, robots, and sitemap. No known P0/P1 engineering issue remains. Documentation reconciliation PR [#10](https://github.com/manazoid4/mazos-site/pull/10) is open with green GitHub/Vercel checks.

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
- Published PR #9 and replaced the stale GitHub repository description with the canonical Maz Works positioning.

## Partial

- None in the agreed website implementation scope.
- A final public domain and LinkedIn URL remain intentionally unguessed human identity inputs, not engineering gaps.
- Independent post-merge refinement review remains by request; it is a review gate, not an unfinished implementation item.

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
- GitHub/Vercel — both `verify` jobs, Vercel deployment, and Vercel preview-comment checks pass on PR #9.
- Preview deployment — Ready at the recorded Vercel URL; anonymous access is protected by Vercel login, so visual review requires authentication or the verified local export/captures.
- Main/production — merge commit `c10dc7b`; main `verify` workflow and Vercel deployment pass.
- Production browser — `https://mazos-site.vercel.app` returns HTTP 200 for `/`, both case studies, `/mazos`, robots, and sitemap at 390px/1440px; correct titles/headings/images, no overflow or console errors.

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

The next agent reviews current `main` and production, then reads `docs/maz-works/HANDOFF.md` and `PEER-BENCHMARK.md`. Perform the independent multi-perspective refinement review against the live result. Open a follow-up `agents/` branch only for a reproducible P0/P1 finding; otherwise record that the release is clean and stop.
