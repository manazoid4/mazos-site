import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// After-Hours Receptionist launch (9 Oct 2026): price from offers.ts only, honest
// demo wording, safety copy present, wired into the site. Read AGENTS.md first.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const read = async (route) => {
  for (const candidate of [path.join(out, `${route}.html`), path.join(out, route, 'index.html')]) {
    try { return await readFile(candidate, 'utf8'); } catch { /* try the next */ }
  }
  throw new Error(`missing exported page ${route}`);
};
const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

test('the receptionist page shows the price, both CTAs, safety and FAQ', async () => {
  const html = await read('after-hours-receptionist');
  const page = text(html);
  assert.match(page, /£79\/month/);
  assert.match(page, /Calls answered when\s+you’re\s+closed/);
  assert.doesNotMatch(page, /never miss|first ring|every call answered|guarantee[sd]? (more|bookings|leads)/i);
  assert.match(html, /href="\/free-plan\?src=after-hours&amp;package=After-Hours%20Receptionist#leak-check-form"/);
  assert.match(page, /Get my free demo/);
  assert.match(html, /href="#try"/);
  assert.match(page, /Safety and privacy/);
  assert.match(page, /not an emergency service/i);
  assert.match(page, /999/);
  assert.match(page, /Can I cancel\?/);
  assert.match(page, /Are calls recorded\?/);
  assert.match(page, /Example business, not a client/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"unitCode":"MON"/);
});

test('the receptionist page stays honest: no AI, no fake trial, no certification claims', async () => {
  const page = text(await read('after-hours-receptionist'));
  assert.doesNotMatch(page, /\bAI\b/);
  assert.doesNotMatch(page, /free trial|7-day pilot|start your trial/i);
  assert.doesNotMatch(page, /GDPR[- ]certified|certified compliant|guaranteed compliance|ISO ?27001|HIPAA/i);
  assert.doesNotMatch(page, /testimonial|\d+ (businesses|clients|customers) (use|trust)/i);
});

test('£79/month is typed only in offers.ts', async () => {
  for (const file of ['page.tsx', 'content.ts', 'night-call.tsx', 'call-demo.tsx', 'value-check.tsx']) {
    const source = await readFile(path.join(root, 'app', 'after-hours-receptionist', file), 'utf8');
    assert.doesNotMatch(source, /£\s?79/, file);
  }
  const offers = await readFile(path.join(root, 'app', 'offers.ts'), 'utf8');
  assert.match(offers, /price: '£79\/month'/);
});

test('the offer is wired in: homepage, services, prices, enquiry, footer, sitemap', async () => {
  for (const route of ['index', 'services', 'prices']) {
    assert.match(await read(route), /href="\/after-hours-receptionist"/, `${route} links the receptionist page`);
  }
  assert.match(await read('contact'), /After-Hours Receptionist: calls answered when you’re closed \(£79\/month\)/);
  const sitemap = await readFile(path.join(out, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /\/after-hours-receptionist</);
  const form = await readFile(path.join(root, 'app', 'free-plan', 'leak-check-form.tsx'), 'utf8');
  assert.match(form, /AFTER_HOURS\.name\]/, 'the free demo form accepts ?package=After-Hours Receptionist');
});
