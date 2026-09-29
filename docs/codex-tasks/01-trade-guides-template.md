# 01 · Architects template to the other five trades

## Goal
Every trade guide should be as concrete as `/for/architects`: illustrations, all three tiers, and a clear route to the free plan. An owner should see their own day in it.

## Files
- `app/for/niches.ts`: data for all six guides (`NICHE_GUIDES`).
- `app/for/[niche]/page.tsx`: the guide template (read it first; the architects page uses `visuals` and `related`).
- `public/<trade>/*.svg`: new illustrations, one folder per trade (see brief 02 for the art).
- `tests/niche-guides.test.mjs`: extend it.

## Do
1. For salons-and-beauty, dog-groomers, garages, cafes-and-food and clinics-and-therapists, give each guide:
   - `fixes` with all three tiers: `starter(...)`, one or two `addOn(...)`, and `system(...)` or `custom(...)`, matching the architects guide.
   - `visuals`: two or three SVGs from brief 02. Captions must say "Illustration made for this page, not client work."
2. Keep the `examples` exactly as they are. They are verified real findings; do not reword the facts.
3. Add a test per guide: three tiers are present, every visual caption says it's illustrative, and every `pick` is a real package or add-on name.

## Acceptance criteria
- Each of the six guides renders visuals and three tiers.
- Every price shown comes from `app/offers.ts` through the helpers.
- `npm run verify` passes. Lighthouse mobile on each guide stays at 95+ perf and 100 accessibility.

## Don't touch
`app/offers.ts`, the homepage, the form, or the `examples` text.
