import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDesk, DEFAULT_CONFIG, decodeConfig, encodeConfig, digitsFrom, normaliseUkNumber, validPhone } from '../app/receptionist-demo/engine.mjs';

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
  const { said, desk } = talk(['Do you do MOTs?', 'yes please', "it's sam jones", 'oh seven seven double oh nine double oh one two three', 'yes', "no that's all"]);
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
  const { said, desk } = talk(['my car has broken down outside', 'Priya', '07700 900456', 'yes', 'no']);
  assert.match(said[1], /mark this as urgent/);
  assert.doesNotMatch(said[1], /999/);
  assert.ok(desk.summary().urgent);
  assert.match(said[3], /Is that correct/);
  assert.match(said[4], /confirmed/);
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
  assert.match(html, /Maz Works does not receive or store this conversation/);
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

test('validates UK callback numbers and handles +44 without guessing', () => {
  assert.equal(validPhone('07700 900123'), true);
  assert.equal(validPhone('+44 7700 900123'), true);
  assert.equal(normaliseUkNumber('+44 7700 900123'), '07700900123');
  assert.equal(validPhone('random words'), false);
  assert.equal(validPhone('1234567890'), false);
  assert.equal(validPhone('0770090012345'), false);
});

test('asks caller to confirm a number and accepts a correction', () => {
  const { said, desk } = talk([
    'Do you do brakes?', 'yes', 'Sam',
    '07700 900123', 'no', '+44 7700 900456', 'yes', 'no thanks',
  ]);
  assert.match(said[4], /Is that correct/);
  assert.match(said[5], /again/);
  assert.match(said[6], /07700 900456/);
  assert.match(desk.summary().rows[0][1], /07700 900456/);
  assert.equal(desk.stage, 'done');
});

test('never claims a callback when the number was not confirmed', () => {
  const { said, desk } = talk([
    'Please book an MOT', 'Sam', 'no digits', 'not a number', 'something else', 'no thanks',
  ]);
  assert.match(said.at(-2), /not confirm a usable number/);
  assert.match(said.at(-1), /could not confirm your callback number/);
  const summary = desk.summary();
  assert.match(summary.rows[0][1], /not confirmed/);
  assert.match(summary.rows.at(-1)[1], /No verified callback number/);
});

test('safety warnings distinguish business urgency from immediate danger', () => {
  const breakdown = talk(['my car has broken down']).said[1];
  const danger = talk(['my vehicle is on fire']).said[1];
  assert.match(breakdown, /urgent/);
  assert.doesNotMatch(breakdown, /999/);
  assert.match(danger, /999/);
});

test('demo page offers a direct talking experience from the service hero', async () => {
  const html = await readFile(path.join(root, 'out', 'after-hours-receptionist.html'), 'utf8');
  assert.match(html, /Talk to the receptionist/);
  assert.ok(html.includes('href="/receptionist-demo"'));
});
