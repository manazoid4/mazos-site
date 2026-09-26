# Maz Works: handoff for the next agent (pass 3, 26 Sep 2026)

Repo: `manazoid4/mazos-site` · Live: https://www.mazworks.uk · Read `AGENTS.md` first, then the private handover `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md`.

## Your job
Audit the live site on desktop and phone, then improve it hard where it's justified: clarity, conversion, trust, visual quality, mobile, accessibility, performance, CSS clean-up. You may redo layout, order, wording and styling. Keep the decisions below unless you find a real bug or conflict.

## Decisions Maz has confirmed (keep these)
- **Broad offer.** Small fixes through to full rebuilds, plus anything that gets a business more customers. Six routes: Websites, Full rebuilds, More customers, Automation, Software, Physical products. Never shrink it to "a website guy" or three outcomes.
- **Hero:** "I fix what's costing your business time, customers, or money." From £150, fixed price.
- **Prices:** Quick Win £150 fixed (£75 to start, £75 on completion). Website Launch from £299 (up to 4 pages, phone-ready, contact form, Google basics, domain connected, one revision, client owns it). Growth System from £499 (website plus one growth or automation job, e.g. mailing list, reviews, booking reminders). Full rebuilds are quoted after a free call (no "from" price yet; ask Maz before publishing one).
- **Website Care:** £39/month, £210 for 6 months, £360 for a year. Never write "founding rate" or similar. Keep it minimal.
- **Proof:** real screenshots. JobFilter is the big primary proof (`public/jobfilter-home.webp` + `-mobile.webp`, captured from the live jobfilter.uk homepage). Scrap Finance Partners is smaller and secondary, shown only as a client website.
- **Business Leak Check:** a no-AI problem chooser on the homepage that routes into the enquiry form with `?service=`. Keep it cheap and simple.
- **Public email:** `info@mazworks.uk`. The FormSubmit delivery address stays separate (`FORM_DELIVERY_EMAIL` in `app/site.ts`); don't break it.
- **Less friction, less copy.** One line in the form is enough; no call required.

## What pass 3 changed
- Replaced the weak JobFilter screenshot (an empty scan showing "Matches 0") with the live jobfilter.uk homepage, desktop and phone.
- Rewrote all 9 FAQs to be short and plain. Homepage shows 4: cost, what £299 gets, ownership, no call needed.
- Shortened the Leak Check options to plain phrases ("Something is broken", "I want more customers", "Not sure, help me").
- Trimmed Website Launch and Website Care copy.
- Homepage down from 842 to 769 words; the word budget test is now 780 (was 820).
- Tests updated to lock in: JobFilter proof before Scrap Finance, £39/£210/£360, and no "founding" anywhere.

## Ideas worth testing (your call)
1. Six routes plus the Leak Check overlap. Consider merging them into one "What's the problem?" chooser.
2. The live JobFilter homepage has an animated badge that overlaps the headline in the screenshot. A cleaner capture (or a scan result with real matches) would look more premium.
3. Website Care: show the saving plainly ("£35/month paid 6-monthly, £30/month paid yearly") if it reads better.
4. The CSS has several layers (`globals`, `simplified`, `clean-pass`, `mazworks-friction-pass`). Consolidate once the look is settled.
5. Add conversion tracking (form submit, Book a call click) so later decisions use data.

## Hard rules
Never invent testimonials, clients, revenue, customer counts or results. Scrap Finance Partners is unpaid: never call it paid work. JobFilter has published prices but no paying customers. Physical products are unvalidated concepts: don't imply units have shipped. Keep unfinished work labelled unfinished. Never put lead data in this public repo. Work on a branch with a PR, never push to main. Run `npm run typecheck`, `npm run build` and `npm test` before pushing.
