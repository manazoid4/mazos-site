# Maz Works: latest session handover (public copy)

## 1 Oct evening: handover for a new Claude instance
- Everything up to PR #102 is live. Open: #103 (friction pass), #104 (outreach copy-paste pack), #105 (Social Cat creator-growth research).
- Before #104 merges, move its messages to named prospects into the private leads repo and keep only the reusable templates here.
- All agents use the shared agent operating policy saved in the private memory repo as their system prompt.
- The full start-here brief (repos, acquisition pack, rules, to-dos) is private: `unified-memory-database` → `spine/projects/mazworks-site/NEW-INSTANCE-HANDOFF.md`.

## LinkedIn four-goal update (Codex, 30 Sep)

Branch `agents/linkedin-four-goals` adds real-work links, the creator route, changes-scope disclosure and preservation of LinkedIn campaign tags. Prices and scope copy use `app/offers.ts`; the existing design is reused. Details and evidence: `LINKEDIN-FOUR-GOALS.md` and `docs/evidence/linkedin-four-goals/`. Maz: review the PR preview before merging; share the LinkedIn screenshots and personal profile URL when ready. Nothing was posted, sent or merged by this task.

This repo is public. The full handover, open to-dos and research source names live in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` and `ARCHITECTS-CONTEXT-PACK-2026-09-27.md`.


## 1 Oct: playbooks, simpler promises (PR #98)
- Maz confirmed Brand Kit at £395. "Half now, half later" wording removed everywhere (reads as desperate); promises are now free demo first, one fixed price, no contracts.
- Homepage About has a Connect on LinkedIn button; the footer already links the company page. Maz's personal profile URL is still needed.
- Five playbooks for other agents in `docs/playbooks/` (ship a change, offer and voice, design, forms and conversion, leads), linked from `AGENTS.md`. Claude usage resets Sunday 4 Oct; other agents should follow these until then.
- Maz to do: merge #98; send personal LinkedIn URL; decide #88.

## 30 Sep, late: Brand Kit for creators + About/LinkedIn (PR claude/brand-kit)
- PR #97 merged and live.
- New `/brand-kit` page for people who sell through social media (trainers, coaches, makers, bakers, stylists, artists). Brand Kit £395: your look, a one-page website, a profile that sells, 12 post templates, a buy button, Google listing. Six creator add-ons, three reusing standard add-on prices. All data in `BRAND_KIT*` in `app/offers.ts`; bright icons in `app/brand-kit/kit-icon.tsx`. Linked from the phone menu, footer and sitemap; `?package=Brand Kit` pre-fills the form. No lead names on the site (leads stay private).
- Homepage About now says Maz studied Computer Science at Swansea University and links to the Maz Works LinkedIn page.
- Next (queued, not done): add Maz's personal LinkedIn profile URL once he gives it (not found in any repo); add a LinkedIn follow link to the footer and `/brand-kit`; tag outbound LinkedIn links with UTM; a browser check of `/brand-kit` at 390px; a guard test for the Brand Kit page.
- Maz to decide: is £395 the right Brand Kit price?

## 30 Sep, evening: menu, colour, free live demo, LinkedIn funnel (PR #97)
- Batches 1–3 and the Next 16.3.8 security bump (#96) are merged and live on www.mazworks.uk. #88 (older real-direction homepage) is still open: 22 conflicts with the batches, waiting on Maz to close it or cherry-pick from it.
- Phone menu is 7 links (`MENU_LINKS` in `app/nav.ts`); the full map stays in the footer and `/site-map`. The footer is two columns on phones, deep green, and no longer links GitHub (posting rules).
- Palette: the candy pastels are gone. The base is sand/sage/mist/clay/wheat, and a 15-site audit added a measured pop: deep green `--deep`, orange-tinted pill labels, a marker highlight on headline `<em>`, a glow behind phone mockups, and a tint per trade card. Orange stays the action colour.
- **Free demo = call first (Maz, 30 Sep).** The self-serve animated demo was removed. The route is:
  1. A 15-minute call.
  2. On the call, agree what the demo shows and the date it arrives.
  3. The free demo arrives by that date.
  4. If they're happy, the full plan with one fixed price, every item invoiced clearly and no extra charges.
  5. Build: half to start, the rest when it works.
  6. 2 months of unlimited changes from go-live.

  Source of truth: `DEMO_STEPS` and `CHANGES_WINDOW` in `app/offers.ts`.
  - Changes are fenced. Adjustments to what was built are unlimited; a new system, feature or app is priced first.
  - Tests in `tests/demos.test.mjs` guard this.
  - It is shown on `/demos`, `/what-we-do`, `/prices` and `/linkedin`, and in the homepage promises.
- `/what-we-do` is interactive:
  - a live estimator: sliders and share chips, no preset numbers;
  - "How I set it up" tabs;
  - a system picker that runs each system's steps;
  - an example plan whose findings open and whose quote recalculates.
- Section pills are bold multi-colour with dark text, and the hero no longer says "UK". The footer is back on the page colour. Animations are about 30% faster.
- `/linkedin` (noindex) is the one LinkedIn link: a hello, the free demo path and the promises. Copy pack: `docs/maz-works/LINKEDIN-FUNNEL.md`.
- Found, not touched:
  - The main checkout `C:\Users\manaz\mazos-site` has 9 uncommitted Objects files, on branch `agents/objects-sales-clarity` (from 8 Sep).
  - These local-only branches were never pushed: `agents/maz-works-enquiry-resilience-20260921` (3 commits), `agents/maz-works-client-funnel` (Aug) and `agents/lead-quality-v2-20260928` (its brief is already in main).
- Maz to do: merge #97; paste the LinkedIn headline, About, Featured, banner and Website link from the pack; post the launch post; decide #88.

## 30 Sep: Brief 3, all three batches (PRs stacked: Batch 1 → 2 → 3)
- Batch 1 (Codex, finished by Claude): `app/systems.ts` is the one source of truth for systems; the palette is hi-vis orange on off-white (lime and cream are gone, including the favicon, drawings and share images); the homepage has 5 sections; there is a new `/what-we-do`; `api/enquiry.js` sends an instant confirmation through Resend with FormSubmit as the fallback; reply time is 1 working day everywhere (`CHECK_REPLY_TIME`); trade-guide examples lead with the lost customer or lost time and name their system.
- Batch 2: "Build my system" (homepage, `/what-we-do`, every trade guide) priced by `quotePlan()` in `offers.ts`, unit-tested against the Offer v9 rules; the cost calculator uses only the visitor's own numbers; the hero phone is playable (Call, then Book); cards lift and draw their icon; scene tabs swipe; the compare table highlights a column; `<details>` open smoothly; scroll-driven reveal where supported.
- Batch 3: cross-document View Transitions (the header stays, a package card morphs into its section); trade guides show their top 3 scenes and a builder preset to the trade; the free plan form is 2 steps with a progress bar, a summary and a success tick (without JS it is still one form posting natively); a video slot stays hidden until Maz's file exists; the sticky CTA shows only after the hero and hides near the form and footer; CSS went from 10 global files to 4 (`globals`, `enquiry`, `sales`, `wayfinding`), with 50 full-page screenshots pixel-identical before and after.
- Maz to do: test the form on the preview with your own email (the confirmation must arrive); reply to every request within 1 working day; record the 60-second walkthrough and fill in `WALKTHROUGH_VIDEO` in `app/walkthrough-video.tsx`.

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
