import demoGate from './demo-gate.js';

function mockResponse() {
  const headers = new Map();
  return {
    statusCode: 200,
    body: undefined,
    setHeader(name, value) { headers.set(String(name).toLowerCase(), value); },
    getHeader(name) { return headers.get(String(name).toLowerCase()); },
    end(body) { this.body = body; return this; },
    headers,
  };
}

async function run(method, query, headers = {}, body) {
  const req = { method, query, headers, body };
  const res = mockResponse();
  await demoGate(req, res);
  return res;
}

function asText(body) {
  if (body == null) return '';
  return Buffer.isBuffer(body) ? body.toString('utf8') : String(body);
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-robots-tag', 'noindex, nofollow');
  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ ok: false });
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  const encoded = typeof req.query.code === 'string' ? req.query.code : '';
  let passcode = '';
  try { passcode = Buffer.from(encoded, 'base64url').toString('utf8'); } catch { return res.status(400).json({ ok: false }); }
  if (!passcode || passcode.length > 72) return res.status(400).json({ ok: false });

  const slug = 'dessert-lane';
  const noCookieKit = await run('GET', { slug, path: 'kit' }, {});
  const login = await run('POST', { slug }, {}, new URLSearchParams({ passcode }).toString());
  passcode = '';

  const setCookie = String(login.getHeader('set-cookie') || '');
  const cookie = setCookie.split(';')[0];
  const authHeaders = { cookie };

  const root = cookie ? await run('GET', { slug }, authHeaders) : mockResponse();
  const kit = cookie ? await run('GET', { slug, path: 'kit' }, authHeaders) : mockResponse();
  const css = cookie ? await run('GET', { slug, path: 'assets/site.css' }, authHeaders) : mockResponse();
  const tap = cookie ? await run('GET', { slug, path: 'assets/review-tap.svg' }, authHeaders) : mockResponse();
  const hero = cookie ? await run('HEAD', { slug, path: 'assets/hero.jpg' }, authHeaders) : mockResponse();

  const rootText = asText(root.body);
  const kitText = asText(kit.body);
  const gateText = asText(noCookieKit.body);

  return res.status(200).json({
    loginRedirected: login.statusCode === 303 && login.getHeader('location') === '/demos/dessert-lane',
    secureCookieIssued: /HttpOnly; Secure; SameSite=Lax/.test(setCookie) && /Path=\/demos\/dessert-lane/.test(setCookie),
    rootLoaded: root.statusCode === 200 && /The night/.test(rootText) && /Order on Uber Eats/.test(rootText),
    kitLoaded: kit.statusCode === 200 && /Dessert Lane × Maz Works/.test(kitText) && /Google Review Tap/.test(kitText),
    cssLoaded: css.statusCode === 200 && String(css.getHeader('content-type')).startsWith('text/css'),
    tapVisualLoaded: tap.statusCode === 200 && String(tap.getHeader('content-type')).startsWith('image/svg+xml'),
    heroLoaded: hero.statusCode === 200 && String(hero.getHeader('content-type')).startsWith('image/'),
    noCookieStayedGated: noCookieKit.statusCode === 200 && /Demo passcode/.test(gateText) && !/Google Review Tap/.test(gateText),
    statuses: { login: login.statusCode, root: root.statusCode, kit: kit.statusCode, css: css.statusCode, tap: tap.statusCode, hero: hero.statusCode, noCookieKit: noCookieKit.statusCode },
  });
}
