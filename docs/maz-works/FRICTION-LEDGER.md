# Friction ledger: conversion redesign v1 (2 Oct 2026)

**Sources:**
- A "before" snapshot of `main` at commit 9527c85: 34 routes at 360, 390, 430 and 1280px, with Lighthouse and an automatic contrast crawl.
- One combined buyer-lens review: sceptical owner, eight mystery shoppers, copy, offer clarity and a deletion pass.
- Earlier research reused rather than repeated: `PRICE-AUDIT-2026-10.md` and the private 15-competitor teardown.

**Ship:** now = built in this branch · later = next round · never = rejected.

## Healthy already (keep)

- **Engineering:** 0 console errors and 0 sideways scroll on all 34 routes at 4 widths. Light-mode text contrast passes on 10 key pages (automatic crawl).
- **Lighthouse (mobile):** Performance 96–99, Accessibility 96–100, Best Practices 100, SEO 100. JS is 152–160 KB per route.
- **Main action:** "Get my free plan" is the only main button label.

## P0: blocks understanding, trust or the enquiry

| # | Page | Problem | Evidence | Affected | Fix | Effort | Conf. | Ship |
|---|---|---|---|---|---|---|---|---|
| 1 | /demos, /linkedin, /faq | The site says "no call needed", then asks for a call first | /demos: "A short call first"; /linkedin step 1 "Book a 15-minute call"; FAQ "before you book a call" | Everyone from LinkedIn | Free plan first everywhere. /demos is reframed as "bigger build? see a preview first". /linkedin uses the free-plan steps | S | High | now |
| 2 | Every "Or see a free demo first" link | £149 buyers are sent to a page that says small jobs don't get a demo | /demos: "Smaller jobs get a written plan instead" | Starter buyers | The secondary link becomes "See how it works" (the on-page demo). The /demos link stays only for bigger builds | S | High | now |
| 3 | 6 niche guides | "Real examples" and the "60-second check" are broken-website findings. They make Maz look like a website-repair shop, against the positioning rule | "Lorem ipsum… The fix: Enquiries →" | Garages, salons, groomers, cafés, clinics, architects | Delete both sections. The guide leads with problem → task → price | S | High | now |
| 4 | Site-wide | "Job" means a paid job to a tradesperson and one automation to Maz | "Start with one job from £149" next to "booked jobs" | Trades | An automation unit is called a **task** in all customer copy | M | High | now |
| 5 | Niche guides | A second task shows at £149, but on /prices it's Extra automation £99 | "Another job: Quote follow-up · £149" | Anyone comparing pages | The second card reads "Add a second task · £99" from `offers.ts` | S | High | now |
| 6 | /prices tiles | The animated tiles start invisible: a 1.67:1 contrast fail mid-animation, and nothing to read at rest | Lighthouse color-contrast on `.ex-tile` | Everyone on /prices | Delete the tile row (the £773 value line says it better) | S | High | now |
| 7 | /prices | Strike-through "Bought one by one ~~£773~~" reads as a former price. UK pricing guidance expects a struck-out price to be a genuine former price. It also clashes with "set-ups aren't sold alone" | `<s>£773</s>` | Everyone | Reword to "Worth £773 at add-on prices", with no strike-through | S | High | now |

## P1: meaningful improvement

| # | Page | Problem | Fix | Effort | Conf. | Ship |
|---|---|---|---|---|---|---|
| 8 | /prices | A visitor who only wants a website sees a 4-step automation ladder first; websites are 4 screens down | Add a "What do you need?" chooser at the top: stop chasing / somewhere to send people / something built for you, with each price | M | High | now |
| 9 | /prices | Two things cost £595 (Launch Page, Business System) | The chooser says which is which | S | High | now |
| 10 | Site-wide | One product goes by many names ("Salon System", "Trades Starter", "Members area", "Creator Launch" on /demos) | Always use the offer name from `offers.ts`, with the trade as a subtitle; fix `DEMO_STEPS` | M | High | now |
| 11 | /for/* first screen | No price and no person on the first screen | Line under the hero button: "Free plan, no call. Most start with one task at £149. Manazir builds it himself." | S | High | now |
| 12 | /for/* | Common objections unanswered: landline? text costs? my app already does it? what if you're not around? | A "Straight answers" block of four lines, said once and reused | S | High | now |
| 13 | /faq | No answer to "what if you're ill or stop trading?"; Q05 and Q06 overlap | Add the question; merge the overlap | S | High | now |
| 14 | / | An owner drowning in admin sees front-of-house problems only | Add "Chasing invoices" and "Paperwork and forms" to the tap options | S | Med | now |
| 15 | /what-we-do | No main button on the first screen | Add it | S | High | now |
| 16 | / hero | Headline is abstract ("Systems that…") | Outcome headline (below) | S | Med | now |
| 17 | /prices | 8 folds, several repeating each other (compare, kinds of work, builder) | Cut the "Four kinds of work" fold; keep the rest folded | S | Med | now |
| 18 | Colour | Rainbow pills cycle by position, so colour means nothing | Dropped by Maz (2 Oct): no colour or dark-mode work; money and customer service first | – | – | never |
| 19 | /for/appointments | A groomer or physio is shown a salon ("Salon System", "Willow Room Salon") | Neutral names | S | High | now |
| 20 | /for/offices | Solicitors and accountants will ask about data handling | Needs Maz's real answer; never invented | – | – | later (question for Maz) |

## P2: polish or experiment

| # | Item | Ship |
|---|---|---|
| 21 | "Fix" wording ("The fix:", "Every fix for trades", "3 fixes") becomes "What I'd set up" or "Start here" | now (where touched) |
| 22 | /prices free-plan row "send 3 fixes" becomes "a plan, what to leave alone, and a fixed price" | now |
| 23 | Grammar: "Starter for creators's" | now |
| 24 | Creator jargon ("keyword DM", "funnel", "welcome series") gets a plain example | now (creator recipe text) |
| 25 | Guarantee wording "hasn't run on a real customer" | never without Maz (approved commitment) |
| 26 | "(Swansea)" in the trust line: a university, not where Maz lives | kept; flagged to Maz |
| 27 | Custom web font for character | later: today's system stack keeps LCP low; test on a real phone first |

## Rejected ideas

- **Colour system and dark mode.** Built, then dropped on Maz's call (2 Oct): it doesn't make money. Light-mode contrast already passes.
- **Countdown, scarcity, logo walls, "trusted by".** Fake pressure; banned by the brief.
- **Splitting the free-plan form into more steps.** It is already 2 steps; extra steps add friction.
- **Lowering prices.** Out of scope; v12 is approved.
