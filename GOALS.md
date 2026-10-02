# Maz Works site: goals

**North star: more paid jobs per week with less of Maz's time.**
Every change must help a visitor understand, trust or buy faster, or help Maz reply, quote or deliver faster. If it doesn't, it doesn't ship.

| # | Goal | Done when | Where it's tracked |
|---|---|---|---|
| 1 | **Clear offer.** A visitor sees their problem, the fix, the price and what's included. | A trades owner, a salon owner and a creator each find their problem, price and what's included, and reach the main action in 2 taps or fewer. | Prices only in `app/offers.ts`; pricing rules in `docs/maz-works/OFFER-V11.md` |
| 2 | **Trust without fake proof.** Real work, plain promises, no invented results. | Every claim on the site can be checked; demo businesses are clearly labelled demos; real case studies added as permission comes in. | `AGENTS.md` rules, case studies in `/work/*` |
| 3 | **One easy first step.** Free Plan & Fixed Quote is the single main action everywhere. | One main button on every page; a test enquiry arrives in the inbox with its source. | `/free-plan`, enquiry form |
| 4 | **Fast reply, fast quote.** Maz answers within one working day with a consistent plan and price. | A test enquiry becomes a drafted free plan Maz can send in about 2 minutes. | Sales engine (plan v3, block C) |
| 5 | **Leads worked every week.** Owners contacted by name through the right route, followed up once. | Gold and Silver leads each have a HubSpot task, pitch note and one follow-up. | Private leads repo + HubSpot (never in this repo) |

## Rules that never change
- Maz Works builds the systems small businesses run on: automation, connected tools and custom software that win customers and take admin off the owner. **Not** a website-fix shop.
- Lead with outcomes: more enquiries become customers, less chasing, hours back.
- No AI in the offer; it may be used behind the scenes, never sold.
- Never invent testimonials, clients or results. Never publish Maz's location, personal email or phone; the public contact is info@mazworks.uk.
- Offers and prices live only in `app/offers.ts`. Branch + PR, never push to main.

## Not doing (cut on purpose)
Funnel tracking (skipped by Maz, 2 Oct 2026). "Unlimited changes". Narrowing the site to one niche.

How to work on this repo: [`PLAYBOOKS.md`](PLAYBOOKS.md) · agent rules: [`AGENTS.md`](AGENTS.md) · latest session: [`docs/maz-works/SESSION-HANDOVER.md`](docs/maz-works/SESSION-HANDOVER.md)
