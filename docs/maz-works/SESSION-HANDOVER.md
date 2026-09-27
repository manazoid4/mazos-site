# Maz Works: latest session handover (public copy)

This repo is public. The full handover, open to-dos and research source names live in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` and `ARCHITECTS-CONTEXT-PACK-2026-09-27.md`.

## 27 Sep 2026 — Offer v9: ManyPets-style clarity, consistent prices
Maz asked for the Google profile, website page and training prices to come down and for every service to be explained as clearly as ManyPets explains its insurance. The homepage now has a side-by-side "Compare packages" table (same rows for each package, plain answers), four short promise blocks (fixed price first, half now half when it works, no contracts, no VAT), add-ons grouped under Win and keep customers / Get found and trusted / Less admin / Help for your team, and a "What's not included" list. New prices: Google Business Profile setup £49, single website page £145, team training £39 (one-hour call plus a written guide). Consistency rules in `app/offers.ts`: standard add-ons can be bought alone; Extra automation only adds a second job to a package; the weekly report is included free in a Business System.

## 27 Sep 2026 — Offer v8 + architects test shipped

Claude session `01KHHDcykQuZunqoEKFvr7a5` completed through PR #74 before its limit was hit. Offer v8 is the current source of truth: Starter Automation £195, Business System from £795, Custom Software & Websites from £1,950, Keep It Running £19/month, with scoped optional add-ons; AI may be used behind the scenes but is never advertised or sold.

PR #75 is merged to `main` as `6467a46331766bc48f80859a8b9c25f0903f1ccb`. It adds `/for/architects` through the existing `NICHE_GUIDES` system using anonymised observations from live UK architecture-practice websites, maps the fixes onto Offer v8, and adds one restrained `Architecture & property` use case to Maz Works Objects for simple concept/massing/site/presentation models from suitable files, optionally linked by QR/tap. There is no claim that Maz has already produced an architectural model, no separate architect pricing, no new brand and no homepage architecture section.

The first protected CI run caught one useful issue: the Objects page reached 936 words against its existing 900-word budget. The new architect copy was shortened instead of weakening the guard; the second run passed typecheck, dependency audit, static build/export, all deterministic HTML/link tests and smoke, and Vercel also passed. Tests keep current Offer v8 prices, anonymity and physical-product truth limits enforced.

### Next agent
- Read `AGENTS.md`, current `app/offers.ts`, and the private architect context pack first; do not work from Offer v7 or older handoffs.
- Treat PR #75 as complete. Do not rebuild the architects page or broaden it into a print bureau, separate architecture brand, homepage section or new pricing model.
- If Maz wants to validate the physical angle, the next proof is one clearly labelled fictional/concept architectural demo linked to one project page — not a catalogue.
- Keep the main priority on first-client acquisition and the existing open sales/outreach to-dos.

### Standing guardrails
Maz Works remains a systems/automation/custom-software business for UK small businesses and teams, with websites and physical objects as routes inside the offer. Never invent clients, results or testimonials; never publish Maz's location, personal email or phone; never advertise AI; and use branch + PR rather than pushing directly to `main`.
