# Sales engine (plan v3, C9–C12), 2 Oct 2026

## Enquiry → quote → follow-up (one screen)

**1. It arrives.** Email to info@mazworks.uk from the form: source (`src` tag), package, type, headaches, plus the **Draft reply (approve, tweak, send)**. Create or check the HubSpot contact (tier in the company name) and a Task "Reply to enquiry" due within the reply time (`CHECK_REPLY_TIME`, 1 working day).

**2. Reply with the free plan.** Paste the draft into Gmail (From: info@mazworks.uk), tweak one line, send inside the reply time. One job, one package, one price, from `app/offers.ts` only.

**3. Scope sheet with a fixed price.** Open `/scope-sheet?package=...&jobs=...&business=...` (add `&extras=` for add-ons), save as PDF, send with the plan. Log the quoted package and price on the HubSpot contact.

**4. Follow up once, after 3 days, by the next route.** Email unanswered → LinkedIn message to the owner (or a checked call). Log it as a HubSpot Task. No second follow-up. Note: the site's scheduled follow-up emails (C12) are separate and only run when switched on.

**5. Close or park.** Yes: send the scope sheet's next steps, set lead status to Customer, tag the source. No reply or "not now": set lead status `Unqualified` or `Not now`, add a re-check Task in 60 days, move on.

**Log where:** HubSpot Task per step (reply, scope sheet, follow-up, re-check); the `src` tag, package and quoted price in the contact note. Never lead data in this public repo.

Four pieces that make Maz reply, quote and close faster. All deterministic code; prices only from `app/offers.ts`.

## C9. Free-plan autopilot (live in the form)
`app/free-plan/draft.ts` turns what the visitor tapped (type, headaches, package) into a drafted reply: recipe, price, jobs, what to leave alone, always-included, guarantee, day-numbered next steps, costs they pay directly. The form sends it as `draft`; the enquiry email to info@mazworks.uk ends with **"Draft reply (approve, tweak, send)"**. Maz pastes it into Gmail (From: info@mazworks.uk, Email rule), tweaks one line, sends. Target: ≤2 minutes.

## C10. Scope sheet generator (live)
`/scope-sheet?package=Starter%20Automation&jobs=missed-call&trade=trades&business=Hollybank%20Plumbing` renders a one-page scope sheet from offers.ts: built / not built / when / changes / guarantee / always included / next steps / paying. **Print or save as PDF** button. Add `&extras=Review%20QR%20card` for add-ons. Noindexed. Send the link or the PDF with every plan.

## C11. Buy now (needs Maz: Stripe)
`BUY_LINKS` in `app/offers.ts` is empty, so no "Buy now" button shows yet. To switch on:
1. Stripe → Payment links → create one for Starter Automation (£149), Creator Starter (£149), One-day set-up (£49).
2. Success URL: `https://www.mazworks.uk/start?package=Starter%20Automation` (same for the others).
3. Paste the links into `BUY_LINKS`. Cards on /prices and type pages show **Buy now** automatically; `/start` collects the intake with the same form.
Stripe fee ~1.5% + 20p per UK card payment; no monthly cost.

## C12. HubSpot sync + follow-ups (needs Maz: two env vars in Vercel)
In `api/enquiry.js`, after the owner email is accepted:
- `HUBSPOT_TOKEN` (private app, scope `crm.objects.contacts.write`): upserts the contact by email with first/last name, website, lifecycle `lead`, lead status `NEW`, and the message (problem, package, type, source) in the standard `message` property. Maz adds the `🥇 GOLD ·` naming and tier by hand as per the HubSpot standard.
- `FOLLOW_UP_EMAILS=on`: schedules three short follow-ups through Resend (`scheduled_at`: in 2, 5 and 9 days; subjects "Did my plan land?", "One question", "Leaving this with you"). From info@mazworks.uk, reply-to the same. If the person replies, cancel the remaining ones in the Resend dashboard (Emails → scheduled). Note: this is the site's transactional sender; cold outreach still goes only from Gmail (Email rule).
Both are no-ops without the env vars and can never fail the enquiry.

## Not built (skipped by Maz, 2 Oct)
Funnel tracking (E16).
