import crypto from 'node:crypto';

const ACCESS_URL = 'https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access';
const COOKIE_PREFIX = 'mw_demo_';

function cookieName(slug) {
  return `${COOKIE_PREFIX}${crypto.createHash('sha256').update(slug).digest('hex').slice(0, 16)}`;
}

async function access(body) {
  const response = await fetch(ACCESS_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), redirect: 'error' });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-robots-tag', 'noindex, nofollow');
  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ ok: false });
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  const slug = 'dessert-lane';
  const encoded = typeof req.query.code === 'string' ? req.query.code : '';
  let passcode = '';
  try { passcode = Buffer.from(encoded, 'base64url').toString('utf8'); } catch { return res.status(400).json({ ok: false }); }
  if (!passcode || passcode.length > 72) return res.status(400).json({ ok: false });

  const wrong = await access({ action: 'login', slug, passcode: `${passcode}-wrong` });
  const login = await access({ action: 'login', slug, passcode });
  const token = typeof login.data?.token === 'string' ? login.data.token : '';
  const origin = `https://${req.headers.host}`;
  const cookie = `${cookieName(slug)}=${encodeURIComponent(token)}`;
  const get = async (path, withCookie = true) => {
    const response = await fetch(`${origin}${path}`, { headers: withCookie ? { cookie } : {}, redirect: 'manual' });
    const type = response.headers.get('content-type') || '';
    const body = type.startsWith('image/') ? '' : await response.text();
    return { status: response.status, type, body };
  };

  const unauthKit = await get(`/demos/${slug}/kit`, false);
  const home = token ? await get(`/demos/${slug}`) : { status: 0, type: '', body: '' };
  const kit = token ? await get(`/demos/${slug}/kit`) : { status: 0, type: '', body: '' };
  const loyalty = token ? await get(`/demos/${slug}/loyalty`) : { status: 0, type: '', body: '' };
  const css = token ? await get(`/demos/${slug}/assets/site-css`) : { status: 0, type: '', body: '' };
  const hero = token ? await get(`/demos/${slug}/assets/hero`) : { status: 0, type: '', body: '' };
  const missing = token ? await get(`/demos/${slug}/not-a-page`) : { status: 0, type: '', body: '' };
  const logout = token ? await access({ action: 'logout', slug, token }) : { status: 0, data: {} };
  const revoked = token ? await get(`/demos/${slug}`) : { status: 0, type: '', body: '' };

  passcode = '';
  return res.status(200).json({
    wrongRejected: wrong.status === 401,
    loginSucceeded: login.status === 200 && Boolean(token),
    labelledPotential: login.data?.relationshipStatus === 'potential',
    unauthContentHidden: unauthKit.status === 200 && unauthKit.body.includes('Private client demo') && !unauthKit.body.includes('A sweeter first impression'),
    homeLoaded: home.status === 200 && home.body.includes('The night') && home.body.includes('DESSERT'),
    kitLoaded: kit.status === 200 && kit.body.includes('A sweeter first impression') && kit.body.includes('Review Tap'),
    loyaltyLoaded: loyalty.status === 200 && loyalty.body.includes('Come back') && loyalty.body.includes('separate') || loyalty.body.includes('SEPARATE'),
    cssLoaded: css.status === 200 && css.type.startsWith('text/css') && css.body.includes('--pink'),
    heroLoaded: hero.status === 200 && hero.type.startsWith('image/'),
    missingIs404: missing.status === 404,
    logoutSucceeded: logout.status === 200 && logout.data?.ok === true,
    revokedRejected: revoked.status === 401 && revoked.body.includes('session has expired'),
    statuses: { wrong: wrong.status, login: login.status, unauthKit: unauthKit.status, home: home.status, kit: kit.status, loyalty: loyalty.status, css: css.status, hero: hero.status, missing: missing.status, logout: logout.status, revoked: revoked.status }
  });
}
