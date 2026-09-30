import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL, BOOKING_URL, CHECK_REPLY_TIME } from '../site';
import { FREE_STEP, OFFERS } from '../offers';
import { OG_IMAGE } from '../seo';
import { CallLink } from '../analytics';
import { StickyCheckCta } from '../sticky-cta';
import { SampleReport } from '../sample-report';
import { LeakCheckForm } from './leak-check-form';
import { NICHE_GUIDES } from '../for/niches';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: { absolute: `Free plan and fixed price in ${CHECK_REPLY_TIME} | Maz Works` },
  description: `Tell me the job that eats your week or loses you customers. I reply within ${CHECK_REPLY_TIME} with a plan and a fixed price. Free, no call needed.`,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Plan & Fixed Quote — Maz Works',
    description: `Tell me the job you want off your plate. A plan and fixed price within ${CHECK_REPLY_TIME}.`,
    url: PAGE_URL,
    type: 'website',
    images: [OG_IMAGE],
  },
};

const CHECKS = [
  'Enquiries from phone, email, forms and DMs gathered into one list, with an instant reply',
  'Booking confirmations, reminders and rebooking prompts',
  'Quotes that follow themselves up',
  'Invoices and payment reminders sent on time',
  'Customer details collected once and shared with the team',
  'Review requests after every job',
];

const RETURN = [
  'What to automate first, and why',
  'What I would leave alone, and why',
  `A fixed price, starting from ${OFFERS[0].price}, with optional extras separate`,
  'Any software or text-message costs you would pay directly',
  'A date it would be live by',
];

export default function LeakCheckPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Maz Works Free Plan & Fixed Quote',
    description: 'A free plan and fixed price for automating a job a small business does by hand.',
    url: PAGE_URL,
    provider: { '@type': 'Organization', name: 'Maz Works', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    offers: { '@type': 'Offer', price: FREE_STEP.price.replace(/[^0-9.]/g, ''), priceCurrency: 'GBP' },
  };

  return (
    <main className="s-form-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="leak-check-title">
        <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
        <h1 id="leak-check-title">Tell me the job. I’ll send a plan and a price.</h1>
        <p>Tap the job you want off your plate. I’ll email a plan and fixed price. No call needed.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get a free plan and price</a>

        </div>
        <p className="mw-hero-note">Written by me · emailed within {CHECK_REPLY_TIME} · no call, no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Your free plan</p>
        <h2 id="leak-check-send-title">Tap what’s costing you. I plan it myself.</h2>
        <p className="mw-qw-lead">I’ll reply by email within {CHECK_REPLY_TIME}. Free for any UK business, in any trade.</p>
        <LeakCheckForm />
        <p className="mw-qw-lead">Prefer to talk it through? <CallLink href={BOOKING_URL} placement="leak-check-walkthrough">Book a free 15-minute call</CallLink> and show me the job.</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-return-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="leak-check-return-title">See an example first. Yours looks like this.</h2>
        <ul className="mw-qw-list">
          {RETURN.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="s-report-wrap"><SampleReport /></div>
        <p className="mw-qw-lead">Honest outcomes, always allowed: &quot;This isn&apos;t worth automating yet.&quot; Or: &quot;The tool you already pay for can do this. Here&apos;s the setting.&quot;</p>
      </section>



      <section className="mw-qw-section" aria-labelledby="leak-check-checks-title">
        <p className="eyebrow">Jobs I automate most</p>
        <h2 id="leak-check-checks-title">If you do it by hand every week, it probably doesn’t need you.</h2>
        <ul className="mw-qw-list">
          {CHECKS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">Built for any business that runs on customers. Guides by business type: {NICHE_GUIDES.map((guide, index) => (
          <span key={guide.id}>{index ? ' · ' : ''}<a href={`/for/${guide.id}`}>{guide.name}</a></span>
        ))}</p>
      </section>

      <section className="mw-resource-cta" aria-labelledby="leak-check-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="leak-check-cta-title">What would you take off your plate first?</h2>
          <p>A few taps is enough. No discovery call before you get something useful.</p>
        </div>

      </section>

      <SiteFooter />
      <StickyCheckCta href="#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
