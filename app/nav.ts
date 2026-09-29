import { NICHE_GUIDES } from './for/niches';

/**
 * One map of the site, used by the header menu, the footer and tests, so every
 * route an owner might want is reachable from every page in one or two taps.
 * Big-site pattern (Xero, ManyPets): a few visible top links, a grouped menu
 * behind a labelled "Menu" button on phones, and the same groups in the footer.
 */
export type NavLink = { href: string; label: string };

/** Shown in the header on desktop. Keep to four plus the free plan button. */
export const PRIMARY_NAV: NavLink[] = [
  { href: '/for', label: 'Your trade' },
  { href: '/prices', label: 'Prices' },
  { href: '/#process', label: 'How it works' },
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
      { href: '/leak-check', label: 'Free plan and price' },
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
    title: 'Help',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/work/scrap-finance-partners', label: 'Client work' },
      { href: '/site-map', label: 'Site map' },
    ],
  },
  {
    // Kept apart from the service on purpose (29 Sep rebuild): Objects is a
    // concept range and the Lab holds Maz's own products, so neither competes
    // with the one thing a small business can buy today.
    title: 'Other projects',
    links: [
      { href: '/3d-printing', label: 'Objects (concept range)' },
      { href: '/3d-printing#architecture-property', label: 'Architecture models' },
      { href: '/lab', label: 'Lab: my own products' },
    ],
  },
];

/** Homepage "On this page" jump bar, in page order. */
export const HOME_SECTIONS: NavLink[] = [
  { href: '#trades', label: 'Your trade' },
  { href: '#example', label: 'Example plan' },
  { href: '#check', label: 'Free plan' },
  { href: '#pricing', label: 'Prices' },
  { href: '#process', label: 'How it works' },
  { href: '#faq', label: 'Questions' },
];
