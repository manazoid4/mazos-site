# 03 · Structured data and social cards

## Goal
Help search engines understand what's sold and where, without claiming anything that isn't true.

## Files
- `app/layout.tsx` and `app/page.tsx`: the homepage already has `ProfessionalService` JSON-LD (see the test "homepage needs ProfessionalService structured data").
- `app/prices/page.tsx`, `app/for/[niche]/page.tsx`, `app/faq/page.tsx`, `app/leak-check/page.tsx`.
- `app/seo.ts` (OG image helper).

## Do
1. `/prices`: one `Service` per package in `OFFERS`, with an `Offer` whose price is read from `app/offers.ts` (strip "From " and "£" in code, never retype). Add `priceCurrency: GBP`.
2. Each `/for/<trade>` page: a `Service` with `areaServed: United Kingdom` and `serviceType` set to the trade name.
3. `/faq`: `FAQPage` built from the same FAQ array the page renders (no extra questions).
4. Check that every page has a unique `<title>` of 60 characters or fewer and a meta description of 155 or fewer. Fix any that don't.
5. Do not add `aggregateRating`, `review`, a street address or a phone number. There are no reviews yet, and Maz's location stays private.

## Acceptance criteria
- Output validates in the Schema.org validator (paste the built HTML).
- A test asserts that the JSON-LD prices match `OFFERS`, and that no `aggregateRating`, `telephone` or `streetAddress` appears.
- `npm run verify` passes.

## Don't touch
Visible copy, prices and the form.
