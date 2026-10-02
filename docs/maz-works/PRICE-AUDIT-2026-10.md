# Price audit and Offer v12 (2 Oct 2026)

Maz asked for three things. First, creator pricing and website pricing should make sense together. Second, no customer should find our services cheaper elsewhere. Third, more value, and a walk through the whole site as a customer would see it. Source of truth for every number: `app/offers.ts`.

## 1. What didn't add up (v11)

| Problem a customer would spot | v11 | v12 |
|---|---|---|
| Creator £149 got five things; business £149 got one job | Creator Starter: DM job + link-in-bio + 5 templates + covers | Same **Starter £149** for everyone: one job + **2 free set-ups**. The creator version is "Starter for creators" (comment-to-get-it + profile tidy + link everywhere) |
| One page with brand look = £595 for creators only; a business wanting one page had to buy a £1,495 website | Creator Launch £595 vs Website from £1,495 (no brand) | **Launch Page £595 for any business or creator**. **Website = Launch Page + 4 more pages**, from £1,495 (would be £1,775 bought as Launch Page + 4 × £295) |
| Business System looked dearer than its parts (3 × £149 = £447 vs £595) | Explainer said so on /prices | System now adds team training, 3 set-ups and a month of Keep It Running free. **Bought one by one: £773, package from £595** |
| /what-we-do "How it works" told people to book a call; every button says "no call needed" | Demo path | Free-plan steps (Day 0 → Day 7); demo is a side link |
| /demos repeated "90-day fix promise" twice | | Fixed |

No headline package price changed: £149, £595, £1,495, £2,450, £39/£149 a month all stay.

## 2. Can they get it cheaper elsewhere? (checked 2 Oct 2026)

Short answer: **some pieces, yes, and nobody can stop that.** The tools are free. What can't be bought cheaper is the whole job, done, joined up, guaranteed, and owned. Prices are converted at $1 = £0.75 (approximate). Items marked unverified couldn't be confirmed on the seller's page.

| Our item | Cheapest alternative found | Verdict |
|---|---|---|
| £49 one-day set-ups | DIY free: Calendly free, Google review link, Canva, WhatsApp Business. Fiverr Google profile gigs exist (price unverified) | **Exposed** on their own. v12 gives them free inside every package |
| Starter £149 | Fiverr GoHighLevel missed-call set-up $45/$120/$245 ([gig](https://www.fiverr.com/oluwole_miro/set-up-gohighlevel-missed-call-text-back-voicemail-and-follow-up-automation)), usually locks the client into a monthly platform. UK missed-call service £59/month ([Hand On Web](https://www.handonweb.com/missed-call-text-back), checked) | **Partly exposed.** We win on own-it-once, 30-day money-back, 90-day fix, UK, and now 2 free set-ups |
| Creator Starter £149 | Stan Store Creator $29/month does auto-DM + lead magnet ([stan](https://help.stan.store/article/31-creator-vs-creator-pro)); ManyChat Essential $14/month; ManyChat's free limit is disputed (25 vs 1,000 contacts) | **Exposed.** We win on the list being in their name, no platform fee, and set-ups included |
| Business System £595 | GoHighLevel partners $850 set-up + $38.80/month ([source](https://gohighlevel.partners/)); Jobber Grow about $199/month | **Safe.** Cheaper and owned |
| Launch Page £595 | Carrd Pro $19/year + Stripe; Stan Creator Pro $99/month | **Partly exposed** on tools; the copy, brand tidy and launch posts are the value |
| Website £1,495 | £299 one-page trade sites (tradewebsite.uk); pay-monthly trade sites £97/month ([tradiesite.co.uk](https://tradiesite.co.uk/), checked) = £3,492 over 3 years; UK agency estimates £3,700–£8,600 ([opace](https://opace.agency/blog/small-business-website-cost-uk/)) | **Partly exposed** at the very bottom; safe against agencies and pay-monthly. Own-vs-rent table now shows the 3-year sum |
| Custom £2,450 | UK contractor median £525/day ([itjobswatch](https://www.itjobswatch.co.uk/contracts/uk/software%20developer.do)) = 4.7 days | **Safe**, priced under market |
| Care £39 / £149 a month | UK care plans £29–£379, mostly £40–£99 ([jamiegrand](https://jamiegrand.co.uk/blog/website-maintenance-cost-uk)) | **Safe** |

## 3. What changed on the site (v12, draft PR)

- `/prices`: two lanes (Automation; Pages and websites). Each package card shows **"Bought one by one: £…"** with the parts listed. The own-vs-rent table gains a website row: £1,495 once vs about £3,492 over 3 years at £97 a month.
- Every package includes free one-day set-ups (Starter 2, Launch Page 2, Business System 3; Website includes the Launch Page's plus the Google listing and review QR card).
- Business System also includes team training and a first month of Keep It Running.
- `/for/creators`: "Starter for creators" and "Launch Page", same prices as everyone.
- FAQ, enquiry form options and schema follow `app/offers.ts`.

## 4. Decisions (approved by Maz, 2 Oct, all built)

1. **UK price match** (built, `PRICE_MATCH`): "Found the same done-for-you job cheaper from a UK business? Send me the quote. I'll match it, or tell you plainly what's different." Strong trust signal; fence it to UK businesses, same scope, one-off price.
2. **£49 set-ups no longer sold on their own.** They're the most undercut item. Now free in every package (two with a Starter or Launch Page, three with a Business System), £49 each beyond that. The ladder is Free → Starter £149 → Business System from £595 → Custom from £2,450.
3. **Extra automation £99** (was £145), so adding jobs feels generous. The example plan is now £149 + £99 = £248.
