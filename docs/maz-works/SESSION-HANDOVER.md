# Maz Works: latest session handover (public copy)

This repo is public, so this copy carries no lead names, contact details or lead actions. The full handover, with Maz's open to-dos and the lead work, is in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md`. Read that first.

Standard practice: before a session ends with work open, overwrite the private `HANDOVER.md` (4 sentence summary, Maz's open to-dos, next work), then update this public copy with only what is safe to publish.

## 27 Sep 2026 — privacy fix
Maz's town was removed from the site, schema, share image and docs, and the form endpoint now uses FormSubmit's private alias instead of a personal email address. Never publish Maz's location, personal email or phone (see AGENTS.md); a test now fails the build if any exported page contains them.

## 27 Sep 2026 — sales overhaul (homepage as a single-purpose sales page)

### Summary
The homepage was rebuilt for one buyer, a UK small business losing bookings or enquiries, with one way in (the free Booking & Enquiry Check form, now on the homepage itself) and one main paid offer (the £395 Repair, with the £249 Google setup and £595 bundle beside it). Added a trust strip (Manazir, UK-wide, fixed price, No VAT added, 7-working-day guarantee), real anonymised findings, a clearly labelled fictional example check report, a sticky phone CTA, ProfessionalService schema, a new share image and local-search meta titles; the second enquiry form moved to `/contact` (with Website Launch and Full Rebuild prices), and side projects, Objects and the newsletter moved to `/lab`. The free-check reply promise changed from 5 to 3 working days everywhere via one constant (`CHECK_REPLY_TIME` in `app/site.ts`); Maz chose 3 on 27 Sep. Typecheck, build, 79/79 tests and smoke pass; Lighthouse on the new build is 99/100/100/100 on mobile for `/` and `/leak-check`, with no horizontal overflow at 390px or 1440px.

### Open goals
- **Reply to every free check within 3 working days**; that is now a public promise.
- **Vercel custom events** (`Check submitted`, `Enquiry sent`, `Call clicked`, `Pricing viewed`) are wired in `app/analytics.tsx` but only appear in the dashboard on a paid Vercel plan; on Hobby they are silently dropped. Until then, count check emails in Gmail; each carries a `Source` line (`direct (homepage)`, `direct (leak-check)` or the `?src=` tag).
- **Add a real photo of Maz** to the "I'm Manazir" section when one is available; no photo is in the repo today.
- The private sales kit that turns a delivered check into a paid repair should match the example report layout on the homepage.

### Guardrails
Unchanged: never invent clients, results or testimonials; the example report is fictional and labelled so; the "real problems I found" list lives in `app/real-findings.ts` and must only hold observed findings. Scrap Finance Partners stays labelled as a client website, JobFilter as Maz's own product.

---

## 26 Sep 2026 — Offer v5

### Summary
The old £150 Quick Win was judged not worth paying for, so the whole commercial offer was rebuilt as "Offer v5": Booking & Enquiry Repair (£395, primary) and Google Profile & Contact Setup (£249), with both together at £595, replacing Quick Win, the Growth System and Website Care entirely. Every priced offer now carries a written guarantee, "No VAT added", and a £40 referral thank-you for any introduction that becomes a paying client. Positioning widened to all UK small businesses customers book, call or enquire with, not a niche-first or region-limited launch. PR #65 covers the site changes: typecheck, build and the full test suite (75/75) pass, and 390px/1440px screenshots show no horizontal overflow.

### Open goals
- **Get the PR merged once CI is green**, then watch for the first real quote sent under the new pricing.
- **Goal A remains the first paying client.** The Repair and Setup offers, the free check and the Live Customer Walkthrough are the funnel; track it in the private pipeline tracker.
- **Do not build thin niche pages yet.** The `/for/*` guides got a one-line "not your trade?" note instead of new pages — let real outreach show what repeats before adding more.

### Guardrails
Never invent clients, results or testimonials. Scrap Finance Partners remains an unpaid client website and JobFilter has no paying customers. Physical Objects remain unvalidated concepts; no tap stand has been printed or sold. Never put lead data here. Branch + PR, never push to main. Outreach only from Gmail as info@mazworks.uk, never Resend. Read `AGENTS.md` and the private `spine/projects/mazworks-site/HANDOVER.md` before the next pass.

---

## 26 Sep 2026 — pass 4 acquisition handover

### Summary
Pass 4 focused the next site change on first-client acquisition rather than another general redesign. PR #63 adds a dedicated `/leak-check` page with a three-field form, makes the free Leak Check the primary homepage/header route, preserves the broad Maz Works offer and confirmed pricing, and reuses the existing resilient enquiry delivery rather than adding another service. Research covered mobile owners, trust, CRO, local SEO, design, accessibility, pricing, current Nottingham/East Midlands competitors and CSS maintainability; the full findings and Claude review brief are in `docs/maz-works/HANDBACK-TO-CLAUDE.md`. Automated typecheck/build/tests/smoke passed on the code change; the remaining pre-merge checks are a real-browser 390px/1440px visual pass and one end-to-end Leak Check delivery test.

### Open goals
- **PR #63 remains open.** Claude should complete the real-browser visual check, verify one Leak Check submission reaches the inbox, review the two-working-day promise with Maz, then fix or merge as appropriate.
- **Goal A remains the first paying client.** The new `/leak-check` route is designed to be a simple URL for calls, cold email, DMs and LinkedIn without copying private lead data into this repo.
- **Do not build thin niche pages yet.** Let real outreach show which niche/problem repeats, then make one useful page backed by evidence.
- **Measure before redesigning again.** Existing Vercel Analytics can show page visits; add conversion events only if they are supported on the current plan without an unwanted cost.

### Guardrails
Never invent clients, results or testimonials. Scrap Finance Partners remains an unpaid client website and JobFilter has no paying customers. Physical Objects remain unvalidated concepts. Never put lead data here. Keep Maz Works broader than a website agency. Branch + PR, never push to main. Outreach only from Gmail as info@mazworks.uk, never Resend. Read `AGENTS.md`, the private `spine/projects/mazworks-site/STATUS.md` and `docs/maz-works/HANDBACK-TO-CLAUDE.md` before the next pass.
