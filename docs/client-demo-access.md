# Maz Works private client demos

## Purpose

`/demos/:slug` is the reusable Maz Works private-demo surface. Dessert Lane is client #1; future clients reuse the same access architecture rather than receiving bespoke password code.

The business outcome is simple: Maz Works can send one private URL + one unique passcode to a prospective or actual client, show a convincing tailored concept, then rotate or revoke access after the sales conversation.

## Runtime architecture

1. Public Maz Works remains a static Next.js export.
2. Vercel rewrites `/demos/:slug` and descendants to `api/demo-gate.js`.
3. The gate shows a Maz Works client-specific passcode screen when no valid session cookie exists.
4. Login/validation/logout are delegated to the Supabase Edge Function `client-demo-access`.
5. Supabase stores client records and hashed opaque sessions.
6. `api/demo-content/index.js` is the protected content registry.
7. Each client has a server-only bundle under `api/demo-content/` keyed by the same slug.
8. HTML, CSS, SVGs and proxied imagery are served only after session validation. Do not put complete private demo HTML in `public/`.

Supabase project: `maz-works-client-demos` (`hkzlsyxcpxcambakdaws`, London / `eu-west-2`).

Default access endpoint:

`https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access`

`SUPABASE_DEMO_ACCESS_URL` can override that endpoint without changing code.

## Data model

### `client_demos`

- `slug` — stable lowercase kebab-case client identifier.
- `business_name` — client/business display name.
- `passcode_hash` — bcrypt hash only; never store or commit plaintext.
- `active` — immediate kill switch.
- `expires_at` — optional demo-level expiry.
- `session_ttl_minutes` — bounded 15–1440 minutes.
- `relationship_status` — internal lifecycle label: `potential`, `active`, `past`, or `internal`.
- `internal_label` — optional human-friendly CRM-style note.

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

Both credential/session tables are server-only:

- RLS enabled.
- all direct privileges revoked from `PUBLIC`, `anon` and `authenticated`.
- CRUD granted only to `service_role`.
- there are intentionally no permissive RLS policies.

Supabase may report INFO notices for "RLS enabled, no policy". That is expected for this default-deny model, not an invitation to add browser access.

The Edge Function is deployed with `verify_jwt = false` intentionally because it performs custom passcode and opaque-session authentication. Its service-role key is available only inside the Supabase runtime and must never be copied into Maz Works browser code or a `NEXT_PUBLIC_` variable.

## Adding a client

1. Decide whether the client is `potential`, `active`, `past`, or `internal`.
2. Choose a stable slug such as `example-cafe`.
3. Create a unique high-entropy demo passcode outside Git.
4. Hash it with bcrypt and insert/update the `client_demos` row through an authorised server/admin path.
5. Set `relationship_status`, `internal_label`, `active`, optional `expires_at`, and session TTL.
6. Add `api/demo-content/<slug>.js` using the same protected route-map contract as Dessert Lane.
7. Register that bundle in `api/demo-content/index.js`.
8. Test no-cookie, wrong-passcode, correct-passcode, cross-slug, expiry, revocation, page and asset paths.
9. Send the client only `https://mazos-site.vercel.app/demos/<slug>` plus their unique passcode.
10. Deactivate or rotate the passcode when access is no longer needed.

Do not add passcodes or bcrypt seeds to migrations, fixtures, GitHub Actions, client JavaScript or documentation.

## Dessert Lane

Dessert Lane is labelled internally as a **potential client** / `Dessert shop prospect`.

Its protected bundle includes:

- tailored website concept at `/demos/dessert-lane`
- Maz Works growth/client kit at `/demos/dessert-lane/kit`
- protected shared CSS
- single-action Google Review Tap concept visual
- three poster directions
- a real Dessert Lane public ordering image proxied server-side through the authenticated gate

The website remains a demo, not a production claim. Final menu/pricing, operating hours, image rights, contact details, direct Google Review URL and owner approval are still required before production launch.

## Required checks before merging a client demo

- no cookie → client-specific gate
- wrong passcode → generic rejection
- correct passcode → opaque session established
- valid token + correct slug → accepted
- same token + another slug → rejected
- expired token → rejected
- revoked token → rejected
- inactive/expired client demo → rejected
- protected page/asset request without valid session → gate, not content
- authenticated root page loads
- authenticated kit page loads
- authenticated CSS/SVG/image asset loads
- existing public Maz Works pages unchanged
- mobile and desktop browser checks

## Production hardening

The current prospect-demo login path uses bcrypt plus generic responses and delay for failed credentials. Before using this system for sensitive customer data or long-lived user accounts, add stronger rate limiting/abuse controls and use generated high-entropy passcodes. This system is for private sales demos, not general-purpose customer authentication.

## Physical-product boundary

The access platform does not change the Dessert Lane physical product decision: the Google Review Tap remains one business, one action, one NFC tag and one large button/tile. Loyalty remains a separate customer-retention flow and must never reward a Google review.
