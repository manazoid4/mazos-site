import assert from 'node:assert/strict';
import test from 'node:test';
import { isCampaignTag, linkedInHref, rememberCampaign, rememberedCampaign } from '../app/linkedin-source.ts';

test('LinkedIn source survives booking and creator enquiry links', () => {
  for (const source of ['linkedin', 'linkedin-profile', 'linkedin-featured', 'linkedin-post', 'linkedin-company']) {
    const query = `?src=${source}`;
    assert.equal(linkedInHref('/brand-kit?src=linkedin', query), `/brand-kit?src=${source}`);
    assert.equal(linkedInHref('/free-plan?package=Brand%20Kit&src=brand-kit#leak-check-form', query), `/free-plan?package=Brand+Kit&src=${source}#leak-check-form`);
    assert.equal(linkedInHref('https://cal.com/mazworks/quick-chat?utm_source=linkedin', query), `https://cal.com/mazworks/quick-chat?utm_source=${source}`);
  }
});

test('unrecognised sources and unrelated links stay unchanged', () => {
  for (const query of ['', '?src=other', '?src=https://example.com', '?src=linkedin-post-extra']) {
    assert.equal(linkedInHref('/free-plan?src=brand-kit', query), '/free-plan?src=brand-kit');
  }
  for (const href of ['/prices', 'https://example.com/free-plan', 'https://cal.com/someone/else']) {
    assert.equal(linkedInHref(href, '?src=linkedin-post'), href);
  }
});

test('outreach tags (li-3, em-trades, call-offices, fu-2) survive to the free plan; junk does not', () => {
  for (const source of ['li-3', 'em-trades', 'call-offices', 'fu-2', 'dm-creators']) {
    assert.equal(linkedInHref('/free-plan?src=for-trades&trade=trades#leak-check-form', `?src=${source}`), `/free-plan?src=${source}&trade=trades#leak-check-form`);
  }
  for (const source of ['li-', 'li-<script>', 'xx-3', 'li-thisisfartoolongtobeatag']) {
    assert.equal(linkedInHref('/free-plan?src=for-trades', `?src=${encodeURIComponent(source)}`), '/free-plan?src=for-trades');
  }
});

test('first-touch campaign: only real tags are remembered, and blocked storage never throws', () => {
  for (const tag of ['li-demo1', 'li-demo2', 'em-trades', 'linkedin-post']) assert.ok(isCampaignTag(tag), tag);
  for (const tag of ['li-demo-1', 'for-trades', 'estimator-trades', '', null, 'https://x.y']) assert.ok(!isCampaignTag(tag), String(tag));
  const store = new Map();
  globalThis.sessionStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  rememberCampaign('?src=for-trades');
  assert.equal(rememberedCampaign(), '');
  rememberCampaign('?src=li-demo1');
  assert.equal(rememberedCampaign(), 'li-demo1');
  rememberCampaign('?src=li-demo2');
  assert.equal(rememberedCampaign(), 'li-demo1', 'first touch wins');
  globalThis.sessionStorage = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
  assert.doesNotThrow(() => rememberCampaign('?src=li-demo2'));
  assert.equal(rememberedCampaign(), '');
  delete globalThis.sessionStorage;
});
