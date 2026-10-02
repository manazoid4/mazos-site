import assert from 'node:assert/strict';
import test from 'node:test';
import { linkedInHref } from '../app/linkedin-source.ts';

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
