import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const exportRoot = path.join(process.cwd(), 'out');
const NICHES = ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists'];

test('each niche guide exports with real examples, a self-check, prices and a tagged Leak Check link', async () => {
  for (const id of NICHES) {
    const html = await readFile(path.join(exportRoot, 'for', `${id}.html`), 'utf8').catch(() => readFile(path.join(exportRoot, 'for', id, 'index.html'), 'utf8'));
    assert.match(html, /Real examples/, `${id}: examples section`);
    assert.match(html, /Check yours in 60 seconds/, `${id}: self-check section`);
    assert.match(html, /£150 fixed/, `${id}: Quick Win price`);
    assert.match(html, new RegExp(`/leak-check\\?src=for-${id}`), `${id}: tagged Leak Check link`);
    assert.match(html, new RegExp(`<link rel="canonical" href="[^"]*/for/${id}"`), `${id}: canonical`);
    // Anonymised on purpose: never name the businesses the examples came from.
    for (const name of ['Vines', 'Yumi', 'Casa Bake', 'Sandiacre', 'Hurley', 'Revive', 'Aeternum', 'Old Smithy', 'Lana', 'Dorsi', 'Elm Tree', 'Pawfect']) {
      assert.doesNotMatch(html, new RegExp(name, 'i'), `${id}: must not name ${name}`);
    }
  }
});

test('Leak Check page links every niche guide and shows real examples', async () => {
  const html = await readFile(path.join(exportRoot, 'leak-check.html'), 'utf8').catch(() => readFile(path.join(exportRoot, 'leak-check', 'index.html'), 'utf8'));
  assert.match(html, /What I found on local websites this month/);
  for (const id of NICHES) assert.match(html, new RegExp(`href="/for/${id}"`));
});
