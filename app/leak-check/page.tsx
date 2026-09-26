import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL } from '../site';
import { LeakCheckForm } from './leak-check-form';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: 'Free Website Leak Check for Small Businesses',
  description: 'Send your website and get a short, plain-English Leak Check covering obvious customer friction, broken routes and the first thing worth fixing. Free, no call required.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Website Leak Check — Maz Works',
    description: 'Send your website. Get a short, prioritised list of obvious customer leaks and the first thing worth fixing.',
    url: PAGE_URL,
    type: 'website',
  },
};

const CHECKS = [
  'Broken or outdated booking and contact links',
  'Phone and enquiry actions that are awkward on mobile',
  'Forms that fail, ask too much or hide the next step',
  'Obvious Google, business-name or trust problems',
  'Pages that look unfinished, confusing or hard to act on',
  'Simple missed opportunities for reviews or repeat bookings',
];

const RETURN = [
  'A short list of the problems I can actually verify',
  'The order I would fix them in',
  'The smallest sensible paid fix, only if one is worth doing',
];

export default function LeakCheckPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Maz Works Free Website Leak Check',
    description: 'A free manual review of a small-business website for obvious customer-facing friction and broken routes.',
    url: PAGE_URL,
    provider: { '@type': 'Organization', name: 'Maz Works', url: SITE_URL },
    areaServed: [
      { '@type': 'City', name: 'Nottingham' },
      { '@type': 'AdministrativeArea', name: 'East Midlands' },
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
        <p className="eyebrow">Free Leak Check · £0</p>
        <h1 id="leak-check-title">Send your website. I’ll show you what’s getting in the way.</h1>
        <p>I check the customer journey, mobile basics, booking and contact routes, Google details and obvious trust problems. You get a short list in plain English.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free Leak Check</a>
        </div>
        <p className="mw-hero-note">No call required · no automated score · no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Send your link</p>
        <h2 id="leak-check-send-title">Three fields. Then I check it myself.</h2>
        <p className="mw-qw-lead">I’ll reply by email within 2 working days. Independent businesses in Nottingham and the East Midlands are the current focus; UK businesses are welcome.</p>
        <LeakCheckForm />
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-checks-title">
        <p className="eyebrow">Common leaks</p>
        <h2 id="leak-check-checks-title">The things I look for first.</h2>
        <ul className="mw-qw-list">
          {CHECKS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-return-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="leak-check-return-title">A useful answer, not a sales report.</h2>
        <ul className="mw-qw-list">
          {RETURN.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">If nothing important is wrong, I’ll say that too.</p>
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
    </main>
  );
}
