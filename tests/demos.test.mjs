import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const out = path.join(root, 'out');

async function readPage(route) {
  const name = route.replace(/^\//, '');
  for (const candidate of [path.join(out, `${name}.html`), path.join(out, name, 'index.html')]) {
    try { return (await readFile(candidate, 'utf8')).replaceAll('<!-- -->', ''); } catch {}
  }
  throw new Error(`Missing static page for ${route}`);
}

test('free live demo is reachable and funnels into the free plan', async () => {
  const [home, demos, sitemap] = await Promise.all([
    readPage('/'),
    readPage('/demos'),
    readFile(path.join(out, 'sitemap.xml'), 'utf8'),
  ]);

  assert.match(home, /href="\/demos[^"]*"[^>]*>[^<]*(live demo|watch your own)/i);
  assert.match(demos, /Watch your own system run, (<em>)?in your name/i);
  assert.match(demos, /Business name/);
  assert.match(demos, /Play my demo/);
  assert.match(demos, /Nothing is saved or sent/i);
  assert.match(demos, /Free plan and fixed price/i);
  assert.match(demos, /Ask for a private demo/i);
  assert.match(sitemap, /\/demos/);
});

test('demos page builds credibility without fabricated client counts or invented proof', async () => {
  const demos = await readPage('/demos');
  assert.doesNotMatch(demos, /\b\d+\+? clients\b|trusted by|hundreds of|dozens of|five-star clients|client logos/i);
  assert.match(demos, /not a real customer/i);
});
