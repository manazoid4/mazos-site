import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const exportRoot = path.join(root, 'out');

// Homepage word budget (visible words in <main>, form labels included). Raise it only on purpose.
const WORD_BUDGET = 620;
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

test('homepage leads with a plain offer and none of the old filler', async () => {
  const html = await readPage('/');
  assert.match(html, /I fix what’s costing you customers/);
  assert.match(html, /From £150, fixed price/);
  assert.match(html, /Tell me the problem/);
  for (const filler of [/Inspect the work before reading more claims/, /Operations thinking/, /What gets measured/, /href="\/whats-new/]) {
    assert.doesNotMatch(html, filler);
  }
});

test('homepage hero names all four kinds of build, each one a route into the enquiry', async () => {
  const html = await readPage('/');
  const band = html.match(/<ul class="mw-builds"[\s\S]*?<\/ul>/)?.[0];
  assert.ok(band, 'the hero must list what gets built, not just websites');
  for (const name of ['Websites', 'Automation', 'Software', 'Physical products']) {
    assert.match(band, new RegExp(`<strong>${name}</strong>`));
  }
  for (const id of ['website', 'automation', 'software']) {
    assert.match(band, new RegExp(`\\?service=${id}#contact`));
  }
  assert.match(band, /href="\/3d-printing"/);
  // The old hero named websites, booking and admin only. Keep that narrowing gone.
  assert.doesNotMatch(html, /Websites, booking and admin fixes/);
});

test('homepage work stays short and labelled accurately', async () => {
  const html = await readPage('/');
  for (const name of ['JobFilter', 'Scrap Finance Partners', 'Agent Nudge', 'MAZ Pocket']) {
    assert.match(html, new RegExp(name));
  }
  assert.match(html, /Full build and setup/);
  assert.match(html, /Contract client build/);
  // Unfinished work must stay labelled as unfinished.
  assert.match(html, /In progress/);
  assert.match(html, /Ask about this build/);
  assert.doesNotMatch(html, /href="https:\/\/github.com\/manazoid4\/maz-pocket"/);
  assert.doesNotMatch(html, /jobfilter-scan-result\.webp/);
});

test('homepage pricing is fixed, bounded and links straight to an enquiry', async () => {
  const html = await readPage('/');
  assert.match(html, /£150 fixed/);
  assert.match(html, /From £299/);
  assert.match(html, /From £499/);
  assert.match(html, /£75 to start/);
  assert.match(html, /£75 on completion/);
  assert.match(html, /Support from £49\/month/);
  assert.match(html, /no long contract/i);
  assert.match(html, /One workflow, not a whole department/);
  assert.match(html, /href="\/quick-win"/);
  for (const id of ['quick-win', 'website', 'automation']) {
    assert.match(html, new RegExp(`\\?service=${id}#contact`));
  }
  assert.doesNotMatch(html, /Rescue Sprint/i);
});

test('homepage is five short blocks with four visible steps', async () => {
  const html = await readPage('/');
  for (const id of ['work', 'pricing', 'services', 'process', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Tell me the problem/);
  assert.match(html, /I suggest the fix/);
  assert.match(html, /We agree the price/);
  assert.match(html, /I build and hand over/);
  assert.match(html, /href="\/faq"/);
  // Keep the page short: visible words inside <main>, form labels included.
  const words = mainWordCount(html);
  assert.ok(words <= WORD_BUDGET, `homepage has ${words} words; budget is ${WORD_BUDGET}`);
});

test('contact request submits in-page instead of depending on the visitor email app', async () => {
  const html = await readPage('/');
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
  assert.match(html, /Microsoft Teams walkthrough/);
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
  assert.match(scrap, /contract client build/i);
  assert.match(scrap, /Outreach with approval steps/);
  assert.doesNotMatch(scrap, /paid (client|contract|engagement)|client paid/i);
  assert.match(scrap, /approval/i);

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

test('structured data reflects Maz Works founder and service positioning', async () => {
  const html = await readPage('/');
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(ldMatch, 'Homepage is missing JSON-LD');
  const data = JSON.parse(ldMatch[1]);
  const graph = data['@graph'];
  const person = graph.find((node) => node['@type'] === 'Person');
  const org = graph.find((node) => node['@type'] === 'Organization');
  assert.equal(person.name, 'Manazir Hussain');
  assert.equal(person.jobTitle, 'Founder and Software Builder');
  assert.ok(person.sameAs.includes('https://github.com/manazoid4'));
  assert.match(org.description, /Websites, software, automation and useful physical products/);
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

  // Next's own error pages are not routes anyone should be pointed at.
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
    // A page carrying its own noindex is deliberately out of the sitemap.
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

test('Quick Win page sells one fix, reassures on existing systems and routes to the enquiry form', async () => {
  const html = await readPage('/quick-win');
  assert.match(html, /£150/);
  assert.match(html, /Works with what you have/);
  for (const platform of ['Wix', 'Squarespace', 'WordPress', 'Square', 'Fresha', 'Booksy', 'Google Business Profile']) {
    assert.ok(html.includes(platform), `Quick Win page should name ${platform}`);
  }
  assert.match(html, /No password sharing/);
  assert.match(html, /\?service=quick-win#contact/);

  const home = await readPage('/');
  assert.match(home, /href="\/quick-win"/);
  assert.match(home, /\?service=quick-win#contact/);
});
