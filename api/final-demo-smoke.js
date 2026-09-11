import crypto from 'node:crypto';

const ACCESS_URL = 'https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access';
const PROD = 'https://mazos-site.vercel.app';
const SLUG = 'dessert-lane';

function cookieName(slug) {
  return `mw_demo_${crypto.createHash('sha256').update(slug).digest('hex').slice(0, 16)}`;
}

async function access(body) {
  const response = await fetch(ACCESS_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'error',
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

async function get(path, cookie = '') {
  const response = await fetch(`${PROD}${path}`, {
    headers: cookie ? { cookie } : {},
    redirect: 'manual',
  });
  const type = response.headers.get('content-type') || '';
  const body = type.startsWith('image/') ? '' : await response.text();
  return { status: response.status, type, body };
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-robots-tag', 'noindex, nofollow');
  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ ok: false });
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  let passcode = '';
  try {
    passcode = Buffer.from(String(req.query.code || ''), 'base64url').toString('utf8');
  } catch {
    return res.status(400).json({ ok: false });
  }
  if (!passcode || passcode.length > 72) return res.status(400).json({ ok: false });

  const wrong = await access({ action: 'login', slug: SLUG, passcode: `${passcode}-wrong` });
  const login = await access({ action: 'login', slug: SLUG, passcode });
  const token = typeof login.data?.token === 'string' ? login.data.token : '';
  const cookie = token ? `${cookieName(SLUG)}=${encodeURIComponent(token)}` : '';

  const unauthKit = await get(`/demos/${SLUG}/kit`);
  const home = token ? await get(`/demos/${SLUG}`, cookie) : { status: 0, type: '', body: '' };
  const kit = token ? await get(`/demos/${SLUG}/kit`, cookie) : { status: 0, type: '', body: '' };
  const loyalty = token ? await get(`/demos/${SLUG}/loyalty`, cookie) : { status: 0, type: '', body: '' };
  const css = token ? await get(`/demos/${SLUG}/assets/site-css`, cookie) : { status: 0, type: '', body: '' };
  const hero = token ? await get(`/demos/${SLUG}/assets/hero`, cookie) : { status: 0, type: '', body: '' };
  const missing = token ? await get(`/demos/${SLUG}/missing-page`, cookie) : { status: 0, type: '', body: '' };
  const logout = token ? await access({ action: 'logout', slug: SLUG, token }) : { status: 0, data: {} };
  const afterLogout = token ? await get(`/demos/${SLUG}`, cookie) : { status: 0, type: '', body: '' };

  passcode = '';
  return res.status(200).json({
    wrongRejected: wrong.status === 401,
    loginSucceeded: login.status === 200 && Boolean(token),
    labelledPotential: login.data?.relationshipStatus === 'potential',
    unauthContentHidden: unauthKit.status === 200 && unauthKit.body.includes('Private client demo') && !unauthKit.body.includes('A sweeter first impression'),
    homeLoaded: home.status === 200 && home.body.includes('The night') && home.body.includes('DESSERT'),
    kitLoaded: kit.status === 200 && kit.body.includes('A sweeter first impression') && kit.body.includes('Review Tap'),
    loyaltyLoaded: loyalty.status === 200 && loyalty.body.includes('Come back'),
    cssLoaded: css.status === 200 && css.type.startsWith('text/css') && css.body.includes('--pink'),
    heroLoaded: hero.status === 200 && hero.type.startsWith('image/'),
    missingIs404: missing.status === 404,
    logoutSucceeded: logout.status === 200 && logout.data?.ok === true,
    revokedRejected: afterLogout.status === 401 || afterLogout.body.includes('session has expired'),
    statuses: {
      wrong: wrong.status,
      login: login.status,
      unauthKit: unauthKit.status,
      home: home.status,
      kit: kit.status,
      loyalty: loyalty.status,
      css: css.status,
      hero: hero.status,
      missing: missing.status,
      logout: logout.status,
      afterLogout: afterLogout.status,
    },
  });
}
