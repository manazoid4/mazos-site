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

test('Touch leads with the customer outcome and presents exactly three clear bundles', async () => {
  const html = await readPage('/3d-printing');

  assert.match(html, /Your menu, reviews and bookings.one phone tap away\./);
  assert.match(html, /Tap with a compatible phone or scan the QR code\./);
  assert.match(html, /From £29 · Setup included/);
  assert.match(html, /href="#personalise-title">Enquire/);
  assert.match(html, /Touch One/);
  assert.match(html, /Touch Three/);
  assert.match(html, /Touch \+ Carry/);
  for (const price of ['£29', '£39', '£49', '£59', '£79', '£89']) {
    assert.match(html, new RegExp(price));
  }
  assert.match(html, /one compact stand and one tap disc/i);
  assert.match(html, /one stand with three removable tap discs/i);
  assert.match(html, /5 matching tap keyrings/i);
  assert.match(html, /Google review page/i);
  assert.match(html, /menu, reviews and bookings/i);
  assert.match(html, /Your logo or image/);
  assert.match(html, /\+£10 per bundle/);
  const formSource = await readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8');
  assert.match(formSource, /No payment now\. Design and final quote agreed first\./);
  assert.equal((html.match(/Concept visual/g) || []).length >= 4, true);
});

test('Objects enquiry follows bundle selection, accepts incomplete details, and keeps a mobile estimate visible', async () => {
  const [html, pageSource, formSource, configSource, selectionSource, collectionSource, styles] = await Promise.all([
    readPage('/3d-printing'),
    readFile(path.join(root, 'app', '3d-printing', 'page.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-enquiry-form.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-config.ts'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-selection.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-collection.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'objects-responsive.css'), 'utf8'),
  ]);

  for (const field of ['bundle', 'intendedUses', 'artwork', 'businessName', 'name', 'email', 'destinationLinks', 'notes']) {
    assert.match(formSource, new RegExp(field));
  }
  assert.ok(pageSource.indexOf('<TouchEnquiryForm />') > pageSource.indexOf('<TouchCollection />'));
  assert.ok(pageSource.indexOf('<TouchEnquiryForm />') < pageSource.indexOf('objects-ordering'));
  assert.match(formSource, /Help me choose/);
  assert.match(formSource, /Name on your stand \(optional\)/);
  assert.match(formSource, /I need help finding my links/);
  assert.match(formSource, /Your links[\s\S]{0,80}optional at enquiry stage/i);
  assert.match(formSource, /Send enquiry/);
  assert.match(formSource, /objects-mobile-summary/);
  assert.match(styles, /\.objects-mobile-summary[\s\S]*position:\s*fixed/);
  assert.match(formSource, /fetch\(FORM_ENDPOINT/);
  assert.match(selectionSource, /getTouchEstimate\(bundleId, artwork\)/);
  assert.match(formSource, /estimated_product_price: `£\$\{estimate\}/);
  assert.match(formSource, /payload\?\.success === true \|\| payload\?\.success === 'true'/);
  assert.match(formSource, /!response\.ok \|\| !confirmed/);
  assert.match(formSource, /setSubmitState\('error'\)/);
  assert.doesNotMatch(formSource, /required[^>]+destinationLinks|destinationLinks[^>]+required/);
  assert.match(collectionSource, /getElementById\('personalise-title'\)\?\.focus/);
  assert.match(collectionSource, /loading="lazy"/);
  assert.match(configSource, /artworkAddOnPrice: 10/);
  assert.match(configSource, /basePrice: 29/);
  assert.match(configSource, /basePrice: 49/);
  assert.match(configSource, /basePrice: 79/);
});

test('Touch explains use and buying limits in plain language without unsupported promises', async () => {
  const [html, pageSource] = await Promise.all([
    readPage('/3d-printing'),
    readFile(path.join(root, 'app', '3d-printing', 'page.tsx'), 'utf8'),
  ]);

  for (const phrase of [
    'compatible phone',
    'QR',
    'no batteries or charging',
    'usually needs internet',
    'tap link editable',
    'does not change a printed QR code',
    'separately maintained service',
    'indoor use',
    'Delivery and nonstandard requests are confirmed separately',
    'No subscription for direct links',
    'Currently at concept stage',
  ]) {
    assert.match(html, new RegExp(phrase, 'i'));
  }
  assert.equal((pageSource.match(/Currently at concept stage/g) || []).length, 1);
  assert.doesNotMatch(html, /FDM|filament|retention method|configured destination|production behaviour/i);
  assert.doesNotMatch(html, /works on every phone|guaranteed reviews|automatic sales|dishwasher safe|waterproof|food[- ]safe/i);
});

test('Touch demonstrates the phone journey, groups FAQs, and keeps below-fold imagery lazy', async () => {
  const [html, demoSource, collectionSource, styles] = await Promise.all([
    readPage('/3d-printing'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-demo.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'touch-collection.tsx'), 'utf8'),
    readFile(path.join(root, 'app', '3d-printing', 'objects.css'), 'utf8'),
  ]);

  assert.match(html, /They tap\. Your page opens\./);
  assert.match(html, /café menu, a shop review or a salon booking/i);
  assert.match(html, /Example on a phone/);
  for (const group of ['Using your stand', 'Design and care', 'Your enquiry and quote']) {
    assert.match(html, new RegExp(group));
  }
  assert.match(demoSource, /loading="lazy"/);
  assert.match(collectionSource, /loading="lazy"/);
  assert.match(styles, /\.objects-demo-stand/);
  assert.match(styles, /\.objects-ordering/);
  assert.match(styles, /\.objects-faq-group/);
  assert.match(styles, /\.objects-page small[\s\S]*font-size:\s*max\(/);
});

test('Objects is discoverable from the homepage and sitemap while the route uses product-specific navigation', async () => {
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
  assert.match(objects, /aria-label="Objects navigation"/);
  assert.match(objects, /href="#collection"/);
  assert.match(objects, /href="#personalise-title">Enquire/);
  assert.doesNotMatch(objects, /Request live demo/);
  assert.match(sitemap, /\/3d-printing/);
  assert.match(readme, /Touch One/);
  assert.match(readme, /manufacturing checks/i);
});
