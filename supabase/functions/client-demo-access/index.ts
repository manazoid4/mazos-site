import { createClient } from 'npm:@supabase/supabase-js@2.116.0';
import bcrypt from 'npm:bcryptjs@3.0.3';

const encoder = new TextEncoder();
const MAX_BODY_BYTES = 4096;
const MAX_PASSCODE_BYTES = 72;
const MAX_TOKEN_CHARS = 256;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0',
      'x-content-type-options': 'nosniff',
    },
  });
}

function getAdminClient() {
  const url = Deno.env.get('SUPABASE_URL') ?? '';
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  if (!url || !key) throw new Error('Supabase server credentials are unavailable');
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

function normalizeSlug(value: unknown) {
  if (typeof value !== 'string') return null;
  const slug = value.trim().toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 80 ? slug : null;
}

function normalizeContentPath(value: unknown) {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value !== 'string') return null;
  const path = value.trim().replace(/^\/+|\/+$/g, '');
  if (!path) return '';
  return /^[a-z0-9][a-z0-9/_-]*$/.test(path) && path.length <= 160 ? path : null;
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

function demoIsAvailable(demo: { active: boolean; expires_at: string | null }) {
  if (!demo.active) return false;
  if (!demo.expires_at) return true;
  return new Date(demo.expires_at).getTime() > Date.now();
}

async function readBody(req: Request) {
  const announcedLength = Number(req.headers.get('content-length') ?? '0');
  if (announcedLength > MAX_BODY_BYTES) return null;
  const raw = await req.text();
  if (encoder.encode(raw).byteLength > MAX_BODY_BYTES) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function lookupDemo(admin: ReturnType<typeof getAdminClient>, slug: string) {
  const { data, error } = await admin
    .from('client_demos')
    .select('id,slug,business_name,passcode_hash,active,expires_at,session_ttl_minutes,relationship_status,industry')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function validateSession(admin: ReturnType<typeof getAdminClient>, slug: string, token: string) {
  const tokenHash = await sha256Hex(token);
  const { data: session, error: sessionError } = await admin
    .from('client_demo_sessions')
    .select('client_demo_id,expires_at,revoked_at')
    .eq('token_hash', tokenHash)
    .maybeSingle();
  if (sessionError) throw sessionError;
  if (!session || session.revoked_at || new Date(session.expires_at).getTime() <= Date.now()) return null;

  const { data: demo, error: demoError } = await admin
    .from('client_demos')
    .select('id,slug,business_name,active,expires_at,relationship_status,industry')
    .eq('id', session.client_demo_id)
    .maybeSingle();
  if (demoError) throw demoError;
  if (!demo || demo.slug !== slug || !demoIsAvailable(demo)) return null;
  return demo;
}

async function login(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const passcode = typeof body.passcode === 'string' ? body.passcode : '';
  if (!slug || !passcode || encoder.encode(passcode).byteLength > MAX_PASSCODE_BYTES) return json({ ok: false, error: 'Access denied' }, 401);

  const demo = await lookupDemo(admin, slug);
  if (!demo || !demoIsAvailable(demo)) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  const matches = await bcrypt.compare(passcode, demo.passcode_hash);
  if (!matches) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const ttlMinutes = Math.min(Math.max(Number(demo.session_ttl_minutes) || 720, 15), 1440);
  const expiresAt = new Date(Date.now() + ttlMinutes * 60_000).toISOString();
  const { error: insertError } = await admin.from('client_demo_sessions').insert({ client_demo_id: demo.id, token_hash: tokenHash, expires_at: expiresAt });
  if (insertError) throw insertError;

  return json({ ok: true, token, expiresAt, maxAgeSeconds: ttlMinutes * 60, businessName: demo.business_name, relationshipStatus: demo.relationship_status, industry: demo.industry });
}

async function validate(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const token = typeof body.token === 'string' ? body.token : '';
  if (!slug || !token || token.length > MAX_TOKEN_CHARS) return json({ ok: false, error: 'Access denied' }, 401);
  const demo = await validateSession(admin, slug, token);
  if (!demo) return json({ ok: false, error: 'Access denied' }, 401);
  return json({ ok: true, businessName: demo.business_name, relationshipStatus: demo.relationship_status, industry: demo.industry });
}

async function content(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const token = typeof body.token === 'string' ? body.token : '';
  const path = normalizeContentPath(body.path);
  if (!slug || !token || token.length > MAX_TOKEN_CHARS || path === null) return json({ ok: false, error: 'Access denied' }, 401);
  const demo = await validateSession(admin, slug, token);
  if (!demo) return json({ ok: false, error: 'Access denied' }, 401);

  const { data: page, error } = await admin
    .from('client_demo_content')
    .select('content_type,body')
    .eq('client_demo_id', demo.id)
    .eq('path', path)
    .maybeSingle();
  if (error) throw error;
  if (!page) return json({ ok: false, error: 'Not found' }, 404);

  return json({ ok: true, contentType: page.content_type, body: page.body, businessName: demo.business_name, relationshipStatus: demo.relationship_status, industry: demo.industry });
}

async function logout(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const token = typeof body.token === 'string' ? body.token : '';
  if (!slug || !token || token.length > MAX_TOKEN_CHARS) return json({ ok: true });

  const tokenHash = await sha256Hex(token);
  const { data: session, error: sessionError } = await admin
    .from('client_demo_sessions')
    .select('id,client_demo_id')
    .eq('token_hash', tokenHash)
    .maybeSingle();
  if (sessionError) throw sessionError;
  if (!session) return json({ ok: true });

  const { data: demo, error: demoError } = await admin
    .from('client_demos')
    .select('slug')
    .eq('id', session.client_demo_id)
    .maybeSingle();
  if (demoError) throw demoError;
  if (demo?.slug !== slug) return json({ ok: true });

  const { error: updateError } = await admin
    .from('client_demo_sessions')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', session.id);
  if (updateError) throw updateError;

  return json({ ok: true });
}

// Public endpoint by design: passcode/session authentication is implemented here.
Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
  try {
    const body = await readBody(req);
    if (!body) return json({ ok: false, error: 'Invalid request' }, 400);
    const admin = getAdminClient();
    switch (body.action) {
      case 'login': return await login(admin, body);
      case 'validate': return await validate(admin, body);
      case 'content': return await content(admin, body);
      case 'logout': return await logout(admin, body);
      default: return json({ ok: false, error: 'Invalid request' }, 400);
    }
  } catch (error) {
    console.error('client-demo-access failed', error instanceof Error ? error.message : 'unknown error');
    return json({ ok: false, error: 'Service unavailable' }, 503);
  }
});
