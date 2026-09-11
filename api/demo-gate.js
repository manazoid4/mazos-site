import crypto from 'node:crypto';

const DEFAULT_ACCESS_URL = 'https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access';
const ACCESS_URL = process.env.SUPABASE_DEMO_ACCESS_URL || DEFAULT_ACCESS_URL;
const MAX_BODY_BYTES = 4096;
const COOKIE_PREFIX = 'mw_demo_';
const REMOTE_IMAGE_HOSTS = new Set(['tb-static.uber.com']);

function cleanSlug(value) {
  const slug = Array.isArray(value) ? value[0] : value;
  return typeof slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 80 ? slug : null;
}

function cleanPath(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string' || raw === '') return '';
  const path = raw.replace(/^\/+|\/+$/g, '');
  return /^[a-z0-9][a-z0-9/_-]*$/.test(path) && path.length <= 160 ? path : null;
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
  const errorHtml = error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : '';
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Private client demo — Maz Works</title><style>*{box-sizing:border-box}body{margin:0;min-height:100svh;background:#f4f3ed;color:#111;font-family:Arial,Helvetica,sans-serif;display:grid;place-items:center;padding:24px}.gate{width:min(100%,540px);border-top:4px solid #111;padding:28px 0}.mark{font-weight:950;letter-spacing:-.05em;font-size:30px}.eyebrow{margin-top:56px;font:700 11px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#686868}h1{font-size:clamp(44px,9vw,76px);line-height:.9;letter-spacing:-.07em;margin:15px 0 22px}.copy{max-width:420px;color:#555;line-height:1.6}form{margin-top:38px;display:grid;gap:12px}label{font-size:12px;font-weight:800}input{min-height:56px;border:2px solid #111;background:#fff;padding:0 15px;font:inherit;border-radius:0}button{min-height:56px;border:2px solid #111;background:#111;color:#fff;font-weight:850;padding:0 18px;cursor:pointer}button:hover{background:#d8ff36;color:#111}.error{margin:8px 0 0;color:#9d1c1c;font-weight:700;font-size:13px}.small{font-size:11px;color:#777;margin-top:22px}</style></head><body><main class="gate"><div class="mark">MAZ WORKS</div><p class="eyebrow">Private client demo</p><h1>Built for the<br>conversation.</h1><p class="copy">Enter the unique passcode Maz Works sent you to open this private concept.</p>${errorHtml}<form method="post" action="/demos/${safeSlug}"><label for="passcode">Demo passcode</label><input id="passcode" name="passcode" type="password" autocomplete="current-password" required maxlength="72"><button type="submit">Open private demo →</button></form><p class="small">Client-specific access · Noindex · Revocable sessions</p></main></body></html>`;
}

function injectDemoExit(html, slug) {
  const safeSlug = escapeHtml(slug);
  const form = `<form method="post" action="/demos/${safeSlug}" aria-label="Exit private demo" style="position:fixed;right:14px;top:14px;z-index:2147483647;margin:0"><input type="hidden" name="action" value="logout"><button type="submit" style="min-height:36px;border:1px solid #111;background:#fff;color:#111;padding:7px 11px;font:700 11px/1.1 Arial,sans-serif;cursor:pointer;box-shadow:2px 2px 0 #111">Exit demo</button></form>`;
  return html.includes('</body>') ? html.replace('</body>', `${form}</body>`) : `${html}${form}`;
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

async function serveRemoteImage(req, res, source) {
  let url;
  try { url = new URL(source); } catch { throw new Error('Invalid protected image URL'); }
  if (url.protocol !== 'https:' || !REMOTE_IMAGE_HOSTS.has(url.hostname)) throw new Error('Protected image host is not allowed');
  const upstream = await fetch(url, { redirect: 'error' });
  if (!upstream.ok) throw new Error(`Protected image returned ${upstream.status}`);
  const type = upstream.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error('Protected image response was not an image');
  res.statusCode = 200;
  res.setHeader('content-type', type);
  setSecurityHeaders(res, 'private, max-age=300');
  return req.method === 'HEAD' ? res.end() : res.end(Buffer.from(await upstream.arrayBuffer()));
}

export default async function handler(req, res) {
  const slug = cleanSlug(req.query?.slug);
  const path = cleanPath(req.query?.path);
  if (!slug || path === null) return sendHtml(res, gateHtml('invalid', 'This demo link is not valid.'), 404, req.method === 'HEAD');

  try {
    if (req.method === 'POST') {
      const raw = await readRawBody(req);
      if (raw === null || Buffer.byteLength(raw) > MAX_BODY_BYTES) return sendHtml(res, gateHtml(slug, 'Access denied.'), 400);
      const params = new URLSearchParams(raw);
      const action = params.get('action') || 'login';

      if (action === 'logout') {
        const token = parseCookies(req.headers.cookie || '')[cookieName(slug)] || '';
        if (token) {
          const logoutResult = await accessRequest({ action: 'logout', slug, token });
          if (!logoutResult.data?.ok) return sendHtml(res, gateHtml(slug, 'Could not end this demo session. Try again.'), 503);
        }
        clearSessionCookie(res, slug);
        res.statusCode = 303;
        res.setHeader('location', `/demos/${slug}`);
        res.setHeader('cache-control', 'no-store');
        return res.end();
      }

      if (action !== 'login') return sendHtml(res, gateHtml(slug, 'Invalid request.'), 400);
      const passcode = params.get('passcode') || '';
      const result = await accessRequest({ action: 'login', slug, passcode });
      if (!result.data?.ok || typeof result.data.token !== 'string') return sendHtml(res, gateHtml(slug, 'That passcode was not accepted.'), result.status === 401 ? 401 : 503);
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

    const token = parseCookies(req.headers.cookie || '')[cookieName(slug)] || '';
    if (!token) return sendHtml(res, gateHtml(slug), 200, req.method === 'HEAD');

    const result = await accessRequest({ action: 'content', slug, token, path });
    if (result.status === 401 || !result.data?.ok && result.status !== 404) {
      clearSessionCookie(res, slug);
      return sendHtml(res, gateHtml(slug, 'Your demo session has expired. Enter the passcode again.'), 401, req.method === 'HEAD');
    }
    if (result.status === 404 || !result.data?.ok) {
      res.statusCode = 404;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      setSecurityHeaders(res);
      return res.end(req.method === 'HEAD' ? undefined : 'Private demo page not found.');
    }

    if (result.data.contentType === 'application/x-mazworks-remote-image') return await serveRemoteImage(req, res, result.data.body);

    res.statusCode = 200;
    res.setHeader('content-type', result.data.contentType || 'text/plain; charset=utf-8');
    setSecurityHeaders(res);
    if (req.method === 'HEAD') return res.end();
    const body = String(result.data.body ?? '');
    return res.end((result.data.contentType || '').startsWith('text/html') ? injectDemoExit(body, slug) : body);
  } catch (error) {
    console.error('demo-gate failed', error instanceof Error ? error.message : 'unknown error');
    return sendHtml(res, gateHtml(slug, 'The private demo service is temporarily unavailable.'), 503, req.method === 'HEAD');
  }
}
