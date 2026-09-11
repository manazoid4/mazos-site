import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const [gate, edge, schema, contentMigration, lifecycleMigration, vercel] = await Promise.all([
  readFile(new URL('../api/demo-gate.js', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/functions/client-demo-access/index.ts', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/client-demo-schema.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260911213954_create_client_demo_content.sql', import.meta.url), 'utf8'),
  readFile(new URL('../supabase/migrations/20260911213929_add_client_demo_lifecycle_labels.sql', import.meta.url), 'utf8'),
  readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
]);

async function pathMissing(relative) {
  try {
    await stat(new URL(relative, import.meta.url));
    return false;
  } catch (error) {
    if (error?.code === 'ENOENT') return true;
    throw error;
  }
}

test('client demo routes are isolated behind one generic server gate', () => {
  assert.match(vercel, /"source": "\/demos\/:slug"/);
  assert.match(vercel, /"destination": "\/api\/demo-gate\?slug=:slug"/);
  assert.match(vercel, /"source": "\/demos\/:slug\/:path\*"/);
  assert.doesNotMatch(gate, /DESSERT LANE|dessertlanenottz|Lenton Boulevard/i);
});

test('client-specific protected bundles are not committed to the public website repository', async () => {
  assert.equal(await pathMissing('../api/demo-content/dessert-lane.js'), true);
  assert.equal(await pathMissing('../api/demo-content/index.js'), true);
  assert.doesNotMatch(gate, /public\/demos/i);
});

test('demo cookie is opaque, secure, HttpOnly and scoped to the client slug', () => {
  assert.match(gate, /HttpOnly; Secure; SameSite=Lax/);
  assert.match(gate, /Path=\/demos\/\$\{slug\}/);
  assert.match(gate, /crypto\.createHash\('sha256'\)\.update\(slug\)/);
  assert.doesNotMatch(gate, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(gate, /NEXT_PUBLIC_.*SERVICE/i);
});

test('protected content is requested only with an opaque session token', () => {
  assert.match(gate, /action: 'content', slug, token, path/);
  assert.match(gate, /if \(!token\) return sendHtml\(res, gateHtml\(slug\)/);
  assert.match(edge, /async function content/);
  assert.match(edge, /validateSession\(admin, slug, token\)/);
  assert.match(edge, /from\('client_demo_content'\)/);
  assert.match(edge, /\.eq\('client_demo_id', demo\.id\)/);
  assert.match(edge, /\.eq\('path', path\)/);
});

test('database credential, session and protected-content tables are default-deny to browser roles', () => {
  assert.match(schema, /enable row level security/i);
  assert.match(schema, /revoke all on table public\.client_demos from public, anon, authenticated/i);
  assert.match(schema, /revoke all on table public\.client_demo_sessions from public, anon, authenticated/i);
  assert.match(contentMigration, /alter table public\.client_demo_content enable row level security/i);
  assert.match(contentMigration, /revoke all on table public\.client_demo_content from public, anon, authenticated/i);
  assert.match(contentMigration, /grant select, insert, update, delete on table public\.client_demo_content to service_role/i);
  assert.doesNotMatch(schema, /insert into public\.client_demos/i);
  assert.doesNotMatch(schema, /crypt\(['"]password['"]/i);
});

test('lifecycle labels support reusable prospect and client management', () => {
  assert.match(lifecycleMigration, /relationship_status text not null default 'potential'/i);
  assert.match(lifecycleMigration, /'potential','active_client','former_client','internal_demo','archived'/i);
  assert.match(lifecycleMigration, /industry text/i);
  assert.match(lifecycleMigration, /internal_label text/i);
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
  assert.match(edge, /setTimeout\(resolve, 250\)/);
});

test('remote protected imagery is restricted to an explicit allowlist', () => {
  assert.match(gate, /REMOTE_IMAGE_HOSTS = new Set\(\['tb-static\.uber\.com'\]\)/);
  assert.match(gate, /url\.protocol !== 'https:'/);
  assert.match(gate, /!REMOTE_IMAGE_HOSTS\.has\(url\.hostname\)/);
  assert.match(gate, /type\.startsWith\('image\/'\)/);
});
