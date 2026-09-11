const ACCESS_URL = 'https://hkzlsyxcpxcambakdaws.supabase.co/functions/v1/client-demo-access';

async function call(body) {
  const response = await fetch(ACCESS_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'error',
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
}

export default async function handler(req, res) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-robots-tag', 'noindex, nofollow');

  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ ok: false });
  if (req.method !== 'GET') return res.status(405).json({ ok: false });

  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';
  const encoded = typeof req.query.code === 'string' ? req.query.code : '';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || encoded.length > 256) {
    return res.status(400).json({ ok: false });
  }

  let passcode = '';
  try {
    passcode = Buffer.from(encoded, 'base64url').toString('utf8');
  } catch {
    return res.status(400).json({ ok: false });
  }

  const wrong = await call({ action: 'login', slug, passcode: `${passcode}-wrong` });
  const login = await call({ action: 'login', slug, passcode });
  const token = typeof login.data?.token === 'string' ? login.data.token : '';

  const validate = token ? await call({ action: 'validate', slug, token }) : { status: 0, data: {} };
  const crossSlug = token ? await call({ action: 'validate', slug: 'other-client', token }) : { status: 0, data: {} };
  const logout = token ? await call({ action: 'logout', slug, token }) : { status: 0, data: {} };
  const afterLogout = token ? await call({ action: 'validate', slug, token }) : { status: 0, data: {} };

  passcode = '';

  return res.status(200).json({
    wrongRejected: wrong.status === 401 && wrong.data?.ok === false,
    loginSucceeded: login.status === 200 && login.data?.ok === true && Boolean(token),
    validateSucceeded: validate.status === 200 && validate.data?.ok === true,
    crossSlugRejected: crossSlug.status === 401 && crossSlug.data?.ok === false,
    logoutSucceeded: logout.status === 200 && logout.data?.ok === true,
    revokedRejected: afterLogout.status === 401 && afterLogout.data?.ok === false,
    statuses: {
      wrong: wrong.status,
      login: login.status,
      validate: validate.status,
      crossSlug: crossSlug.status,
      logout: logout.status,
      afterLogout: afterLogout.status,
    },
  });
}
