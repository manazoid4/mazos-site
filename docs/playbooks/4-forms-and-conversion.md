# 4. Forms, funnels and conversion

## The forms
- Free plan form `/leak-check` (`app/leak-check/leak-check-form.tsx`): 2 steps. Step 1 is tap-to-pick problems (`QUICK_PICKS`), an optional note and an optional website or Instagram. Step 2 is name and email. It works without JavaScript (native post).
- Contact form (`app/demo-request-form.tsx`, on `/contact`): name, email, what you need. Everything else sits under "Optional details". Service ids live in `app/enquiry.ts`; they are stable deep-link keys, so add, never rename.
- Delivery: `api/enquiry.js` sends an instant confirmation through Resend with FormSubmit as the fallback. Tests: `tests/enquiry*.test.mjs`. Do not promise an auto-reply in the success message unless proven.
- Links pre-fill the form: `?package=<name>` (only real package or add-on names, see `KNOWN_PACKAGES`), `?trade=<id>` (a niche id, `creator` or `other`), `?src=<channel>`.

## Rules for any form change
- Fewer fields beats more fields. Name, email and the job are enough.
- Never ask for something a creator may not have, such as a website. Say "if you have one".
- Fail safe: a failed send keeps the text and offers email; a double click sends once.
- After a change, send a real test enquiry with your own email and confirm the confirmation arrives.

## Funnel and tracking
- One call to action everywhere: free plan and price, or book the 15-minute call (`BOOKING_URL` in `app/site.ts`).
- Tag every channel link with `?src=` (linkedin, brand-kit, for-hub) so leads show where they came from.
- LinkedIn round trip: `/linkedin` is the one page for Maz's profile, Featured section and first comments (noindex). The homepage About has a Connect button to LinkedIn; the footer links the company page (`LINKEDIN_URL`). Copy pack: `docs/maz-works/LINKEDIN-FUNNEL.md`.
- Visibility: unique titles and descriptions, schema in `service-schema.tsx`, complete sitemap, one canonical per page.
- The sticky call to action shows only after the hero and hides near the form.
