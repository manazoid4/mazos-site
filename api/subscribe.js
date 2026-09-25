// Mailing-list signup. Forwards one email address to a HubSpot form so each
// subscriber lands in the CRM as a contact, next to the leads.
//
// Runs server-side so the page keeps its same-origin CSP, the form still works
// without JavaScript (a plain POST gets a redirect back), and the honeypot is
// checked before anything reaches HubSpot. Neither ID below is a secret: HubSpot
// publishes both in the form's own embed code.
const HUBSPOT_PORTAL_ID = '149409285';
const HUBSPOT_FORM_ID = process.env.HUBSPOT_NEWSLETTER_FORM_ID || '';
const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/`;
const MAX_BODY_BYTES = 2048;
const TIMEOUT_MS = 10000;

// Deliberately loose: the goal is to reject typos and junk, not to be an RFC.
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseBody(raw, type = '') {
  if (type.includes('application/json')) {
    try { return JSON.parse(raw) ?? {}; } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

function wantsJson(req) {
  return (req.headers.accept || '').includes('application/json');
}

function reply(req, res, status, result) {
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.setHeader('x-content-type-options', 'nosniff');
  if (wantsJson(req)) {
    res.statusCode = status;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(result));
  }
  // No JavaScript: send the visitor back to the form with the outcome in the URL.
  res.statusCode = 303;
  res.setHeader('location', `/?subscribed=${result.ok ? '1' : '0'}#newsletter`);
  return res.end();
}

export async function submitToHubSpot(email, pageUri, fetchImpl = fetch) {
  if (!HUBSPOT_FORM_ID) return { ok: false, reason: 'unconfigured' };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetchImpl(`${SUBMIT_URL}${HUBSPOT_FORM_ID}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
        context: { pageUri, pageName: 'Maz Works mailing list' },
      }),
      signal: controller.signal,
    });
    return response.ok ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: controller.signal.aborted ? 'timeout' : 'network' };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res, fetchImpl = fetch) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('allow', 'POST');
    return res.end();
  }

  let body;
  try {
    body = parseBody(await readBody(req), req.headers['content-type']);
  } catch {
    return reply(req, res, 413, { ok: false, reason: 'too-large' });
  }

  // Honeypot: real visitors never see this field, so anything in it is a bot.
  // Report success so the bot has nothing to learn from, and send nothing on.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return reply(req, res, 200, { ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email)) return reply(req, res, 400, { ok: false, reason: 'invalid-email' });

  const result = await submitToHubSpot(email, 'https://www.mazworks.uk/', fetchImpl);
  return reply(req, res, result.ok ? 200 : 502, result);
}
