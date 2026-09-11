import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [gate, edge, schema, vercel] = await Promise.all([
  readFile(new URL('../api/demo-gate.js', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/functions/client-demo-access/index.ts', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/client-demo-schema.sql', import.meta.url), 'utf8'),
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
]);

test('client demo routes are isolated behind the server gate', () => {
  assert.match(vercel, /"source": "\/demos\/:slug"/);
  assert.match(vercel, /"destination": "\/api\/demo-gate\?slug=:slug"/);
  assert.match(vercel, /"source": "\/demos\/:slug\/:path\*"/);
});

test('demo cookie is opaque, secure, HttpOnly and scoped to the client slug', () => {
  assert.match(gate, /HttpOnly; Secure; SameSite=Lax/);
  assert.match(gate, /Path=\/demos\/\$\{slug\}/);
  assert.match(gate, /crypto\.createHash\('sha256'\)\.update\(slug\)/);
  assert.doesNotMatch(gate, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(gate, /NEXT_PUBLIC_.*SERVICE/i);
});

test('validated demos fail closed until protected content is installed', () => {
  assert.match(gate, /Protected client assets are deliberately served by this function/);
  assert.match(gate, /Private demo content bundle is not installed on this deployment yet/);
  assert.doesNotMatch(gate, /public\/demos/i);
});

test('database credential and session tables are default-deny to browser roles', () => {
  assert.match(schema, /enable row level security/i);
  assert.match(schema, /revoke all on table public\.client_demos from public, anon, authenticated/i);
  assert.match(schema, /revoke all on table public\.client_demo_sessions from public, anon, authenticated/i);
  assert.match(schema, /grant select, insert, update, delete on table public\.client_demos to service_role/i);
  assert.doesNotMatch(schema, /insert into public\.client_demos/i);
  assert.doesNotMatch(schema, /crypt\(['"]password['"]/i);
});

test('edge service stores only token hashes and binds validation to slug, expiry and revocation', () => {
  assert.match(edge, /crypto\.subtle\.digest\('SHA-256'/);
  assert.match(edge, /token_hash: tokenHash/);
  assert.match(edge, /session\.revoked_at/);
  assert.match(edge, /new Date\(session\.expires_at\)\.getTime\(\) <= Date\.now\(\)/);
  assert.match(edge, /demo\.slug !== slug/);
  assert.match(edge, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(edge, /NEXT_PUBLIC_/);
});

test('unknown, inactive and incorrect credentials share the same public denial', () => {
  const denialCount = edge.split("return json({ ok: false, error: 'Access denied' }, 401);").length - 1;
  assert.ok(denialCount >= 4);
  assert.match(edge, /await new Promise\(\(resolve\) => setTimeout\(resolve, 250\)\)/);
});
