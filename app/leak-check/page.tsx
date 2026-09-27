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
  title: { absolute: 'Free Website Booking & Enquiry Check for UK Small Businesses | Maz Works' },
  description: 'Not getting enquiries or bookings? Send your website or booking link. I test it by hand like a customer and email you what is broken, with dated proof, within 2 working days. Free.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Booking & Enquiry Check — Maz Works',
    description: 'Send your website or booking link. I test it by hand and email you what is broken, within 2 working days.',
    url: PAGE_URL,
    type: 'website',
    images: [OG_IMAGE],
  },
};

const CHECKS = [
  'Broken or outdated booking and contact links',
  'A test enquiry followed through to see if it actually reaches you',
  'Phone and enquiry actions that are awkward on mobile',
  'Forms that fail, ask too much or hide the next step',
  'Obvious Google, business-name or trust problems',
  'Simple missed opportunities for reviews or repeat bookings',
];

const RETURN = [
  'One main finding, labelled FIX NOW, FIX SOON or WORKING WHEN CHECKED',
  'Up to two smaller findings',
  'Dated evidence of exactly what I tested',
  'What it stops or slows down for your customers',
  'One fix and a fixed price, only if one is worth paying for',
];

export default function LeakCheckPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Maz Works Free Booking & Enquiry Check',
    description: 'A free manual review of a small-business website, booking route and enquiry journey.',
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
        <p className="eyebrow">Free Booking &amp; Enquiry Check · £0</p>
        <h1 id="leak-check-title">Send your link. I’ll test it like a customer would.</h1>
        <p>I tap your booking and call buttons, send a real test enquiry and check your Google details. You get what’s broken, in plain English, with dated proof.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free check</a>
          <CallLink className="button" href={BOOKING_URL} placement="leak-check-hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="mw-hero-note">Checked by hand · emailed within {CHECK_REPLY_TIME} · no call, no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Send your link</p>
        <h2 id="leak-check-send-title">Three fields. Then I check it myself.</h2>
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
        <h2 id="leak-check-examples-title">What I found on UK business websites in September 2026.</h2>
        <ul className="mw-qw-list">
          {REAL_FINDINGS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">Not your trade? The same check works for any business customers book, call or enquire with. By business type: {NICHE_GUIDES.map((guide, index) => (
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
          <a className="button button-signal" href="#leak-check-form">Get the free check</a>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
