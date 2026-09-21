# Maz Works — A/B/C recovery and enquiry resilience

## Resume here

Worktree: `C:/Users/manaz/.codex/worktrees/maz-works-recovery`.
Current branch: `agents/maz-works-enquiry-resilience-20260921`, based on main **9e0ebc9** (PR #40).
Enquiry implementation: **8ac44a2**. A subsequent small CSS commit fixes the new updates page's mobile overflow.
No merge or production deployment was performed by this run. FormSubmit activation and actual inbox receipt remain unverified.

**Important recovery correction:** the session began on `agents/maz-works-recovery-20260920` at `17e71eb`, while main was `81742c6`. During the interruption, another run merged PR #40 at 18:38 UTC, consolidating the earlier recovery, conversion, FAQ/What's New and clean visual work. The final sync caught this. The useful new changes were transferred to a fresh branch from current main, preserving its shorter homepage form and visual cleanup. Do not merge the old #35/#37 stack blindly. The old branch retains local safety commit `2f4e710`; use the new branch for integration.

This was an interrupted work block, not three/five hours of verified continuous execution. The status check correctly reported unfinished work; completion evidence below is from the final integrated version.

## A — audit and recovery

- Preserved the primary checkout's nine pre-existing Objects modifications and all completed Agent B work.
- Followed the customer path on home, Objects, demos and both case studies; added FAQ and What's New when PR #40 appeared.
- Prioritised lost/misdirected enquiries and keyboard barriers over another redesign. No prices, customers, results, testimonials or product capability claims were invented.
- Original browser reproduction used `17e71eb`; source inspection confirmed the form defects remained in `9e0ebc9`. Final browser verification uses the new main-based branch.

## B — enquiries survive unavailable or late JavaScript

| Before | After |
| --- | --- |
| Homepage form defaults to GET without scripts, placing name/email/problem in the URL without delivery | Both forms have explicit provider POST actions and hidden subject/template fields |
| Objects contacts only mount after a JavaScript click | Required contacts and submit are always present; only optional links/help/notes collapse |
| Late hydration resets Objects choices/wording and can desynchronise homepage service state | Interactive state adopts the native values before updating the UI; submitted payloads are verified |
| Static price/selected labels appear to track choices but cannot update | Dynamic estimates and catalogue selection controls appear only after hydration; native choices use CSS `:checked` |

Unique native customer-action field names preserve multiple selected actions without relying on repeated-field handling. CSP permits form submission only to self and the existing provider. AJAX confirmation, timeout handling and recovery remain intact. Native POST follows the provider's documented form flow: [FormSubmit documentation](https://formsubmit.co/documentation).

An intermediate implementation put required contacts inside native details. Testing Enter in the business-name field exposed hidden invalid controls. That version was replaced with always-visible required fields and verified again. Do not restore a required-field disclosure.

## C — keyboard/mobile reliability

- Choosing a product moves focus to the enquiry heading; next Tab reaches the selected radio.
- Errors mark and describe the affected field, clear on correction, and preserve typed information.
- Catalogue choices lock while a request is pending, alongside the form controls.
- Native choice highlights and full-choice focus outlines work without script-driven classes.
- Case-study evidence links are labelled groups rather than duplicated navigation landmarks.
- Every homepage mobile shortcut, including Contact, fits at 320/390px.
- The newly merged What's New page expanded to 556px on a 320px viewport. Its mobile grid now allows the scrollable history to shrink within the page, retaining readable content.

## Proof and limits

- Production build: **16 exported pages**. `npm run verify` passes, **51/51 tests**. `npm run lint` passes; it is a typecheck alias, not a separate ESLint audit. Final CSS was followed by another build, tests and smoke check.
- `verify-customer-path.cjs`: **28 route/width combinations** (7 routes × 320/390/768/1440), no document overflow, broken images, runtime/console errors or failed asset responses; normal/rejected/malformed/pending/success/retry/recovery paths and all six prices pass.
- `verify-native-enquiry.cjs`: both forms with JavaScript disabled and blocked; native POST, chosen fields, no enquiry data in URL, correct form-action policy, native selection highlights and implicit required-field focus pass.
- `verify-delayed-hydration.cjs`: data entered before scripts load survives in UI and actual mocked AJAX payloads, including £89 Touch + Carry with artwork.
- `verify-enquiry-keyboard.cjs`: focus transitions, optional disclosure, error associations/correction, pending catalogue lock and visible mobile shortcuts pass.
- `verify-marketing-accessibility.cjs`: zero automated violations across 7 routes at 390/1440px. This is **not full WCAG conformance**. Incomplete results include decorative arrows and generic div labels on home/demos; the latter are assigned to Claude's page scope. No assistive-technology session was performed.
- All provider submissions were intercepted. **No real email was sent and no mailbox receipt was demonstrated.**
- Self-reviewed the integrated diff. Two independent review workers never started and were cancelled; do not count them as completed reviews. Claude's handoff has not been received or reviewed.

Evidence: [work-block-2026-09-21](work-block-2026-09-21/). Initial audit is historical; the responsive, native, hydration, keyboard and accessibility JSON files describe the final integrated version. Screenshots show the final home/Objects mobile layout and the updates overflow before correction.

Reproduce: `npm run verify`, serve `out` with `node scripts/serve-static.mjs 3107`, then run the five scripts above with Playwright available. `TARGET_URL` and `MAZ_QA_ARTIFACTS` override defaults. For axe, set `AXE_SOURCE` or install `axe-core`. On this machine, set `NODE_PATH=C:/Users/manaz/.agents/skills/playwright-skill/node_modules` and `AXE_SOURCE=C:/Users/manaz/AppData/Local/Temp/maz-works-audit-tools/node_modules/axe-core/axe.min.js`. Run sequentially: the skill runner uses shared temporary filenames and is unsafe for simultaneous invocations.

## Claude and next actions

Use the refreshed [three-goal Claude prompt](CLAUDE-PROMPT-2026-09-21.md); it points at the new branch. Claude owns independent buyer critique, evidence/claim corrections and one or two buying-decision improvements in the listed page/data files. Codex owns final integration and must review the actual diff, sources and runtime results. No blanket acceptance of recommendations.

1. Confirm FormSubmit activation for the actual custom domain and obtain an explicitly authorised, labelled end-to-end enquiry with inbox receipt.
2. Review/integrate this focused PR against current main; retire superseded stack PRs only after confirming their contents are already landed.
3. Review Claude's branch/handoff against current main and these fixes; do not repeat the completed cleanup.
4. Physically validate a Touch prototype, NFC/QR operation, fit, price/lead time and delivery before expanding production claims. The user mentioned a 0.6→0.2 nozzle change; no hardware change or printer configuration was performed or verified here.
