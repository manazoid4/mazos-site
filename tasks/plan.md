# Implementation Plan: Maz Works — Review, Launch, and Evidence Completion

## Overview

PR #8 already delivers the coherent Maz Works redesign. The next stage is not another redesign: it is a controlled path from a green preview to a trusted production launch, followed by a small evidence and distribution loop. Work must preserve the settled FRAMEWORK system, the project hierarchy, the bounded founding offer, and the truth boundaries in `docs/maz-works/HANDOFF.md`.

## Current baseline

- Branch: `agents/maz-works-framework`
- Pull request: https://github.com/manazoid4/mazos-site/pull/8
- Preview: https://mazos-site-git-agents-maz-works-framework-manazir-s-projects1.vercel.app
- GitHub checks: two `verify` jobs and Vercel preview all pass
- Local verification: `npm run verify` passes; 13/13 tests; production audit has 0 vulnerabilities
- Responsive evidence: `docs/maz-works/review-desktop.png`, `review-mobile.png`, and `review-mobile-client.png`

## Definition of done

Maz Works is launch-complete when:

- the final review has no unresolved P0/P1 findings;
- Scrap Finance Partners has truthful visual evidence or a documented decision to launch without it;
- keyboard navigation, focus, headings, landmarks, contrast, touch targets, and reduced-motion behavior are verified in a real browser;
- final domain and LinkedIn inputs are applied atomically, or explicitly deferred without publishing false URLs;
- `npm run verify` and `npm audit --omit=dev` pass on the final commit;
- PR checks pass, the PR is reviewed and merged through GitHub, and production is smoke-tested;
- persistent repository and Knowledge Vault handoffs match production reality.

## Architecture and product decisions

- Keep the current static Next.js App Router architecture and plain CSS.
- Keep project content in `app/projects.ts`; do not introduce a CMS.
- Keep JobFilter and Scrap Finance Partners as flagships; keep Agent Nudge and OpenFlowKit featured.
- Preserve the evidence sequence: problem → insight → build → proof → status → limitation.
- Treat `mazos-site.vercel.app` as the current canonical until Manazir confirms a replacement domain.
- Do not add LinkedIn until the exact public profile URL is verified.
- Do not add a contact backend merely to replace working `mailto:` pathways.
- Do not reopen the £150 founding-offer decision without a genuine implementation constraint.

## Dependency order

```text
Final review
    ├── Evidence asset completion
    ├── Accessibility/runtime audit
    └── Copy/truth/link audit
             │
             └── Merge-ready checkpoint
                      │
              Human launch inputs
                      │
              Canonical/social update
                      │
               Final PR verification
                      │
                 Merge + production
                      │
             Post-launch proof/distribution
```

## Task 1: Independent final review

**Description:** Claude reviews the PR diff, preview, screenshots, copy, and information hierarchy. The review should identify concrete defects, not reopen settled positioning by preference.

**Acceptance criteria:**

- [ ] Findings are classified as P0, P1, P2, or non-actionable.
- [ ] Each actionable finding cites a file, viewport, copy passage, or reproducible behavior.
- [ ] No change weakens the flagship hierarchy, truth boundaries, or bounded commercial offer.

**Verification:**

- [ ] Review PR #8 and all three `docs/maz-works/review-*.png` captures.
- [ ] Inspect the Vercel preview at mobile and desktop widths.
- [ ] Record accepted findings in `docs/maz-works/HANDOFF.md` before implementation.

**Dependencies:** None

**Files likely touched:**

- `docs/maz-works/HANDOFF.md`
- `docs/maz-works/NEXT-STEPS.md`

**Estimated scope:** S

## Task 2: Complete Scrap Finance Partners visual evidence

**Description:** Capture a real first-party screenshot from the live Scrap Finance Partners site using a method different from the failed in-app-browser CDP capture. Crop it to show the actual positioning and service path, then optimize it for the portfolio.

**Acceptance criteria:**

- [ ] Asset is a real screenshot of the live client site, not a recreation or invented mockup.
- [ ] Screenshot contains no private data, browser chrome, credentials, or unverified performance claims.
- [ ] Optimized WebP/PNG is sharp at its rendered size and reasonably small (target under 250 KB).
- [ ] `app/projects.ts` supplies accurate alt text and a factual caption through the existing optional `image` field.

**Verification:**

- [ ] Compare the asset with the live site before committing.
- [ ] Run `npm run build` and `npm test`.
- [ ] Inspect the Scrap Finance Partners flagship at 390px, 768px, and laptop width.

**Dependencies:** Task 1

**Files likely touched:**

- `public/scrap-finance-partners.webp`
- `app/projects.ts`
- `tests/static-export.test.mjs`

**Estimated scope:** S

## Task 3: Close the accessibility verification gap

**Description:** Verify the actual keyboard and assistive structure of the final preview. Fix only observed accessibility defects.

**Acceptance criteria:**

- [ ] Skip link becomes visible on focus and moves focus to `#main-content`.
- [ ] All navigation, project evidence, pricing CTA, and contact pathways are reachable in a logical Tab order with visible focus.
- [ ] Heading order and landmarks communicate the page structure without visual context.
- [ ] Text/background contrast, 44px minimum touch targets, alt text, and reduced-motion behavior pass review.

**Verification:**

- [ ] Real-browser keyboard pass at desktop and mobile emulation.
- [ ] Automated accessibility scan if an existing browser tool supports it; do not add a permanent dependency solely for one scan.
- [ ] `npm run verify` passes after any fixes.

**Dependencies:** Task 1; repeat the relevant portion after Task 2 if the screenshot is added

**Files likely touched:**

- `app/page.tsx`
- `app/globals.css`
- `tests/static-export.test.mjs`

**Estimated scope:** S–M

## Task 4: Truth, proof, and link audit

**Description:** Perform one final evidence audit of every public statement and destination. Prefer removing or qualifying a weak claim over adding promotional copy.

**Acceptance criteria:**

- [ ] Every project status, proof statement, limitation, and link agrees with the live product/repository.
- [ ] Scrap Finance Partners remains `CLIENT WORK / SHIPPED` without revenue, lead, conversion, testimonial, or financial-outcome claims.
- [ ] OpenFlowKit does not imply native injection or hosted AI routing is shipped.
- [ ] All external links return a valid response and labels describe their destination.

**Verification:**

- [ ] Run the external-link status check recorded in `docs/maz-works/PROGRESS.md`.
- [ ] Review `app/projects.ts`, the rendered page, and live destinations side by side.
- [ ] Update deterministic tests for any new truth boundary that should not regress.

**Dependencies:** Tasks 1–2

**Files likely touched:**

- `app/projects.ts`
- `app/page.tsx`
- `tests/static-export.test.mjs`

**Estimated scope:** S

## Checkpoint A: Merge-ready product

- [ ] Tasks 1–4 are complete or explicitly waived in the handoff.
- [ ] No unresolved P0/P1 review findings remain.
- [ ] `npm run verify` passes.
- [ ] `npm audit --omit=dev` reports 0 vulnerabilities.
- [ ] Browser review captures reflect the final UI.
- [ ] PR #8 remains clean and all required checks pass.

## Task 5: Resolve launch inputs with Manazir

**Description:** Collect only the inputs that cannot be inferred safely. This is a human gate, not a reason to block Tasks 1–4.

**Acceptance criteria:**

- [ ] Manazir confirms either a final domain or continued use of `mazos-site.vercel.app`.
- [ ] Manazir supplies the exact public LinkedIn profile URL or confirms LinkedIn should remain omitted.
- [ ] Manazir approves the Scrap visual or explicitly approves launch without it if Task 2 cannot be completed.

**Verification:**

- [ ] Decisions are recorded in `docs/maz-works/HANDOFF.md` and the Knowledge Vault.
- [ ] No guessed domain, redirect, handle, or profile URL is committed.

**Dependencies:** None for asking; Task 6 depends on the answers

**Files likely touched:**

- `docs/maz-works/HANDOFF.md`
- `docs/maz-works/NEXT-STEPS.md`

**Estimated scope:** XS

## Task 6: Apply canonical domain and social identity atomically

**Description:** If a new domain is confirmed, update every source of public identity in one change. Add LinkedIn only when the exact URL is verified.

**Acceptance criteria:**

- [ ] `metadataBase`, canonical, OpenGraph URL, sitemap, robots sitemap, and JSON-LD IDs all use the same final origin.
- [ ] Old production URLs redirect intentionally or remain documented; no split canonical identity exists.
- [ ] LinkedIn appears in visible navigation/contact and `sameAs` only when verified.
- [ ] Social card title, description, and image remain truthful after the domain change.

**Verification:**

- [ ] `npm run verify` passes.
- [ ] Inspect generated `out/index.html`, `out/robots.txt`, and `out/sitemap.xml`.
- [ ] Validate the final social preview URL and structured-data JSON.

**Dependencies:** Task 5

**Files likely touched:**

- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/page.tsx`
- `tests/static-export.test.mjs`

**Estimated scope:** M

## Task 7: Final PR and dependency reconciliation

**Description:** Reconcile PR #8 with any intervening `main` or Dependabot changes, run the complete gate, and prepare one reviewable final diff.

**Acceptance criteria:**

- [ ] No duplicate or conflicting dependency update remains between PR #8 and open Dependabot work.
- [ ] Branch is current enough to merge cleanly without discarding either side's useful changes.
- [ ] PR description and `docs/maz-works/HANDOFF.md` reflect the final scope and known deferrals.

**Verification:**

- [ ] `git diff --check` passes.
- [ ] `npm ci && npm run verify && npm audit --omit=dev` pass.
- [ ] GitHub checks and Vercel preview pass on the final commit.
- [ ] No unresolved actionable PR comments remain.

**Dependencies:** Checkpoint A; Task 6 if launch inputs are available, otherwise an explicit deferral

**Files likely touched:**

- `package-lock.json`
- `docs/maz-works/HANDOFF.md`
- `docs/maz-works/PROGRESS.md`

**Estimated scope:** S–M

## Checkpoint B: Approved to merge

- [ ] Final PR diff has been reviewed.
- [ ] Required checks are green.
- [ ] Human-gated domain/LinkedIn decisions are applied or documented as deferred.
- [ ] Production rollback is available by redeploying the previous Vercel deployment.
- [ ] Merge proceeds through GitHub; no direct push to `main`.

## Task 8: Merge and verify production

**Description:** Merge the reviewed PR through GitHub, allow Vercel production deployment to complete, then verify the public site rather than assuming preview parity.

**Acceptance criteria:**

- [ ] PR #8 is merged through GitHub with all required checks passing.
- [ ] Production deployment completes successfully.
- [ ] Homepage, `/mazos`, `robots.txt`, sitemap, social asset, and project assets return expected statuses.
- [ ] Hire, free-demo, and collaboration mailto links contain the intended subjects/bodies.

**Verification:**

- [ ] Smoke-test the production URL at mobile and desktop widths.
- [ ] Confirm no horizontal overflow or console errors.
- [ ] Confirm canonical/OG/JSON-LD values from production HTML.
- [ ] Confirm Vercel Analytics loads without breaking Content Security Policy.

**Dependencies:** Checkpoint B

**Files likely touched:**

- `docs/maz-works/PROGRESS.md`
- `docs/maz-works/HANDOFF.md`
- Knowledge Vault Maz Works status/session note

**Estimated scope:** S

## Task 9: Prepare the first proof-led distribution loop

**Description:** After production is stable, prepare—not automatically publish—the first LinkedIn-to-case-study loop. Start with one flagship and make every claim resolve to live evidence.

**Acceptance criteria:**

- [ ] Draft covers one problem, one key judgment, what shipped, one limitation, and one link to the relevant Maz Works anchor.
- [ ] No invented business result, testimonial, engagement promise, or inflated agency language appears.
- [ ] Link resolves to a stable production anchor and its case-study evidence remains visible on mobile.

**Verification:**

- [ ] Compare every draft claim with `app/projects.ts` and the live destination.
- [ ] Manazir approves wording before anything is posted externally.
- [ ] Record the reusable post → case study → product/code → contact pattern in the vault.

**Dependencies:** Task 8; verified LinkedIn URL from Task 5

**Files likely touched:**

- Knowledge Vault Maz Works notes
- Optional `docs/maz-works/` content brief

**Estimated scope:** S

## Task 10: Establish lightweight maintenance

**Description:** Keep the portfolio current without creating a CMS or recurring busywork. Document how to add proof and how to detect drift.

**Acceptance criteria:**

- [ ] README or handoff explains how to add a project/client, status, proof link, screenshot, and limitation through `app/projects.ts`.
- [ ] A monthly manual check covers live links, project status, screenshots, pricing wording, and dependency/security health.
- [ ] Future projects are not promoted until they have a real problem, inspectable proof, current status, and stated limitation.

**Verification:**

- [ ] A fresh agent can identify the exact files and commands without prior conversation.
- [ ] `npm run verify` remains the single local launch gate.
- [ ] Maintenance guidance does not require a CMS or new runtime dependency.

**Dependencies:** Task 8

**Files likely touched:**

- `README.md`
- `docs/maz-works/HANDOFF.md`
- Knowledge Vault Maz Works status

**Estimated scope:** S

## Checkpoint C: Stable operating state

- [ ] Production is healthy and documented.
- [ ] First distribution draft is ready for human approval.
- [ ] Maintenance instructions are sufficient for a fresh agent.
- [ ] `PROGRESS.md`, `HANDOFF.md`, `PLAN.md`, and `NEXT-STEPS.md` agree.
- [ ] The Maz Works Knowledge Vault and GitHub repository hold the same current state.

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Review drifts into a second redesign | High | Treat settled design/commercial decisions as constraints; require evidence for changes. |
| Screenshot capture continues failing | Medium | Use local Chrome/OS capture, Vercel preview tooling, or an approved manually supplied image; launch can be explicitly approved without it. |
| Domain migration creates split identity | High | Update canonical, robots, sitemap, JSON-LD, OG, tests, and redirects atomically. |
| Evidence becomes stale | High | Keep statuses and limitations in typed project data; run periodic live-link/status checks. |
| £150 offer reads as unlimited pricing | High | Preserve scope exclusions adjacent to price and review them at mobile width. |
| Dependency PR conflicts with #8 | Medium | Reconcile lockfiles once, keep the secure compatible versions, and close superseded automation PRs only after merge. |
| LinkedIn work starts before the site is stable | Medium | Make distribution depend on production verification. |
| Agent context is interrupted | Medium | Update the four persistent docs after each checkpoint; exact next action always lives in `HANDOFF.md`. |

## Open human decisions

- Final public domain: new Maz Works domain or keep `mazos-site.vercel.app`?
- Exact public LinkedIn profile URL, or intentional omission?
- If automated capture remains blocked, may the site launch without a Scrap screenshot, or will Manazir supply/approve one?

## Explicit non-goals

- No CMS, database, or admin dashboard.
- No invented projects, clients, outcomes, testimonials, or CV history.
- No full contact backend unless real demand shows mailto is inadequate.
- No separate MAZos marketing page.
- No broad technology badge wall, animation layer, or generic AI redesign.
- No direct push to `main`.