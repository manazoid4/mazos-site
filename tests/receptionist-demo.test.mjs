import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDesk, DEFAULT_CONFIG, cleanConfig, decodeConfig, encodeConfig, digitsFrom, safeText, spoken } from '../app/receptionist-demo/engine.mjs';

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
  const { said, desk } = talk(['Do you do MOTs?', 'yes please', "it's sam jones", 'oh seven seven double oh nine double oh one two three', 'yes that is right', "no that's all"]);
  assert.match(said[1], /Yes, we do MOT/);
  assert.match(said[4], /read that back: 07700 900123/);
  assert.equal(desk.stage, 'done');
  const summary = desk.summary();
  assert.equal(summary.title, 'New enquiry');
  assert.deepEqual(summary.rows[0], ['Caller', 'Sam Jones · 07700 900123']);
  assert.deepEqual(summary.rows[1], ['Number check', 'Confirmed by caller']);
});

test('it never guesses a price it was not given', () => {
  const { said, desk } = talk(['how much is a clutch']);
  assert.match(said[1], /won’t guess/);
  assert.equal(desk.stage, 'name');
});

test('business-urgent words are flagged for the owner without a 999 referral', () => {
  const { said, desk } = talk(['my car has broken down outside', 'Priya', '07700 900456', 'yes', 'no']);
  assert.match(said[1], /marked this as urgent/);
  assert.doesNotMatch(said[1], /999/);
  assert.ok(desk.summary().urgent);
  assert.match(said[5], /urgent/);
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

// Sprint 1 (9 Oct 2026): fixes from the probe run on the first version.
const NUMBER_LINES = ['book a service', 'Sam'];

test('"no" inside a sentence is not a goodbye', () => {
  const { said, desk } = talk(['my car makes no noise when I start it']);
  assert.notEqual(desk.stage, 'done');
  assert.match(said[1], /take a message/);
  assert.equal(talk(['bye']).desk.stage, 'done');
  assert.equal(talk(['no thanks, bye']).desk.stage, 'done');
});

test('"no, I also need brakes" at the end of a call is a new request', () => {
  const { said, desk } = talk(['do you do tyres', 'yes', 'Sam', '07700900123', 'yes', 'no, I also need brakes']);
  assert.match(said[6], /we do brakes/);
  assert.equal(desk.stage, 'offer');
  assert.match(desk.summary().rows.find(([label]) => label === 'Wants')[1], /Brakes/);
});

test('a question at the name stage is answered, then the name is asked again', () => {
  const { said, desk } = talk(['do you do MOT', 'yes', 'sorry how much is it?']);
  assert.match(said[3], /from £45/);
  assert.doesNotMatch(desk.summary().rows[0][1], /Sorry|Much/);
  const hours = talk(['book a service', 'when are you open?']);
  assert.match(hours.said[2], /Monday to Friday.*Can I take your name\?$/);
  assert.equal(hours.desk.stage, 'name');
  assert.equal(talk(['book a service', 'hello?']).desk.stage, 'name');
});

test('refusing to give a name is accepted politely', () => {
  const { said, desk } = talk(['book an mot', "I'd rather not say"]);
  assert.match(said[2], /No problem/);
  assert.equal(desk.stage, 'number');
  assert.equal(desk.summary().rows[0][1], 'Caller (no name given)');
  assert.equal(talk(['book an mot', 'no']).desk.stage, 'number');
  // Long sentences are not names; a second miss moves on.
  const bad = talk(['book an mot', 'blah blah blah blah', 'blah blah blah blah']);
  assert.equal(bad.desk.stage, 'number');
  assert.equal(bad.desk.summary().rows[0][1], 'Caller (no name given)');
});

test('a number given at the name question is checked, then the name is asked', () => {
  const { said, desk } = talk(['book an mot', 'oh seven seven double oh nine double oh one two three', 'that is right', 'Jo Bloggs']);
  assert.match(said[2], /read that back: 07700 900123/);
  assert.match(said[3], /your name\?/);
  assert.equal(desk.stage, 'more');
  assert.deepEqual(desk.summary().rows[0], ['Caller', 'Jo Bloggs · 07700 900123']);
  const both = talk(['book an mot', 'Sam, 07700 900123', 'yes']);
  assert.equal(both.desk.summary().rows[0][1], 'Sam · 07700 900123');
});

test('urgent words are heard at the name, number and confirm stages', () => {
  const name = talk(['book a service', "there's smoke coming from the engine"]);
  assert.match(name.said[2], /ring 999/);
  assert.match(name.said[2], /Can I take your name\?$/);
  assert.equal(name.desk.stage, 'name');
  assert.ok(name.desk.summary().urgent);
  assert.match(name.desk.summary().rows[0][1], /No details left/);

  const number = talk([...NUMBER_LINES, 'I am stuck in the road']);
  assert.match(number.said[3], /marked this as urgent/);
  assert.doesNotMatch(number.said[3], /999/);
  assert.match(number.said[3], /best number/);
  assert.equal(number.desk.stage, 'number');

  const confirm = talk([...NUMBER_LINES, '07700 900123', 'the car is blocking the road']);
  assert.match(confirm.said[4], /urgent.*read that back: 07700 900123/);
  assert.equal(confirm.desk.stage, 'confirm');
  assert.ok(confirm.desk.summary().urgent);
});

test('the number is read back and only kept once confirmed', () => {
  const plus = talk([...NUMBER_LINES, '+44 7700 900123']);
  assert.match(plus.said[3], /read that back: 07700 900123\. Is that right\?/);
  assert.equal(plus.desk.stage, 'confirm');
  assert.equal(talk([...NUMBER_LINES, '0044 7700 900123']).desk.stage, 'confirm');
  assert.equal(talk([...NUMBER_LINES, '0113 496 0123']).desk.stage, 'confirm');
  const done = talk([...NUMBER_LINES, '+44 7700 900123', 'yes', 'that is all']);
  assert.deepEqual(done.desk.summary().rows.slice(0, 2), [['Caller', 'Sam · 07700 900123'], ['Number check', 'Confirmed by caller']]);
});

test('a number can be corrected: whole, partial, or from scratch', () => {
  const partial = talk([...NUMBER_LINES, '07700 900124', 'no sorry it ends 123']);
  assert.match(partial.said[4], /read that back: 07700 900123/);
  assert.equal(partial.desk.stage, 'confirm');
  const whole = talk([...NUMBER_LINES, '07700 900124', 'no, it is 07700 900999']);
  assert.match(whole.said[4], /07700 900999/);
  const again = talk([...NUMBER_LINES, '07700 900124', 'no']);
  assert.match(again.said[4], /right number/);
  assert.equal(again.desk.stage, 'number');
  const fixed = talk([...NUMBER_LINES, '07700 900124', 'no sorry it ends 123', 'yes']);
  assert.equal(fixed.desk.stage, 'more');
  assert.equal(fixed.desk.summary().rows[0][1], 'Sam · 07700 900123');
});

test('after two corrections the number is kept but flagged', () => {
  const { desk } = talk([...NUMBER_LINES, '07700 900124', 'no', '07700 900125', 'no', '07700 900126', 'no']);
  assert.equal(desk.stage, 'more');
  assert.deepEqual(desk.summary().rows[1], ['Number check', 'Not confirmed: ring to check']);
});

test('garbage is never stored as the number', () => {
  const { said, desk } = talk([...NUMBER_LINES, 'what', 'I said seven']);
  assert.match(said[3], /digit by digit/);
  assert.equal(desk.stage, 'more');
  const rows = desk.summary().rows;
  assert.equal(rows[0][1], 'Sam');
  assert.ok(!rows.some(([label]) => label === 'Number check'));
  assert.equal(rows.at(-1)[1], 'No number left: check caller ID');
});

test('only a short yes counts as yes', () => {
  const { said, desk } = talk(['do you do MOT', 'please can you tell me the price']);
  assert.match(said[2], /from £45/);
  assert.equal(desk.stage, 'offer');
  assert.equal(talk(['do you do MOT', 'yes please']).desk.stage, 'name');
  assert.equal(talk(['do you do MOT', 'can you call me back tomorrow']).desk.stage, 'name');
  assert.equal(talk(['do you do MOT', 'no thanks']).desk.stage, 'more');
});

test('"close to" is about where, not opening hours', () => {
  assert.match(talk(['are you close to Leeds']).said[1], /We cover the town/);
  assert.match(talk(['what time do you close?']).said[1], /Monday to Friday/);
  assert.match(talk(['are you open on saturday']).said[1], /Saturday/);
});

test('link text is plain: no links, no numbers, prices in £ only', () => {
  const spoof = decodeConfig(encodeConfig({
    name: 'Barclays Fraud Team 07700 900123',
    hours: 'ring 09061234567 now',
    callback: 'visit https://evil.example/pay now',
    services: [{ name: 'Card number 4111 1111 1111 1111' }, { name: 'Check-up', price: 'from £45' }, { name: 'Scan', price: 'ring 09061234567' }],
    urgent: ['toothache', '07700900123'],
  }));
  assert.equal(spoof.name, DEFAULT_CONFIG.name);
  assert.equal(spoof.hours, DEFAULT_CONFIG.hours);
  assert.equal(spoof.callback, 'on the next working day');
  assert.deepEqual(spoof.services, DEFAULT_CONFIG.services);
  const custom = cleanConfig({
    name: 'Bright Smile Dental',
    hours: 'ring 09061234567 now',
    services: [{ name: 'Card number 4111 1111 1111 1111' }, { name: 'Check-up', price: 'from £45' }, { name: 'Scan', price: 'ring 09061234567' }, { name: 'Whitening', price: '£45.00 per session' }],
    urgent: ['toothache', '07700900123'],
  });
  assert.equal(custom.hours, '');
  assert.deepEqual(custom.services, [{ name: 'Check-up', price: 'from £45' }, { name: 'Scan', price: undefined }, { name: 'Whitening', price: '£45.00 per session' }]);
  assert.deepEqual(custom.urgent, ['toothache']);
  assert.equal(cleanConfig({ name: 'x'.repeat(80) }).name.length, 40);
  assert.equal(safeText('see www.bad.com or bad.com/pay <now>\u0007 ok', 80), 'see or now ok');
  assert.equal(cleanConfig({ name: 'Code Club', hours: 'Mon 9 to 5' }).hours, 'Mon 9 to 5');
  assert.equal(cleanConfig(DEFAULT_CONFIG).hours, DEFAULT_CONFIG.hours);
});

test('spoken() reads long digit runs one digit at a time', () => {
  assert.equal(spoken('That’s 07700 900123.'), 'That’s 0 7 7 0 0, 9 0 0, 1 2 3.');
  assert.equal(spoken('Let me read that back: 07700 900123. Is that right?'), 'Let me read that back: 0 7 7 0 0, 9 0 0, 1 2 3. Is that right?');
  assert.equal(spoken('07700900123'), '0 7 7 0 0, 9 0 0, 1 2 3');
  assert.equal(spoken('MOT is from £45 and open 8am to 12 noon'), 'MOT is from £45 and open 8am to 12 noon');
});

test('hints() suggests something to say at every stage, and each one works', () => {
  const desk = createDesk(DEFAULT_CONFIG);
  const open = desk.hints();
  assert.ok(open.length >= 2 && open.length <= 3);
  assert.ok(open.includes('Are you open on Saturday?'));
  assert.ok(open.includes('How much is an MOT?'));
  assert.ok(open.some((hint) => /broken down/.test(hint)));
  for (const hint of open) {
    const fresh = createDesk(DEFAULT_CONFIG);
    assert.doesNotMatch(fresh.reply(hint), /take a message for the team/);
  }
  // A custom desk only offers a price question for a service that has a price.
  const plain = createDesk({ name: 'Code Club', services: [{ name: 'Tutoring' }] }).hints();
  assert.ok(!plain.some((hint) => /How much/.test(hint)));
  desk.reply('book a service');
  assert.equal(desk.stage, 'name');
  assert.deepEqual(desk.hints(), ['It’s Sam']);
  desk.reply('Sam');
  assert.deepEqual(desk.hints(), ['07700 900123']);
  desk.reply(desk.hints()[0]);
  assert.equal(desk.stage, 'confirm');
  const [yes, no] = desk.hints();
  assert.equal(yes, 'Yes, that’s right');
  assert.match(no, /^No, it ends \d{3}$/);
  desk.reply(no);
  assert.equal(desk.stage, 'confirm');
  assert.notEqual(desk.summary().rows[0][1], 'Sam · 07700 900123');
  desk.reply(yes);
  assert.equal(desk.stage, 'more');
  assert.equal(desk.hints()[0], 'No, that’s all');
  desk.reply(desk.hints()[0]);
  assert.equal(desk.stage, 'done');
  assert.deepEqual(desk.hints(), []);
});

test('replies stay short and never say AI', () => {
  const { said } = talk(['are you a robot', 'do you do MOT', 'yes', 'Sam', '07700 900123', 'yes', 'no, I also need brakes', 'no']);
  for (const line of said) {
    assert.doesNotMatch(line, /\bAI\b/);
    assert.ok((line.match(/[.?!](\s|$)/g) ?? []).length <= 4, line);
  }
});

test('possible danger gets the 999 line; everyday trade words do not', () => {
  for (const line of ['my van is on fire', 'I can smell gas in the kitchen', 'someone is injured', 'there is smoke coming from the boiler']) {
    assert.match(talk([line]).said[1], /ring 999 now/, line);
  }
  for (const line of ['do you do emergency call-outs', 'can you fit a smoke alarm', 'my back hurts when I lift']) {
    assert.doesNotMatch(talk([line]).said[1], /999/, line);
  }
});

test('the goodbye never promises a callback without a confirmed number', () => {
  const { said, desk } = talk(['book an mot', 'Sam', "I'd rather not say", "no that's all"]);
  assert.match(said.at(-1), /couldn’t take a number/);
  assert.doesNotMatch(said.at(-1), /call you back/);
  assert.match(desk.summary().rows.at(-1)[1], /No number left/);
});

test('the service page hero opens the talk-to-it demo', async () => {
  const html = await readFile(path.join(root, 'out', 'after-hours-receptionist.html'), 'utf8');
  assert.match(html, /Talk to the receptionist/);
  assert.ok(html.includes('href="/receptionist-demo"'));
});

test('try-it-as-your-business presets: the closest service wins, acronyms survive, no prices invented', async () => {
  const { presetConfig, PRESETS } = await import('../app/receptionist-demo/presets.mjs');
  const plumber = presetConfig('Smith & Sons Plumbing', 'plumbing');
  assert.equal(plumber.name, 'Smith & Sons Plumbing');
  assert.ok(plumber.services.every((service) => !service.price));
  assert.match(talk(['do you do boiler repair'], plumber).said[1], /we do boiler repair\./);
  assert.match(talk(['how much is a boiler repair'], plumber).said[1], /won’t guess/);
  assert.match(talk(['can you fit an EV charger'], presetConfig('Volt Electrical', 'electrician')).said[1], /we do EV charger/);
  for (const bad of ['www.example.com', 'Call 0906 123 4567', '   ']) assert.equal(presetConfig(bad, 'garage'), null, bad);
  const other = presetConfig('Bean There Cafe', 'other');
  const { desk } = talk([], other);
  assert.deepEqual(desk.hints(), ['Can you take a message?', 'Are you open tomorrow?']);
  assert.match(talk(['Can you take a message?'], other).said[1], /^Of course\. Can I take your name\?$/);
  assert.ok(PRESETS.length >= 8);
});
