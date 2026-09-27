import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL, BOOKING_URL, CHECK_REPLY_TIME } from '../site';
import { OG_IMAGE } from '../seo';
import { CallLink } from '../analytics';
import { StickyCheckCta } from '../sticky-cta';
import { SampleReport } from '../sample-report';
import { REAL_FINDINGS } from '../real-findings';
import { LeakCheckForm } from './leak-check-form';
import { NICHE_GUIDES } from '../for/niches';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: { absolute: 'Free Customer Journey Review for UK Small Businesses | Maz Works' },
  description: 'Losing enquiries, bookings or hours to admin? Send your website or booking link. I review how customers reach you and what happens after, by hand, and email you what to fix first within 3 working days. Free.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Customer Journey Review — Maz Works',
    description: 'Send your website or booking link. I review how customers reach you and what happens after, and email you what to fix first within 3 working days.',
    url: PAGE_URL,
    type: 'website',
    images: [OG_IMAGE],
  },
};

const CHECKS = [
  'Booking, call and enquiry routes, tested on a phone',
  'A real test enquiry followed through to see if, and how fast, it reaches you',
  'Confirmations, reminders and what customers hear after they get in touch',
  'Quote and enquiry follow-up: what happens when nobody replies',
  'Google Business Profile, business details and trust signals',
  'Repeat admin that a simple system could take off your hands',
];

const RETURN = [
  'One main finding, labelled FIX NOW, FIX SOON or WORKING WHEN CHECKED',
  'Up to two smaller findings',
  'Dated evidence of exactly what I tested',
  'What it stops or slows down for your customers',
  'The change worth making first, with a fixed quote, only if it is worth paying for',
];

export default function LeakCheckPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Maz Works Free Customer Journey Review',
    description: 'A free manual review of how customers find, contact and book a small business, and what happens after.',
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
        <p className="eyebrow">Free Customer Journey Review · £0</p>
        <h1 id="leak-check-title">Send your link. I’ll go through it like a customer would.</h1>
        <p>I try to book, call and enquire, follow a real test enquiry, and look at what happens after: confirmations, follow-up and the admin behind it. You get the change worth making first, in plain English, with dated proof.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free review</a>
          <CallLink className="button" href={BOOKING_URL} placement="leak-check-hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="mw-hero-note">Reviewed by hand · emailed within {CHECK_REPLY_TIME} · no call, no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Send your link</p>
        <h2 id="leak-check-send-title">Three fields. Then I review it myself.</h2>
        <p className="mw-qw-lead">I’ll reply by email within {CHECK_REPLY_TIME}. Free for any UK business. No website? Send your booking, Google or Facebook link.</p>
        <LeakCheckForm />
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-walkthrough-title">
        <p className="eyebrow">Prefer to talk it through?</p>
        <h2 id="leak-check-walkthrough-title">Show me how a new customer reaches you.</h2>
        <p className="mw-qw-lead">We&apos;ll check the journey together in 15 minutes. Free, and optional.</p>
        <div className="mw-actions">
          <CallLink className="button" href={BOOKING_URL} placement="leak-check-walkthrough">Book the 15-minute call</CallLink>
        </div>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-checks-title">
        <p className="eyebrow">What I check</p>
        <h2 id="leak-check-checks-title">The things I look for first.</h2>
        <ul className="mw-qw-list">
          {CHECKS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-examples-title">
        <p className="eyebrow">Real examples</p>
        <h2 id="leak-check-examples-title">What I found reviewing UK businesses in September 2026.</h2>
        <ul className="mw-qw-list">
          {REAL_FINDINGS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">Not your trade? The same review works for any business customers book, call or enquire with. By business type: {NICHE_GUIDES.map((guide, index) => (
          <span key={guide.id}>{index ? ' · ' : ''}<a href={`/for/${guide.id}`}>{guide.name}</a></span>
        ))}</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-return-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="leak-check-return-title">A useful answer, not a sales report.</h2>
        <ul className="mw-qw-list">
          {RETURN.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">Honest outcomes, always allowed: &quot;Your current provider should be able to fix this.&quot; Or: &quot;I couldn&apos;t find anything I&apos;d honestly charge you to fix.&quot;</p>
        <div className="s-report-wrap"><SampleReport /></div>
      </section>

      <section className="mw-resource-cta" aria-labelledby="leak-check-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="leak-check-cta-title">Want me to check yours?</h2>
          <p>Send the link. No discovery call before you get something useful.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get the free review</a>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
