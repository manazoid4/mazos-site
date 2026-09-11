# Maz Works private client demos

## Purpose

`/demos/:slug` is the reusable Maz Works private-demo surface. Dessert Lane is client #1; future clients reuse the same access architecture rather than receiving bespoke password code.

The business outcome is simple: Maz Works can share a polished private concept with a prospective client while keeping demos isolated, revocable and easy to retire.

## Runtime architecture

1. Public Maz Works remains a static Next.js export.
2. Vercel rewrites `/demos/:slug` and descendants to `api/demo-gate.js`.
3. The gate shows a Maz Works passcode screen when no valid session cookie exists.
4. Login/validation/logout are delegated to the Supabase Edge Function `client-demo-access`.
5. Supabase stores client records and hashed opaque sessions.
6. Protected client content is served only after session validation. Do not put complete private demo HTML in `public/`.

Supabase project: `maz-works-client-demos` (`hkzlsyxcpxcambakdaws`, London / `eu-west-2`).

Default access endpoint:

`https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access`

`SUPABASE_DEMO_ACCESS_URL` can override that endpoint without changing code.

## Data model

### `client_demos`

- `slug` — stable lowercase kebab-case client identifier.
- `business_name` — display name returned after successful access.
- `passcode_hash` — bcrypt hash only; never store or commit plaintext.
- `active` — immediate kill switch.
- `expires_at` — optional demo-level expiry.
- `session_ttl_minutes` — bounded 15–1440 minutes.

### `client_demo_sessions`

- stores a SHA-256 hash of the random opaque browser token, never the token itself.
- belongs to exactly one client demo.
- has explicit expiry and optional revocation timestamp.

## Browser session

The Vercel gate sets a per-client cookie:

- `HttpOnly`
- `Secure`
- `SameSite=Lax`
- path-scoped to `/demos/<slug>`
- maximum age capped at 24 hours

A token valid for one slug must not grant access to another slug.

## Database access model

Both credential/session tables are in `public` but are server-only:

- RLS enabled.
- all direct privileges revoked from `PUBLIC`, `anon` and `authenticated`.
- CRUD granted only to `service_role`.
- there are intentionally no permissive RLS policies.

This produces Supabase advisor INFO notices for "RLS enabled, no policy". That is expected for this default-deny model, not an invitation to add browser access.

The Edge Function is deployed with `verify_jwt = false` intentionally because it performs custom passcode and opaque-session authentication. Its service-role key is available only inside the Supabase runtime and must never be copied into Maz Works browser code or a `NEXT_PUBLIC_` variable.

## Adding a client

1. Choose a stable slug.
2. Create a strong temporary demo passcode outside Git.
3. Hash it with bcrypt and insert/update the `client_demos` row through an authorised server/admin path.
4. Set `active`, optional `expires_at`, and session TTL.
5. Add the protected content bundle keyed by the same slug.
6. Test no-cookie, wrong-passcode, correct-passcode, cross-slug, expiry and revocation paths.
7. Send the prospect only the `/demos/<slug>` URL and passcode.
8. Deactivate or rotate the passcode after the sales conversation if access is no longer needed.

Do not add passcodes or bcrypt seeds to migrations, fixtures, GitHub Actions, client JavaScript or documentation.

## Dessert Lane

Operational row exists for `dessert-lane` with a 12-hour session TTL. The demo-only credential is managed operationally in Supabase, not in the repository.

The protected Dessert Lane website bundle is intentionally still fail-closed until the real private source assets are copied from the local Dessert Lane worktree. Do not replace missing real imagery with fabricated client assets or expose the complete HTML under a public static path.

## Required checks before merging a client demo

- no cookie → gate
- wrong passcode → generic rejection
- correct passcode → opaque session established
- valid token + correct slug → accepted
- same token + another slug → rejected
- expired token → rejected
- revoked token → rejected
- inactive/expired client demo → rejected
- protected asset request without a valid session → rejected
- existing public Maz Works pages unchanged
- mobile and desktop browser checks

## Production hardening

The current prospect-demo login path uses bcrypt plus generic responses and delay for failed credentials. Before using this system for sensitive customer data or long-lived user accounts, add stronger rate limiting/abuse controls and use generated high-entropy passcodes. This system is for private sales demos, not general-purpose customer authentication.

## Physical-product boundary

The access platform does not change the Dessert Lane physical product decision: the Google Review Tap remains one business, one action, one NFC tag and one large button/tile. Loyalty remains a separate customer-retention flow and must never reward a Google review.
