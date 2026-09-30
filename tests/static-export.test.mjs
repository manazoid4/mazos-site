import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
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
// 1250 -> 1400 on 27 Sep (Offer v7): priced optional extras and the care plan added to the homepage.
// 1400 -> 1600 on 27 Sep (Offer v8): each add-on now says in plain words what the customer gets (Maz's request).
// 1600 -> 1900 on 27 Sep (Offer v9): ManyPets-style comparison table, promises and "what's not included" list.
// 1900 -> 1600 on 28 Sep: comparison table and all twelve add-ons moved to /prices; the homepage sells one first step.
// 1600 -> 1850 on 30 Sep: Maz asked to keep the "What changes in your day" explainers (six short storyboards).
// 30 Sep 2026, approved brief v2: five focused homepage sections.
const WORD_BUDGET = 1300;
// Same count as the homepage: all text inside <main>, including header, footer and closed answers.
const CASE_STUDY_WORD_BUDGET = 320;

/** Shared nav chrome (phone menu panel, grouped footer) is the same on every page, so page word budgets skip it. */
function stripNavChrome(html) {
  return html
    .replace(/<div class="mw-menu-panel"[\s\S]*?<\/ul><\/div><\/div>/, ' ')
    .replace(/<div class="mw-footer-groups">[\s\S]*?<\/nav><\/div>/, ' ');
}

function mainWordCount(html) {
  html = stripNavChrome(html);
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
      return (await readFile(candidate, 'utf8')).replaceAll('<!-- -->', '');
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

test('homepage positions Maz Works as a systems builder, not a website-fix shop (Maz, 27 Sep)', async () => {
  const html = await readPage('/');
  // Conversion rebuild (29 Sep): the hero leads with one concrete outcome, then the positioning line.
  assert.match(html, /Systems that turn enquiries (<em>)?into bookings(<\/em>)? and take the admin off you/);
  assert.match(html, /Start with one job from/);
  assert.match(html, /Automation, connected tools and custom software/);
  assert.match(html, /For small businesses and teams, in any trade/);
  for (const smallTime of [/website fix/i, /small fixes/i, /quick fix/i, /Enquiry Repair/, /fix what’s broken/i, /Maz Works is new/i]) {
    assert.doesNotMatch(html, smallTime, `homepage reads as small-time: ${smallTime}`);
  }
  assert.match(html, /Tell me the job/);
  for (const filler of [/Inspect the work before reading more claims/, /Operations thinking/, /What gets measured/, /£150/, /Quick Win/, /£39\/month/, /founding/i, /hacked/i, /class="mw-builds"/]) {
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

test('homepage keeps the fixed terms with its package strip', async () => {
  const html = await readPage('/');
  const strip = html.match(/<ul class="s-trust"[\s\S]*?<\/ul>/)?.[0];
  assert.ok(strip, 'terms strip must sit under the hero');
  for (const item of [/One fixed price/, /No contracts/, /Free demo first/]) {
    assert.match(strip, item);
  }
  assert.ok(html.indexOf('class="s-trust"') < html.indexOf('id="trades"'), 'terms come before the rest of the page');
  assert.match(html, /I’m Manazir. I plan it and build it myself/);
});

test('homepage shows six trade links and a labelled missed-call example (29 Sep rebuild)', async () => {
  const html = await readPage('/');
  for (const guide of ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists', 'architects']) {
    assert.match(html, new RegExp(`href="/for/${guide}"`));
  }
  assert.match(html, /class="s-demo"/);
  assert.match(html, /Missed-call text-back, £95\. Not a real customer\./);
  assert.match(html, /What changes in your day\./);
  assert.match(html, /Illustrations of how it works, not real customers\./);
  // The example plan comes before the form, so owners see what they get first.
  assert.ok(html.includes('href="/what-we-do#example"'));
});

test('what-we-do shows a clearly labelled example report, not a real client', async () => {
  const html = await readPage('/what-we-do');
  assert.match(html, /id="example"/);
  assert.match(html, /A fictional business, made up to show the format/);
  for (const level of ['Fix now', 'Fix soon', 'Working well']) assert.match(html, new RegExp(level));
  assert.match(html, /Total £274/);
});

test('homepage has one set of service routes, not a duplicate problem chooser', async () => {
  const html = await readPage('/');
  assert.doesNotMatch(html, /class="mw-leak-check"/);
});

test('homepage proof is limited to real, honestly labelled work', async () => {
  const html = await readPage('/');
  assert.match(html, /JobFilter/);
  assert.match(html, /My own product · software/);
  assert.match(html, /Live, with paid plans/);
  assert.match(html, /Scrap Finance Partners/);
  assert.match(html, /Designed and built for a specialist finance firm/);
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

test('homepage sells one first step: Starter, four popular add-ons, bigger jobs and a link to every price (28 Sep)', async () => {
  const html = await readPage('/');
  for (const [name, price] of [['Starter Automation', '£195'], ['Business System', 'From £795'], ['Custom Software &amp; Websites', 'From £1,950']]) {
    assert.match(html, new RegExp(name));
    assert.match(html, new RegExp(price, 'i'));
  }
  for (const id of ['starter', 'business-system', 'custom']) assert.ok(html.includes(`/what-we-do#${id}`));
  // The full comparison and all twelve add-ons live on /prices, so the phone page stays short.
  assert.doesNotMatch(html, /id="compare"/);
  assert.doesNotMatch(html, /Team training/);
  assert.match(html, /href="\/prices"/);
  assert.match(html, /Keep It Running[\s\S]{0,30}£19\/month/);
  assert.doesNotMatch(html, /\bAI\b/, 'AI is used behind the scenes, never advertised (Maz, 27 Sep)');
  assert.match(html, /Free Plan &amp; Fixed Quote/);
  assert.match(html, /£40 when they become a paying client/);
  for (const retired of [/£150/, /£395/, /£249/, /£595/, /Quick Win/, /£39\/month/, /founding/i, /Contact Setup/, /Enquiry Check/, /Customer Journey Review/, /From £495/, /From £950/, /From £1,500/, /£295/, /£1,250/, /£2,950/, /£49\/month/]) {
    assert.doesNotMatch(html, retired, `retired offer still on homepage: ${retired}`);
  }
  assert.doesNotMatch(html, /href="\/quick-win"/);
  assert.doesNotMatch(html, /\/contact\?service=/, 'homepage price cards lead to the free plan form, not a second form');

  const prices = await readPage('/prices');
  for (const [name, price] of [['Starter Automation', '£195'], ['Business System', 'From £795'], ['Custom Software &amp; Websites', 'From £1,950']]) {
    assert.match(prices, new RegExp(name));
    assert.match(prices, new RegExp(price));
  }
  for (const id of ['compare', 'extras']) assert.match(prices, new RegExp(`id="${id}"`));
  assert.match(prices, /What’s not included/);
  assert.match(prices, /Google Business Profile setup[\s\S]{0,300}£49/);
  assert.match(prices, /Single website page[\s\S]{0,300}£145/);
  assert.match(prices, /Team training[\s\S]{0,300}£39/);
  assert.match(prices, /Keep It Running[\s\S]{0,30}£19\/month/);
  assert.match(prices, /\/leak-check\?package=Starter%20Automation#leak-check-form/);
  assert.doesNotMatch(prices, /\bAI\b/);
  assert.match(prices, /\/leak-check\?package=Team%20training#leak-check-form/, 'every add-on can pre-fill the free plan form');
  assert.match(prices, /<title>Prices and packages \| Maz Works/);
  assert.match(prices, /Every Maz Works price in one place/);

  const contact = await readPage('/contact');
  for (const price of ['£195', 'From £795', 'From £1,950']) assert.match(contact, new RegExp(price));
  assert.match(contact, /No VAT added/);
});

test('the free plan form lets owners tap their problem, and only the no-JavaScript route asks for an auto-reply', async () => {
  for (const route of ['/', '/leak-check']) {
    const html = await readPage(route);
    assert.match(html, /name="_autoresponse" value="Thanks, I&#x27;ve got your message\. [^"]*within 1 working day/, `${route} form sends no instant confirmation`);
    for (const pick of ['Missed calls', 'Slow replies to enquiries', 'No-shows', 'Chasing quotes']) {
      assert.match(html, new RegExp(`<button type="button" aria-pressed="false"[^>]*>${pick}</button>`), `${route} missing quick pick ${pick}`);
    }
  }
  const source = await readFile(path.join(root, 'app', 'leak-check', 'leak-check-form.tsx'), 'utf8');
  // FormSubmit ignores _autoresponse on AJAX, so the in-page route must neither send it nor promise an email.
  assert.doesNotMatch(source, /_autoresponse: AUTO_REPLY/);
  assert.doesNotMatch(source, /confirmation is on its way/i);
  assert.match(source, /KNOWN_PACKAGES\.includes\(name\)/, '?package= only accepts real package and add-on names');
});

test('the free-check reply promise is 1 working day everywhere (Maz confirmed 27 Sep)', async () => {
  for (const route of ['/', '/leak-check', '/contact', '/faq']) {
    const html = await readPage(route);
    assert.doesNotMatch(html, /5 working days/, `${route} still promises 5 working days`);
    assert.doesNotMatch(html, /2 working days/, `${route} still promises 2 working days`);
  }
  assert.match(await readPage('/'), /within 1 working day/);
});

test('homepage has five sections and keeps process detail on what-we-do (brief v2)', async () => {
 const html = await readPage('/');
 for (const id of ['build','how','check','about']) assert.match(html,new RegExp(`id="${id}"`));
 assert.equal((html.match(/<section /g)||[]).length,5);
 const detail=await readPage('/what-we-do');
 for(const copy of ['How I set it up','Built on what you already use','I never need your passwords','What you own at the end','What I need from you']) assert.ok(detail.includes(copy));
 const words=mainWordCount(html);assert.ok(words<=WORD_BUDGET,`homepage has ${words} words; budget ${WORD_BUDGET}`);
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
  assert.equal(business.address.addressLocality, undefined, 'never publish Maz\'s town');
  assert.equal(business.areaServed.name, 'United Kingdom');
  assert.equal(business.makesOffer[0].price, '0');
  assert.deepEqual(business.makesOffer.slice(1).map((offer) => offer.priceSpecification.minPrice), [195, 795, 1950]);
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

test('retired Quick Win page stays reachable but noindexed and points to Starter Automation', async () => {
  const html = await readPage('/quick-win');
  assert.match(html, /noindex/);
  assert.match(html, /Starter Automation/);
  assert.match(html, /£195/);
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
  // £795 was the retired Growth System; from 27 Sep (Offer v8) it is the Business System price.
  const retired = [/£150/, /Quick Win/, /£39\/month/, /founding/i, /hacked/i, /£395/, /£249/, /£595/, /Enquiry Repair/, /Enquiry Check/, /Contact Setup/];
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
});

// 30 Sep: the free demo is real now, but only after a call (date agreed on the call).
// Case study bodies still lead to the free plan form; the shared nav may link /demos.
test('case studies route to a plan and fixed price, not a blanket free demo', async () => {
  for (const route of ['/work/jobfilter', '/work/scrap-finance-partners']) {
    const html = (await readPage(route)).replace(/\/demos.{0,40}?Free demo/g, '');
    assert.doesNotMatch(html, /free (live )?demo/i, `${route} still offers a free demo`);
    assert.match(html, /\/leak-check\?src=case-[a-z-]+#leak-check-form/, `${route} should lead to the free plan form`);
  }
});

// SHA-256 of personal details that must never ship (Maz's town, county and personal email).
// Stored as hashes so this public test does not publish the details it guards against.
const PERSONAL_DETAIL_HASHES = new Set([
  '686728388e144cc2771391a70ec335299917343cfd49fbcecdf2b3a8d08b7420',
  '71be3b9635b8c45ea65075e9a6e76eefdaab4f1647bc2de8ff74de48697e2cff',
  '7e6bd5d79d7f62f11b4d090f1b2ccd941018523ab009674c15dc452dc6e3252f',
]);

test('no public page or shipped script leaks Maz\'s personal details', async () => {
  const files = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (/\.(html|js|txt|xml|json)$/.test(entry.name)) files.push(full);
    }
  }
  await walk(exportRoot);
  const leaks = [];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    const tokens = new Set(text.toLowerCase().match(/[a-z0-9._%+-]+@[a-z0-9.-]+|[a-z]{4,12}/g) || []);
    if ([...tokens].some((token) => PERSONAL_DETAIL_HASHES.has(createHash('sha256').update(token).digest('hex')))) {
      leaks.push(path.relative(exportRoot, file));
    }
  }
  assert.deepEqual(leaks, [], `personal details found in: ${leaks.join(', ')}`);
});

test('every main page is one tap from the key routes, and the trade guides have a hub', async () => {
  // Navigation audit, 27 Sep: guides were only linked from inside the quote form
  // and phones only saw "Free quote". Now every page carries the same map.
  for (const route of ['/', '/leak-check', '/contact', '/faq', '/lab', '/3d-printing', '/for', '/for/architects']) {
    const html = await readPage(route);
    for (const href of ['/prices', '/for', '/3d-printing', '/faq', '/leak-check', '/for/architects', '/3d-printing#architecture-property']) {
      assert.ok(html.includes(`href="${href}"`), `${route} is missing a link to ${href}`);
    }
    assert.match(html, /class="mw-menu-button"[^>]*aria-expanded="false"/, `${route} has no phone menu button`);
  }
  const hub = await readPage('/for');
  for (const guide of ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists', 'architects']) {
    assert.match(hub, new RegExp(`href="/for/${guide}"`));
  }
  const guide = await readPage('/for/architects');
  assert.match(guide, /"@type":"BreadcrumbList"/);
  assert.match(guide, /Illustrations made for this page, not client work/);
  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /mazworks\.uk\/for</);
});

test('architecture drawings exist and are labelled illustrative', async () => {
  for (const name of ['scaffold-elevation', 'floor-plan', 'massing-model', 'site-plan']) {
    const svg = await readFile(path.join(root, 'public', 'architecture', `${name}.svg`), 'utf8');
    assert.match(svg, /ILLUSTRATIVE ONLY/, `${name}.svg is not labelled illustrative`);
  }
});

test('six wayfinding helps big sites use are in place', async () => {
  const home = await readPage('/');
  // The shorter homepage uses package links; the detail page owns the long-form navigation.
  for(const id of ['starter','business-system','custom']) assert.ok(home.includes(`/what-we-do#${id}`));
  // 2. Human site map lists every trade guide and case study.
  const map = await readPage('/site-map');
  for (const href of ['/for/architects', '/for/garages', '/work/jobfilter', '/leak-check', '/whats-new']) assert.ok(map.includes(`href="${href}"`), `site map missing ${href}`);
  // 3. What's new stays reachable from the site map; the footer links the site map (29 Sep: off the main nav).
  const news = await readPage('/whats-new');
  assert.match(news, /Easier to find your way around/);
  assert.ok(home.includes('href="/site-map"'));
  assert.ok(!home.includes('href="/whats-new"'), 'What’s new is for buyers only once rewritten; kept off the nav for now');
  // 4. A helpful not-found page.
  const nf = await readFile(path.join(exportRoot, '404.html'), 'utf8');
  assert.match(nf, /That page has moved or never existed/);
  assert.ok(nf.includes('href="/site-map"') && nf.includes('href="/for"'));
  // 5. Back to top.
  assert.match(home, /class="mw-back-top" href="#main-content"/);
  // 6. The header marks the current section.
  const guide = await readPage('/for/architects');
  assert.match(guide, /href="\/for" aria-current="page"/);
});

test('scroll reveal hides nothing without JavaScript and respects reduced motion (Codex brief 05)', async () => {
  const html = await readPage('/');
  for (const id of ['how']) {
    assert.match(html, new RegExp(`id="${id}" data-reveal`), `#${id} should ease in on scroll`);
  }
  assert.doesNotMatch(html, /style="[^"]*opacity:\s*0/, 'no content may be hidden in the static HTML');
  assert.match(html, /class="s-demo" [^>]*data-pause-offscreen/, 'hero demo pauses off-screen');
  const css = await readFile(path.join(root, 'app', 'sales.css'), 'utf8');
  const hidden = css.match(/[^{}]*:not\(\[data-shown\]\)[^{]*\{[^}]*\}/g) || [];
  assert.ok(hidden.length > 0);
  for (const rule of hidden) assert.match(rule, /^\s*\.js-reveal /, `hidden state must be scoped to .js-reveal: ${rule.trim().slice(0, 80)}`);
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.js-reveal/, 'reveal only runs when motion is allowed');
});

test('the hero demo animation survives CSS minification', async () => {
  const cssDir = path.join(exportRoot, '_next', 'static', 'chunks');
  const files = (await readdir(cssDir)).filter((name) => name.endsWith('.css'));
  const css = (await Promise.all(files.map((name) => readFile(path.join(cssDir, name), 'utf8')))).join('\n');
  for (const name of ['s-demo-in-1', 's-demo-in-2', 's-demo-in-3', 's-demo-typing']) {
    assert.match(css, new RegExp(`animation:[^;}]*\\b${name}\\b`), `${name} must be applied with a duration, not stripped to animation:none`);
  }
});
