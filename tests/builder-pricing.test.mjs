import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import ts from 'typescript';

// Batch 2: the "Build my system" price comes only from quotePlan() in app/offers.ts.
const modules = {};
for (const name of ['offers', 'systems']) {
  const source = await fs.readFile(`app/${name}.ts`, 'utf8');
  modules[name] = {};
  new Function('exports', 'require', ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(modules[name], () => modules.offers);
}
const { quotePlan, getOffer, getExtra, priceAmount } = modules.offers;
const { getSystem, HEADACHE_PICKS } = modules.systems;
const plan = (...ids) => quotePlan(ids.map((id) => getSystem(id)));

test('nothing picked: start with Starter Automation', () => {
  const quote = plan();
  assert.equal(quote.offer.id, 'starter');
  assert.equal(quote.totalLabel, getOffer('starter').price);
});

test('a standard add-on can be bought alone at its own price', () => {
  const quote = plan('reminders');
  assert.equal(quote.total, priceAmount(getExtra('Appointment reminders').price));
  assert.equal(quote.lines.length, 1);
  assert.ok(!quote.lines.some((line) => line.label.startsWith('Starter')));
});

test('the first job that needs building is Starter Automation', () => {
  const quote = plan('enquiries');
  assert.equal(quote.offer.id, 'starter');
  assert.equal(quote.total, getOffer('starter').from);
});

test('an extra job to build uses Extra automation, never on its own', () => {
  const two = quotePlan([getSystem('enquiries'), { name: 'Stock alerts', offerName: 'Starter Automation' }]);
  assert.deepEqual(two.lines.map((line) => line.price), [getOffer('starter').price, getExtra('Extra automation').price]);
  for (const id of HEADACHE_PICKS.map((pick) => pick.system)) {
    const quote = plan(id);
    assert.ok(!quote.lines.some((line) => line.label.startsWith('Extra automation')), `${id} alone must not be Extra automation`);
  }
});

test('add-ons and a Starter add up line by line', () => {
  const quote = plan('enquiries', 'reminders', 'reviews');
  const expected = getOffer('starter').from + priceAmount(getExtra('Appointment reminders').price) + priceAmount(getExtra('Review requests').price);
  assert.equal(quote.total, expected);
  assert.ok(quote.total <= getOffer('business-system').from);
});

test('copying between apps (Business System) quotes the package, weekly report included', () => {
  const quote = plan('business-system', 'weekly');
  assert.equal(quote.offer.id, 'business-system');
  assert.equal(quote.totalLabel, getOffer('business-system').price);
  assert.match(quote.note, /weekly report included/i);
});

test('when the parts cost more than a Business System, recommend that instead', () => {
  const every = HEADACHE_PICKS.map((pick) => pick.system).filter((id) => id !== 'business-system').concat('weekly', 'rebooking');
  const parts = quotePlan([]).total; // guard: helper is pure
  assert.equal(parts, getOffer('starter').from);
  const quote = plan(...every);
  assert.equal(quote.offer.id, 'business-system');
  assert.match(quote.note, /more than a Business System/);
});

test('every headache maps to a real system', () => {
  for (const pick of HEADACHE_PICKS) assert.ok(getSystem(pick.system), pick.id);
});

test('builder and calculator hard-code no prices', async () => {
  for (const file of ['app/system-builder.tsx', 'app/cost-calculator.tsx', 'app/hero-demo.tsx']) {
    assert.doesNotMatch(await fs.readFile(file, 'utf8'), /£\s?\d/, file);
  }
});
