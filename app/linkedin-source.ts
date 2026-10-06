/** Outreach tags from docs/maz-works/OUTREACH-TEMPLATES.md and the LinkedIn series: li-3, em-trades, call-offices, fu-2, dm-creators. */
const OUTREACH_TAG = /^(li|em|call|fu|dm)-[a-z0-9]{1,16}$/;

const LINKEDIN_SOURCES = ['linkedin', 'linkedin-profile', 'linkedin-featured', 'linkedin-post', 'linkedin-company'];

/** True for a public campaign label (LinkedIn or outreach tag); never arbitrary query data. */
export function isCampaignTag(source: string | null | undefined): source is string {
  return !!source && (LINKEDIN_SOURCES.includes(source) || OUTREACH_TAG.test(source));
}

const CAMPAIGN_KEY = 'mw-campaign';

/** Remember the campaign a visitor landed with, for this tab only. Storage can be blocked, so never throw. */
export function rememberCampaign(search: string): void {
  const source = new URLSearchParams(search).get('src');
  if (!isCampaignTag(source)) return;
  // First touch wins: keep the tag that brought them, even if they open a second campaign link.
  try { if (!isCampaignTag(sessionStorage.getItem(CAMPAIGN_KEY))) sessionStorage.setItem(CAMPAIGN_KEY, source); } catch { /* storage blocked */ }
}

/** The campaign remembered on landing, if any. */
export function rememberedCampaign(): string {
  try { const value = sessionStorage.getItem(CAMPAIGN_KEY); return isCampaignTag(value) ? value : ''; } catch { return ''; }
}

/** Preserve only the public campaign labels; never copy arbitrary query data. */
export function linkedInHref(href: string, search: string): string {
  const source = new URLSearchParams(search).get('src');
  if (!isCampaignTag(source)) return href;
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
