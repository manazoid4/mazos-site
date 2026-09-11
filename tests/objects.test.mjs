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

test('Touch presents exactly three clear bundles with every base and artwork estimate', async () => {
  const html = await readPage('/3d-printing');

  assert.match(html, /One tap\. One useful next step\./);
  assert.match(html, /Touch One/);
  assert.match(html, /Touch Three/);
  assert.match(html, /Touch \+ Carry/);
  for (const price of ['£29', '£39', '£49', '£59', '£79', '£89']) {
    assert.match(html, new RegExp(price));
  }
  assert.match(html, /one compact stand with one tap point/i);
  assert.match(html, /one stand with three tap points/i);
  assert.match(html, /5 matching tap keyrings/i);
  assert.match(html, /Add your logo or supplied artwork/i);
  assert.match(html, /Optional \+£10/i);
  const formSource = await readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8');
  assert.match(formSource, /No payment now\. You see the design and final price first\./);
  assert.equal((html.match(/Concept visual/g) || []).length >= 4, true);
});

test('Objects enquiry keeps links optional and builds its estimate from shared pricing', async () => {
  const [html, formSource, configSource, selectionSource] = await Promise.all([
    readPage('/3d-printing'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-config.ts'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-selection.tsx'), 'utf8'),
  ]);

  for (const field of ['bundle', 'intendedUses', 'artwork', 'businessName', 'name', 'email', 'destinationLinks', 'notes']) {
    assert.match(formSource, new RegExp(field));
  }
  assert.match(formSource, /I want help finding the right links/);
  assert.match(formSource, /Links you already have[\s\S]{0,80}optional/i);
  assert.match(formSource, /Send my enquiry/);
  assert.match(formSource, /fetch\(FORM_ENDPOINT/);
  assert.match(selectionSource, /getTouchEstimate\(bundleId, artwork\)/);
  assert.match(formSource, /estimated_product_price: `£\$\{estimate\}/);
  assert.match(formSource, /response\.ok/);
  assert.match(formSource, /setSubmitState\('error'\)/);
  assert.match(formSource, /submitEnquiry[\s\S]+intendedUses\.length === 0/);
  assert.doesNotMatch(formSource, /required[^>]+destinationLinks|destinationLinks[^>]+required/);
  assert.match(configSource, /artworkAddOnPrice: 10/);
  assert.match(configSource, /basePrice: 29/);
  assert.match(configSource, /basePrice: 49/);
  assert.match(configSource, /basePrice: 79/);
  assert.match(html, /You do not need every link or technical detail ready/i);
});

test('Touch explains real-world limits without turning the page into technical documentation', async () => {
  const html = await readPage('/3d-printing');

  for (const phrase of [
    'QR backup',
    'Most modern phones',
    'cases, phone settings and tap position',
    'does not need a battery or charging cable',
    'printed QR code would still show the old link',
    'indoor 3D-printed plastic finish',
    'approve the direction and final price before production starts',
    'Not for a stand that opens pages you already own',
  ]) {
    assert.match(html, new RegExp(phrase, 'i'));
  }
  assert.doesNotMatch(html, /works on every phone|guaranteed reviews|automatic sales|dishwasher safe|waterproof|food[- ]safe/i);
  assert.doesNotMatch(html, /FDM|passive tag|NDEF|antenna|retention method|cavity lock|maintained redirect service/i);
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
  assert.match(objects, /href="\/demos"/);
  assert.match(sitemap, /\/3d-printing/);
  assert.match(readme, /Touch One/);
  assert.match(readme, /manufacturing checks/i);
});
