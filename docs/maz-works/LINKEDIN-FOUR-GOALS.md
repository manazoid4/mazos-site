# Four site goals: LinkedIn visitors to enquiries

1. **Build trust with real work.** Link JobFilter (own product) and the specialist finance website (client build) directly from `/linkedin`, without invented results.
2. **Give creators a clear next step.** Link the Brand Kit from the LinkedIn introduction and read its price from `app/offers.ts`.
3. **Make the offer clear before a call.** Explain the two-month changes boundary in a disclosure and repeat the one-working-day reply promise beside the written-plan option.
4. **Keep the original LinkedIn source.** Carry the profile, Featured, company or post label into the call URL and through Brand Kit to the enquiry form, preserving its package and fragment.

## Verification

`npm run verify`: typecheck, production static export, 108 tests and smoke checks pass.

The source tests cover all five accepted LinkedIn tags, preservation of package/hash, and unrelated or unrecognised inputs. Native links remain useful without JavaScript; detailed source preservation is a JavaScript enhancement. No tracking cookies or storage were added.

Browser evidence is in `docs/evidence/linkedin-four-goals/`. The check covers 390, 768, 1280 and 1440 pixels, both changed pages, disclosure, campaign links and the no-JavaScript fallback. No real enquiry was submitted and no call was booked. Attribution in completed calendar bookings and real inbox delivery has not been independently verified by this change.

## Measure after publication

Compare LinkedIn-sourced qualified enquiries and booked calls against the previous period. Keep profile, Featured and post sources separate. No conversion increase is claimed before data exists. Vercel custom-event reporting requires a paid plan; source tags on enquiry requests do not require that upgrade.

## Maz: next steps

Review the PR preview, especially `/linkedin` on a phone, then merge when satisfied. Use the tagged profile, Featured and post links in `LINKEDIN-FUNNEL.md`. Share the missing LinkedIn screenshots to complete the account audit; provide the personal LinkedIn URL for the separate profile-link follow-up.
