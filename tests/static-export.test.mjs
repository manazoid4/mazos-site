import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
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

test('homepage names every featured project and stays clear of retired junior-AI positioning', async () => {
  const html = await readPage('/');
  assert.match(html, /JobFilter/);
  assert.match(html, /Scrap Finance Partners/);
  assert.match(html, /Agent Nudge/);
  assert.match(html, /OpenFlowKit/);
  assert.match(html, /jobfilter-scan-result\.webp/);
  assert.match(html, /jobfilter-scan-result-mobile\.webp/);
  assert.doesNotMatch(html, /junior applied-AI/i);
  assert.doesNotMatch(html, /Junior Applied AI Engineer/);
  assert.doesNotMatch(html, /MAZos/);
  assert.doesNotMatch(html, /Operational B2B/);
});

test('homepage exposes employment, project, and collaboration contact paths', async () => {
  const html = await readPage('/');
  assert.match(html, /Hire me/);
  assert.match(html, /Commission a project/);
  assert.match(html, /Collaborate/);
  assert.match(html, /mailto:manazoid4@gmail\.com/);
});

test('every featured project case study has a stated limitation and at least one evidence link', async () => {
  const html = await readPage('/');
  for (const id of ['jobfilter', 'scrap-finance-partners', 'agent-nudge']) {
    const marker = `id="${id}"`;
    const start = html.indexOf(marker);
    assert.notEqual(start, -1, `Missing project section #${id}`);
    const end = html.indexOf('</article>', start);
    const section = html.slice(start, end);
    assert.match(section, /Current limitation/, `#${id} is missing a stated limitation`);
    assert.match(section, /href="https?:\/\//, `#${id} is missing an external evidence link`);
  }
});

test('metadata and accessible navigation are present on both pages', async () => {
  for (const route of ['/', '/mazos']) {
    const html = await readPage(route);
    assert.match(html, /href="#main-content">Skip to main content/);
    const target = /<([a-z]+)\b(?=[^>]*\bid="main-content")(?=[^>]*\btabindex="-1")[^>]*>/i.exec(html);
    assert.ok(target, 'Skip target must be programmatically focusable');
    assert.equal(target[1].toLowerCase(), 'section', 'Skip target should be the first content section');
    const navigationEnd = html.indexOf('</header>');
    assert.notEqual(navigationEnd, -1, 'Page must include its navigation header');
    assert.ok(target.index > navigationEnd, 'Skip target must follow the navigation header in document order');
    assert.match(html, /rel="canonical"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(html, /<(?:div|pre)[^>]*aria-label=/);
  }
});

test('internal links and assets resolve inside the static export', async () => {
  for (const route of ['/', '/mazos']) {
    const html = await readPage(route);
    const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const reference of references) {
      if (/^(?:https?:|mailto:|data:|#)/.test(reference)) continue;
      assert.equal(await internalTargetExists(reference), true, `${route} has missing target ${reference}`);
    }
  }
});

test('same-page fragment links point to existing IDs', async () => {
  const html = await readPage('/');
  const fragments = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  for (const fragment of fragments) {
    assert.match(html, new RegExp(`id="${fragment}"`), `Missing fragment target #${fragment}`);
  }
});

test('legacy case-study route is removed from discovery and redirects attention to outcomes', async () => {
  const home = await readPage('/');
  const moved = await readPage('/mazos');
  const sitemap = await readFile(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  assert.doesNotMatch(home, /href="\/mazos"/);
  assert.doesNotMatch(sitemap, /<loc>[^<]+\/mazos(?:\/)?<\/loc>/);
  assert.match(moved, /This page has moved/);
  assert.match(moved, /noindex/);
});

test('new-tab links declare a safe opener relationship', async () => {
  for (const route of ['/', '/mazos']) {
    const html = await readPage(route);
    const newTabLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((match) => match[0]);
    for (const anchor of newTabLinks) {
      assert.match(anchor, /rel="[^"]*noreferrer[^"]*"/);
    }
  }
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
