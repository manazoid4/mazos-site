# Maz Works — Next Steps

## Now

1. Claude reviews PR #8, its Vercel preview, the full diff, and all three browser captures; record only reproducible P0/P1 findings.
2. Capture a real Scrap Finance Partners screenshot using a different method, optimize it, wire it into `app/projects.ts`, and verify it at mobile/tablet/laptop widths.
3. Complete the real-browser accessibility pass: skip link, Tab order, focus visibility, headings, landmarks, contrast, touch targets, alt text, and reduced motion.
4. Recheck every project status, proof claim, limitation, and external link.
5. Run Checkpoint A: `npm run verify`, `npm audit --omit=dev`, responsive captures, and green PR/Vercel checks.

## Next

1. Get Manazir's final domain, LinkedIn, and Scrap-visual decisions.
2. Update canonical/social/structured URLs atomically if the domain changes; add LinkedIn only when verified.
3. Reconcile PR #8 with `main` and dependency automation.
4. Update the PR description/handoff, clear actionable review comments, and merge through GitHub.
5. Verify the production deployment, routes, assets, metadata, mailto pathways, Analytics, responsive layout, and console.

## Later

1. Draft one proof-led flagship LinkedIn post after production stabilizes; require Manazir approval before publishing.
2. Document the maintenance flow for adding projects/clients and proof through `app/projects.ts`.
3. Run a lightweight monthly manual audit for links, project status, screenshots, pricing language, and dependencies.
4. Add deeper case studies or Lab work only when evidence quality justifies them.

## Needs Manazir

- Final Maz Works domain or approval to keep `mazos-site.vercel.app`.
- Exact public LinkedIn URL or confirmation to omit it.
- Approval of the Scrap Finance Partners visual, or a decision to launch without it / supply an approved asset.

## Execution source

- Full task detail: `tasks/plan.md`
- Checklist: `tasks/todo.md`
- Current constraints and exact handoff: `docs/maz-works/HANDOFF.md`