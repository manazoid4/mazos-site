/**
 * The single source of truth for what Maz Works sells and what it costs.
 * Every page, the schema and the enquiry form read from here.
 *
 * Positioning (Maz, 27 Sep 2026): Maz Works builds the systems small
 * businesses run on: automation, connected tools and custom software that win
 * customers and take admin off the owner. It is not a website-fix shop.
 * Never describe it as "website repairs" or "small fixes".
 *
 * Pricing model (Offer v9): a low-cost Starter so anyone can begin, add-ons
 * priced up front (£39 to £145) and added to the invoice, and a small monthly care
 * plan. Audience is every UK small business and team, not one niche.
 *
 * AI (Maz, 27 Sep): may be used behind the scenes to build or run things, but
 * is never advertised or sold as an offer. No 'AI assistant' or 'AI agent' copy.
 */

export const POSITIONING = 'Automation, connected tools and custom software for UK small businesses.';

export const FREE_STEP = {
  name: 'Free Plan & Fixed Quote',
  short: 'free plan and quote',
  price: '£0',
  body: 'Tell me the job that eats your week or loses you customers. I reply with a plan and a fixed price.',
} as const;

export type Offer = {
  id: 'starter' | 'business-system' | 'custom';
  /** Stable `?service=` id used by the enquiry form. */
  service: 'repair' | 'automation' | 'software';
  name: string;
  price: string;
  /** Numeric floor for structured data. */
  from: number;
  tag?: string;
  body: string;
  bullets: string[];
};

export const OFFERS: Offer[] = [
  {
    id: 'starter',
    service: 'repair',
    name: 'Starter Automation',
    price: '£195',
    from: 195,
    tag: 'The easy way to start',
    body: 'One boring job you do by hand, set up so it happens on its own.',
    bullets: [
      'For example: every enquiry lands in one list and gets an instant reply',
      'Set up on the tools you already use, and tested with you',
      'Working within 7 working days of access',
    ],
  },
  {
    id: 'business-system',
    service: 'automation',
    name: 'Business System',
    price: 'From £795',
    from: 795,
    body: 'Several jobs joined up, so a customer goes from first enquiry to paid without you copying details or chasing.',
    bullets: [
      'Enquiries, quotes, follow-ups and invoices linked together',
      'One place for customer details your team can see',
      'A weekly email: what came in and what is due',
    ],
  },
  {
    id: 'custom',
    service: 'software',
    name: 'Custom Software & Websites',
    price: 'From £1,950',
    from: 1950,
    body: 'Something built just for your business, when normal apps don’t fit.',
    bullets: [
      'A page where customers log in to see their bookings or jobs',
      'A tool your staff use instead of spreadsheets',
      'A new website with booking and follow-ups built in',
    ],
  },
];

/**
 * Add-ons: standard set-ups with a fixed, one-off price. Each is a quick set-up
 * on tools the client already has, not a build. Grouped so owners can find
 * what they need; the `what` line says plainly what the customer gets.
 *
 * How they fit with the packages (Offer v9, 27 Sep):
 * - Standard add-ons can be bought on their own or added to any package.
 * - Extra automation is only for adding a second custom job to a package; a
 *   first custom job is Starter Automation (£195).
 * - The weekly report is included in a Business System, so it is only charged
 *   as an add-on alongside Starter.
 */
export type Extra = { name: string; price: string; what: string };

export const EXTRA_GROUPS: { title: string; items: Extra[] }[] = [
  {
    title: 'Win and keep customers',
    items: [
      { name: 'Missed-call text-back', price: '£95', what: 'Miss a call and the caller gets a text with your booking link, so they don’t ring someone else. Needs a business phone line or app that supports it.' },
      { name: 'Online booking setup', price: '£95', what: 'Customers book themselves online, day or night. Up to 10 services set up.' },
      { name: 'Confirm or rebook by text', price: '£95', what: 'Customers confirm or move their appointment by text instead of phoning you. Set up in your booking system.' },
      { name: 'Appointment reminders', price: '£79', what: 'Customers get a reminder the day before, so fewer no-shows.' },
      { name: 'Rebooking reminders', price: '£79', what: 'Past customers get a nudge when they’re due back.' },
    ],
  },
  {
    title: 'Get found and trusted',
    items: [
      { name: 'Review requests', price: '£95', what: 'After every job, the customer is asked for a Google review, and you’re told when a new one arrives.' },
      { name: 'Google Business Profile setup', price: '£49', what: 'Your Google listing checked and filled in properly: hours, photos, services and booking link.' },
      { name: 'Single website page', price: '£145', what: 'One new page on your current website, for a service or an offer, written and styled to match.' },
    ],
  },
  {
    title: 'Less admin',
    items: [
      { name: 'Quote follow-up', price: '£95', what: 'No reply to a quote? The customer gets a friendly reminder automatically.' },
      { name: 'Weekly report', price: '£145', what: 'One simple email each week: enquiries, bookings, quotes waiting and money due. Included free with a Business System.' },
      { name: 'Extra automation', price: '£95', what: 'A second job of your choice set up to run on its own, added to any package.' },
    ],
  },
  {
    title: 'Help for your team',
    items: [
      { name: 'Team training', price: '£39', what: 'A one-hour video call showing your staff how everything works, plus a short written guide to keep.' },
    ],
  },
];

/** Flat list, for tests and anything that needs every add-on. */
export const EXTRAS: Extra[] = EXTRA_GROUPS.flatMap((group) => group.items);

/**
 * Side-by-side comparison, ManyPets style: same rows for every package, plain
 * answers. Column order matches OFFERS.
 */
export const COMPARISON: { row: string; values: [string, string, string] }[] = [
  { row: 'Price', values: ['£195', 'From £795', 'From £1,950'] },
  { row: 'Best for', values: ['Trying it on one job', 'Owners buried in admin', 'When normal apps don’t fit'] },
  { row: 'Jobs set up to run on their own', values: ['1', 'Several, joined up', 'Built to fit'] },
  { row: 'Uses the tools you already have', values: ['Yes', 'Yes', 'Where it makes sense'] },
  { row: 'Customer details in one place', values: ['No', 'Included', 'Included'] },
  { row: 'Weekly report email', values: ['Add-on, £145', 'Included', 'Included'] },
  { row: 'Working by', values: ['7 working days', 'Date in your quote', 'Date in your quote'] },
  { row: 'Fixed price before any work', values: ['Yes', 'Yes', 'Yes'] },
  { row: 'You own everything', values: ['Yes', 'Yes', 'Yes'] },
];

/** Short "why it's different" blocks: bold heading, one plain sentence. */
export const PROMISES: { title: string; body: string }[] = [
  { title: 'One fixed price, agreed first', body: 'You know the full cost before any work starts. No hourly rates, no surprise invoices.' },
  { title: 'Half now, half when it works', body: 'You only pay the rest once you’ve seen it working, so the risk isn’t all on you.' },
  { title: 'No contracts', body: 'Every package is a one-off. Keep It Running is monthly and you can cancel any time.' },
  { title: 'No VAT added', body: 'The price you see is the price you pay.' },
];

/** What's not included, said plainly. */
export const NOT_INCLUDED = [
  'Paid apps or text-message costs. You pay those companies directly, and I tell you the cost up front.',
  'Changes after it’s handed over, unless you have Keep It Running.',
  'New features beyond the agreed plan. Those get their own fixed price first.',
];

export const CARE_PLAN = {
  name: 'Keep It Running',
  price: '£19/month',
  body: 'I check that everything I built keeps working, fix it if it breaks, and make one small change a month when you ask. Cancel any time.',
} as const;

/** How the work is actually set up, in plain words (homepage "How I set it up"). */
export const DELIVERY: { title: string; body: string }[] = [
  { title: 'Built on what you already use', body: 'Your booking app, email, calendar or accounts software. If a new app is needed, you pay that company directly and I tell you the cost first.' },
  { title: 'You add me as a user', body: 'I never need your passwords. Every account stays in your name, and you remove me when it’s done.' },
  { title: 'Tested, then switched on', body: 'I test it on real examples. You see it working before you pay the rest.' },
  { title: 'Help afterwards if you want it', body: `${CARE_PLAN.name} (${CARE_PLAN.price}) keeps it checked and makes small changes. Staff training is an add-on.` },
];

export const PAYMENT_TERMS = 'A free plan and fixed price before any work. Half to start, the rest when it is working. No VAT added.';

export const THIRD_PARTY_NOTE = 'If you need a paid app, like a texting service, you pay that company directly and I tell you the cost up front. You own everything.';

/** Applies to Starter Automation; larger jobs get a dated plan in the quote. */
export const GUARANTEE = 'Starter Automation is working within 7 working days of me getting access, or you don’t pay the rest. I still finish it. Larger jobs get a dated plan in the quote. If I can’t deliver what we agreed, your deposit is refunded.';

export const PRICE_RANGE = '£195–£1,950+';

export const REFERRAL_THANK_YOU = '£40';
