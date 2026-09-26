import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL, BOOKING_URL } from '../site';
import { LeakCheckForm } from './leak-check-form';
import { NICHE_GUIDES } from '../for/niches';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: 'Free Booking & Enquiry Check for Small Businesses',
  description: 'Send your website and get a short, plain-English check of your booking and enquiry routes: what is broken, what it is stopping, and the one fix worth paying for, if any. Free, no call required.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Booking & Enquiry Check — Maz Works',
    description: 'Send your website. Get a short, honest check of your booking and enquiry routes.',
    url: PAGE_URL,
    type: 'website',
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
  'What was actually tested, and what it is likely costing you',
  'One scoped recommendation and price, only if one is worth it',
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
        <h1 id="leak-check-title">Send your website. I’ll show you what’s getting in the way.</h1>
        <p>I check the customer journey, booking and contact routes, mobile basics, Google details and obvious trust problems. You get a short list in plain English.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free check</a>
          <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Or a 15-minute walkthrough</a>
        </div>
        <p className="mw-hero-note">No call required · no automated score · no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Send your link</p>
        <h2 id="leak-check-send-title">Three fields. Then I check it myself.</h2>
        <p className="mw-qw-lead">I’ll reply by email within 5 working days. Free for any UK business.</p>
        <LeakCheckForm />
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-walkthrough-title">
        <p className="eyebrow">Prefer to talk it through?</p>
        <h2 id="leak-check-walkthrough-title">Show me how a new customer reaches you.</h2>
        <p className="mw-qw-lead">Book a free 15-minute call. We check the journey together, on screen, and you tell me what matters.</p>
        <div className="mw-actions">
          <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book the 15-minute walkthrough</a>
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
        <h2 id="leak-check-examples-title">What I found on UK business websites this month.</h2>
        <ul className="mw-qw-list">
          <li>A salon homepage showing unrelated casino content and template contact details.</li>
          <li>A bakery contact page listing Email@example.com and placeholder reviews.</li>
          <li>A venue whose mobile call button dialled the wrong number.</li>
          <li>A clinic whose Book Consultation link opened an error page.</li>
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
