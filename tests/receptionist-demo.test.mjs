import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDesk, DEFAULT_CONFIG, decodeConfig, encodeConfig, digitsFrom } from '../app/receptionist-demo/engine.mjs';

// Talk-to-it demo (9 Oct 2026): free, browser-only, answers only from the
// business details it is given, never guesses a price, sends urgent calls on.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const talk = (lines, config = DEFAULT_CONFIG) => {
  const desk = createDesk(config);
  const said = [desk.greet()];
  for (const line of lines) said.push(desk.reply(line));
  return { said, desk };
};

test('a booking enquiry takes a name and number and ends with a summary', () => {
  const { said, desk } = talk(['Do you do MOTs?', 'yes please', "it's sam jones", 'oh seven seven double oh nine double oh one two three', "no that's all"]);
  assert.match(said[1], /Yes, we do MOT/);
  assert.match(said[4], /07700 900123/);
  assert.equal(desk.stage, 'done');
  const summary = desk.summary();
  assert.equal(summary.title, 'New enquiry');
  assert.deepEqual(summary.rows[0], ['Caller', 'Sam Jones · 07700 900123']);
});

test('it never guesses a price it was not given', () => {
  const { said, desk } = talk(['how much is a clutch']);
  assert.match(said[1], /won’t guess/);
  assert.equal(desk.stage, 'name');
});

test('urgent words point to 999 and mark the call urgent', () => {
  const { said, desk } = talk(['my car has broken down outside', 'Priya', '07700 900456', 'no']);
  assert.match(said[1], /ring 999/);
  assert.ok(desk.summary().urgent);
  assert.match(said[4], /urgent/);
});

test('it says it is automated when asked', () => {
  assert.match(talk(['are you a real person']).said[1], /automated receptionist/);
});

test('a link carries the business details and survives the round trip', () => {
  const config = { name: 'Bright Smile Dental', hours: '9 to 5', services: [{ name: 'Check-up' }], urgent: ['toothache'] };
  const back = decodeConfig(encodeConfig(config));
  assert.equal(back.name, 'Bright Smile Dental');
  assert.deepEqual(back.services, [{ name: 'Check-up', price: undefined }]);
  assert.equal(decodeConfig('not-a-real-code!!'), null);
  assert.equal(digitsFrom('double seven'), '77');
});

test('demo pages are not indexed and say how speech is handled', async () => {
  const html = await readFile(path.join(root, 'out', 'receptionist-demo.html'), 'utf8');
  assert.match(html, /noindex/);
  assert.match(html, /Nothing is recorded or sent to Maz Works/);
  assert.doesNotMatch(html.replace(/<script[\s\S]*?<\/script>/g, ''), /\bAI\b/);
  assert.match(await readFile(path.join(root, 'out', 'receptionist-demo', 'make.html'), 'utf8'), /noindex/);
  assert.match(await readFile(path.join(root, 'out', 'after-hours-receptionist.html'), 'utf8'), /href="\/receptionist-demo"/);
});

test('custom links never borrow the example hours, and odd service names are safe', () => {
  const config = decodeConfig(encodeConfig({ name: 'Code Club', services: [{ name: 'C++ tutoring' }, { name: 'Python (beginners)' }] }));
  assert.equal(config.hours, '');
  const { said } = talk(['what time do you open', 'do you teach c++ tutoring'], config);
  assert.match(said[1], /won’t guess/);
  assert.doesNotThrow(() => talk(['python (beginners)?', 'yes'], config));
});
