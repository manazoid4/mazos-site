/** Preserve only the public campaign labels; never copy arbitrary query data. */
export function linkedInHref(href: string, search: string): string {
  const source = new URLSearchParams(search).get('src');
  if (!source || !['linkedin', 'linkedin-profile', 'linkedin-featured', 'linkedin-post'].includes(source)) return href;
  const base = 'https://www.mazworks.uk';
  const url = new URL(href, base);
  if (url.origin === base && ['/leak-check', '/brand-kit'].includes(url.pathname)) {
    url.searchParams.set('src', source);
    return `${url.pathname}${url.search}${url.hash}`;
  }
  if (url.origin === 'https://cal.com' && url.pathname === '/mazworks/quick-chat') {
    url.searchParams.set('utm_source', source);
    return url.href;
  }
  return href;
}
