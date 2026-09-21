export type MazWorksUpdate = {
  id: string;
  publishedAt: string;
  label: 'NEW' | 'BETTER' | 'FIXED';
  title: string;
  summary: string;
  items: string[];
};

/**
 * Customer-facing changes only. Keep this newest-first and factual: no invented
 * outcomes, usage numbers or performance claims.
 */
export const MAZ_WORKS_UPDATES: MazWorksUpdate[] = [
  {
    id: 'proof-first-enquiries',
    publishedAt: '2026-09-21',
    label: 'BETTER',
    title: 'Proof first, shorter enquiries',
    summary: 'The homepage now gets to real work sooner and asks for less before someone can contact Maz Works.',
    items: [
      'JobFilter and Scrap Finance Partners now appear before the services section, so inspectable work comes before more claims.',
      'The main enquiry starts with just name, email and the problem. Business, service and preferred next step are optional details.',
      'Pricing cards now lead directly into a contextual enquiry instead of ending as information-only cards.',
      'Measurement language is compact and explicit: agree what matters first rather than promise an invented percentage.',
    ],
  },
  {
    id: 'enquiry-recovery',
    publishedAt: '2026-09-20',
    label: 'FIXED',
    title: 'Enquiries no longer disappear on a bad send',
    summary: 'The contact flow now protects what a visitor typed and only reports success when delivery is explicitly confirmed.',
    items: [
      'Changing service context no longer throws away a part-written enquiry.',
      'Timeout, network and provider rejection states are handled separately.',
      'A failed send offers a prefilled email fallback carrying the enquiry details.',
      'Whitespace-only required fields now get a visible message and focus instead of failing silently.',
    ],
  },
  {
    id: 'clearer-site-language',
    publishedAt: '2026-09-19',
    label: 'BETTER',
    title: 'Clearer services and more readable type',
    summary: 'The site was rewritten around business problems rather than a list of technologies, while the smallest text was raised to a usable floor.',
    items: [
      'Services now start with outcomes: enquiries, repetitive admin, useful tools and physical products linked to digital actions.',
      'Duplicate process and proof explanations were consolidated instead of repeating the same journey twice.',
      'Package boundaries are explicit so starting prices do not read as open-ended promises.',
      'Work in progress is labelled as such rather than presented like finished client proof.',
    ],
  },
];

export const LATEST_MAZ_WORKS_UPDATE = MAZ_WORKS_UPDATES[0];

export function formatUpdateDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T12:00:00Z`));
}
