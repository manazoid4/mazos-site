import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

// Exercise the real TypeScript module without changing the browser import contract.
const source = await readFile(new URL('../app/enquiry.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const enquiry = {};
new Function('exports', 'require', 'window', outputText)(enquiry, () => ({ CONTACT_EMAIL: 'recipient@example.com' }), globalThis);

test('delivery needs an explicit provider acknowledgement, not just HTTP 200', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{}'));

  for (const body of ['{}', 'null', '[]', '{"success":1}', '<html>Unavailable</html>', '']) {
    globalThis.fetch = async () => new Response(body);
    assert.deepEqual(await enquiry.sendEnquiry({ problem: 'Example enquiry' }), { ok: false, reason: 'rejected' }, body);
  }
});

test('delivery accepts both documented confirmation shapes and rejects provider errors', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('{}'));

  for (const success of [true, 'true', false, 'false']) {
    globalThis.fetch = async () => Response.json({ success });
    assert.deepEqual(await enquiry.sendEnquiry({}), success === true || success === 'true'
      ? { ok: true } : { ok: false, reason: 'rejected' });
  }
  globalThis.fetch = async () => Response.json({ success: true }, { status: 503 });
  assert.deepEqual(await enquiry.sendEnquiry({}), { ok: false, reason: 'rejected' });
});

test('network loss and abort while reading confirmation never report delivery', async (t) => {

  t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline'); });
  assert.deepEqual(await enquiry.sendEnquiry({}), { ok: false, reason: 'network' });
  globalThis.fetch = async (_url, { signal }) => ({
    ok: true,
    json: () => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true });
    }),
  });
  assert.deepEqual(await enquiry.sendEnquiry({}, 5), { ok: false, reason: 'timeout' });
});

test('email recovery preserves punctuation, multiline details and the reply address', () => {
  const href = new URL(enquiry.buildRecoveryMailto('Quote & question', [
    ['Name', 'Example Customer'], ['Email', 'customer@example.com'],
    ['Problem', 'Bookings & follow-up\nSecond line + £49'], ['Business', ''],
  ]));
  assert.equal(href.searchParams.get('subject'), 'Quote & question');
  assert.equal(href.searchParams.get('body'), 'Name: Example Customer\nEmail: customer@example.com\nProblem: Bookings & follow-up\nSecond line + £49');
});
