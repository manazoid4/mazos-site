import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const exportRoot = path.join(root, 'out');

async function readPage(route) {
  const name = route.replace(/^\//, '');
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

test('Touch presents exactly three bundles with every base and artwork estimate', async () => {
  const html = await readPage('/3d-printing');

  assert.match(html, /Small objects\. Useful connections\./);
  assert.match(html, /Touch One/);
  assert.match(html, /Touch Three/);
  assert.match(html, /Touch \+ Carry/);
  for (const price of ['£29', '£39', '£49', '£59', '£79', '£89']) {
    assert.match(html, new RegExp(price));
  }
  assert.match(html, /one compact stand and one NFC disc/i);
  assert.match(html, /one stand with three removable NFC discs/i);
  assert.match(html, /five matching NFC keyrings/i);
  assert.match(html, /Your logo or image/);
  assert.match(html, /\+£10 per bundle/);
  const formSource = await readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8');
  assert.match(formSource, /No payment now\. Design and final quote agreed first\./);
  assert.equal((html.match(/Concept visual/g) || []).length >= 4, true);
});

test('Objects enquiry reuses delivery, accepts missing links, and builds its estimate from shared pricing', async () => {
  const [html, formSource, configSource, selectionSource] = await Promise.all([
    readPage('/3d-printing'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-config.ts'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-selection.tsx'), 'utf8'),
  ]);

  for (const field of ['bundle', 'intendedUses', 'artwork', 'businessName', 'name', 'email', 'destinationLinks', 'notes']) {
    assert.match(formSource, new RegExp(field));
  }
  assert.match(formSource, /I need help finding my links/);
  assert.match(formSource, /Destination links[\s\S]{0,80}optional at enquiry stage/i);
  assert.match(formSource, /Send enquiry/);
  assert.match(formSource, /fetch\(FORM_ENDPOINT/);
  assert.match(selectionSource, /getTouchEstimate\(bundleId, artwork\)/);
  assert.match(formSource, /estimated_product_price: `£\$\{estimate\}/);
  assert.match(formSource, /response\.ok/);
  assert.match(formSource, /setSubmitState\('error'\)/);
  assert.doesNotMatch(formSource, /required[^>]+destinationLinks|destinationLinks[^>]+required/);
  assert.match(configSource, /artworkAddOnPrice: 10/);
  assert.match(configSource, /basePrice: 29/);
  assert.match(configSource, /basePrice: 49/);
  assert.match(configSource, /basePrice: 79/);
});

test('Touch explains NFC and manufacturing limits without unsupported promises', async () => {
  const html = await readPage('/3d-printing');

  for (const phrase of [
    'compatible NFC phone',
    'QR',
    'passive',
    'usually needs internet',
    'unlocked tag',
    'does not change a printed QR code',
    'maintained redirect service',
    'planned prototype material is PLA',
    'confirming the actual filament',
    'indoor use',
    'Delivery and nonstandard requests are confirmed separately',
    'No subscription for direct links',
  ]) {
    assert.match(html, new RegExp(phrase, 'i'));
  }
  assert.doesNotMatch(html, /works on every phone|guaranteed reviews|automatic sales|dishwasher safe|waterproof|food[- ]safe/i);
});

test('Objects is discoverable from shared chrome, homepage and sitemap while digital services remain', async () => {
  const [home, objects, sitemap, readme] = await Promise.all([
    readPage('/'),
    readPage('/3d-printing'),
    readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8'),
    readFile(path.join(root, 'README.md'), 'utf8'),
  ]);

  assert.match(home, /Maz Works Objects/);
  assert.match(home, /3D Printing &amp; Objects/);
  assert.match(home, /href="\/3d-printing"/);
  assert.match(home, /Request a free live demo/);
  assert.match(home, /£150 fixed/);
  assert.match(objects, /href="\/#services"/);
  assert.match(objects, /href="\/#work"/);
  assert.match(sitemap, /\/3d-printing/);
  assert.match(readme, /Touch One/);
  assert.match(readme, /manufacturing checks/i);
});
