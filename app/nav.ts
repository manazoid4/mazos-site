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
  { href: '/prices', label: 'Prices' },
  { href: '/for', label: 'Who it’s for' },
  { href: '/3d-printing', label: 'Objects' },
  { href: '/faq', label: 'FAQ' },
];

export const NAV_GROUPS: { title: string; links: NavLink[] }[] = [
  {
    title: 'What I do',
    links: [
      { href: '/prices', label: 'Packages and prices' },
      { href: '/prices#compare', label: 'Compare packages' },
      { href: '/prices#extras', label: 'All add-ons' },
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
      { href: '/whats-new', label: 'What’s new' },
      { href: '/site-map', label: 'Site map' },
    ],
  },
];

/** Homepage "On this page" jump bar, in page order. */
export const HOME_SECTIONS: NavLink[] = [
  { href: '#check', label: 'Free plan' },
  { href: '#example', label: 'Example' },
  { href: '#pricing', label: 'Prices' },
  { href: '#process', label: 'How it works' },
  { href: '#faq', label: 'Questions' },
];
