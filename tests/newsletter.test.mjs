import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

process.env.HUBSPOT_NEWSLETTER_FORM_ID ??= 'test-form-id';
const { default: handler } = await import('../api/subscribe.js');

function fakeReq(body, { json = true, method = 'POST' } = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.headers = json
    ? { 'content-type': 'application/json', accept: 'application/json' }
    : { 'content-type': 'application/x-www-form-urlencoded', accept: 'text/html' };
  req.destroy = () => {};
  setImmediate(() => {
    if (body !== undefined) req.emit('data', Buffer.from(json ? JSON.stringify(body) : new URLSearchParams(body).toString()));
    req.emit('end');
  });
  return req;
}

function fakeRes() {
  return {
    statusCode: 200, headers: {}, body: '',
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(chunk) { if (chunk) this.body += chunk; return this; },
  };
}

function recordingFetch(status = 200) {
  const calls = [];
  const impl = async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); return { ok: status < 300, status }; };
  return { calls, impl };
}

test('a valid email is forwarded to the HubSpot form and reported as joined', async () => {
  const f = recordingFetch();
  const res = fakeRes();
  await handler(fakeReq({ email: '  Owner@Shop.co.uk ' }), res, f.impl);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(f.calls.length, 1);
  assert.match(f.calls[0].url, /api\.hsforms\.com\/submissions\/v3\/integration\/submit\/149409285\/test-form-id$/);
  assert.deepEqual(f.calls[0].body.fields, [{ objectTypeId: '0-1', name: 'email', value: 'owner@shop.co.uk' }]);
});

test('a bad email is refused before anything reaches HubSpot', async () => {
  const f = recordingFetch();
  const res = fakeRes();
  await handler(fakeReq({ email: 'not-an-email' }), res, f.impl);
  assert.equal(res.statusCode, 400);
  assert.equal(JSON.parse(res.body).reason, 'invalid-email');
  assert.equal(f.calls.length, 0);
});

test('a filled honeypot looks like success to the bot but sends nothing', async () => {
  const f = recordingFetch();
  const res = fakeRes();
  await handler(fakeReq({ email: 'bot@spam.com', website: 'http://spam' }), res, f.impl);
  assert.deepEqual(JSON.parse(res.body), { ok: true });
  assert.equal(f.calls.length, 0);
});

test('a HubSpot rejection is reported as a failure, never as joined', async () => {
  const res = fakeRes();
  await handler(fakeReq({ email: 'owner@shop.co.uk' }), res, recordingFetch(400).impl);
  assert.equal(res.statusCode, 502);
  assert.equal(JSON.parse(res.body).ok, false);
});

test('without JavaScript the form posts normally and is redirected back with the outcome', async () => {
  const ok = fakeRes();
  await handler(fakeReq({ email: 'owner@shop.co.uk' }, { json: false }), ok, recordingFetch().impl);
  assert.equal(ok.statusCode, 303);
  assert.equal(ok.headers.location, '/?subscribed=1#newsletter');

  const bad = fakeRes();
  await handler(fakeReq({ email: 'nope' }, { json: false }), bad, recordingFetch().impl);
  assert.equal(bad.headers.location, '/?subscribed=0#newsletter');
});

test('only POST is accepted', async () => {
  const res = fakeRes();
  await handler(fakeReq(undefined, { method: 'GET' }), res, recordingFetch().impl);
  assert.equal(res.statusCode, 405);
});

test('the homepage signup posts to the API, has a hidden honeypot and says how to unsubscribe', async () => {
  const html = await readFile(new URL('../out/index.html', import.meta.url), 'utf8');
  const section = html.match(/<section class="mw-newsletter"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section, 'homepage should include the mailing-list signup');
  const form = section.match(/<form[^>]*>/)?.[0] ?? '';
  assert.match(form, /method="post"/);
  assert.match(form, /action="\/api\/subscribe"/);
  const input = (name) => section.match(new RegExp(`<input[^>]*name="${name}"[^>]*>`))?.[0] ?? '';
  assert.match(input('email'), /type="email"/);
  assert.match(input('website'), /tabindex="-1"/i);
  assert.match(input('website'), /aria-hidden="true"/);
  assert.match(section, /unsubscribe any time/i);
});
