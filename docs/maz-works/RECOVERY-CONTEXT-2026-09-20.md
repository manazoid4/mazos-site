# Maz Works recovery — 20 September 2026

## Resume here

Implementation is complete and locally verified on `agents/maz-works-recovery-20260920`,
in `C:/Users/manaz/.codex/worktrees/maz-works-recovery`. Code commit: `f680214`.
Production is unchanged. Do not read older “no blockers / complete” notes as current release acceptance.

The branch includes Agent B's PR #35 through `19352f2`, preserving its commits.
Review this recovery as a stacked change against `claude/mazworks-content-structure-agentb`.
After #35 merges, retarget the recovery PR to main and inspect its diff before merging.
PR #36 is a separate LinkedIn context pack; it was not needed for this implementation.

## What actually happened yesterday

- The local Codex session on 19 September (`01a0b93c-e205-78f1-b3c2-297dced8c902`)
  terminated with `usage_limit_exceeded` before an assistant action. Codex completed no build work.
- Claude subsequently delivered service selection, quote/question options, timeout/error handling,
  email recovery and sitemap coverage in merged PR #34 (`81742c6`). Preserved, not reimplemented.
- Agent B completed outcome-led homepage copy, larger text, restrained headings, scope boundaries,
  navigation and duplicate-section removal in open PR #35 (`b21bbd7`, `ecf1eb9`, `19352f2`).
- The primary checkout `C:/Users/manaz/mazos-site` remains on `agents/objects-sales-clarity`
  with nine existing modified Objects files. They were not overwritten or included here.
- The older client-funnel worktree is August work already superseded by main. Do not resume it.

## Recovery changes and commercial purpose

- Require explicit FormSubmit success confirmation. Previously HTTP 200 with `{}`, invalid JSON
  or no body cleared the enquiry and displayed success. The new executable test failed before the fix.
- Service links now preserve typed contact details, update service context and move keyboard focus
  without reloading. Browser reproduction before the fix lost both the name and problem.
- Both recovery emails include the reply address. A selectable webmail copy gives visitors a fallback
  without a configured email app. No enquiry data is stored in browser storage or added to URLs.
- Objects selection fields lock while sending; both “send another” actions focus the name field.
- Keep Agent B's outcome headline but name websites, software, automation and physical products
  in the hero, with a concrete stand → booking page → follow-up example. Metadata now matches.
- Keep the four-step process in an accessible disclosure rather than another full mobile section.
  Prices, scope, proof labels and contact stay visible. Demo suitability is confirmed, not promised to every enquiry.
- Raise mobile homepage form text from 14.08px to 16px.
- Replace the publicly broken MAZ Pocket GitHub links with an enquiry action. Anonymous HTTP 404
  and authenticated repository metadata confirmed the repository is private; its visibility was not changed.
- Fix the sitemap test's Windows path separator handling, without weakening route coverage.

## Evidence

`npm run verify` passes: typecheck, production build, **48 tests**, static route/asset smoke.
`npm run lint` passes (this repo aliases lint to typecheck; no separate ESLint configuration).
`git diff --check` passes. The high/critical dependency gate passes; one existing moderate
`baseline-browser-mapping` advisory remains, with Dependabot PR #25 already available separately.

Visible Chromium checks at **320, 390, 768 and 1440px** across `/`, `/3d-printing`, `/demos`
and both case studies: no horizontal overflow, broken images, page errors or console errors.
Keyboard skip navigation, service focus/history/draft preservation, whitespace validation,
pending/success/repeat submission, explicit rejection, malformed confirmation, mailto/webmail
recovery, optional Objects links and all six base/artwork estimates passed. Network and timeout
failure are also covered by executable unit tests. FormSubmit requests were mocked: no email was sent.

Screenshots and raw measurements: [recovery evidence](recovery-2026-09-20/).

| Homepage, default disclosures | Live main | Agent B | Recovery |
| --- | ---: | ---: | ---: |
| 390px page height | 7504px | 8257px | 7574px |
| 390px contact starts | 5857px | 6658px | 5953px |
| 1440px page height | 5283px | 5247px | 5068px |

Recovery is 683px shorter than B on mobile while preserving larger text. It is **70px taller than
live main**, not a mobile shortening claim against production. Desktop is 215px shorter than live.
Anchor links remain the quickest route to contact. Objects layout was preserved, not redesigned.

Public HTTP checks: homepage, Objects, demos, both case studies, RotaReason, both private-tool
entry pages, JobFilter, Scrap Finance Partners and Agent Nudge returned 200. The MAZ Pocket
GitHub destination was the sole 404 and has been removed from public links. Internal targets and
assets are checked by the static suite. Private client authentication was not changed or exercised.

Reproduce:

1. `npm ci` then `npm run verify`.
2. `node scripts/serve-static.mjs 3107`.
3. With Playwright resolvable, run `node scripts/verify-customer-path.cjs`.
   On this machine: `node C:/Users/manaz/.agents/skills/playwright-skill/run.js C:/Users/manaz/.codex/worktrees/maz-works-recovery/scripts/verify-customer-path.cjs`.
   `TARGET_URL` overrides the local URL; `MAZ_QA_ARTIFACTS` overrides the temporary artifact directory.
   All FormSubmit traffic is intercepted. This is UI proof, not inbox delivery acceptance.

## Release gates and next actions

1. **FormSubmit activation / inbox receipt remains unverified.** The 19 September handoff records
   `success:"false"` and an activation request for `https://www.mazworks.uk`, while the old Vercel
   origin succeeded. No current inbox access or activation evidence was available. The historical
   claim that every enquiry since the domain switch failed cannot be established from one probe.
   The owner must activate the form from the provider email, then explicitly authorise a labelled
   live test from the custom domain and confirm inbox receipt for both forms. Do not call delivery fixed.
2. Review and merge #35 plus this recovery only after the release gate and final checks; neither was merged here.
3. Print/photograph/NFC-test an Objects prototype before claiming manufacturing readiness. Concept
   labels and unverified durability/fit boundaries remain. No invented clients, results or testimonials added.
4. Resolve the lower-priority apex/www canonical preference: apex currently redirects to www;
   canonical identity was preserved rather than silently changing the chosen domain policy.
5. Review the existing dependency-update PR separately; no framework or package churn was needed for the enquiry fixes.

## Scope discipline

No Supabase enquiry database, new CRM, pricing change, analytics migration, animation library,
outreach, private client content, production deploy or physical-product claim was added.
The delivery dependency is a real external gate, not a reason to fabricate a successful launch.
