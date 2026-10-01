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

// Offer v10 (2 Oct): commercial guard rails. Read docs/maz-works/OFFER-V10.md before changing these.
const { ALL_OFFERS, EXTRAS, TRACKS, CARE_PLANS, CHANGES_WINDOW, PAYMENT_TERMS } = modules.offers;

test('every offer has one track and a full spec: who, included, excluded, delivery, changes, upsell', () => {
  const tracks = new Set(TRACKS.map((track) => track.id));
  assert.equal(tracks.size, 4);
  for (const offer of ALL_OFFERS) {
    assert.ok(tracks.has(offer.track), offer.id);
    for (const field of ['forWho', 'delivery', 'changes', 'upsell']) assert.ok(offer[field]?.length > 10, `${offer.id}.${field}`);
    assert.ok(offer.includes.length >= 1 && offer.excludes.length >= 1, `${offer.id} needs included and excluded lists`);
  }
});

test('brand work and website work stay separate, and the bundle is cheaper than both', () => {
  const kit = getOffer('brand-kit');
  const page = getOffer('sales-page');
  assert.equal(kit.track, 'brand');
  assert.ok(kit.excludes.some((line) => /website/i.test(line)), 'the kit must exclude the website');
  assert.ok(!kit.includes.some((line) => /website|payment|Google/i.test(line)), 'no website, payments or Google in the kit');
  assert.ok(getOffer('brand-sales-page').from < kit.from + page.from, 'the bundle must reward buying both');
});

test('no add-on is priced below the £95 floor, and care covers real time', () => {
  for (const extra of EXTRAS) assert.ok(priceAmount(extra.price) >= 95, `${extra.name} is under the floor`);
  assert.ok(priceAmount(CARE_PLANS[0].price) >= 49);
  assert.ok(!/unlimited/i.test(JSON.stringify(CHANGES_WINDOW)), 'changes are never unlimited');
  assert.doesNotMatch(PAYMENT_TERMS, /half|deposit/i);
});

test('three jobs to build is a Business System, even when the parts are cheaper', () => {
  const quote = quotePlan([getSystem('enquiries'), { name: 'Stock alerts', offerName: 'Starter Automation' }, { name: 'Invoice chasing', offerName: 'Starter Automation' }]);
  assert.equal(quote.offer.id, 'business-system');
});
