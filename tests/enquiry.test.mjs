import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const exportRoot = path.join(root, 'out');

async function readPage(route) {
  const name = route === '/' ? 'index' : route.replace(/^\//, '');
  for (const candidate of [
    path.join(exportRoot, `${name}.html`),
    path.join(exportRoot, name, 'index.html'),
  ]) {
    try {
      return (await readFile(candidate, 'utf8')).replaceAll('<!-- -->', '');
    } catch {
      // Support both Next.js static-export path shapes.
    }
  }
  throw new Error(`Missing static page for ${route}`);
}

const readSource = (...parts) => readFile(path.join(root, ...parts), 'utf8');

test('the enquiry captures which service the visitor actually wants', async () => {
  const html = await readPage('/');
  const enquirySource = await readSource('app', 'enquiry.ts');

  assert.match(html, /What do you need help with\?/);
  for (const label of [
    'Website or landing page',
    'Automation and repetitive admin',
    'Internal tool, AI feature or custom software',
    'Physical product linked to a digital action',
    'Not sure yet',
  ]) {
    assert.ok(html.includes(label), `Missing service option: ${label}`);
  }

  // CTAs deep-link with ?service=<id>; the ids must stay stable for those links to work.
  for (const id of ['website', 'automation', 'software', 'objects', 'unsure']) {
    assert.match(enquirySource, new RegExp(`id: '${id}'`));
  }
  assert.match(enquirySource, /readServiceFromLocation/);
});

test('an enquiry can ask for a quote or an answer instead of an unpaid build', async () => {
  const html = await readPage('/');

  assert.match(html, /What would be most useful next\?/);
  assert.match(html, /A free live demo built around my problem/);
  assert.match(html, /A quote and scope for a specific job/);
  assert.match(html, /Just answer my question first/);
});

test('both enquiry forms fail safely with a recoverable email fallback', async () => {
  const enquirySource = await readSource('app', 'enquiry.ts');
  const demoForm = await readSource('app', 'demo-request-form.tsx');
  const touchForm = await readSource('app', '3d-printing', 'touch-enquiry-form.tsx');

  // A hung request must not leave the button stuck on "Sending…".
  assert.match(enquirySource, /AbortController/);
  assert.match(enquirySource, /SUBMIT_TIMEOUT_MS/);

  // FormSubmit answers HTTP 200 with `success: "false"` when a form is not activated
  // for the requesting origin, so a 200 alone must never be treated as delivered.
  assert.match(enquirySource, /success === 'true'/);

  // An abort raised while the body is still being read is swallowed by the parse
  // catch, so the signal must be checked before any success is reported.
  assert.match(enquirySource, /controller\.signal\.aborted/);
  assert.match(
    enquirySource,
    /signal\.aborted\) return \{ ok: false[\s\S]{0,400}?return \{ ok: true \}/,
    'the aborted check must come before the success return',
  );

  for (const source of [demoForm, touchForm]) {
    assert.match(source, /buildRecoveryMailto/);
    assert.match(source, /recoveryHref/);
    assert.match(source, /role="alert"/);
  }
});

test('both forms can send a second enquiry without a page reload', async () => {
  const demoForm = await readSource('app', 'demo-request-form.tsx');
  const touchForm = await readSource('app', '3d-printing', 'touch-enquiry-form.tsx');

  // Both submit buttons stay disabled in the `sent` state, so each form needs a way back.
  for (const source of [demoForm, touchForm]) {
    assert.match(source, /setSubmitState\('idle'\)/);
  }
});

test('missing required answers produce a visible message rather than a silent no-op', async () => {
  const demoForm = await readSource('app', 'demo-request-form.tsx');
  const touchForm = await readSource('app', '3d-printing', 'touch-enquiry-form.tsx');

  for (const source of [demoForm, touchForm]) {
    assert.match(source, /const missing =/);
    assert.match(source, /\.focus\(\)/);
    assert.doesNotMatch(source, /!email\) return;/);
  }
});
