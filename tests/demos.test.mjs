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

test('private demos have a prominent plain-English public page', async () => {
  const [home, demos, sitemap] = await Promise.all([
    readPage('/'),
    readPage('/demos'),
    readFile(path.join(out, 'sitemap.xml'), 'utf8'),
  ]);

  assert.match(home, /href="\/demos"[^>]*>Demos</);
  assert.match(demos, /See the idea working before you pay for the full build/i);
  assert.match(demos, /Built around your business/i);
  assert.match(demos, /Private link \+ access code/i);
  assert.match(demos, /Public examples stay selective by design/i);
  assert.match(demos, /Ask for a private demo/i);
  assert.match(sitemap, /\/demos/);
});

test('demos page builds credibility without fabricated client counts or invented proof', async () => {
  const demos = await readPage('/demos');
  assert.doesNotMatch(demos, /\b\d+\+? clients\b|trusted by|hundreds of|dozens of|five-star clients|client logos/i);
  assert.match(demos, /website direction/i);
  assert.match(demos, /customer journey/i);
  assert.match(demos, /follow-up &amp; admin/i);
  assert.match(demos, /physical \+ digital/i);
});
