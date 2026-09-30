import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const exportRoot = path.join(process.cwd(), 'out');
const NICHES = ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists', 'architects'];

test('each niche guide exports with real examples, a self-check, prices and a tagged Leak Check link', async () => {
  for (const id of NICHES) {
    const html = await readFile(path.join(exportRoot, 'for', `${id}.html`), 'utf8').catch(() => readFile(path.join(exportRoot, 'for', id, 'index.html'), 'utf8'));
    assert.match(html, /Real examples/, `${id}: examples section`);
    assert.match(html, /Check yours in 60 seconds/, `${id}: self-check section`);
    assert.match(html, /£195|From £(795|1,950)/, `${id}: Offer v8 price`);
    assert.doesNotMatch(html, /£(395|249|595|295)\b|From £(495|950|1,500|1,250|2,950)\b/, `${id}: retired price`);
    assert.doesNotMatch(html, /£150 fixed/, `${id}: retired Quick Win price`);
    assert.doesNotMatch(html, /Quick Win/, `${id}: retired Quick Win name`);
    assert.doesNotMatch(html, /hacked/i, `${id}: must not say hacked`);
    assert.match(html, /Not your trade\? Every kind of business is welcome\./, `${id}: broad-audience line`);
    assert.match(html, new RegExp(`/leak-check\\?src=for-${id}`), `${id}: tagged free check link`);
    assert.match(html, /Starter Automation<!-- --> · <!-- -->£195/, `${id}: Starter shown`);
    // Offer v9: Starter is one job. Anything more on a guide is a separately priced add-on or a bigger package.
    const starter = /<strong>Starter Automation<!-- --> · <!-- -->£195<\/strong><p class="mw-example-seen">([^<]*)/.exec(html)?.[1] || '';
    assert.match(starter, /^One job set up to run itself/, `${id}: Starter must read as one job`);
    assert.doesNotMatch(starter, /\b(plus|reminders? go out|follow-up|review requests)\b/i, `${id}: Starter line bundles a second job`);
    assert.doesNotMatch(html, /quoted in your free plan/, `${id}: fixed-price add-ons must show their price`);
    assert.match(html, new RegExp(`/leak-check\\?src=for-${id}&amp;package=Starter%20Automation#leak-check-form`), `${id}: Starter pre-fills the form`);
    assert.match(html, new RegExp(`<link rel="canonical" href="[^"]*/for/${id}"`), `${id}: canonical`);
    // Anonymised on purpose: never name the businesses the examples came from.
    for (const name of ['Vines', 'Yumi', 'Casa Bake', 'Sandiacre', 'Hurley', 'Revive', 'Aeternum', 'Old Smithy', 'Lana', 'Dorsi', 'Elm Tree', 'Pawfect', 'A Small Studio', 'Range Studio', 'Morizzo', 'Arrigoni']) {
      assert.doesNotMatch(html, new RegExp(name, 'i'), `${id}: must not name ${name}`);
    }
  }
});

test('Leak Check page links every niche guide and shows real examples', async () => {
  const html = await readFile(path.join(exportRoot, 'leak-check.html'), 'utf8').catch(() => readFile(path.join(exportRoot, 'leak-check', 'index.html'), 'utf8'));
  assert.match(html, /Built for any business that runs on customers/);
  for (const id of NICHES) assert.match(html, new RegExp(`href="/for/${id}"`));
});

test('niche guides sell systems and outcomes, not website fixes (Maz, 27 Sep positioning)', async () => {
  for (const id of NICHES) {
    const html = await readFile(path.join(exportRoot, 'for', `${id}.html`), 'utf8').catch(() => readFile(path.join(exportRoot, 'for', id, 'index.html'), 'utf8'));
    const title = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] || '';
    assert.doesNotMatch(title, /website|leak|fix/i, `${id}: headline reads as a website-fix service`);
    assert.doesNotMatch(html, /Website leaks|put right|leftover template text replaced|pointed at your real booking page/i, `${id}: website-fix wording`);
  }
});
