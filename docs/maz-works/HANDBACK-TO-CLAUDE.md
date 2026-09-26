# Maz Works — handback to Claude (pass 4, 26 Sep 2026)

## 1. PR links and whether each is merged

- PR #63 — https://github.com/manazoid4/mazos-site/pull/63 — **OPEN, NOT MERGED**.
- Branch: `agents/pass4-leak-check-acquisition`.
- Base: `main` at `efbfdbd81f772ab2323f74b4d2c2a2bf8e20e16d` when this pass started.
- Vercel preview for the tested code reached **READY**. Do not treat it as production until PR #63 is reviewed and merged.

## 2. What you changed

- `app/leak-check/page.tsx`
  - Added a dedicated, shareable `/leak-check` acquisition page.
  - Promise is simple: send a website, get a short manual review of obvious customer friction.
  - Says no call is required, no automated score is used and there is no obligation.
  - Gives a current response promise of **within 2 working days**.
  - Mentions Nottingham and the East Midlands as the current focus while keeping UK businesses welcome.
  - Adds Service structured data with Nottingham, East Midlands and UK `areaServed`; this is a service-area signal, not a claim that Maz Works is physically based in Nottingham.
- `app/leak-check/leak-check-form.tsx`
  - Added a dedicated form with only three visible required fields: name, email and website link.
  - Reuses the existing FormSubmit AJAX/native fallback, timeout, honeypot and recovery-email pattern.
  - Carries an optional `?src=` value into the enquiry email so Maz can distinguish links used in different outreach without adding an analytics vendor.
- `app/page.tsx`
  - Changed the hero primary action from generic contact to **Get a free Leak Check**.
  - Changed the free-check pricing strip to point to `/leak-check` instead of dropping a visitor into the larger generic enquiry form.
  - Left all six capability routes, JobFilter/Scrap proof hierarchy and confirmed paid prices intact.
- `app/site-chrome.tsx`
  - Header CTA is now **Free check**.
  - Added Free Leak Check to the footer.
- `app/sitemap.ts`
  - Added `/leak-check` as an indexable page.
- `tests/leak-check.test.mjs`
  - Added four tests covering the dedicated route, the three-field form, resilient delivery and the homepage/header path.
- No lead names, contact details or private CRM data were added to the public repo.
- No new stylesheet was added. The page intentionally reuses existing resource-page and form styles.

## 3. Research findings per lens

### 1. Busy salon or garage owner on a phone

**Problem:** The live homepage is understandable, but a cold prospect is immediately offered the full business: six capability routes, a problem chooser, work, pricing and a generic enquiry form. That is useful for browsing but more choice than someone between jobs needs.

**Fix shipped:** `/leak-check` gives one job: enter name, email and website. The primary hero and header CTA now lead there.

**Still worth checking:** On a real phone, confirm that the three-field form and its submit button are visible without awkward spacing and that the header still feels calm.

### 2. Sceptical buyer burned by a web designer before

**Problem:** The main site already has good risk reducers — direct with the builder, fixed price first, ownership and no forced call — but the free step previously felt like another route into the sales form.

**Fix shipped:** The Leak Check says it is manual, not an automated score, has no obligation, and explicitly says that if nothing important is wrong Maz should say so. It tells the visitor exactly what comes back.

**Still worth checking:** Whether the 2-working-day promise is operationally realistic. Maz must confirm this before merge.

### 3. Conversion and CRO

**Problem:** The previous free Leak Check was selected through `?service=leak-check#contact`, but the visitor still landed on the general form asking them to describe the problem. That adds work precisely where the free offer should remove it.

**Fix shipped:** A dedicated URL and a three-field form. Cold email, DM, LinkedIn or a phone follow-up can now point directly to `https://www.mazworks.uk/leak-check` or add a simple source such as `?src=email` without changing the page.

**Further recommendation:** Measure visits to `/leak-check`, submissions and call clicks before doing another homepage redesign.

### 4. Local SEO

**Problem:** The homepage is broad and UK-facing, with little explicit Nottingham/East Midlands intent. That is fine for the brand, but it gives local outreach no dedicated search/share destination.

**Fix shipped:** The Leak Check page naturally names Nottingham and the East Midlands and adds matching service-area structured data without falsely claiming a Nottingham office.

**Rejected for now:** Five thin niche/location pages. Until there is unique evidence, useful niche-specific advice or case proof, they would mostly repeat the same sales copy.

### 5. Visual design and premium feel

**Problem:** The proof hierarchy is now much stronger than earlier passes, but the site has accumulated many sections and style layers. More decoration would make it feel busier rather than more premium.

**Fix shipped:** No new visual system. The Leak Check reuses the quiet resource-page treatment and existing form components. JobFilter remains the dominant proof image and Scrap Finance Partners remains secondary.

**Further recommendation:** Claude should remove or merge visual repetition before adding new components.

### 6. Accessibility

**Good existing controls:** Buttons have a minimum 46px height in the clean pass, the Leak Check chooser rows use a 44px minimum, the site has a tested readable type floor, labels are explicit and the new form has live status/error regions.

**Fix shipped:** The new form keeps required labels, `aria-invalid`, error association, a honeypot and keyboard-focus recovery.

**Remaining check:** A literal browser viewport pass at 390px and 1440px is still required before merge; see section 7 for why it was not completed in this environment.

### 7. Pricing psychology

The local market does not make Maz Works' current entry pricing look obviously out of place:

- ClearPath Digital, Nottingham/Sheffield: https://www.clearpathdigital.biz/ — advertises a free website check and a £499 three-page package.
- SME Web Designs, Derby: https://smewebdesigns.com/ — advertises websites from £499 and care from £25/month.
- JigiWeb: https://jigiweb.com/ — advertises websites from £599 and a simple one-off-price process.
- Berlew, Nottingham: https://berlew.co.uk/digital-services/website-design-for-small-businesses/ — advertises one-page small-business sites from £750 and a typical 1–3 week process.
- SetWeb, Nottingham: https://setweb.co.uk/websites — advertises a £249 starter and a £499 brand-led website, with ownership/Google/SEO questions answered clearly.

**Finding:** Do not race to the lowest price. The stronger differentiator for first contact is a useful free manual check, then a tightly scoped £150 Quick Win, backed by visible work and a fixed price.

**Potential friction:** £39/month Website Care is not the cheapest local care price, so the value has to remain concrete. The 6-month and annual options are easy to understand.

### 8. Competitor check

The five pages above were checked on 26 Sep 2026.

What they do well:
- **ClearPath:** a free audit/check is prominent and the £499 package is tightly bounded.
- **SME Web Designs:** low-friction price estimator and very visible entry pricing.
- **JigiWeb:** simple process and reassurance around content/changes.
- **Berlew:** stronger bespoke presentation, work proof and turnaround expectations.
- **SetWeb:** very clear ownership, Google setup, SEO and editing answers, plus a low starter price.

What Maz Works can do differently:
- Lead with a specific business leak rather than “web design”.
- Use JobFilter as evidence that Maz can build beyond brochure sites.
- Keep the £150 Quick Win as the easiest paid first step.
- Make the free manual Leak Check genuinely useful rather than an automated lead-score screen.

### 9. Maintainability

**Problem:** Styles are spread across `globals.css`, `simplified.css`, `clean-pass.css`, `mazworks-friction-pass.css` and other component/resource layers. Later files deliberately override earlier passes. This makes broad visual changes harder to reason about.

**Decision:** I did not consolidate CSS in this pass. A CSS rewrite has lower direct value for the first sale and higher regression risk than making the acquisition path usable. The new page reuses existing classes instead of adding another stylesheet.

**Recommendation:** Once the final visual direction is stable, consolidate one section at a time with the typography/static-export tests protecting the result.

## 4. What you considered and rejected, and why

- **Five niche landing pages now:** rejected. They would be thin/repetitive without unique niche evidence, examples or advice.
- **Separate “common leaks” checklist page:** rejected. The useful checklist is on `/leak-check`; another page would add a click.
- **AI-powered Leak Check:** rejected. The promise is stronger if Maz actually looks at the site, and the repo brief explicitly says not to add AI for appearance.
- **Payment/deposit button:** rejected. No payment-provider decision or approved account/setup was provided, so I did not create a new paid dependency or outward financial flow.
- **Plausible or another analytics product:** rejected. Vercel Analytics is already installed. Adding another vendor before there is traffic adds cost/complexity. Vercel supports custom events, but I did not assume the current account's plan/allowance for them.
- **Large CSS consolidation:** rejected for this pass because it raises regression risk without shortening the path to the first enquiry.
- **Price cuts:** rejected. Current entry prices are within the range advertised by several local competitors; the first experiment should reduce risk and friction, not automatically discount the work.

## 5. Open questions for Maz

1. Can Maz reliably return every free Leak Check **within 2 working days**? If not, change the page before merge.
2. Does Maz want the wording “Nottingham and the East Midlands are the current focus” kept, or should the page stay UK-only even while local outreach is prioritised?
3. After real traffic exists, should the header keep **Free check** as the main CTA, or switch based on which route creates qualified enquiries?

## 6. Known issues or risks you left behind

- The branch is intentionally unmerged for Claude's final review.
- The Leak Check creates a manual fulfilment obligation. If outreach volume grows, Maz needs a repeatable checklist/template so free reviews do not become unpaid consulting work.
- `?src=` is included in the enquiry email but is not a full attribution system. It is intentionally simple.
- No custom Vercel conversion event was added. Existing page-view analytics can show `/leak-check` traffic; submission conversion still needs either a supported custom event or a manual count from enquiries.
- The CSS stack remains layered and override-heavy.
- The current `url.parse()` deprecation warning still appears during CI setup from tooling/dependencies; it did not fail the build.
- I could not produce literal 390px/1440px screenshots from this tool environment. The execution container could not resolve the external site, while the Vercel connector exposes HTML/deployment state rather than a viewport screenshot. I reviewed the responsive CSS and rendered static HTML, but Claude must do the requested real-browser viewport check before merge.

## 7. Test results and screen sizes checked

For branch head before this handback document:

- `npm run typecheck` — **PASS** in GitHub Actions.
- `npm run build` — **PASS**; Next.js exported 18 routes including `/leak-check`.
- `npm test` — **71 tests, 71 passed, 0 failed**.
- `npm run smoke` — **PASS**.
- GitHub required `verify` workflow — **PASS**.
- Vercel branch deployment — **READY**.

Viewport status:
- Responsive source/CSS was explicitly reviewed for **390px-class mobile behaviour** and **1440px-class desktop behaviour**.
- A literal screenshot/render capture at exactly 390px and 1440px was **not completed** because the available execution container could not reach the external site and the Vercel connector does not expose browser viewport screenshots.
- Therefore do **not** mark the visual viewport requirement complete yet. Claude should open the PR preview in a real browser at 390px and 1440px, check for horizontal overflow, form spacing, header wrapping and proof-image cropping, then record the screenshots before merge.

## 8. Top 5 recommendations for Claude's final review, ranked by likely effect on enquiries

1. **Review `/leak-check` as the cold-outreach destination on a real 390px phone viewport.** Remove anything that delays the three-field form or makes the promise less obvious.
2. **Confirm or change the 2-working-day fulfilment promise with Maz.** A clear promise helps conversion only if it can be kept.
3. **Test one complete Leak Check submission on the PR preview and verify the email arrives through the existing delivery path.** Do not merge a lead form that only passes static tests.
4. **Make the smallest possible conversion-measurement addition if Vercel custom events are available on Maz's current plan at no extra cost.** Track Leak Check submit and Book a call clicks; otherwise leave analytics as-is and count enquiries manually.
5. **Do not build niche SEO pages yet.** Use real outreach and Leak Check requests to learn which niche/problem repeats first, then build one genuinely useful landing page around evidence from that pattern.

---

## Claude's final review (26 Sep 2026)

**Verdict:** pass 4 is sound. The dedicated `/leak-check` page, three-field form and header/hero CTA are the right move and are merged with the additions below.

**Checked:** viewport screenshots at 390px and 1440px for `/leak-check` and the new guides (no horizontal scroll, form fully visible on mobile). Typecheck, build and 73 tests pass. The form reuses the proven FormSubmit path (same endpoint, timeout and recovery as the homepage form).

**Added (the items pass 4 rejected, done so they are not thin):**
- `/for/[niche]` guides for salons and beauty, dog groomers, garages, cafes and food, clinics and therapists (`app/for/niches.ts`). Each page carries real problems found on live local sites in September 2026, anonymised, plus a 60-second self-check, the matching fixed prices and a `?src=for-<niche>` Leak Check link. A test fails if any lead's business name appears.
- A "Real examples" section on `/leak-check` linking every guide (the "common leaks" idea, kept on one page).
- Sitemap entries for all five guides.

**Still rejected:** paid analytics events (Vercel custom events need a paid plan; count enquiries by `src` instead), a payment button (Maz can create a free Stripe Payment Link for the £75 deposit; Stripe takes a per-card fee), CSS consolidation (later).

**Maz confirmed (26 Sep):** reply within 5 working days, free, for any UK business. Nottingham-only wording removed; the site serves the whole UK.
