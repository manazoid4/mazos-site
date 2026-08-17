import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const exportRoot = path.join(root, 'out');

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

test('homepage makes the Maz Works offer obvious in plain language', async () => {
  const html = await readPage('/');
  assert.match(html, /Websites, automation and AI tools built around real business problems/);
  assert.match(html, /small businesses/);
  assert.match(html, /marketing implementation/);
  assert.match(html, /Direct with the builder/);
  assert.match(html, /Live demo first/);
  assert.match(html, /AI with guardrails/);
});

test('homepage keeps selected work concise and positions the flagships accurately', async () => {
  const html = await readPage('/');
  for (const name of ['JobFilter', 'Scrap Finance Partners', 'Agent Nudge', 'MAZ Pocket']) {
    assert.match(html, new RegExp(name));
  }
  assert.match(html, /construction-focused growth and automation product/i);
  assert.match(html, /Contract client build/);
  assert.match(html, /secure client workspace/i);
  assert.match(html, /approval and suppression controls/i);
  assert.doesNotMatch(html, /jobfilter-scan-result\.webp/);
  assert.doesNotMatch(html, /scrap-finance-partners\.webp/);
  assert.doesNotMatch(html, /agent-nudge-demo\.webp/);
  assert.doesNotMatch(html, /deterministic qualification/i);
});

test('homepage leads with a free live demo and transparent competitive pricing', async () => {
  const html = await readPage('/');
  assert.match(html, /Request a free live demo/);
  assert.match(html, /near-working demo/i);
  assert.match(html, /Microsoft Teams/);
  assert.match(html, /£150 fixed/);
  assert.match(html, /From £299/);
  assert.match(html, /From £499/);
  assert.match(html, /£75 to start/);
  assert.match(html, /£75 on completion/);
  assert.match(html, /support from £49\/month/i);
  assert.match(html, /No long contract/i);
  assert.doesNotMatch(html, /problem map/i);
});

test('services and starting points are framed around business outcomes', async () => {
  const html = await readPage('/');
  assert.match(html, /Get more enquiries/);
  assert.match(html, /Reduce repetitive admin/);
  assert.match(html, /Improve customer operations/);
  assert.match(html, /Find and manage opportunities/);
  assert.match(html, /Add AI safely/);
});

test('professional background connects operations experience to Maz Works', async () => {
  const html = await readPage('/');
  assert.match(html, /Professional background/);
  assert.match(html, /ManyPets/);
  assert.match(html, /Complaints Specialist/);
  assert.match(html, /FCA\/DISP/);
  assert.match(html, /Glide/);
  assert.match(html, /Complaints &amp; Escalations Coordinator/);
  assert.match(html, /Problem investigation/);
  assert.match(html, /Process improvement/);
  assert.match(html, /Regulated environments/);
});

test('process, AI guardrails and FAQ stay easy to understand', async () => {
  const html = await readPage('/');
  for (const id of ['services', 'work', 'process', 'client', 'about', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Tell me the problem/);
  assert.match(html, /See a live demo/);
  assert.match(html, /Walk through it together/);
  assert.match(html, /Agree the build/);
  assert.match(html, /finish, test and hand it over/i);
  assert.match(html, /AI where it helps\. Human control where it matters/);
  assert.match(html, /Do I need to know what technology I need/);
  assert.match(html, /What does the free live demo include/);
  assert.match(html, /Can you show me the demo live/);
});

test('contact request is short, static-safe and supports a Teams walkthrough preference', async () => {
  const html = await readPage('/');
  assert.match(html, /Send demo request/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="business"/);
  assert.match(html, /name="problem"/);
  assert.match(html, /name="demoPreference"/);
  assert.match(html, /Send me a live demo link/);
  assert.match(html, /Microsoft Teams walkthrough/);
  assert.match(html, /No account or booking system/);
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
  assert.match(jobfilter, /construction-focused opportunity and workflow product/i);
  assert.match(jobfilter, /Trade-fit qualification/);
  assert.match(jobfilter, /does not guarantee/i);

  const scrap = await readPage('/work/scrap-finance-partners');
  assert.match(scrap, /Scrap Finance Partners case study/);
  assert.match(scrap, /contract client engagement/i);
  assert.match(scrap, /Guarded acquisition automation/);
  assert.match(scrap, /approval/i);

  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /\/work\/jobfilter/);
  assert.match(sitemap, /\/work\/scrap-finance-partners/);
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
  assert.match(org.description, /Web development, business automation and practical AI tools/);
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
