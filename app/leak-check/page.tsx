import { OFFERS, FREE_STEP } from '../offers';
import { fitDescription } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL, BOOKING_URL, CHECK_REPLY_TIME } from '../site';
import { OG_IMAGE } from '../seo';
import { CallLink } from '../analytics';
import { StickyCheckCta } from '../sticky-cta';
import { SampleReport } from '../sample-report';
import { LeakCheckForm } from './leak-check-form';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: { absolute: 'Free plan and fixed quote | Maz Works' },
  description: fitDescription(`Tell me the job that eats your week or loses you customers. I reply within ${CHECK_REPLY_TIME} with a plan and a fixed price, from ${OFFERS[0].price}. Free, no obligation, no call needed.`),
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Plan & Fixed Quote — Maz Works',
    description: fitDescription('Tell me the job you want off your plate. A plan and fixed price within 1 working day.'),
    url: PAGE_URL,
    type: 'website',
    images: [OG_IMAGE],
  },
};

const RETURN = [
  'What to automate first, and why',
  'What I would leave alone, and why',
  `A fixed price, starting from ${OFFERS[0].price}, with any optional extras listed separately`,
  'Any software or text-message costs you would pay directly',
  'A date it would be live by',
];

export default function LeakCheckPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Maz Works Free Plan & Fixed Quote',
    description: fitDescription('A free plan and fixed price for automating a job a small business does by hand.'),
    url: PAGE_URL,
    provider: { '@type': 'Organization', name: 'Maz Works', url: SITE_URL },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="leak-check-title">
        <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
        <h1 id="leak-check-title">Tell me the job. I’ll send a plan and a price.</h1>
        <p>Tell me what you keep chasing, copying or doing by hand. I’ll tell you what I’d change and what it costs.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free plan and price</a>
          <a className="button" href="#leak-check-return-title">See an example</a>
        </div>
        <p className="mw-hero-note">Written by me · emailed within {CHECK_REPLY_TIME} · no call needed</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Your free plan</p>
        <h2 id="leak-check-send-title">Tap what’s costing you.</h2>
        <p className="mw-qw-lead">A few taps is enough. Free for any UK business, in any trade.</p>
        <LeakCheckForm />
        <p className="mw-qw-lead">Prefer to talk? <CallLink href={BOOKING_URL} placement="leak-check-walkthrough">Book a free 15-minute call</CallLink>.</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-return-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="leak-check-return-title">A short plan you can act on.</h2>
        <ul className="mw-qw-list">
          {RETURN.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="s-report-wrap"><SampleReport /></div>
        <p className="mw-qw-lead">Sometimes the answer is: &quot;This isn&apos;t worth automating yet.&quot; If the tool you already pay for can do it, I’ll tell you.</p>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
