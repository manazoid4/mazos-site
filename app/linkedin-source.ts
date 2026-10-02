/** Outreach tags from docs/maz-works/OUTREACH-TEMPLATES.md and the LinkedIn series: li-3, em-trades, call-offices, fu-2, dm-creators. */
const OUTREACH_TAG = /^(li|em|call|fu|dm)-[a-z0-9]{1,16}$/;

/** Preserve only the public campaign labels; never copy arbitrary query data. */
export function linkedInHref(href: string, search: string): string {
  const source = new URLSearchParams(search).get('src');
  if (!source || !(['linkedin', 'linkedin-profile', 'linkedin-featured', 'linkedin-post', 'linkedin-company'].includes(source) || OUTREACH_TAG.test(source))) return href;
  const base = 'https://www.mazworks.uk';
  const url = new URL(href, base);
  if (url.origin === base && ['/free-plan', '/brand-kit'].includes(url.pathname)) {
    url.searchParams.set('src', source);
    return `${url.pathname}${url.search}${url.hash}`;
  }
  if (url.origin === 'https://cal.com' && url.pathname === '/mazworks/quick-chat') {
    url.searchParams.set('utm_source', source);
    return url.href;
  }
  return href;
}
