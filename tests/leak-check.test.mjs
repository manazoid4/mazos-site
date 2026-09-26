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

test('the free Booking & Enquiry Check has a dedicated shareable acquisition page', async () => {
  const html = await readPage('/leak-check');

  assert.match(html, /Free Booking &amp; Enquiry Check/);
  assert.match(html, /Three fields\. No call required\./);
  assert.match(html, /within 5 working days/i);
  assert.match(html, /any UK business/);
  assert.doesNotMatch(html, /Nottingham/);
  assert.match(html, /no automated score/i);
  assert.match(html, /Your current provider should be able to fix this/);
  assert.match(html, /I couldn.t find anything I.d honestly charge you to fix/);
  assert.match(html, /FIX NOW/);
  assert.match(html, /FIX SOON/);
  assert.match(html, /WORKING WHEN CHECKED/);
  assert.doesNotMatch(html, /hacked/i);
  assert.match(html, /cal\.com\/mazworks\/quick-chat/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.mazworks\.uk\/leak-check"/);
});

test('the free check asks only for name, email and website before submission', async () => {
  const html = await readPage('/leak-check');
  const form = /<form[^>]*id="leak-check-form"[\s\S]*?<\/form>/.exec(html)?.[0] || '';

  assert.ok(form, 'free check form should be present');
  for (const name of ['name', 'email', 'website']) {
    assert.match(form, new RegExp(`name="${name}"`));
  }
  assert.doesNotMatch(form, /name="business"|name="problem"|name="nextStep"/);
  assert.match(form, /Get my free check/);
});

test('the Leak Check reuses the resilient enquiry delivery path', async () => {
  const source = await readFile(path.join(root, 'app', 'leak-check', 'leak-check-form.tsx'), 'utf8');

  assert.match(source, /NATIVE_FORM_ENDPOINT/);
  assert.match(source, /sendEnquiry/);
  assert.match(source, /buildRecoveryMailto/);
  assert.match(source, /_honey/);
  assert.match(source, /source/);
  assert.match(source, /role="status"/);
});

test('homepage and shared navigation send the free first step to the dedicated page', async () => {
  const home = await readPage('/');

  assert.match(home, /href="\/leak-check">Get a free Booking &amp; Enquiry Check/);
  assert.match(home, /href="\/leak-check">Free check/);
  assert.doesNotMatch(home, /\?service=leak-check#contact/);
});
