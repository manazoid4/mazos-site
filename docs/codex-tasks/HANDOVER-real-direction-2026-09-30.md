# Real direction: agent handover, 30 September 2026

**Paused at Maz's request to conserve limits. Work is incomplete. Continue the same `claude/real-direction` branch. No PR has been opened and nothing has been merged.**

## Read first

1. `AGENTS.md`
2. `docs/codex-tasks/07-real-direction-redesign.md`
3. `docs/codex-tasks/README.md`
4. `docs/codex-tasks/ANIMATION-GUIDE.md` — fetched from `origin/main` after Maz explicitly requested it. Follow it and tick its Quick check before a PR list in the final PR.
5. `DESIGN.md` — appended a three-option sketch table before building sections.

## Checkout and workflow

- Local worktree: `C:\Users\manaz\mazos-real-direction`.
- Branch: `claude/real-direction`, starting at Claude's `35fd000`.
- Original `C:\Users\manaz\mazos-site` has another branch with pre-existing uncommitted Objects/3D-printing changes. Do not touch or revert those.
- Latest fetched main: `eda2f56`, animation-guide PR #87. Do not merge unrelated changes blindly.
- Run `npm run verify` before opening **one PR from this branch into main**. Claude reviews before Maz merges. Never merge it yourself.
- User wants a commit after each numbered step. Steps 1–7 have individual commits; animation-guide corrections have a separate commit. Step 8 is partially done.

## Commits completed

| Commit | Work |
| --- | --- |
| `7eac93f` | Step 1: shorter homepage, varied sections, process/about combined, FAQ/final CTA combined; example-plan prices read from offers |
| `f763475` | Step 2: booking at night, rebooking and weekly-report scenes; keyboard tab controls and stable panel space |
| `84ee569` | Step 3: inbox items settle into a single list beside the example plan |
| `65e3321` | Step 4: process line/ticks as steps enter view |
| `5f3535a` | Step 5: working-day calendar beside canonical guarantee |
| `04e5c9c` | Step 6: six true promises before prices, sourced from offers where possible |
| `b484218` | Step 7: shared free-plan journey, source tags, package/trade prefill, optional enquiry-volume radios, useful success state, calm page styling |
| `4b85c27` | Follow-up: animation-guide compliance changes; once-only phone story, SVG process stroke, calendar ring, near-full-size ticks, tap feedback, remove generic section fades |
| `af4d781` | Step 8 / brief 01: all trade guides have Starter and larger-system choices plus visual slots; verified example facts unchanged |

## Stop point — do this next

**Brief 02 has NOT started. The guide data now references SVG files which do not exist yet. Create them before expecting links/build verification to pass.**

Create the files listed in `app/for/niches.ts`:

- `public/salons/booking-confirmation.svg`, `appointment-reminder.svg`, `rebooking-prompt.svg`
- `public/groomers/missed-call.svg`, `next-groom.svg`
- `public/garages/mot-reminder.svg`, `quote-follow-up.svg`, `job-list.svg`
- `public/cafes/shared-inbox.svg`, `review-request.svg`
- `public/clinics/intake-form.svg`, `appointment-reminder.svg`
- Brief 02 also needs three generic homepage mock screens under `public/mock/` (missed call, enquiry list, weekly summary).

Use brief 02's required original SVG palette, `viewBox`, `role="img"`, `<title>`, no external fonts, under 12 KB, `ILLUSTRATIVE ONLY`. The new design is calmer, but the brief expressly asks for the original palette: propose a palette change in the PR instead of silently overriding it. No invented clients/results. Add per-guide tests for tiers, real package names and honest visual captions; these tests have not been added yet. Architecture captions were changed to the exact illustrative wording.

Then finish briefs **03 → 04 → 06** in order:

- 03: Service/Offer JSON-LD on prices, Service per trade, verify existing FAQPage comes from rendered FAQ data; unique titles ≤60 and descriptions ≤155; prices only from `offers.ts`; validate built HTML with Schema.org validator and add guards. Current SEO titles/descriptions still exceed budgets. `app/seo.ts`, FAQ answers, `app/enquiry.ts` and some metadata still contain inherited hard-coded prices: convert those within the touched scope. The example report and referral amount were centralised already (`REFERRAL_THANK_YOU` added to offers without changing the amount).
- 04: audit **every exported route** with axe or Lighthouse; fix contrast, alt text, focus, tab order; add chip `aria-pressed` and error `role="alert"` guards. Capture all changed pages at **390px and 1280px**, including shared-chrome/style changes. Finish form failure, double-submit, optional omission, no-JS and reduced-motion browser checks. Current added browser proof covers the successful qualified submission only; older resilience code remains.
- 06: rewrite `/whats-new` as “What I've shipped lately”, buyer-facing linked entries only, keep “Easier to find your way around”; don't add it to navigation.

## Verification actually performed

- Before changes: build passed; **88 pass, 1 fail**: homepage 1,603 words vs unchanged 1,600 budget.
- Step 1: build and all **89 tests** passed.
- Step 7: build and **88 tests** passed (two old contact-form tests consolidated around the new shared form). Word-budget test passed; budget never raised.
- Later animation-guide follow-up and brief 01: **typecheck only**. Latest HEAD has NOT had full build/test/verify or browser animation verification. Existing `out/` is step 7, not latest source.
- Browser, 390px: homepage CTA visible before scrolling; `/leak-check`, `/prices`, `/contact`, `/for/architects` had no horizontal overflow. Viewed homepage, form and architecture viewport captures; this is not the requested final screenshot set.
- Browser test first failed because optional qualification did not exist, then passed after implementation: POST intercepted locally, problem + name + email + optional 10–50 enquiries + `trade=dog-groomers` + `src=scene-booking` + known package all transmitted; useful success guide shown. **No real enquiry was sent.**
- Saved logs and runnable browser checks: `docs/review/real-direction/`. Set `PLAYWRIGHT_MODULE` to the installed Playwright module path or install externally; optional `SITE_TEST_URL`, default localhost:4177. Browser scripts use a visible browser.
- Local static server was started with `node scripts/serve-static.mjs 4177`; may still be running. It serves the worktree's `out/`. Other unrelated servers were on 8080 and 5000; do not use them.

## Lighthouse baseline and performance gate

Saved `docs/review/real-direction/lighthouse-before.report.json` and `.html`, measured on the unmodified branch build at `35fd000`, default Lighthouse mobile, local static server, Lighthouse 13.5.0.

**Performance 75 / accessibility 100 / SEO 100 / CLS 0.** Performance is NOT ready. FCP 1.9s, LCP 5.5s, speed index 3.9s. LCP node was the hero `.s-lede`; report flags unused CSS/JS and uncompressed local transfers. Investigate actual app costs and keep before/after server conditions comparable; do not misrepresent a changed server setup as a site improvement. The CLI wrote reports successfully but exited with Windows EPERM when cleaning its Chrome temp directory. Keep that caveat in evidence. No after run yet. Required final result: ≥95 performance, 100 accessibility/SEO, CLS 0; animation guide also requires TBT <200ms.

## Known follow-up risks to inspect

- Animation patches are only typechecked. Check every scene plays once on first view, hidden panels do not play early, reduced motion shows finished frames and no-JS panels stack readably. Only hero plug may loop, paused off-screen.
- The inherited phone animations now have once-only keyframes but still start from CSS; ensure first-view gating works. The process SVG has CSS view-timeline support plus observer fallback; actually inspect both paths.
- `refresh.css` contains successive overrides from incremental commits. Inspect computed styles and minified animation-name guards, not just source. No animation libraries were added.
- `PackageLink` now always routes to `/leak-check`, keeps `package` and source parameters, but contains obsolete same-page event code (`samePage = false`). Simplify if appropriate; preserve existing query strings.
- All main conversion wording should be “Get a free plan and price”. Audit remaining older routes/actions and reassure below buttons. Navigation links can retain descriptive names. The homepage still embeds the same shared form; its conversion CTAs lead to the dedicated form.
- Trade pills currently link to guides; guide CTAs carry the trade onward. Source-tag every conversion route and check relevant scene/package links retain context.
- Form optional details collapse after hydration; test missing-problem focus opens them correctly and native no-JS submission works. No-JS still requires text because chips need JS.
- Header CTA hidden on mobile to keep the full wording from crowding; sticky CTA exists on main changed pages. Check all route coverage and keyboard access.
- Some old tests match literal HTML comments/old wording; update only for intentional behavior, never weaken truth, word-budget, reduced-motion or privacy guards.
- Brief 01 changes new guide copy/visuals: ensure final total word counts do not grow unnecessarily and verified `examples` remain byte-for-byte unchanged.

## Final PR requirements

One unmerged PR, screenshots at 390px and 1280px for every changed page, Lighthouse before/after, `npm run verify` green, complete list of every `TODO(Maz)`, and the animation guide's six checklist items ticked only after proof. Explain each change as intended to raise enquiries or improve lead quality; don't claim measured conversion improvement. Flag rule-conflicting design ideas for Maz/Claude instead of implementing them.

## Memory

Vault was pulled at session start. `memory.py start --project mazworks-site` returned `unknown_project`; local private handover paths are missing. Private handover was read through GitHub API; do not copy prospect names/contact details into this public repo. Public handover pointer is `docs/maz-works/SESSION-HANDOVER.md`. Maz's ongoing reminders: honour three-working-day plan replies, work existing outreach, finish LinkedIn corrections; no new photo requested for this pass.
