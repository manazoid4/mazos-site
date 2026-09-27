/**
 * The single source of truth for what Maz Works sells and what it costs.
 * Every page, the schema and the enquiry form read from here.
 *
 * Positioning (Maz, 27 Sep 2026): Maz Works builds the systems small
 * businesses run on: automation, connected tools and custom software that win
 * customers and take admin off the owner. It is not a website-fix shop.
 * Never describe it as "website repairs" or "small fixes".
 *
 * Pricing model (Offer v7): a low-cost Starter so anyone can begin, optional
 * extras priced up front and added to the invoice, and a small monthly care
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
 * Optional extras: priced up front, added to any job and invoiced with it.
 * Each one is scoped so it is a set-up on tools the client already has, not a
 * build. Keep the `what` line plain: what the customer actually gets.
 */
export const EXTRAS: { name: string; price: string; what: string }[] = [
  { name: 'Missed-call text-back', price: '£95', what: 'Miss a call and the caller gets a text with your booking link, so they don’t ring someone else. Needs a business phone line or app that supports it.' },
  { name: 'Confirm or rebook by text', price: '£95', what: 'Customers confirm or move their appointment by text instead of phoning you. Set up in your booking system.' },
  { name: 'Review requests', price: '£95', what: 'After every job, the customer is asked for a Google review, and you’re told when a new one arrives.' },
  { name: 'Online booking setup', price: '£95', what: 'Customers book themselves online, day or night. Up to 10 services set up.' },
  { name: 'Quote follow-up', price: '£95', what: 'No reply to a quote? The customer gets a friendly reminder automatically.' },
  { name: 'Extra automation', price: '£95', what: 'Any other single task set up to run on its own.' },
  { name: 'Appointment reminders', price: '£79', what: 'Customers get a reminder the day before, so fewer no-shows.' },
  { name: 'Rebooking reminders', price: '£79', what: 'Past customers get a nudge when they’re due back.' },
  { name: 'Google Business Profile setup', price: '£79', what: 'Your Google listing set up properly: hours, photos, services and booking link.' },
  { name: 'Weekly report', price: '£145', what: 'One simple email each week: enquiries, bookings, quotes waiting and money due.' },
  { name: 'Website page', price: 'from £195', what: 'A new page or landing page, for one service or an offer.' },
  { name: 'Team training', price: '£49', what: 'One hour showing your staff how to use it all.' },
];

export const CARE_PLAN = {
  name: 'Keep It Running',
  price: '£19/month',
  body: 'I check everything I built keeps working, fix it if it breaks, and make one small change a month on request. Cancel any time.',
} as const;

export const PAYMENT_TERMS = 'A free plan and fixed price before any work. Half to start, the rest when it is working. No VAT added.';

export const THIRD_PARTY_NOTE = 'If you need a paid app, like a texting service, you pay that company directly and I tell you the cost up front. You own everything.';

/** Applies to Starter Automation; larger jobs get a dated plan in the quote. */
export const GUARANTEE = 'Starter Automation is working within 7 working days of me getting access, or you don’t pay the rest. I still finish it. Larger jobs get a dated plan in the quote. If I can’t deliver what we agreed, your deposit is refunded.';

export const PRICE_RANGE = '£195–£1,950+';
