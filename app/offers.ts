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
    price: '£295',
    from: 295,
    tag: 'The easy way to start',
    body: 'One job you do by hand every week, set up to run itself on the tools you already use.',
    bullets: [
      'For example: enquiries logged and answered automatically',
      'Or: booking confirmations and reminders that send themselves',
      'Live within 7 working days of access',
    ],
  },
  {
    id: 'business-system',
    service: 'automation',
    name: 'Business System',
    price: 'From £1,250',
    from: 1250,
    body: 'Several jobs joined up, so work flows from first enquiry to paid invoice without copying and chasing.',
    bullets: [
      'Enquiry, quote, follow-up and invoice connected',
      'One place for customer details, shared with the team',
      'A weekly summary of what came in and what is due',
    ],
  },
  {
    id: 'custom',
    service: 'software',
    name: 'Custom Software & Websites',
    price: 'From £2,950',
    from: 2950,
    body: 'When off-the-shelf tools do not fit: a customer portal, an internal tool or a website with the system built in.',
    bullets: [
      'Customer portals and internal tools',
      'Websites and full rebuilds with booking and automation built in',
      'Scoped and quoted per project',
    ],
  },
];

/** Optional extras: priced up front, added to any job and invoiced with it. */
export const EXTRAS: { name: string; price: string }[] = [
  { name: 'Extra automation', price: '£195 each' },
  { name: 'Appointment reminders by text or email', price: '£145' },
  { name: 'Review requests after every job', price: '£145' },
  { name: 'Google Business Profile setup', price: '£149' },
  { name: 'Quote follow-up sequence', price: '£195' },
  { name: 'Dashboard or weekly report', price: '£245' },
  { name: 'New landing page or website page', price: 'from £295' },
  { name: 'AI assistant that answers enquiries', price: 'from £495' },
  { name: 'Team training session (1 hour)', price: '£95' },
];

export const CARE_PLAN = {
  name: 'Keep It Running',
  price: '£49/month',
  body: 'Checks, fixes and small changes each month so everything keeps working. Cancel any time.',
} as const;

export const PAYMENT_TERMS = 'Fixed quote before any work. Half to start, the rest when it is live. No VAT added.';

export const THIRD_PARTY_NOTE = 'Any software subscriptions or text-message costs are paid by you directly, at cost, and shown in the quote.';

/** Applies to Starter Automation; larger jobs get a dated plan in the quote. */
export const GUARANTEE = 'Starter Automation is live within 7 working days of me getting access, or you don’t pay the rest. I still finish it. Larger jobs get a dated plan in the quote. If I can’t deliver what we agreed, your deposit is refunded.';

export const PRICE_RANGE = '£295–£2,950+';
