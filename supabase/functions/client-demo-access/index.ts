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

async function login(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const passcode = typeof body.passcode === 'string' ? body.passcode : '';
  if (!slug || !passcode || encoder.encode(passcode).byteLength > MAX_PASSCODE_BYTES) {
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  const { data: demo, error } = await admin
    .from('client_demos')
    .select('id,slug,business_name,passcode_hash,active,expires_at,session_ttl_minutes')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;

  // Unknown, inactive, expired and wrong-passcode attempts are intentionally indistinguishable.
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

  const { error: insertError } = await admin.from('client_demo_sessions').insert({
    client_demo_id: demo.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (insertError) throw insertError;

  return json({
    ok: true,
    token,
    expiresAt,
    maxAgeSeconds: ttlMinutes * 60,
    businessName: demo.business_name,
  });
}

async function validate(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const token = typeof body.token === 'string' ? body.token : '';
  if (!slug || !token || token.length > MAX_TOKEN_CHARS) {
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  const tokenHash = await sha256Hex(token);
  const { data: session, error: sessionError } = await admin
    .from('client_demo_sessions')
    .select('client_demo_id,expires_at,revoked_at')
    .eq('token_hash', tokenHash)
    .maybeSingle();
  if (sessionError) throw sessionError;

  if (!session || session.revoked_at || new Date(session.expires_at).getTime() <= Date.now()) {
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  const { data: demo, error: demoError } = await admin
    .from('client_demos')
    .select('slug,business_name,active,expires_at')
    .eq('id', session.client_demo_id)
    .maybeSingle();
  if (demoError) throw demoError;

  if (!demo || demo.slug !== slug || !demoIsAvailable(demo)) {
    return json({ ok: false, error: 'Access denied' }, 401);
  }

  return json({ ok: true, businessName: demo.business_name });
}

async function logout(admin: ReturnType<typeof getAdminClient>, body: Record<string, unknown>) {
  const slug = normalizeSlug(body.slug);
  const token = typeof body.token === 'string' ? body.token : '';
  if (!slug || !token || token.length > MAX_TOKEN_CHARS) return json({ ok: true });

  const tokenHash = await sha256Hex(token);
  const { data: session } = await admin
    .from('client_demo_sessions')
    .select('id,client_demo_id')
    .eq('token_hash', tokenHash)
    .maybeSingle();

  if (session) {
    const { data: demo } = await admin.from('client_demos').select('slug').eq('id', session.client_demo_id).maybeSingle();
    if (demo?.slug === slug) {
      await admin.from('client_demo_sessions').update({ revoked_at: new Date().toISOString() }).eq('id', session.id);
    }
  }

  return json({ ok: true });
}

// This function intentionally accepts unauthenticated HTTP requests. It performs
// its own passcode + opaque-session authentication and never exposes the service key.
Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  try {
    const body = await readBody(req);
    if (!body) return json({ ok: false, error: 'Invalid request' }, 400);

    const admin = getAdminClient();
    switch (body.action) {
      case 'login':
        return await login(admin, body);
      case 'validate':
        return await validate(admin, body);
      case 'logout':
        return await logout(admin, body);
      default:
        return json({ ok: false, error: 'Invalid request' }, 400);
    }
  } catch (error) {
    console.error('client-demo-access failed', error instanceof Error ? error.message : 'unknown error');
    return json({ ok: false, error: 'Service unavailable' }, 503);
  }
});
