/**
 * Personal preview links for outreach (sprint idea 2, 7 Oct):
 *   https://www.mazworks.uk/for/<trade>?biz=Smith+Plumbing&src=call-heat
 * The trade page then shows the missed-call example with that business name in it.
 * The name only ever renders as text (React escapes it), and is cut down to letters,
 * numbers, spaces, & ' and hyphens, at most 40 characters, so a link can't be used
 * to show a web address or a long message on mazworks.uk.
 */
export const BIZ_MAX = 40;

export function cleanBusinessName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const name = raw.replace(/[^\p{L}\p{N} &'’-]/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, BIZ_MAX).trim();
  return /\p{L}.*\p{L}/u.test(name) ? name : null;
}

/** The link Maz sends a lead: their trade page with their name and an optional campaign tag. */
export function personalLink(business: string, trade: string, source?: string): string {
  const params = new URLSearchParams({ biz: business });
  if (source) params.set('src', source);
  return `https://www.mazworks.uk/for/${trade}?${params.toString()}`;
}
