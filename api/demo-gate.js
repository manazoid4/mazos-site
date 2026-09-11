import crypto from 'node:crypto';
import { getDemoContent, getDemoDefinition } from './demo-content/index.js';

const DEFAULT_ACCESS_URL = 'https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access';
const ACCESS_URL = process.env.SUPABASE_DEMO_ACCESS_URL || DEFAULT_ACCESS_URL;
const MAX_BODY_BYTES = 4096;
const COOKIE_PREFIX = 'mw_demo_';

function cleanSlug(value) {
  const slug = Array.isArray(value) ? value[0] : value;
  return typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 80 ? slug : null;
}

function cookieName(slug) {
  return `${COOKIE_PREFIX}${crypto.createHash('sha256').update(slug).digest('hex').slice(0, 16)}`;
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
    const at = part.indexOf('=');
    return at < 0 ? [part, ''] : [part.slice(0, at), decodeURIComponent(part.slice(at + 1))];
  }));
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function gateHtml(slug, error = '') {
  const safeSlug = escapeHtml(slug);
  const demo = getDemoDefinition(slug);
  const businessName = demo?.businessName ? escapeHtml(demo.businessName) : 'your business';
  const errorHtml = error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : '';
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${businessName} — private Maz Works demo</title><style>*{box-sizing:border-box}body{margin:0;min-height:100svh;background:#f5f5ef;color:#111;font-family:Arial,Helvetica,sans-serif;display:grid;place-items:center;padding:24px}.gate{width:min(100%,520px);border-top:4px solid #111;padding:28px 0}.mark{font-weight:900;letter-spacing:-.04em;font-size:28px}.eyebrow{margin-top:54px;font:700 11px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase;color:#666}h1{font-size:clamp(42px,9vw,72px);line-height:.92;letter-spacing:-.065em;margin:15px 0 20px}.copy{max-width:410px;color:#565656;line-height:1.55}form{margin-top:36px;display:grid;gap:12px}label{font-size:12px;font-weight:800}input{min-height:54px;border:2px solid #111;background:#fff;padding:0 15px;font:inherit;border-radius:0}button{min-height:54px;border:2px solid #111;background:#111;color:#fff;font-weight:800;padding:0 18px;cursor:pointer}button:hover{background:#cbff00;color:#111}.error{margin:8px 0 0;color:#9d1c1c;font-weight:700;font-size:13px}.small{font-size:11px;color:#777;margin-top:22px}</style></head><body><main class="gate"><div class="mark">MAZ WORKS</div><p class="eyebrow">Private client demo · ${businessName}</p><h1>Built for the<br>conversation.</h1><p class="copy">Enter the unique passcode Maz Works sent you to open this private concept and proposal.</p>${errorHtml}<form method="post" action="/demos/${safeSlug}"><label for="passcode">Demo passcode</label><input id="passcode" name="passcode" type="password" autocomplete="current-password" required maxlength="72"><button type="submit">Open private demo →</button></form><p class="small">Private concept · Noindex · Client-specific access · Access can be revoked</p></main></body></html>`;
}

function setSecurityHeaders(res, cacheControl = 'private, no-store, max-age=0') {
  res.setHeader('cache-control', cacheControl);
  res.setHeader('x-robots-tag', 'noindex, nofollow');
  res.setHeader('x-content-type-options', 'nosniff');
}

function sendHtml(res, html, status = 200, headOnly = false) {
  res.statusCode = status;
  res.setHeader('content-type', 'text/html; charset=utf-8');
  setSecurityHeaders(res);
  return headOnly ? res.end() : res.end(html);
}

async function readRawBody(req) {
  if (typeof req.body === 'string') return req.body;
  if (req.body && typeof req.body === 'object') return new URLSearchParams(req.body).toString();
  let raw = '';
  for await (const chunk of req) {
    raw += chunk.toString();
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return null;
  }
  return raw;
}

async function accessRequest(payload) {
  const response = await fetch(ACCESS_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'error',
  });
  const data = await response.json().catch(() => ({ ok: false }));
  return { status: response.status, data };
}

function setSessionCookie(res, slug, token, maxAgeSeconds) {
  const name = cookieName(slug);
  const maxAge = Math.max(0, Math.min(Number(maxAgeSeconds) || 0, 86400));
  res.setHeader('set-cookie', `${name}=${encodeURIComponent(token)}; Path=/demos/${slug}; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`);
}

function clearSessionCookie(res, slug) {
  const name = cookieName(slug);
  res.setHeader('set-cookie', `${name}=; Path=/demos/${slug}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
}

async function serveProtectedContent(req, res, slug) {
  const content = getDemoContent(slug, req.query?.path);
  if (!content) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    setSecurityHeaders(res);
    return res.end(req.method === 'HEAD' ? undefined : 'Private demo page not found.');
  }

  if (content.remote) {
    const upstream = await fetch(content.remote, { redirect: 'error' });
    if (!upstream.ok) throw new Error(`Protected asset upstream returned ${upstream.status}`);
    const type = upstream.headers.get('content-type') || content.type || 'application/octet-stream';
    if (!type.startsWith('image/')) throw new Error('Protected remote asset was not an image');
    res.statusCode = 200;
    res.setHeader('content-type', type);
    setSecurityHeaders(res, 'private, max-age=300');
    if (req.method === 'HEAD') return res.end();
    return res.end(Buffer.from(await upstream.arrayBuffer()));
  }

  res.statusCode = 200;
  res.setHeader('content-type', content.type || 'text/plain; charset=utf-8');
  setSecurityHeaders(res);
  return req.method === 'HEAD' ? res.end() : res.end(content.body);
}

export default async function handler(req, res) {
  const slug = cleanSlug(req.query?.slug);
  if (!slug) return sendHtml(res, gateHtml('invalid', 'This demo link is not valid.'), 404, req.method === 'HEAD');

  try {
    if (req.method === 'POST') {
      const raw = await readRawBody(req);
      if (raw === null || Buffer.byteLength(raw) > MAX_BODY_BYTES) return sendHtml(res, gateHtml(slug, 'Access denied.'), 400);
      const params = new URLSearchParams(raw);
      const passcode = params.get('passcode') || '';
      const result = await accessRequest({ action: 'login', slug, passcode });
      if (!result.data?.ok || typeof result.data.token !== 'string') {
        return sendHtml(res, gateHtml(slug, 'That passcode was not accepted.'), result.status === 401 ? 401 : 503);
      }
      setSessionCookie(res, slug, result.data.token, result.data.maxAgeSeconds);
      res.statusCode = 303;
      res.setHeader('location', `/demos/${slug}`);
      res.setHeader('cache-control', 'no-store');
      return res.end();
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405;
      res.setHeader('allow', 'GET, HEAD, POST');
      return res.end('Method not allowed');
    }

    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies[cookieName(slug)] || '';
    if (!token) return sendHtml(res, gateHtml(slug), 200, req.method === 'HEAD');

    const result = await accessRequest({ action: 'validate', slug, token });
    if (!result.data?.ok) {
      clearSessionCookie(res, slug);
      return sendHtml(res, gateHtml(slug, 'Your demo session has expired. Enter the passcode again.'), 401, req.method === 'HEAD');
    }

    return await serveProtectedContent(req, res, slug);
  } catch (error) {
    console.error('demo-gate failed', error instanceof Error ? error.message : 'unknown error');
    return sendHtml(res, gateHtml(slug, 'The private demo service is temporarily unavailable.'), 503, req.method === 'HEAD');
  }
}
