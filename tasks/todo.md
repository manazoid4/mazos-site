# Maz Works Launch Checklist

## P0 — Make PR #8 merge-ready

- [ ] Claude reviews PR diff, Vercel preview, and all three browser captures.
- [ ] Record only reproducible P0/P1 findings in `docs/maz-works/HANDOFF.md`.
- [ ] Capture and optimize a real Scrap Finance Partners screenshot with a different method.
- [ ] Add factual alt text/caption and verify the Scrap flagship at 390px, 768px, and laptop width.
- [ ] Complete real-browser keyboard, focus, heading, landmark, contrast, touch-target, and reduced-motion checks.
- [ ] Recheck every project claim, limitation, and external evidence link.
- [ ] Run `npm run verify` and `npm audit --omit=dev`.
- [ ] Refresh browser review captures after the final visual change.

## Human gate

- [ ] Manazir confirms final domain or continued use of `mazos-site.vercel.app`.
- [ ] Manazir supplies exact LinkedIn URL or confirms omission.
- [ ] Manazir approves the Scrap screenshot or explicitly approves launch without it.

## P1 — Finish launch identity

- [ ] Update canonical, metadata base, robots sitemap, sitemap, JSON-LD IDs, OpenGraph URL, and tests together if the domain changes.
- [ ] Add LinkedIn to visible links and JSON-LD `sameAs` only if verified.
- [ ] Reconcile PR #8 with `main` and any Dependabot lockfile changes.
- [ ] Update PR description and handoff with final scope/deferrals.
- [ ] Confirm all GitHub and Vercel checks pass with no actionable review comments.

## Merge gate

- [ ] PR is clean and reviewed.
- [ ] `git diff --check` passes.
- [ ] `npm ci && npm run verify && npm audit --omit=dev` pass.
- [ ] Merge through GitHub; never push directly to `main`.

## P1 — Production verification

- [ ] Wait for the Vercel production deployment to succeed.
- [ ] Smoke-test `/`, `/mazos`, `robots.txt`, sitemap, social card, and project assets.
- [ ] Inspect production at mobile and desktop widths for overflow and console errors.
- [ ] Confirm canonical, OpenGraph, JSON-LD, and Analytics behavior in production HTML.
- [ ] Confirm Hire, free-demo, and Collaborate mailto links.
- [ ] Update the four repository memory files and Maz Works Knowledge Vault status.

## P2 — Distribution and maintenance

- [ ] Draft one proof-led LinkedIn post for a flagship; do not publish without Manazir approval.
- [ ] Make the post resolve to a stable Maz Works project anchor and live evidence.
- [ ] Document how to add a project/client, proof asset, status, and limitation through `app/projects.ts`.
- [ ] Establish a lightweight monthly manual audit for links, status, visuals, pricing language, and dependencies.

## Stop conditions

- [ ] If a blocker survives two sensible attempts, update `PROGRESS.md`, `HANDOFF.md`, and `NEXT-STEPS.md` with the exact blocker and next action.
- [ ] If context becomes constrained, checkpoint before starting another task.
- [ ] If a requested change conflicts with truth boundaries or settled commercial rules, stop and ask Manazir rather than guessing.