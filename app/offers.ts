/**
 * The single source of truth for what Maz Works sells and what it costs.
 * Every page, the schema, the enquiry form and the tests read from here.
 * Never hard-code a price anywhere else.
 *
 * Positioning (Maz, 27 Sep 2026): Maz Works builds the systems small
 * businesses run on: automation, connected tools and custom software that win
 * customers and take admin off the owner. It is not a website-fix shop and not
 * a cheap web agency. Never describe it as "website repairs" or "small fixes".
 *
 * Offer v10 (2 Oct 2026). Why it changed, so nobody undoes it by accident:
 * - The old £395 Brand Kit bundled brand design, a website, payments and a
 *   Google listing: about 25 hours of work for £395. Brand work and website
 *   work are now separate products, with a bundle that rewards buying both.
 * - Four kinds of work, never blurred (see TRACKS): brand = how you look and
 *   sound; sales page / website = where attention becomes enquiries or sales;
 *   automation = removes repeat work; custom software = what normal tools
 *   cannot do. Each offer belongs to exactly one track.
 * - "2 months of unlimited changes" became 30 days of tweaks (two rounds) plus
 *   a 90-day fix promise: still generous, but it can't turn into free new work.
 * - Add-ons under £95 were below cost once the call, set-up, testing and
 *   handover were counted. The floor is now £95, and every add-on is still a
 *   set-up on tools the client already has. Anything bigger is a package.
 * - Keep It Running £19/month did not cover one hour of work. Care is now
 *   £49/month (keep it working) or £195/month (keep improving it).
 * - Payment: one invoice when the client has seen it working, before it goes
 *   live; jobs of £1,000 or more are billed in stages the client signs off.
 *   Never advertise "half now, half later" (Maz, 30 Sep: reads as desperate).
 * - Starter Automation stays £195 on purpose: it is the way in. It is fenced
 *   to one job, and its price comes off a Business System booked within 60 days.
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

/** The four kinds of work. Every offer belongs to one, and the copy never blurs them. */
export type TrackId = 'brand' | 'web' | 'automation' | 'software';
export const TRACKS: { id: TrackId; name: string; is: string; example: string }[] = [
  { id: 'brand', name: 'Brand', is: 'How your business looks, sounds and shows up.', example: 'Colours, fonts, a profile that sells, post templates.' },
  { id: 'web', name: 'Sales pages and websites', is: 'Where attention turns into enquiries, bookings or sales.', example: 'A page people can book or buy from, a full website.' },
  { id: 'automation', name: 'Automation', is: 'Takes repeat jobs off you and joins up the customer journey.', example: 'Instant replies, reminders, quotes that follow themselves up.' },
  { id: 'software', name: 'Custom software', is: 'Built for jobs normal apps can’t handle.', example: 'Customer logins, staff tools, your own booking rules.' },
];

export type OfferId = 'starter' | 'business-system' | 'custom' | 'brand-kit' | 'sales-page' | 'brand-sales-page' | 'website';

export type Offer = {
  id: OfferId;
  track: TrackId;
  /** Stable `?service=` id used by the enquiry form (old outreach links use some of these). */
  service: 'repair' | 'automation' | 'software' | 'brand-kit' | 'sales-page' | 'brand-sales-page' | 'website';
  name: string;
  price: string;
  /** Numeric floor for structured data and maths. */
  from: number;
  tag?: string;
  body: string;
  /** Three short lines for cards. */
  bullets: string[];
  forWho: string;
  includes: string[];
  excludes: string[];
  /** When it is working, said plainly. */
  delivery: string;
  /** Rounds of changes before launch, then the shared changes policy. */
  changes: string;
  /** The natural next step, so each sale can lead to the next. */
  upsell: string;
};

const TWEAKS = '30 days of tweaks after go-live (two rounds), and anything not working as agreed fixed free for 90 days.';

/**
 * The systems ladder: automation and custom software. Order matters (cards,
 * comparison columns and the schema read it): Starter, Business System, Custom.
 */
export const OFFERS: Offer[] = [
  {
    id: 'starter',
    track: 'automation',
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
    forWho: 'Owners who want to try automation on one job before committing to more.',
    includes: [
      'One job: one trigger and up to three steps (for example: enquiry arrives → saved to a list → instant reply)',
      'Built on up to two apps you already use',
      'Tested on real examples with you, then switched on',
      'A short written guide to how it works',
    ],
    excludes: [
      'A second job (Extra automation, priced on its own)',
      'New paid apps or text costs (you pay those companies directly)',
      'Cleaning up old data or changes to your website',
    ],
    delivery: 'Working within 7 working days of access.',
    changes: TWEAKS,
    upsell: 'Its price comes off a Business System booked within 60 days.',
  },
  {
    id: 'business-system',
    track: 'automation',
    service: 'automation',
    name: 'Business System',
    price: 'From £795',
    from: 795,
    body: 'Several jobs joined up, so a customer goes from first enquiry to paid without you copying details or chasing.',
    bullets: [
      'Up to three jobs joined up: enquiries, quotes, follow-ups or invoices',
      'One place for customer details your team can see',
      'A weekly email: what came in and what is due',
    ],
    forWho: 'Owners who copy details between apps and chase customers by hand.',
    includes: [
      'Up to three connected jobs across the customer journey',
      'One customer list your team can see',
      'Weekly report email (worth the add-on price on its own)',
      'One team walkthrough on video, plus a written guide',
    ],
    excludes: [
      'A fourth job or more (Extra automation each, or quoted together)',
      'A new website or custom software',
      'Moving more than 1,000 old records, or paid app costs',
    ],
    delivery: 'Date agreed in your fixed quote, usually 2 to 3 weeks after access.',
    changes: TWEAKS,
    upsell: 'Keep It Growing, to keep adding jobs each month.',
  },
  {
    id: 'custom',
    track: 'software',
    service: 'software',
    name: 'Custom Software',
    price: 'From £2,950',
    from: 2950,
    body: 'Something built just for your business, when normal apps don’t fit.',
    bullets: [
      'A page where customers log in to see their bookings or jobs',
      'A tool your staff use instead of spreadsheets',
      'Your own rules for bookings, quotes or stock',
    ],
    forWho: 'Businesses whose way of working no off-the-shelf app supports.',
    includes: [
      'A written spec we agree before any building',
      'Built and tested in stages you sign off',
      'Hosted on accounts in your name, with the code yours',
      'Handover guide and a team walkthrough',
    ],
    excludes: [
      'Features not in the agreed spec (priced first)',
      'Changes after the tweaks window, unless you have Keep It Growing',
      'Hosting and third-party fees (at cost, paid by you)',
    ],
    delivery: 'A dated plan in your quote, billed in stages.',
    changes: TWEAKS,
    upsell: 'Keep It Growing for ongoing improvements.',
  },
];

/** Sales pages and websites: where attention becomes enquiries, bookings or sales. */
export const WEB_OFFERS: Offer[] = [
  {
    id: 'sales-page',
    track: 'web',
    service: 'sales-page',
    name: 'Sales Page',
    price: '£895',
    from: 895,
    tag: 'For creators and one-offer businesses',
    body: 'One page that turns followers and visitors into bookings, buyers and email subscribers.',
    bullets: [
      'Your offer, your proof and a clear way to book or buy',
      'Payments and digital downloads go straight to your own account',
      'An email sign-up, so you own your audience',
    ],
    forWho: 'Creators, coaches and businesses selling up to three things: sessions, resources or a service.',
    includes: [
      'One page on your own domain, written with you on a 45-minute call',
      'Book or buy on the page: up to three sessions or products, through your own accounts',
      'Digital resources sent automatically after payment',
      'Email sign-up plus one welcome email, with the list in your name',
      'Link-in-bio ready, built for phones, with simple visitor stats',
    ],
    excludes: [
      'Brand design (that’s the Brand & Content Kit, or the bundle)',
      'Extra pages, a shop with more than three products, a blog or a member area',
      'Writing your posts, running ads, or app, domain and payment fees',
    ],
    delivery: 'Live within 15 working days of your content and access.',
    changes: `Two rounds of changes before launch, then ${TWEAKS.charAt(0).toLowerCase()}${TWEAKS.slice(1)}`,
    upsell: 'Welcome email series and Instant DM replies, then Keep It Growing.',
  },
  {
    id: 'website',
    track: 'web',
    service: 'website',
    name: 'Website',
    price: 'From £1,950',
    from: 1950,
    body: 'A full website with enquiries and bookings built in, not just a brochure.',
    bullets: [
      'Up to five pages, written with you',
      'Enquiries land in one list with an instant reply (a Starter Automation, included)',
      'Google Business Profile set up to match',
    ],
    forWho: 'Businesses that need more than one page: several services, areas or audiences.',
    includes: [
      'Up to five pages, written with you and built for phones',
      'Enquiry or booking flow with an instant reply and one list (Starter Automation included)',
      'Google Business Profile setup and basic search set-up',
      'Built on accounts in your name, which you own',
    ],
    excludes: [
      'Brand design or a new logo',
      'A shop with more than ten products, a member area or customer logins (Custom Software)',
      'Blog posts, ongoing search work, ads, or domain and hosting fees',
    ],
    delivery: 'A dated plan in your quote, usually 4 to 6 weeks, billed in two stages.',
    changes: `Two rounds of changes per page before launch, then ${TWEAKS.charAt(0).toLowerCase()}${TWEAKS.slice(1)}`,
    upsell: 'A Business System behind it, or Keep It Growing.',
  },
];

/** Brand: how the business looks, sounds and presents itself. */
export const BRAND_OFFERS: Offer[] = [
  {
    id: 'brand-kit',
    track: 'brand',
    service: 'brand-kit',
    name: 'Brand & Content Kit',
    price: '£595',
    from: 595,
    body: 'Look as good as your work, everywhere people find you.',
    bullets: [
      'Your look sorted: logo tidied, colours and fonts',
      'A profile that sells, on Instagram and one more platform',
      '12 post templates in Canva, in your colours',
    ],
    forWho: 'Creators, coaches and makers who sell through social media and look inconsistent.',
    includes: [
      'Logo tidied, or a clean name-mark if you have none',
      'Colours, fonts and a one-page brand guide',
      'How you sound: three content themes and a short voice guide',
      'Bio, link and highlight covers on Instagram and one more platform',
      '12 post and story templates in Canva, in your colours',
    ],
    excludes: [
      'A website, payments or Google listing (that’s the Sales Page)',
      'An illustrated logo, photography, or writing and posting your content',
      'New templates after sign-off (priced first)',
    ],
    delivery: 'Ready within 10 working days of your questionnaire and call.',
    changes: 'Two rounds of changes to the look, then the files are final and yours.',
    upsell: 'Add a Sales Page within 60 days and pay only the bundle price.',
  },
  {
    id: 'brand-sales-page',
    track: 'web',
    service: 'brand-sales-page',
    name: 'Brand + Sales Page',
    price: '£1,295',
    from: 1295,
    tag: 'Best value',
    body: 'Your look, your profile and a page that sells, made together so they match.',
    bullets: [
      'Everything in the Brand & Content Kit',
      'Everything in the Sales Page, built in your new look',
      'One plan, one fixed price, billed in two stages',
    ],
    forWho: 'Creators and small brands starting properly, who want content, profile and sales page to match.',
    includes: [
      'Everything in the Brand & Content Kit',
      'Everything in the Sales Page',
      'Profile link pointing at the new page, tested end to end',
    ],
    excludes: [
      'Everything excluded from the two parts',
    ],
    delivery: 'Brand first, then the page: usually 4 weeks from your questionnaire.',
    changes: 'The rounds of each part, then the shared tweaks and fix promise.',
    upsell: 'Welcome email series, Instant DM replies, then Keep It Growing.',
  },
];

/** Every offer, for selectors, schema and the "known packages" list. */
export const ALL_OFFERS: Offer[] = [...OFFERS, ...WEB_OFFERS, ...BRAND_OFFERS];

/**
 * Add-ons: standard set-ups with a fixed, one-off price, on tools the client
 * already has. Floor £95 (Offer v10): below that the call, set-up, testing
 * and handover cost more than the price. Anything that needs real building
 * is a package, not an add-on.
 *
 * - Standard add-ons can be bought on their own or added to any package.
 * - Extra automation only adds a second (or later) job to a package; a first
 *   job of your own is Starter Automation.
 * - The weekly report is included in a Business System.
 */
export type Extra = { name: string; price: string; what: string };

export const EXTRA_GROUPS: { title: string; items: Extra[] }[] = [
  {
    title: 'Win and keep customers',
    items: [
      { name: 'Missed-call text-back', price: '£95', what: 'Miss a call and the caller gets a text with your booking link, so they don’t ring someone else. Needs a phone line or texting service that supports it, from about £7 a month, paid by you.' },
      { name: 'Online booking setup', price: '£145', what: 'Customers book themselves online, day or night. Up to 10 services set up in your booking app.' },
      { name: 'Appointment reminders', price: '£95', what: 'A reminder the day before, and customers can confirm or move by text, so fewer no-shows.' },
      { name: 'Rebooking reminders', price: '£95', what: 'Past customers get a nudge when they’re due back.' },
    ],
  },
  {
    title: 'Get found and trusted',
    items: [
      { name: 'Review requests', price: '£95', what: 'After every job, the customer is asked for a Google review, and you’re told when a new one arrives.' },
      { name: 'Google Business Profile setup', price: '£95', what: 'Your Google listing checked and filled in properly: hours, photos, services and booking link.' },
      { name: 'Extra website page', price: '£295', what: 'One more page on your site or Sales Page, for a service or an offer, written and styled to match.' },
    ],
  },
  {
    title: 'Less admin',
    items: [
      { name: 'Quote follow-up', price: '£95', what: 'No reply to a quote? The customer gets a friendly reminder automatically.' },
      { name: 'Weekly report', price: '£145', what: 'One simple email each week: enquiries, bookings, quotes waiting and money due. Included with a Business System.' },
      { name: 'Extra automation', price: '£145', what: 'One more job set up to run on its own, added to a package.' },
    ],
  },
  {
    title: 'Help for your team',
    items: [
      { name: 'Team training', price: '£95', what: 'A one-hour video call showing your staff how everything works, plus a short written guide to keep.' },
    ],
  },
];

/** Flat list, for tests and anything that needs every add-on. */
export const EXTRAS: Extra[] = EXTRA_GROUPS.flatMap((group) => group.items);

/**
 * Brand & Content Kit page content (icons for /brand-kit). Brand only:
 * websites, payments and Google are the Sales Page's job (Offer v10).
 */
export const BRAND_KIT = {
  name: BRAND_OFFERS[0].name,
  price: BRAND_OFFERS[0].price,
  from: BRAND_OFFERS[0].from,
  body: BRAND_OFFERS[0].body,
  includes: [
    { icon: 'palette', title: 'Your look, sorted', what: 'Your logo tidied, plus your colours and fonts picked, so everything matches.' },
    { icon: 'layers', title: 'A one-page brand guide', what: 'Colours, fonts and do’s and don’ts on one page, so anyone you work with gets it right.' },
    { icon: 'chat', title: 'How you sound', what: 'Three content themes and a short voice guide, so every post sounds like you.' },
    { icon: 'phone', title: 'A profile that sells', what: 'Your bio, link and highlight covers redone on Instagram and one more platform.' },
    { icon: 'star', title: '12 post templates', what: 'Ready-made post and story designs for Canva, in your colours. Swap the photo and post.' },
  ],
  forWho: [
    { icon: 'dumbbell', label: 'Personal trainers' },
    { icon: 'bolt', label: 'Coaches' },
    { icon: 'gift', label: 'Makers and Etsy sellers' },
    { icon: 'cake', label: 'Bakers and home cooks' },
    { icon: 'scissors', label: 'Hair, nails and beauty' },
    { icon: 'camera', label: 'Photographers' },
    { icon: 'brush', label: 'Artists and designers' },
    { icon: 'music', label: 'Musicians and DJs' },
  ],
} as const;

/** The creator customer journey the Sales Page is built around. */
export const CREATOR_JOURNEY: { step: string; what: string }[] = [
  { step: 'Content', what: 'People find you through your posts.' },
  { step: 'Trust', what: 'Your profile and page show who you help and why you.' },
  { step: 'Offer', what: 'A resource, product or session that fits where they are.' },
  { step: 'Book or pay', what: 'Straight from the page, into your own account.' },
  { step: 'Email list', what: 'Every buyer and subscriber is yours, not the app’s.' },
];

/** Add-ons for people who sell through social media. Reuses standard add-ons where one fits. */
export const BRAND_KIT_EXTRAS: { icon: string; name: string; price: string; what: string }[] = [
  { icon: 'chat', name: 'Instant DM replies', price: '£145', what: 'Someone comments or messages a word like “PLAN” and gets your link straight away, even while you sleep. The DM app’s fee is paid by you.' },
  { icon: 'mail', name: 'Welcome email series', price: '£145', what: 'Three more emails after the welcome, written with you, so new subscribers get to know you and see your offer.' },
  { icon: 'box', name: 'Order updates', price: '£95', what: 'Buyers get “order received” and “it’s on its way” messages without you typing them.' },
  { icon: 'calendar', name: 'Online booking setup', price: getExtra('Online booking setup').price, what: 'Clients book sessions, classes or collections themselves, day or night.' },
  { icon: 'star', name: 'Review requests', price: getExtra('Review requests').price, what: 'Happy clients are asked for a review, so the next person trusts you faster.' },
  { icon: 'repeat', name: 'Rebooking reminders', price: getExtra('Rebooking reminders').price, what: 'Past clients get a nudge when they’re due back, so they buy again.' },
];

/**
 * Side-by-side comparison for the systems ladder, ManyPets style: same rows
 * for every package, plain answers. Column order matches OFFERS.
 */
export const COMPARISON: { row: string; values: [string, string, string] }[] = [
  { row: 'Price', values: [OFFERS[0].price, OFFERS[1].price, OFFERS[2].price] },
  { row: 'Best for', values: ['Trying it on one job', 'Owners buried in admin', 'When normal apps don’t fit'] },
  { row: 'Jobs set up to run on their own', values: ['1', 'Up to 3, joined up', 'Built to fit'] },
  { row: 'Uses the tools you already have', values: ['Yes', 'Yes', 'Where it makes sense'] },
  { row: 'Customer details in one place', values: ['No', 'Included', 'Included'] },
  { row: 'Weekly report email', values: [`Add-on, ${getExtra('Weekly report').price}`, 'Included', 'Included'] },
  { row: 'Working by', values: ['7 working days', 'Date in your quote', 'Date in your quote'] },
  { row: 'Fixed price before any work', values: ['Yes', 'Yes', 'Yes'] },
  { row: 'You own everything', values: ['Yes', 'Yes', 'Yes'] },
];

/**
 * Changes after go-live (Offer v10, replaces "2 months of unlimited changes").
 * Generous where it builds trust (anything not working as agreed is fixed
 * free for 90 days) and fenced where it costs money (tweaks come in two
 * rounds within 30 days; anything new is priced first).
 */
export const CHANGES_WINDOW = {
  name: '30 days of tweaks and a 90-day fix promise',
  short: '30 days of tweaks',
  body: 'For 30 days after it goes live, send me tweaks to what I built, in up to two rounds. And for 90 days, anything not working the way we agreed is fixed free.',
  covered: [
    'Wording, messages and email or text templates',
    'Timings, reminders, steps and who gets notified',
    'Small layout and colour tweaks to what I built',
    'Anything not working the way we agreed (for 90 days)',
  ],
  notCovered: [
    'A new page, job or feature: I price it first',
    'Connecting a new app, or rebuilding after you switch apps',
    'Paid app or text-message costs, which you pay directly',
  ],
  howItWorks: 'Send each round of tweaks in one email. I reply within 1 working day and agree a date. After 30 days, a care plan covers changes, or I price them first.',
} as const;

/**
 * The free demo (Maz, 30 Sep): not a self-serve toy and not a blanket promise.
 * A short call first; on the call we agree what the demo shows and the date it
 * arrives. Then the full plan, then the build, then the changes window.
 */
export const DEMO_STEPS: { title: string; body: string; note: string }[] = [
  { title: 'Book a 15-minute call', body: 'Tell me the job that costs you time or customers. No slides, no pressure.', note: 'Free' },
  { title: 'We agree the demo', body: 'On the call we agree what the demo shows and the date you get it. If a demo won’t help, I say so and send a plan instead.', note: 'Date agreed on the call' },
  { title: 'Your free demo arrives', body: 'A working demo built around your business, sent by the date we agreed. Try it on your own phone.', note: 'Free, no obligation' },
  { title: 'Happy with it? Your full plan', body: 'A written plan and one fixed price. Every item listed and invoiced clearly. No extra charges later.', note: 'Nothing to pay yet' },
  { title: 'I build it, you see it working', body: 'You see it working before it goes live, then you get 30 days of tweaks.', note: 'Fixed price' },
];

export const PROMISES: { title: string; body: string }[] = [
  { title: 'Free demo first', body: 'After a short call, you get a working demo. No charge.' },
  { title: 'One fixed price', body: 'You know the full cost before any work starts.' },
  { title: 'No contracts', body: 'Every package is a one-off. Care plans are monthly, cancel any time.' },
];

/** What's not included, said plainly. */
export const NOT_INCLUDED = [
  'Paid apps or text-message costs. You pay those companies directly, and I tell you the cost up front.',
  'Changes after the 30-day tweaks window, unless you have a care plan.',
  'New features beyond the agreed plan. Those get their own fixed price first.',
];

/** Monthly care (Offer v10). Recurring, cancel any time, never required. */
export const CARE_PLANS = [
  {
    id: 'running',
    name: 'Keep It Running',
    price: '£49/month',
    body: 'I check everything I built keeps working, fix it if it breaks, and make one small change a month (up to 30 minutes). Reply within 2 working days. Cancel any time.',
  },
  {
    id: 'growing',
    name: 'Keep It Growing',
    price: '£195/month',
    body: 'Everything in Keep It Running, plus up to 3 hours a month of changes, new add-ons or improvements, and a monthly 20-minute review call. Reply within 1 working day. Cancel any time.',
  },
] as const;

/** The entry care plan, for one-line mentions. */
export const CARE_PLAN = CARE_PLANS[0];

/** How the work is actually set up, in plain words (homepage "How I set it up"). */
export const DELIVERY: { title: string; body: string }[] = [
  { title: 'Built on what you already use', body: 'Your booking app, email, calendar or accounts software. If a new app is needed, you pay that company directly and I tell you the cost first.' },
  { title: 'You add me as a user', body: 'I never need your passwords. Every account stays in your name, and you remove me when it’s done.' },
  { title: 'Tested, then switched on', body: 'I test it on real examples. You see it working before it goes live, and the invoice comes then.' },
  { title: 'Help afterwards if you want it', body: `${CARE_PLANS[0].name} (${CARE_PLANS[0].price}) keeps it checked. ${CARE_PLANS[1].name} (${CARE_PLANS[1].price}) keeps improving it.` },
];

/** Shown on the site. Internal detail: under £1,000 = one invoice before go-live, 7-day terms; £1,000+ = two or three signed-off stages. */
export const PAYMENT_TERMS = 'A free plan and fixed price before any work. You pay when you’ve seen it working, before it goes live. Bigger jobs are billed in stages you sign off. No VAT added.';

export const THIRD_PARTY_NOTE = 'If you need a paid app, like a texting service, you pay that company directly and I tell you the cost up front. You own everything.';

/** A delivery promise, not a payment guarantee (no "you don't pay the rest" wording: Maz, 1 Oct). */
export const DELIVERY_PROMISE = 'Starter Automation is working within 7 working days of access. Every other job has a date in its fixed quote.';

/** Upgrade credits that make the next sale the natural one. */
export const UPGRADE_CREDITS = [
  `Starter Automation’s ${OFFERS[0].price} comes off a ${OFFERS[1].name} booked within 60 days.`,
  `Bought the ${BRAND_OFFERS[0].name}? Add a ${WEB_OFFERS[0].name} within 60 days and pay only the ${BRAND_OFFERS[1].name} price.`,
];

export const PRICE_RANGE = `${OFFERS[0].price}–${OFFERS[2].price.replace(/^From /, '')}+`;

export function getOffer(id: OfferId): Offer {
  const offer = ALL_OFFERS.find(item => item.id === id);
  if (!offer) throw new Error(`Unknown offer: ${id}`);
  return offer;
}
export function getExtra(name: string): Extra {
  const extra = EXTRAS.find(item => item.name === name);
  if (!extra) throw new Error(`Unknown extra: ${name}`);
  return extra;
}
export function workingBy(id: OfferId): string {
  return id === 'starter' ? 'Within 7 working days of access' : 'Date agreed in your fixed quote';
}
/** Scales with the job, costs nothing unless a sale happens (Offer v10; was a flat £40). */
export const REFERRAL_REWARD = '10% of their first project';

export function priceAmount(price: string): number { return Number(price.replace(/[^0-9.]/g, '')); }
export function formatPrice(amount: number): string { return `£${amount.toLocaleString('en-GB')}`; }
export const LOWEST_EXTRA_PRICE = formatPrice(Math.min(...EXTRAS.map(extra => priceAmount(extra.price))));
export const EXAMPLE_PLAN_TOTAL = formatPrice(OFFERS[0].from + priceAmount(getExtra('Appointment reminders').price));

export type PlanJob = { name: string; offerName: string };
export type PlanQuote = {
  offer: Offer | null;
  lines: { label: string; price: string }[];
  total: number;
  totalLabel: string;
  workingBy: string;
  note: string;
};

/** Three or more jobs to build is a Business System, whatever the parts add up to. */
const BUSINESS_SYSTEM_JOBS = 3;

/**
 * Prices a set of chosen jobs by the offer rules above, for the
 * "Build my system" tool. Everything is read from this file:
 * - a standard add-on can be bought alone at its own price;
 * - a job that needs building is Starter Automation, and each further one is
 *   Extra automation (which only ever adds to a package);
 * - asking for a package (Business System, Custom) quotes that package;
 * - the weekly report is included in a Business System;
 * - when the parts cost more than a Business System, or need three builds,
 *   recommend that instead.
 */
export function quotePlan(jobs: PlanJob[]): PlanQuote {
  const starter = getOffer('starter');
  const business = getOffer('business-system');
  const extraJob = getExtra('Extra automation');
  const unique = jobs.filter((job, index) => jobs.findIndex(other => other.offerName === job.offerName && other.name === job.name) === index);
  const packageJob = [...OFFERS].reverse().find(offer => offer.id !== 'starter' && unique.some(job => job.offerName === offer.name));
  const packageQuote = (offer: Offer, note: string): PlanQuote => ({
    offer, lines: [{ label: offer.name, price: offer.price }], total: offer.from, totalLabel: offer.price, workingBy: workingBy(offer.id), note,
  });
  if (packageJob) return packageQuote(packageJob, packageJob.id === 'business-system' ? 'Everything you picked joined up, with the weekly report included. Exact price in your fixed quote.' : 'Scoped with you first. Exact price in your fixed quote.');
  if (!unique.length) return { offer: starter, lines: [{ label: `${starter.name}: one job of your choice`, price: starter.price }], total: starter.from, totalLabel: starter.price, workingBy: workingBy('starter'), note: 'Pick what costs you time and the plan builds itself.' };
  const lines: PlanQuote['lines'] = [];
  let builds = 0;
  for (const job of unique) {
    const extra = EXTRAS.find(item => item.name === job.offerName && item.name !== extraJob.name);
    if (extra) { lines.push({ label: extra.name, price: extra.price }); continue; }
    lines.push(builds === 0 ? { label: `${starter.name}: ${job.name.toLowerCase()}`, price: starter.price } : { label: `${extraJob.name}: ${job.name.toLowerCase()}`, price: extraJob.price });
    builds++;
  }
  const total = lines.reduce((sum, line) => sum + priceAmount(line.price), 0);
  if (total > business.from) return packageQuote(business, `Your picks add up to ${formatPrice(total)} on their own, more than a ${business.name}, so I would quote that instead, with the weekly report included.`);
  if (builds >= BUSINESS_SYSTEM_JOBS) return packageQuote(business, `${builds} jobs to build is a ${business.name}: joined up, with the weekly report included.`);
  return { offer: builds ? starter : null, lines, total, totalLabel: formatPrice(total), workingBy: workingBy('starter'), note: 'Fixed price, agreed before any work starts. No VAT added.' };
}
