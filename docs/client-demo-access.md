# Maz Works private client demos

## Purpose

`/demos/:slug` is the reusable Maz Works private-demo surface. Dessert Lane is client #1; future clients reuse the same access and content architecture rather than receiving bespoke password code.

The operating model is simple: Maz Works sends one private URL + one unique passcode to a prospective or actual client, shows a tailored working concept, then rotates, expires or revokes access when required.

## Runtime architecture

1. Public Maz Works remains a static Next.js export.
2. Vercel rewrites `/demos/:slug` and descendants to `api/demo-gate.js`.
3. The generic gate shows a Maz Works passcode screen when no valid client session exists.
4. Login, validation, protected content and logout are delegated to the Supabase Edge Function `client-demo-access`.
5. Supabase stores client metadata, bcrypt passcode hashes, hashed opaque sessions and protected page/asset content.
6. Client-specific HTML/CSS/content is **not committed to the public Maz Works repository**.
7. The Vercel gate requests one protected path from Supabase only after presenting the client session token.
8. Remote imagery can be proxied only through an explicit server-side hostname allowlist.
9. Complete private demo HTML must never be placed in `public/` or browser-readable configuration.

Supabase project: `maz-works-client-demos` (`hkzlsyxcpxcambakdaws`, London / `eu-west-2`).

Default access endpoint:

`https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access`

`SUPABASE_DEMO_ACCESS_URL` can override that endpoint without changing code.

## Data model

### `client_demos`

- `slug` — stable lowercase kebab-case client identifier.
- `business_name` — business display name.
- `passcode_hash` — bcrypt hash only; never store or commit plaintext.
- `active` — immediate kill switch.
- `expires_at` — optional demo-level expiry.
- `session_ttl_minutes` — bounded 15–1440 minutes.
- `relationship_status` — `potential`, `active_client`, `former_client`, `internal_demo`, or `archived`.
- `industry` — optional client category.
- `internal_label` — optional human-friendly CRM-style label.

### `client_demo_sessions`

- stores a SHA-256 hash of the random opaque browser token, never the token itself.
- belongs to exactly one client demo.
- has explicit expiry and optional revocation timestamp.

### `client_demo_content`

- belongs to exactly one client demo.
- `path` maps the protected path after `/demos/<slug>/`.
- `content_type` controls the authenticated response type.
- `body` stores the protected HTML/CSS/text or a server-only remote-image source.
- browser roles have no direct access.

## Browser session

The Vercel gate sets a per-client cookie:

- `HttpOnly`
- `Secure`
- `SameSite=Lax`
- path-scoped to `/demos/<slug>`
- maximum age capped at 24 hours

A token valid for one slug must not grant access to another slug.

## Database access model

All three private tables are server-only:

- RLS enabled.
- all direct privileges revoked from `PUBLIC`, `anon` and `authenticated`.
- CRUD granted only to `service_role`.
- intentionally no permissive RLS policies.

Supabase therefore reports informational `RLS enabled, no policy` notices. That is expected for this default-deny design.

The Edge Function uses `verify_jwt = false` intentionally because it performs custom passcode and opaque-session authentication. The service-role key exists only inside the Supabase runtime and must never be copied into Maz Works browser code or a `NEXT_PUBLIC_` variable.

## Adding a client

1. Choose a lifecycle label: `potential`, `active_client`, `former_client`, `internal_demo` or `archived`.
2. Choose a stable slug such as `example-cafe`.
3. Create a unique high-entropy demo passcode outside Git.
4. Hash it with bcrypt through an authorised admin/server path and create the `client_demos` row.
5. Set business name, lifecycle label, industry, internal label, expiry and session TTL.
6. Add protected root/page/assets to `client_demo_content` for that client ID.
7. Keep client-specific source out of the public Maz Works repository.
8. Test no-cookie, wrong-passcode, correct-passcode, cross-slug, expiry, revocation, page and asset paths.
9. Send only `https://mazos-site.vercel.app/demos/<slug>` plus the unique passcode.
10. Rotate/deactivate the credential or archive the demo when it is no longer needed.

Do not add passcodes or bcrypt seeds to migrations, fixtures, GitHub Actions, client JavaScript or documentation.

## Dessert Lane

Dessert Lane is labelled `potential`, industry `dessert shop`, with an internal prospect label.

Its private Supabase bundle includes:

- tailored website concept at `/demos/dessert-lane`
- full Maz Works growth/client kit at `/demos/dessert-lane/kit`
- separate interactive loyalty scaffold at `/demos/dessert-lane/loyalty`
- protected responsive CSS
- genuine public Dessert Lane ordering imagery proxied through the authenticated gate
- single-action Google Review Tap presentation
- three campaign/poster directions
- explicit ready-now vs owner/physical-action boundaries

The website is a high-fidelity sales/demo scaffold, not a production claim. Final menu/pricing, operating hours, image rights, contact details, direct Google Review URL and owner approval remain production inputs.

## Required checks before merging a client demo

- no cookie → generic Maz Works gate; protected client content is not returned
- wrong passcode → generic rejection
- correct passcode → opaque session established
- valid token + correct slug → accepted
- same token + another slug → rejected
- expired token → rejected
- revoked token → rejected
- inactive/expired client demo → rejected
- authenticated root page loads
- authenticated kit/other protected pages load
- authenticated CSS/image assets load
- unknown protected route → 404
- existing public Maz Works pages unchanged
- mobile and desktop browser checks

## Production hardening

This is prospect/client demo authentication, not customer-account authentication. Before storing sensitive customer information behind it, add stronger abuse/rate controls and reassess the threat model. Use generated high-entropy passcodes for actual client demos.

## Physical-product boundary

The platform does not change the physical-product decision: Dessert Lane's Google Review Tap remains one business, one action, one NFC tag and one large button/tile. Loyalty remains a separate retention flow and must never reward a Google review.
