import { CHECK_REPLY_TIME } from '../app/reply-time.js';
import { createHash } from 'node:crypto';
const buckets = new Map();
const WINDOW = 60_000;
const MAX_BODY = 16_384;
export function allowRequest(ip, now = Date.now()) {
  for (const [key, value] of buckets) if (now - value.start >= WINDOW) buckets.delete(key);
  const key = createHash('sha256').update(ip).digest('hex');
  const item = buckets.get(key) || { start: now, count: 0 };
  if (buckets.size >= 5000 && !buckets.has(key)) return false;
  item.count++; buckets.set(key, item);
  return item.count <= 5;
}
export async function deliverEnquiry(body, fetchImpl = fetch) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, confirmationSent: false };
  const send = async (message, suffix) => {
    try {
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST', signal: AbortSignal.timeout(9000),
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json', 'Idempotency-Key': `${body.request_id || createHash('sha256').update(JSON.stringify(body)).digest('hex')}-${suffix}` },
        body: JSON.stringify({ from: 'Maz Works <info@mazworks.uk>', ...message }),
      });
      if (!response.ok) return false;
      const result = await response.json();
      return typeof result.id === 'string';
    } catch { return false; }
  };
  const fields = ['name', 'email', 'problem', 'website', 'interested_in', 'systems', 'trade', 'source'];
  const accepted = await send({ to: ['info@mazworks.uk'], reply_to: body.email,
    subject: 'Maz Works — free plan and quote',
    text: fields.filter(field => body[field]).map(field => `${field}: ${body[field]}`).join('\n\n'),
  }, 'owner');
  if (!accepted) return { ok: false, confirmationSent: false };
  const confirmationSent = await send({ to: [body.email], reply_to: 'info@mazworks.uk',
    subject: 'Your Maz Works free plan request',
    text: `Thanks ${body.name}, I've got your request.\n\nI'll read it myself and email you a short plan and fixed price within ${CHECK_REPLY_TIME}. No call needed, no obligation.\n\nThis confirmation is the same kind of instant reply I set up for clients.\n\nIf anything changes, reply to this email.\n\nManazir, Maz Works`,
  }, 'visitor');
  return { ok: true, confirmationSent };
}
export default async function handler(req, res, fetchImpl = fetch) {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('content-type', 'application/json');
  const reply = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
  if (req.method !== 'POST') { res.setHeader('allow', 'POST'); return reply(405, {ok:false}); }
  let raw = '';
  try {
    for await (const chunk of req) { raw += chunk.toString(); if (Buffer.byteLength(raw) > MAX_BODY) return reply(413,{ok:false}); }
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400,{ok:false});
    if (body._honey) return reply(200, {ok:true,confirmationSent:false});
    const fields = ['name','email','problem','website','interested_in','systems','trade','source','request_id'];
    if (fields.some(field => body[field] !== undefined && (typeof body[field] !== 'string' || body[field].length > 4000))) return reply(400,{ok:false});
    if (!body.name?.trim() || !body.problem?.trim() || !/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(body.email || '') || body.name.length > 120) return reply(400,{ok:false});
    if (body.request_id && !/^[a-zA-Z0-9-]{1,64}$/.test(body.request_id)) return reply(400,{ok:false});
    if (!allowRequest(String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0])) {res.setHeader('retry-after','60'); return reply(429,{ok:false});}
    const result = await deliverEnquiry(body, fetchImpl);
    return reply(result.ok ? 200 : 502, result);
  } catch { return reply(400,{ok:false}); }
}
