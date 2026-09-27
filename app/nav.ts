import { NICHE_GUIDES } from './for/niches';

/**
 * One map of the site, used by the header menu, the footer and tests, so every
 * route an owner might want is reachable from every page in one or two taps.
 * Big-site pattern (Xero, ManyPets): a few visible top links, a grouped menu
 * behind a labelled "Menu" button on phones, and the same groups in the footer.
 */
export type NavLink = { href: string; label: string };

/** Shown in the header on desktop. Keep to four plus the free quote button. */
export const PRIMARY_NAV: NavLink[] = [
  { href: '/#pricing', label: 'Prices' },
  { href: '/for', label: 'Who it’s for' },
  { href: '/3d-printing', label: 'Objects' },
  { href: '/faq', label: 'FAQ' },
];

export const NAV_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: 'What I do',
    links: [
      { href: '/#pricing', label: 'Packages and prices' },
      { href: '/#compare', label: 'Compare packages' },
      { href: '/#extras', label: 'Add-ons' },
      { href: '/#example', label: 'Example plan' },
      { href: '/contact', label: 'Bigger jobs' },
    ],
  },
  {
    title: 'Who it’s for',
    links: [
      ...NICHE_GUIDES.map((guide) => ({ href: `/for/${guide.id}`, label: guide.shortName })),
      { href: '/for', label: 'All trades' },
    ],
  },
  {
    title: 'More',
    links: [
      { href: '/3d-printing', label: 'Objects and tap stands' },
      { href: '/3d-printing#architecture-property', label: 'Architecture models' },
      { href: '/faq', label: 'FAQ' },
      { href: '/lab', label: 'Other builds' },
    ],
  },
];
