# Maz Works Handoff

## Mission

Evolve the existing portfolio into Maz Works: Manazir Hussain's evidence-led umbrella identity for useful software, AI tools, automation, products, experiments, and client work. The current redesign is built; the next job is to review, complete evidence, launch safely, and establish a lightweight proof/distribution loop.

## Current state

- Branch: `agents/maz-works-framework`
- Pull request: https://github.com/manazoid4/mazos-site/pull/8
- Preview: https://mazos-site-git-agents-maz-works-framework-manazir-s-projects1.vercel.app
- PR state at 2026-08-13: open, clean, no reviews or actionable comments
- Checks: both GitHub `verify` jobs and Vercel preview pass
- Baseline commit before this planning update: `5f3b120`
- Detailed execution plan: `tasks/plan.md`
- Executable checklist: `tasks/todo.md`

The coherent redesign milestone is complete. Remaining work is launch hardening and evidence completion, not another broad redesign.

## Preserve

- The FRAMEWORK ivory/charcoal/signal-yellow visual system and crisp structural geometry.
- The first-viewport contract: identity, value, action, and shipped proof appear together.
- JobFilter and Scrap Finance Partners as flagships; Agent Nudge and OpenFlowKit as featured work.
- Problem → insight → build → proof → status → limitation storytelling.
- Honest limitations, real evidence links, and the absence of invented CV history.
- Static Next.js architecture, typed project data in `app/projects.ts`, minimal dependencies, and no CMS.
- Accessibility basics, static-export tests, security headers, Vercel Analytics, and the no-index `/mazos` handoff.
- Maz Works as clearly one person's umbrella identity, not a pretend agency.

## What changed

### Built in PR #8

- Replaced the blue personal-portfolio treatment with Maz Works and the FRAMEWORK visual system.
- Added a proof-led hero, architectural project bays, project hierarchy, typed project content, four-stage process, founding offer, About section, and three contact pathways.
- Updated metadata, JSON-LD, sitemap date, favicon, social card, README, tests, and dependency lockfile.
- Added responsive review captures and the four persistent project-memory files.

### Added in this planning update

- Expanded the remaining work into ten task-sized steps with acceptance criteria, verification, dependencies, likely files, and stop conditions.
- Added explicit merge-ready, approved-to-merge, and stable-production checkpoints.
- Isolated human decisions so review/accessibility/evidence work can continue without waiting.
- Added production verification, LinkedIn preparation, and lightweight maintenance steps that were previously missing.

## Remaining priorities

## P0 — Merge-ready product

1. Claude performs an independent final review of the PR, preview, and three browser captures.
2. Capture and embed a real Scrap Finance Partners screenshot using a method different from the failed in-app CDP capture.
3. Close the runtime accessibility gap: keyboard path, visible focus, skip link, headings, landmarks, contrast, touch targets, and reduced motion.
4. Re-audit every project claim, limitation, status, and external evidence link.
5. Refresh responsive captures and run the complete verification gate.

P0 acceptance gate:

- No unresolved P0/P1 review findings.
- `npm run verify` passes.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- GitHub and Vercel checks pass.
- Browser evidence matches the final UI.

## P1 — Launch identity and merge

1. Collect final domain, LinkedIn, and Scrap-visual decisions from Manazir.
2. If the domain changes, update metadata base, canonical, robots, sitemap, JSON-LD, OpenGraph, redirects, and tests atomically.
3. Add LinkedIn only when the exact public profile URL is verified.
4. Reconcile PR #8 with `main` and the open Dependabot branch without losing the secure compatible lockfile state.
5. Merge through GitHub after review and green checks; never push directly to `main`.
6. Verify the production deployment independently of preview.

## P2 — Distribution and maintainability

1. Prepare one proof-led LinkedIn post for a flagship after production is stable; require Manazir approval before publishing.
2. Ensure post → Maz Works anchor → live product/code → contact is a complete truthful path.
3. Document the exact process for adding a project/client, proof asset, status, and limitation through `app/projects.ts`.
4. Establish a lightweight monthly manual audit for link health, project status, visuals, pricing wording, and dependency security.

## P3 — Evidence-led expansion only

- Consider dedicated case-study routes only when a flagship needs more depth than stable homepage anchors provide.
- Add Lab/experiment work only when it has a real problem, inspectable proof, current status, and limitation.
- Do not add a CMS, contact backend, or animation layer without evidence that the existing lightweight system is inadequate.

## Dependency and checkpoint rules

- Tasks 1–4 in `tasks/plan.md` can proceed before human domain/LinkedIn decisions.
- Domain/social implementation must wait for verified inputs.
- Distribution work must wait for production verification.
- Update `PROGRESS.md` and this file at each checkpoint, not only at the end.
- If a blocker survives two sensible attempts, record it and stop looping.
- A fresh session should read, in order: `PROGRESS.md`, this file, `PLAN.md`, `NEXT-STEPS.md`, `tasks/plan.md`, git status, current diff, then PR #8.

## Important files

- `DESIGN.md` — visual contract
- `app/page.tsx` — page composition and commercial pathways
- `app/projects.ts` — structured project truth/proof
- `app/globals.css` — FRAMEWORK tokens and responsive layout
- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` — public identity and discovery
- `tests/static-export.test.mjs` — deterministic launch guardrails
- `docs/maz-works/review-*.png` — current browser evidence
- `tasks/plan.md` — full execution plan
- `tasks/todo.md` — operational checklist
- `docs/maz-works/` — persistent state

## Design rules

- Warm ivory canvas, near-black structural frames, crisp dividers, vertical project bays, selected charcoal grounding, and restrained signal yellow.
- Architectural, editorial, deliberate, and human—not generic AI/SaaS styling.
- Real screenshots and proof carry more weight than technology lists.
- Do not add gradients, glassmorphism, glowing blobs, giant rounded cards, fake terminals, badge walls, or novelty motion.
- Mobile is core; check narrow mobile, normal mobile, tablet, laptop, and desktop after meaningful visual changes.

## Commercial rules

- Lead with: “Show me the problem. I'll build a small tailored demonstration first.”
- The demo proves one bounded idea; it is not full production delivery or days of unpaid bespoke work.
- Founding implementation is £150 total: £75 after demo/scope agreement and £75 when the agreed implementation is complete and presented.
- Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds are separately scoped and quoted.

## Truth boundaries

- Scrap Finance Partners is verified client work and shipped.
- Do not claim revenue, leads, conversion uplift, testimonials, or financial outcomes.
- Do not portray Maz Works as a large agency or £150 as unlimited permanent custom-software pricing.
- Do not describe unbuilt OpenFlowKit native injection or hosted AI routing as shipped.
- Do not guess a domain, redirect behavior, LinkedIn profile, employer, job title, dates, or client outcome.

## Verification state

Current verified baseline:

- `npm run verify` passes: typecheck, production build, 13/13 static-export tests, and local server smoke.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- Eight external evidence URLs returned HTTP 200.
- Browser audit passed at 390px, 768px, and available 1280px widths with no horizontal overflow or console errors.
- Mobile CTAs are 52px high; client price and scope protection are readable.
- Keyboard focus CSS exists, but end-to-end Tab-order confirmation remains a P0 task because the prior in-app browser could not dispatch Tab reliably.
- Public Scrap site DOM was verified, but screenshot capture timed out twice.

## Exact next action

Claude should execute Task 1 in `tasks/plan.md`: review PR #8, the Vercel preview, the full diff, and the three `docs/maz-works/review-*.png` captures. Record only reproducible P0/P1 findings here. Then proceed to Task 2 using a different Scrap screenshot capture method.

## Needs Manazir

- Confirm the final public domain or approve continued use of `mazos-site.vercel.app`.
- Supply the exact public LinkedIn profile URL or confirm LinkedIn should remain omitted.
- Approve the captured Scrap Finance Partners visual; if capture remains blocked, explicitly decide whether to launch without it or supply an approved image.