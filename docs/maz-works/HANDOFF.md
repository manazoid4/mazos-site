# Maz Works Handoff

## Mission

Evolve the existing portfolio into Maz Works: Manazir Hussain's evidence-led umbrella identity for useful software, AI tools, automation, products, experiments, and client work. Preserve the strong current implementation, then refine it into a quieter, more image-led portfolio where claims quickly resolve to real work.

## Current state

- Repository: `manazoid4/mazos-site`
- Branch: `agents/maz-works-framework`
- Pull request: https://github.com/manazoid4/mazos-site/pull/8
- Preview: https://mazos-site-git-agents-maz-works-framework-manazir-s-projects1.vercel.app
- Existing implementation baseline: complete, tested, and deployed to preview
- New design-planning checkpoint: complete; no UI implementation from this checkpoint yet
- Chosen refinement: **Quiet Framework**
- Detailed plan: `tasks/plan.md`
- Execution checklist: `tasks/todo.md`

Do not merge the current preview as the final design without first completing and reviewing the focused refinement below. Do not discard the preview either; it contains the content, data, truth boundaries, and structural work to evolve.

## Preserve

- Maz Works and Manazir Hussain both remain explicit.
- Canonical statement: Manazir builds useful software, AI tools, and automation around real problems.
- JobFilter and Scrap Finance Partners remain flagships; Agent Nudge and OpenFlowKit remain selected work unless evidence warrants a change.
- Real project links, honest limitations, typed project data, static architecture, tests, metadata, security headers, Vercel Analytics, and the no-index `/mazos` handoff.
- Scrap Finance Partners as verified `CLIENT WORK / SHIPPED` without invented outcomes.
- Bounded free demo and founding implementation: £150 total, £75 after scope agreement and £75 after the agreed implementation is presented.
- Hire, Client, and Collaborate remain distinct intentions, even if their UI is consolidated.

## What changed

The previous handoff treated the current visual build as final and focused almost entirely on launch operations. Manazir asked for a broader improvement plan. This checkpoint:

- reviewed the rendered site from multiple audience and quality perspectives;
- gathered restrained architectural, editorial, and builder-portfolio references;
- compared three genuinely different directions;
- selected Quiet Framework;
- specified a leaner homepage architecture, two-flagship case-study path, proof asset work, and a staged verification/launch sequence;
- made the next implementation action narrow enough for a clean visual checkpoint.

## Multi-perspective findings

| Lens | What already works | What must improve |
|---|---|---|
| Employer | Shipped projects, code/live links, limitations, named builder | Surface technical judgment through project evidence; reduce sales prominence and repeated claims |
| Client | Clear demo path, real commissioned work, bounded price | Show the client site visually before the offer; make pricing quieter and confidence-led |
| Collaborator | Real experiments and clear contact intent | Add a little human voice/current curiosity; remove agency-like funnel repetition |
| LinkedIn visitor | Stable homepage anchors and real destinations | Give flagships durable case-study destinations with shareable metadata |
| Editorial/design | Strong ivory/black frame and project hierarchy | Reduce boxes, yellow area, equal grids, and copy; let one strong image lead each flagship |
| Conversion | Several clear calls to action | Establish one primary action per section; remove competing hero buttons and repeated pathway cards |
| Mobile/accessibility | No overflow, readable content, strong touch targets | Shorten the hero, simplify mobile navigation, verify real Tab order, and preserve focus/reduced motion |
| Performance/maintenance | Static Next.js, plain CSS, typed data, few dependencies | Keep assets optimized and case studies data-driven; do not add a CMS or animation library |

## Chosen direction

### Quiet Framework

Keep the warm ivory canvas and near-black structure, but make the system calmer:

- yellow is a signal, not a surface;
- whitespace groups content more often than boxes do;
- project screenshots are larger than project explanations;
- the hero is shorter and has one dominant action;
- the page says less and proves more;
- Manazir reads as a thoughtful individual builder, never as a large agency.

References and the exact visual contract are in `DESIGN.md`.

## Target homepage

1. Compact identity/header.
2. Short hero with one proof line and one dominant route to work.
3. Image-led JobFilter flagship.
4. Image-led Scrap Finance Partners client flagship.
5. Compact selected-work index.
6. Merged “What I build / How I work.”
7. Restrained bounded-demo and £75 + £75 offer.
8. Short About plus one consolidated contact block.
9. Footer with verified external identity links.

Remove or merge the existing hero proof ledger, proof strip, repeated services grid, and three large pathway cards after their useful information is preserved elsewhere.

## Remaining priorities

## P0 — Coherent visual refinement

1. Simplify homepage information architecture and cut repeated copy.
2. Refine the visual system: less yellow, fewer boxes, larger project media, clearer mobile header, tighter type scale.
3. Capture and embed real Scrap Finance Partners visual evidence using a new method.
4. Refresh responsive captures and resolve any P0/P1 visual or content regressions.

P0 checkpoint:

- The first screen identifies Maz Works and Manazir, communicates the value, and routes to work without a proof ledger.
- JobFilter and Scrap each have a clear visual centre and factual summary.
- The commercial terms remain complete but no longer dominate the brand.
- 390px and 1280px captures demonstrate the chosen direction.
- `npm run verify` passes.

## P1 — Deep proof and trust

1. Add reusable, statically generated case-study routes for JobFilter and Scrap Finance Partners only.
2. Use Problem → Insight → Built → How it works → Proof → Status → Limitation.
3. Add project-specific metadata/social previews if the routes are created.
4. Audit current project candidates before changing the selected-work hierarchy.
5. Complete keyboard, headings, landmarks, contrast, alt text, touch-target, and reduced-motion checks.
6. Recheck every external link and public claim.

## P2 — Identity and launch

1. Apply a confirmed public domain atomically across canonical, robots, sitemap, JSON-LD, OpenGraph, and tests, or explicitly keep the Vercel domain.
2. Add LinkedIn only when Manazir supplies the exact public URL.
3. Reconcile PR #8 with current `main` and dependency automation without losing useful changes.
4. Run the full local/CI/browser gate, get the refinement reviewed, merge through GitHub, and verify production independently of preview.

## P3 — Distribution and maintenance

- Draft one proof-led LinkedIn post after production is stable; do not publish without approval.
- Point post → flagship case study → live product/code → contact.
- Document the project/client/case-study addition flow around `app/projects.ts`.
- Audit links, statuses, screenshots, pricing wording, and dependencies periodically.
- Add Lab work only when evidence quality strengthens the overall story.

## Important files

- `DESIGN.md` — selected direction and reference translation
- `app/page.tsx` — homepage composition and next implementation focus
- `app/globals.css` — visual system, type, responsive behavior
- `app/projects.ts` — project truth and evidence
- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` — public identity/discovery
- `tests/static-export.test.mjs` — launch guardrails
- `docs/maz-works/review-*.png` — current rendered baseline
- `tasks/plan.md` — full execution order and acceptance criteria
- `tasks/todo.md` — short checklist

## Design rules

- Warm ivory canvas, near-black structural frame, crisp dividers, large real media, calm asymmetry, and minimal signal yellow.
- Favor whitespace and varied editorial scale over equal card grids.
- Copy should be plain, specific, and around one third shorter than the current page.
- No gradients, glassmorphism, glow, giant rounded cards, fake terminals, badge walls, or novelty motion.
- Do not imitate reference sites or present Maz Works as a studio with invented scale.

## Commercial rules

- Lead client acquisition with: “Show me the problem. I'll build a small tailored demonstration first.”
- The demo addresses one bounded problem and is not production delivery or days of unpaid bespoke work.
- Founding implementation is £150 total: £75 after demo/scope agreement and £75 when the agreed implementation is complete and presented.
- Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major feature additions, and extra revision rounds are separately scoped and quoted.
- The refinement changes hierarchy and presentation, not these settled terms.

## Truth boundaries

- Scrap Finance Partners is real client work and shipped.
- Never claim revenue, leads, conversion uplift, testimonials, or financial outcomes without evidence.
- Never portray Maz Works as a large agency or the £150 offer as unlimited permanent pricing.
- Do not describe unbuilt OpenFlowKit native injection or hosted AI routing as shipped.
- Do not guess a domain, LinkedIn URL, job history, client result, or private detail.

## Verification state

Baseline before refinement:

- `npm run verify` passes: typecheck, production build, 13/13 static-export tests, and local smoke.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- GitHub checks and Vercel preview pass.
- Existing 390px, 768px, and 1280px checks found no overflow or console errors.
- Real keyboard Tab-order verification and Scrap screenshot capture remain open.

All implementation verification must be repeated after visual restructuring.

## Exact next action

On `agents/maz-works-framework`, implement Task 1 in `tasks/plan.md` as one reviewable milestone:

1. Simplify `app/page.tsx` into the target homepage order.
2. Remove the hero proof ledger and proof strip after retaining one concise proof line.
3. Make JobFilter the first image-led flagship and Scrap the second client-work flagship.
4. Merge What I Build with Process and replace the three pathway cards with one compact contact block.
5. Keep every project claim, limitation, email path, and commercial term intact.
6. Adjust only the CSS necessary for this new hierarchy.
7. Run `npm run verify`, capture 390px and 1280px views, update all four memory files, and stop for visual review before building case-study routes.

## Needs Manazir

- Final public domain or approval to retain `mazos-site.vercel.app`.
- Exact public LinkedIn URL or confirmation to keep it omitted.
- Approval of the final Scrap Finance Partners screenshot, or an approved source image if capture remains blocked.
