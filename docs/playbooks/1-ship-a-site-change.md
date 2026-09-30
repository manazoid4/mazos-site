# 1. Ship a site change

Stack: Next.js (a breaking-change version: read `node_modules/next/dist/docs/` before writing code), static export, Vercel auto-deploys, repo `manazoid4/mazos-site`.

## Steps
1. Read `docs/maz-works/SESSION-HANDOVER.md` (newest section first) and `AGENTS.md`.
2. `git fetch && git switch -c <agent>/<short-name> origin/main`. Never work on main.
3. Make the smallest change that works end to end. Reuse existing components and CSS tokens first.
4. Verify, in this order:
   - `npm run typecheck`
   - `npm run build` (no error)
   - `npm test` (all pass; currently 106)
   - `npm run smoke` when you touched routes
   - look at the page at 390px wide (serve with `node scripts/serve-static.mjs`, port 3000)
5. Commit small with clear messages. `git push -u origin <branch>`, then `gh pr create`.
6. Wait for the `verify` check and the Vercel preview. Do not merge unless Maz says so.
7. Update `docs/maz-works/SESSION-HANDOVER.md` (public: no lead names or contacts). Add a short section at the top: what changed, what is queued, what Maz must do.

## Traps
- Tests pin wording. If you change copy and a test fails, update the test only when the new wording is intentional.
- Every indexable page must be in `app/sitemap.ts`. A page that should stay hidden needs `robots: noindex`.
- The homepage has a word budget in `tests/static-export.test.mjs`. Cut words, do not raise the budget.
- CSS for a page must live in a file that page loads. Global files: `app/wayfinding.css`, `app/sales.css`, `app/colour.css`. A component's own CSS file only loads where that component is used.
- Windows: LF/CRLF warnings on commit are harmless.
