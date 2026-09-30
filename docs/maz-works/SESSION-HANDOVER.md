# Maz Works: latest session handover (public copy)

This repo is public. The full handover, open to-dos and research source names live in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` and `ARCHITECTS-CONTEXT-PACK-2026-09-27.md`.


## 28 Sep, night: Lead Quality v2
Lead rules changed to Lead Quality v2 (brief: `docs/maz-works/LEAD-QUALITY.md`; canonical in the knowledge vault). Leads are found by a repeated business problem with evidence and a named paid fix, not by website cosmetics. Gold does not need a limited company; Ltd status only decides whether cold email is allowed. Existing leads were re-scored and a new batch of 20 (12 Gold, 8 Silver) was researched from dated job ads; all names and contacts stay in the private leads repo and HubSpot. No site code changed.

## 28 Sep, later: Codex plan audit (form truth, one-job Starter on guides)

- Confirmation email: a real test showed the form email reaches Maz's Gmail in seconds, but no auto-reply arrived. FormSubmit's docs confirm autoresponses do not work over AJAX. The in-page message no longer promises an email; the auto-reply stays only on the no-JavaScript route, where FormSubmit supports it.
- Trade guides: Starter £195 lines now describe one job only. The second job each guide mentioned is shown as its own priced add-on (reminders £79, missed-call text-back £95, quote follow-up £95, review requests £95, online booking £95). Prices come from `app/offers.ts`. Every line has a link that pre-fills the free plan form. A test blocks bundled Starter lines.
- Homepage: a one-line link to real work (JobFilter, Scrap Finance Partners) now sits beside the free plan form.
- Browser-checked: package pre-fill from /prices, guides and the homepage; unknown `?package=` ignored; problem buttons add and remove text without losing typed words; one POST on double-click; failed send keeps text and offers email; no-JavaScript form posts natively. No overflow at 320, 390, 768 or 1440px.
- Not done, on purpose: the petrol/green recolour (no evidence it lifts enquiries, high risk of churn), CSS merging (Next already ships one CSS file per page), paid analytics.

## 28 Sep: sales pass (shorter homepage, tap-to-pick)

- Maz confirmed Offer v9 stays; the older brief built on the retired £395 Repair was out of date and was not used. Most of that brief (one form, sticky CTA, example plan, trust strip, analytics events, schema) was already live, so only three new things shipped.
- Homepage prices now sell one first step: Starter £195, four popular add-ons, a short "Bigger jobs" list, promises and the guarantee. The comparison table, all twelve add-ons, care plan and "What's not included" moved to a new `/prices` page (in nav, sitemap and footer). Homepage on a 390px phone: 12,578px → about 10,270px tall. Homepage word budget lowered 1,900 → 1,600.
- Free plan form: `_autoresponse` added (later found to work only on the no-JavaScript route; see above). Research: only 23% of UK customers say they'd definitely try again after a slow reply (Moneypenny/Censuswide, 2026), and competitors promise replies in 2 to 24 hours.
- Free plan form: six tap-to-pick problems (Missed calls, Slow replies, No-shows, Chasing quotes, Reviews, Copying details) fill the text box, so owners type less on a phone. Price cards pre-fill "Asking about: <package>" through `?package=` (only real package/add-on names accepted).
- Location is not published anywhere (AGENTS.md rule, confirmed again by Maz 28 Sep).

## 27 Sep: navigation audit and architecture visuals

- Follow-up, six wayfinding helps: What's new (current, linked in every footer), human site map `/site-map`, helpful 404, header marks the current section (`aria-current`), homepage On this page jump bar, Back to top link.

- Audit: on phones the header showed only "Free quote"; trade guides were linked only from inside the quote page; Objects only from the footer; no breadcrumbs or trade hub.
- Fix (NN/g "combo" navigation, Xero-style grouped menu): desktop header shows Prices, Who it's for, Objects, FAQ plus Free quote; phones get Prices plus a labelled Menu button with every route in three groups. Footer uses the same groups (`app/nav.ts` is the one map). New `/for` hub, breadcrumbs with BreadcrumbList schema on guides, `/for` and Objects.
- Architecture: four illustrative CAD-style drawings in `public/architecture/` (massing model with QR plaque, site plan, floor plan, scaffold elevation), each labelled illustrative. Objects has a full Architecture & property section; the architects guide shows two drawings and links to it. Presentation drawings only, never structural or scaffold design.
- Tests: every main page links to the key routes and has the menu button; drawings labelled illustrative; shared nav chrome excluded from page word budgets; Objects budget 1,100.

## 27 Sep 2026 — Audit of the architects work (PR #75/#76)
Checked by Claude against AGENTS.md and the live site. Sound: no researched practice is named in this repo, architects stay a use case through `NICHE_GUIDES`, no new pricing tier. Improved: every trade guide (including architects) was headlined "Website leaks on…" / "Enquiry gaps on … websites", which contradicts the positioning, so all six now lead with the outcome (e.g. "Turn portfolio interest into qualified architecture projects"); fix lines now describe systems, not website repairs; "What fixing it costs" became "What I'd set up, and the price"; the architectural-models FAQ now says "simple concept or massing models, possibly" because no model has been printed yet. A new test blocks website-fix headlines and wording on the guides.

## 27 Sep 2026 — Offer v9: ManyPets-style clarity, consistent prices
Maz asked for the Google profile, website page and training prices to come down and for every service to be explained as clearly as ManyPets explains its insurance. The homepage now has a side-by-side "Compare packages" table (same rows for each package, plain answers), four short promise blocks (fixed price first, half now half when it works, no contracts, no VAT), add-ons grouped under Win and keep customers / Get found and trusted / Less admin / Help for your team, and a "What's not included" list. New prices: Google Business Profile setup £49, single website page £145, team training £39 (one-hour call plus a written guide). Consistency rules in `app/offers.ts`: standard add-ons can be bought alone; Extra automation only adds a second job to a package; the weekly report is included free in a Business System.

## 27 Sep 2026 — Offer v8 + architects test shipped

Claude session `01KHHDcykQuZunqoEKFvr7a5` completed through PR #74 before its limit was hit. Offer v8 was the source of truth at that point (now Offer v9, see above): Starter Automation £195, Business System from £795, Custom Software & Websites from £1,950, Keep It Running £19/month, with scoped optional add-ons; AI may be used behind the scenes but is never advertised or sold.

PR #75 is merged to `main` as `6467a46331766bc48f80859a8b9c25f0903f1ccb`. It adds `/for/architects` through the existing `NICHE_GUIDES` system using anonymised observations from live UK architecture-practice websites, maps the fixes onto Offer v8, and adds one restrained `Architecture & property` use case to Maz Works Objects for simple concept/massing/site/presentation models from suitable files, optionally linked by QR/tap. There is no claim that Maz has already produced an architectural model, no separate architect pricing, no new brand and no homepage architecture section.

The first protected CI run caught one useful issue: the Objects page reached 936 words against its existing 900-word budget. The new architect copy was shortened instead of weakening the guard; the second run passed typecheck, dependency audit, static build/export, all deterministic HTML/link tests and smoke, and Vercel also passed. Tests keep current Offer v8 prices, anonymity and physical-product truth limits enforced.

### Next agent
- Read `AGENTS.md`, current `app/offers.ts`, and the private architect context pack first; do not work from Offer v7 or older handoffs.
- Treat PR #75 as complete. Do not rebuild the architects page or broaden it into a print bureau, separate architecture brand, homepage section or new pricing model.
- If Maz wants to validate the physical angle, the next proof is one clearly labelled fictional/concept architectural demo linked to one project page — not a catalogue.
- Keep the main priority on first-client acquisition and the existing open sales/outreach to-dos.

### Standing guardrails
Maz Works remains a systems/automation/custom-software business for UK small businesses and teams, with websites and physical objects as routes inside the offer. Never invent clients, results or testimonials; never publish Maz's location, personal email or phone; never advertise AI; and use branch + PR rather than pushing directly to `main`.

## 30 September: real-direction work paused for agent handover

Brief 07 steps 1–7 and brief 01 are committed on `claude/real-direction`; nothing is merged. The remaining work, exact verification state and performance shortfall are recorded in `docs/codex-tasks/HANDOVER-real-direction-2026-09-30.md`. Continue with the missing brief 02 SVGs, then briefs 03, 04 and 06, full verification and review evidence. No PR is open yet; Claude reviews the eventual PR before Maz merges.
