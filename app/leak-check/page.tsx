import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SITE_URL, BOOKING_URL, CHECK_REPLY_TIME } from '../site';
import { OG_IMAGE } from '../seo';
import { CallLink } from '../analytics';
import { StickyCheckCta } from '../sticky-cta';
import { SampleReport } from '../sample-report';
import { LeakCheckForm } from './leak-check-form';
import { NICHE_GUIDES } from '../for/niches';

const PAGE_URL = `${SITE_URL}/leak-check`;

export const metadata: Metadata = {
  title: { absolute: 'Free Plan & Fixed Quote: automate the job that eats your week | Maz Works' },
  description: 'Tell me the job that eats your week or loses you customers. I reply within 3 working days with a plan and a fixed price, from £295. Free, no obligation, no call needed.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Free Plan & Fixed Quote — Maz Works',
    description: 'Tell me the job you want off your plate. A plan and fixed price within 3 working days.',
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
  'A fixed price, starting from £295, with any optional extras listed separately',
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
        <p className="eyebrow">Free Plan &amp; Fixed Quote · £0</p>
        <h1 id="leak-check-title">Tell me the job. I’ll send a plan and a price.</h1>
        <p>The chasing, copying, reminding or admin that eats your week, or the point where customers slip away. I look at how you work now and reply with a short plan and a fixed price, from £295.</p>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get my free plan and price</a>
          <CallLink className="button" href={BOOKING_URL} placement="leak-check-hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="mw-hero-note">Written by me · emailed within {CHECK_REPLY_TIME} · no call, no obligation</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-send-title">
        <p className="eyebrow">Send your link</p>
        <h2 id="leak-check-send-title">Three quick answers. Then I plan it myself.</h2>
        <p className="mw-qw-lead">I’ll reply by email within {CHECK_REPLY_TIME}. Free for any UK business, in any trade.</p>
        <LeakCheckForm />
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-walkthrough-title">
        <p className="eyebrow">Prefer to talk it through?</p>
        <h2 id="leak-check-walkthrough-title">Show me the job on a call.</h2>
        <p className="mw-qw-lead">Walk me through how it works now. 15 minutes, free and optional.</p>
        <div className="mw-actions">
          <CallLink className="button" href={BOOKING_URL} placement="leak-check-walkthrough">Book the 15-minute call</CallLink>
        </div>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-checks-title">
        <p className="eyebrow">Jobs I automate most</p>
        <h2 id="leak-check-checks-title">If you do it by hand every week, it probably doesn’t need you.</h2>
        <ul className="mw-qw-list">
          {CHECKS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-examples-title">
        <p className="eyebrow">Any trade</p>
        <h2 id="leak-check-examples-title">Built for any business that runs on customers.</h2>
        <p className="mw-qw-lead">Trades, salons, clinics, cafés, shops, agencies and professional services. Guides by business type: {NICHE_GUIDES.map((guide, index) => (
          <span key={guide.id}>{index ? ' · ' : ''}<a href={`/for/${guide.id}`}>{guide.name}</a></span>
        ))}</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="leak-check-return-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="leak-check-return-title">A short plan and a fixed price.</h2>
        <ul className="mw-qw-list">
          {RETURN.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mw-qw-lead">Honest outcomes, always allowed: &quot;This isn&apos;t worth automating yet.&quot; Or: &quot;The tool you already pay for can do this. Here&apos;s the setting.&quot;</p>
        <div className="s-report-wrap"><SampleReport /></div>
      </section>

      <section className="mw-resource-cta" aria-labelledby="leak-check-cta-title">
        <div>
          <p className="eyebrow">Free first step</p>
          <h2 id="leak-check-cta-title">What would you take off your plate first?</h2>
          <p>One line is enough. No discovery call before you get something useful.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href="#leak-check-form">Get the free plan and price</a>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#leak-check-form" hideWhenVisible="leak-check-form" />
    </main>
  );
}
