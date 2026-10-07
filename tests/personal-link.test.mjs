import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { BIZ_MAX, cleanBusinessName, personalLink } from '../app/personal-link.ts';

// Sprint idea 2 (7 Oct): /for/<trade>?biz=Name shows the missed-call example with the lead's name.
test('business names are kept readable and cut down to plain words', () => {
  assert.equal(cleanBusinessName('Smith & Sons Plumbing'), 'Smith & Sons Plumbing');
  assert.equal(cleanBusinessName("O’Neill's Garage"), "O’Neill's Garage");
  assert.equal(cleanBusinessName('  Café   Rouge  '), 'Café Rouge');
  assert.equal(cleanBusinessName('<script>alert(1)</script>'), 'script alert 1 script');
  assert.equal(cleanBusinessName('Visit www.evil.com/pay now'), 'Visit www evil com pay now');
  assert.ok(cleanBusinessName('A'.repeat(200)).length <= BIZ_MAX);
  assert.equal(cleanBusinessName('Call 07700 900123 now'), null);
  assert.equal(cleanBusinessName('1234 5678 ab'), null);
  assert.equal(cleanBusinessName('Unit 4 Motors'), 'Unit 4 Motors');
  assert.ok(!/[\uD800-\uDBFF]$/.test(cleanBusinessName('a'.repeat(39) + '𝒜𝒜')));
  for (const empty of [null, undefined, '', '   ', '12', '!!!', 'x']) assert.equal(cleanBusinessName(empty), null);
});

test('the personal link points at the trade page with the name and campaign tag', () => {
  assert.equal(personalLink('Smith & Sons', 'heating-and-plumbing', 'call-heat'), 'https://www.mazworks.uk/for/heating-and-plumbing?biz=Smith+%26+Sons&src=call-heat');
  assert.equal(personalLink('Bloom', 'salons-and-beauty'), 'https://www.mazworks.uk/for/salons-and-beauty?biz=Bloom');
});

test('trade pages carry the personal preview, labelled as a preview, not built yet', async () => {
  const source = await readFile('app/personal-preview.tsx', 'utf8');
  assert.match(source, /example preview, not built yet/);
  for (const file of ['app/for/[niche]/page.tsx', 'app/for/type-page.tsx']) assert.match(await readFile(file, 'utf8'), /<PersonalPreview trade=\{(guide|type)\.id\} \/>/);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});
