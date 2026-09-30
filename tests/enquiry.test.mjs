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

test('contact uses the same quick free-plan form with optional qualification', async () => {
  const html = await readPage('/contact');
  for (const name of ['name', 'email', 'problem', 'interested_in', 'trade', 'source', 'enquiries_per_week']) assert.match(html, new RegExp(`name="${name}"`));
  assert.match(html, /Get a free plan and price/);
  assert.doesNotMatch(html, /name="business"|name="nextStep"/);
  assert.match(html, /Roughly how many enquiries a week/);
  assert.doesNotMatch(html, /free live demo|free demo/i);
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
