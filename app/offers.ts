/**
 * The single source of truth for what Maz Works sells and what it costs.
 * Every page, the schema and the enquiry form read from here.
 *
 * Positioning (Maz, 27 Sep 2026): Maz Works builds the systems that turn
 * enquiries into paying customers and take admin off the owner. It is not a
 * website-fix shop. Never describe it as "website repairs" or "small fixes".
 */

export const POSITIONING = 'Booking systems, automated follow-up and custom tools for UK small businesses.';

export const FREE_STEP = {
  name: 'Free Customer Journey Review',
  short: 'free review',
  price: '£0',
  body: 'I check how customers find, contact and book you, and where follow-up or admin is slowing you down.',
} as const;

export type Offer = {
  id: 'booking-system' | 'automation' | 'custom';
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
    id: 'booking-system',
    service: 'repair',
    name: 'Booking & Enquiry System',
    price: 'From £495',
    from: 495,
    tag: 'Most businesses start here',
    body: 'The whole route from "found you" to "booked in", built and tested on the tools you already use.',
    bullets: [
      'Booking, enquiry and call routes that reach you',
      'Automatic confirmations and reminders',
      'Google Business Profile matched to your site',
    ],
  },
  {
    id: 'automation',
    service: 'automation',
    name: 'Follow-up & Admin Automation',
    price: 'From £950',
    from: 950,
    body: 'The repeat work behind the scenes, done for you, so nothing slips while you are busy.',
    bullets: [
      'Quote and enquiry follow-ups that send themselves',
      'Details captured once and shared with the team',
      'Hours of weekly admin taken off your plate',
    ],
  },
  {
    id: 'custom',
    service: 'software',
    name: 'Custom Systems & Websites',
    price: 'From £1,500',
    from: 1500,
    body: 'When off-the-shelf tools do not fit: a new website, a customer portal or an internal tool built around how you work.',
    bullets: [
      'New websites and full rebuilds',
      'Customer portals and internal tools',
      'Scoped and quoted per project',
    ],
  },
];

export const PAYMENT_TERMS = 'Fixed quote before any work. Half to start, the rest when it is live. No VAT added.';

/** Applies to the Booking & Enquiry System; larger jobs get a dated plan in the quote. */
export const GUARANTEE = 'A Booking & Enquiry System is live within 7 working days of me getting access, or you don’t pay the rest. I still finish it. Larger jobs get a dated plan in the quote. If I can’t deliver what we agreed, your deposit is refunded.';

export const PRICE_RANGE = '£495–£1,500+';
