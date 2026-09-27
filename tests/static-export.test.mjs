import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const exportRoot = path.join(root, 'out');

// Homepage word budget (visible words in <main>, form labels and closed disclosure copy included).
// Raised 650 -> 820 on 26 Sep for the confirmed care options, clearer FAQs and Business Leak Check.
// 780 -> 820 on 26 Sep: new pricing adds a free Leak Check and a Full Rebuild card.
// 820 -> 1100 on 26 Sep (Offer v5): Journey Receipt example, Tell Maz section and referral line added.
// 1100 -> 1050 on 26 Sep: audit pass removed the duplicate problem chooser.
// 1050 -> 1250 on 27 Sep (sales overhaul): the free-check form and a labelled example report now
// live on the homepage; the second enquiry form, project list and newsletter moved off it.
const WORD_BUDGET = 1250;
// Same count as the homepage: all text inside <main>, including header, footer and closed answers.
const CASE_STUDY_WORD_BUDGET = 320;

function mainWordCount(html) {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  return main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
}

async function readPage(route) {
  const name = route === '/' ? 'index' : route.replace(/^\//, '');
  const candidates = [
    path.join(exportRoot, `${name}.html`),
    path.join(exportRoot, name, 'index.html'),
  ];
  for (const candidate of candidates) {
    try {
      return await readFile(candidate, 'utf8');
    } catch {
      // Support both Next.js static-export path shapes.
    }
  }
  throw new Error(`Missing static page for ${route}`);
}

async function internalTargetExists(urlPath) {
  const cleanPath = urlPath.split(/[?#]/, 1)[0];
  const relativePath = cleanPath.replace(/^\//, '');
  const candidates = cleanPath === '/'
    ? [path.join(exportRoot, 'index.html')]
    : path.extname(cleanPath)
      ? [path.join(exportRoot, relativePath)]
      : [path.join(exportRoot, `${relativePath}.html`), path.join(exportRoot, relativePath, 'index.html')];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Try the next exported path shape.
    }
  }
  return false;
}

test('homepage is a single-purpose sales page for a business losing bookings', async () => {
  const html = await readPage('/');
  assert.match(html, /Customers trying to book you might be hitting a dead end/);
  assert.match(html, /I check yours for free, then fix what’s broken for a fixed £395/);
  assert.match(html, /Tell me what’s wrong/);
  for (const filler of [/Inspect the work before reading more claims/, /Operations thinking/, /What gets measured/, /href="\/whats-new/, /£150/, /Quick Win/, /£39\/month/, /£795/, /founding/i, /hacked/i, /class="mw-builds"/]) {
    assert.doesNotMatch(html, filler);
  }
});

test('homepage has one way in: the free check form, with the call as the fallback', async () => {
  const html = await readPage('/');
  assert.equal((html.match(/<form/g) || []).length, 1, 'the homepage carries exactly one form, the free check');
  assert.match(html, /id="leak-check-form"/);
  assert.doesNotMatch(html, /Send enquiry/);
  assert.doesNotMatch(html, /class="mw-newsletter"/);
  assert.match(html, /href="https:\/\/cal\.com\/mazworks\/quick-chat"/);
  assert.match(html, /class="s-sticky/);
});

test('homepage trust strip states who, where and the terms', async () => {
  const html = await readPage('/');
  const strip = html.match(/<ul class="s-trust"[\s\S]*?<\/ul>/)?.[0];
  assert.ok(strip, 'trust strip must sit under the hero');
  for (const item of [/Manazir/, /Heanor, Derbyshire/, /No VAT added/, /7-working-day guarantee/]) {
    assert.match(strip, item);
  }
});

test('homepage shows a clearly labelled example report, not a real client', async () => {
  const html = await readPage('/');
  assert.match(html, /id="example"/);
  assert.match(html, /A fictional business, made up to show the format/);
  for (const level of ['Fix now', 'Fix soon', 'Working when checked']) assert.match(html, new RegExp(level));
  assert.match(html, /Couldn’t test/);
});

test('homepage has one set of service routes, not a duplicate problem chooser', async () => {
  const html = await readPage('/');
  assert.doesNotMatch(html, /class="mw-leak-check"/);
});

test('homepage proof is limited to real, honestly labelled work', async () => {
  const html = await readPage('/');
  assert.match(html, /JobFilter/);
  assert.match(html, /My own product · built and launched/);
  assert.match(html, /Scrap Finance Partners/);
  assert.match(html, /Client website · built by me/);
  assert.match(html, /no client reviews here yet/);
  assert.match(html, /href="\/lab"/);
  for (const name of ['Agent Nudge', 'OpenFlowKit', 'Khutba', 'MAZ Pocket', 'tap-to-review']) {
    assert.doesNotMatch(html, new RegExp(name), `${name} belongs on /lab, not the homepage`);
  }
  assert.doesNotMatch(html, /paid (client|contract|engagement)|client paid|testimonial/i);

  const lab = await readPage('/lab');
  for (const name of ['JobFilter', 'Scrap Finance Partners', 'Agent Nudge', 'OpenFlowKit', 'Khutba.io', 'MAZ Pocket', 'In progress', 'Ask about this build']) {
    assert.match(lab, new RegExp(name));
  }
  assert.doesNotMatch(lab, /href="https:\/\/github.com\/manazoid4\/maz-pocket"/);
});

test('homepage pricing is transparent, bounded and links straight to an enquiry', async () => {
  const html = await readPage('/');
  assert.match(html, /£395/);
  assert.match(html, /£249/);
  assert.match(html, /£595/);
  assert.match(html, /Booking &amp; Enquiry Repair/);
  assert.match(html, /Google Profile &amp; Contact Setup/);
  assert.match(html, /free Booking &amp; Enquiry Check/i);
  assert.doesNotMatch(html, /From £495/);
  assert.doesNotMatch(html, /From £1,000/);
  assert.match(html, /Bigger job[\s\S]{0,120}href="\/contact"/);
  assert.match(html, /£200 to start · £195 on completion/);
  assert.match(html, /£125 to start · £124 on completion/);
  assert.match(html, /£300 to start, £295 on completion/);
  assert.match(html, /verification times/);
  assert.match(html, /No VAT added/);
  assert.match(html, /you own everything i build/i);
  assert.match(html, /working within 7 working days/i);
  assert.match(html, /£40 when they become a paying client/);
  assert.doesNotMatch(html, /£150/);
  assert.doesNotMatch(html, /Quick Win/);
  assert.doesNotMatch(html, /£795/);
  assert.doesNotMatch(html, /£39\/month/);
  assert.doesNotMatch(html, /founding/i);
  assert.doesNotMatch(html, /href="\/quick-win"/);
  for (const id of ['repair', 'google-profile', 'bundle']) {
    assert.match(html, new RegExp(`/contact\\?service=${id}#contact`));
  }

  const contact = await readPage('/contact');
  assert.match(contact, /From £495/);
  assert.match(contact, /From £1,000/);
  assert.match(contact, /No VAT added/);
});

test('the free-check reply promise is 2 working days everywhere', async () => {
  for (const route of ['/', '/leak-check', '/contact', '/faq']) {
    const html = await readPage(route);
    assert.doesNotMatch(html, /5 working days/, `${route} still promises 5 working days`);
  }
  assert.match(await readPage('/'), /within 2 working days/);
});

test('homepage stays compact with four visible process steps', async () => {
  const html = await readPage('/');
  for (const id of ['check', 'example', 'pricing', 'process', 'about', 'faq']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Tell me what’s wrong/);
  assert.match(html, /I confirm the fix and price/);
  assert.match(html, /You pay half to start/);
  assert.match(html, /Working within 7 working days/);
  assert.match(html, /href="\/faq"/);
  const words = mainWordCount(html);
  assert.ok(words <= WORD_BUDGET, `homepage has ${words} words; budget is ${WORD_BUDGET}`);
});

test('public contact uses the branded address while form delivery stays stable', async () => {
  const html = await readPage('/');
  const siteSource = await readFile(path.join(root, 'app', 'site.ts'), 'utf8');
  const enquirySource = await readFile(path.join(root, 'app', 'enquiry.ts'), 'utf8');
  assert.match(html, /info@mazworks\.uk/);
  assert.match(siteSource, /CONTACT_EMAIL = 'info@mazworks\.uk'/);
  assert.match(enquirySource, /FORM_DELIVERY_EMAIL/);
});

test('contact request submits in-page instead of depending on the visitor email app', async () => {
  const html = await readPage('/contact');
  const formSource = await readFile(path.join(root, 'app', 'demo-request-form.tsx'), 'utf8');
  const enquirySource = await readFile(path.join(root, 'app', 'enquiry.ts'), 'utf8');
  const vercelConfig = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  const csp = vercelConfig.headers[0].headers.find((header) => header.key === 'Content-Security-Policy')?.value || '';

  assert.match(html, /Send enquiry/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="business"/);
  assert.match(html, /name="problem"/);
  assert.match(html, /name="service"/);
  assert.match(html, /name="nextStep"/);
  assert.match(html, /A 15-minute call/);
  assert.match(html, /sent directly from this form/i);
  assert.match(enquirySource, /https:\/\/formsubmit\.co\/ajax\//);
  assert.match(enquirySource, /fetch\(FORM_ENDPOINT/);
  assert.match(formSource, /role="status"/);
  assert.match(formSource, /_honey/);
  assert.doesNotMatch(formSource, /window\.location\.href\s*=\s*`mailto:/);
  assert.match(csp, /connect-src 'self' https:\/\/formsubmit\.co/);
});

test('metadata and accessible navigation are present on public pages', async () => {
  for (const route of ['/', '/mazos', '/work/jobfilter', '/work/scrap-finance-partners']) {
    const html = await readPage(route);
    assert.match(html, /href="#main-content">Skip to main content/);
    const target = /<([a-z]+)\b(?=[^>]*\bid="main-content")(?=[^>]*\btabindex="-1")[^>]*>/i.exec(html);
    assert.ok(target, `${route} skip target must be programmatically focusable`);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
  }
});

test('same-page navigation points to existing homepage sections', async () => {
  const html = await readPage('/');
  const fragments = [...html.matchAll(/href="\/#([^"]+)"/g)].map((match) => match[1]);
  for (const fragment of fragments) {
    assert.match(html, new RegExp(`id="${fragment}"`), `Missing homepage target #${fragment}`);
  }
});

test('internal links and assets resolve inside the static export', async () => {
  for (const route of ['/', '/mazos', '/work/jobfilter', '/work/scrap-finance-partners']) {
    const html = await readPage(route);
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const reference of references) {
      if (/^(?:https?:|mailto:|data:|#)/.test(reference)) continue;
      const normalized = reference.startsWith('/#') ? '/' : reference;
      assert.equal(await internalTargetExists(normalized), true, `${route} has missing target ${reference}`);
    }
  }
});

test('flagship case studies remain available and use the expanded positioning', async () => {
  const jobfilter = await readPage('/work/jobfilter');
  assert.match(jobfilter, /JobFilter case study/);
  assert.match(jobfilter, /help(s)? small building firms find public contracts/i);
  assert.match(jobfilter, /Trade-fit checks/);
  assert.match(jobfilter, /does not guarantee/i);

  const scrap = await readPage('/work/scrap-finance-partners');
  assert.match(scrap, /Scrap Finance Partners case study/);
  assert.match(scrap, /client website/i);
  assert.doesNotMatch(scrap, /paid (client|contract|engagement)|client paid/i);
  assert.doesNotMatch(scrap, /outreach|client area|lead workspace|github\.com\/manazoid4\/scrap-finance-partners/i);

  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /\/work\/jobfilter/);
  assert.match(sitemap, /\/work\/scrap-finance-partners/);
});

test('case studies stay short', async () => {
  for (const route of ['/work/jobfilter', '/work/scrap-finance-partners']) {
    const words = mainWordCount(await readPage(route));
    assert.ok(words <= CASE_STUDY_WORD_BUDGET, `${route} has ${words} words; budget is ${CASE_STUDY_WORD_BUDGET}`);
  }
});

test('legacy MazOS route stays out of homepage discovery and sitemap', async () => {
  const home = await readPage('/');
  const moved = await readPage('/mazos');
  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.doesNotMatch(home, /href="\/mazos"/);
  assert.doesNotMatch(sitemap, /<loc>[^<]+\/mazos(?:\/)?<\/loc>/);
  assert.match(moved, /This page has moved/);
  assert.match(moved, /noindex/);
});

test('structured data reflects Maz Works founder and broad service positioning', async () => {
  const html = await readPage('/');
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(ldMatch, 'Homepage is missing JSON-LD');
  const data = JSON.parse(ldMatch[1]);
  const graph = data['@graph'];
  const person = graph.find((node) => node['@type'] === 'Person');
  assert.equal(person.name, 'Manazir Hussain');
  assert.equal(person.jobTitle, 'Founder and Software Builder');
  assert.ok(person.sameAs.includes('https://github.com/manazoid4'));
  assert.ok(person.sameAs.includes('https://www.linkedin.com/company/maz-works'));
  const business = graph.find((node) => [].concat(node['@type']).includes('ProfessionalService'));
  assert.ok(business, 'homepage needs ProfessionalService structured data for local search');
  assert.equal(business.address.addressLocality, 'Heanor');
  assert.equal(business.areaServed.name, 'United Kingdom');
  assert.deepEqual(business.makesOffer.map((offer) => offer.price), ['0', '395', '249', '595']);
  for (const term of ['booking', 'enquiry', 'Google Business Profile', 'Websites', 'rebuilds', 'automation', 'software']) {
    assert.ok(business.description.toLowerCase().includes(term.toLowerCase()), `structured data missing ${term}`);
  }
});

test('Vercel Analytics remains bundled into the static export', async () => {
  const chunksDir = path.join(exportRoot, '_next', 'static', 'chunks');
  const files = await readdir(chunksDir);
  let found = false;
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    const contents = await readFile(path.join(chunksDir, file), 'utf8');
    if (contents.includes('_vercel/insights/script.js')) {
      found = true;
      break;
    }
  }
  assert.ok(found, 'No static chunk references the Vercel Analytics script endpoint');
});

test('runtime and static-host hardening stay explicit', async () => {
  const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const vercelConfig = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  assert.equal(packageJson.engines.node, '24.14.1');
  assert.equal(packageJson.engines.npm, '11.11.0');
  assert.equal(packageJson.scripts.start, 'node scripts/serve-static.mjs');

  const headerNames = new Set(vercelConfig.headers[0].headers.map((header) => header.key));
  for (const name of [
    'Content-Security-Policy',
    'Permissions-Policy',
    'Referrer-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
  ]) {
    assert.equal(headerNames.has(name), true, `Missing static-host header ${name}`);
  }
});

test('project memory keeps the Maz Works Knowledge Vault identity canonical', async () => {
  const [readme, handoff] = await Promise.all([
    readFile(path.join(root, 'README.md'), 'utf8'),
    readFile(path.join(root, 'docs', 'maz-works', 'HANDOFF.md'), 'utf8'),
  ]);

  assert.match(readme, /Maz Works Knowledge Vault/);
  assert.match(handoff, /Maz Works Knowledge Vault/);
  assert.match(handoff, /JobFilter is one project inside it/);
});

/** Reads the canonical site origin from source so the tests cannot drift from it. */
async function siteUrl() {
  const source = await readFile(path.join(root, 'app', 'site.ts'), 'utf8');
  const match = source.match(/SITE_URL\s*=\s*'([^']+)'/);
  assert.ok(match, 'could not read SITE_URL from app/site.ts');
  return match[1];
}

test('every indexable exported page is listed in the sitemap', async () => {
  const SITE_URL = await siteUrl();
  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

  const notRoutes = new Set(['/404', '/_not-found']);

  const pages = await readdir(exportRoot, { recursive: true, withFileTypes: true });
  const routes = pages
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => {
      const relative = path.relative(exportRoot, path.join(entry.parentPath ?? entry.path, entry.name)).split(path.sep).join('/');
      const route = `/${relative.replace(/\.html$/, '').replace(/\/index$/, '')}`;
      return route === '/index' ? '/' : route;
    })
    .filter((route) => !notRoutes.has(route));

  assert.ok(routes.length > 0, 'found no exported pages to check');

  const missing = [];
  for (const route of routes) {
    const html = await readPage(route);
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
    const url = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
    if (!listed.has(url)) missing.push(route);
  }

  assert.deepEqual(missing, [], `indexable pages missing from the sitemap: ${missing.join(', ')}`);
});

test('every sitemap entry points at a page that was actually exported', async () => {
  const SITE_URL = await siteUrl();
  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  const broken = [];
  for (const url of urls) {
    assert.ok(url.startsWith(SITE_URL), `sitemap entry is off-site: ${url}`);
    const route = url.slice(SITE_URL.length) || '/';
    if (!(await internalTargetExists(route))) broken.push(route);
  }

  assert.deepEqual(broken, [], `sitemap points at missing pages: ${broken.join(', ')}`);
});

test('retired Quick Win page stays reachable but noindexed and points to the Repair', async () => {
  const html = await readPage('/quick-win');
  assert.match(html, /noindex/);
  assert.match(html, /Booking &amp; Enquiry Repair/);
  assert.match(html, /£395/);
  assert.match(html, /\?service=repair#contact/);
  assert.doesNotMatch(html, /£150/);

  const home = await readPage('/');
  assert.doesNotMatch(home, /href="\/quick-win"/);

  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.doesNotMatch(sitemap, /<loc>[^<]+\/quick-win(?:\/)?<\/loc>/);
});

test('retired offer terms are gone from every public page', async () => {
  const routes = [
    '/', '/leak-check', '/faq',
    '/for/salons-and-beauty', '/for/dog-groomers', '/for/garages', '/for/cafes-and-food', '/for/clinics-and-therapists',
  ];
  const retired = [/£150/, /Quick Win/, /£39\/month/, /£795/, /founding/i, /hacked/i];
  for (const route of routes) {
    const html = await readPage(route);
    for (const pattern of retired) {
      assert.doesNotMatch(html, pattern, `${route} still mentions a retired term matching ${pattern}`);
    }
  }
});

test('the guarantee, no-VAT and referral lines appear where Maz\'s decisions require them', async () => {
  const home = await readPage('/');
  const faq = await readPage('/faq');
  assert.match(home, /No VAT added/);
  assert.match(home, /£40 when they become a paying client/);
  assert.match(faq, /No VAT added/);
  assert.match(faq, /£40 by bank transfer/);
  assert.match(faq, /Your agreed repair works within 7 working days/);
});

test('case studies route to a plan and fixed price, not a blanket free demo', async () => {
  for (const route of ['/work/jobfilter', '/work/scrap-finance-partners']) {
    const html = await readPage(route);
    assert.doesNotMatch(html, /free demo/i, `${route} still offers a free demo`);
    assert.match(html, /Ask about a build like this/);
  }
});
