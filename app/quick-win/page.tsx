import type { Metadata } from 'next';
import { CONTACT_EMAIL, SITE_URL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';

const PAGE_URL = `${SITE_URL}/quick-win`;
const ENQUIRY_HREF = '/?service=quick-win#contact';

export const metadata: Metadata = {
  title: 'Quick Win — £150 fixed',
  description: 'One broken or missing thing on your website, booking or Google listing, fixed for £150. Works with the website and booking system you already use.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Quick Win — one fix, £150 fixed',
    description: 'Fix the thing that is quietly losing you customers. No rebuild, no new system.',
    url: PAGE_URL,
    type: 'website',
  },
};

const FIXES = [
  'Security warning when people open your site',
  'Book button going to an old or closed page',
  'No tap-to-call button on phones',
  'Wrong business name on Google',
  'No easy way to leave a Google review',
  'Contact form that never reaches you',
];

const PLATFORMS = [
  ['Website', 'Wix, Squarespace, WordPress, Shopify, GoDaddy'],
  ['Booking', 'Square, Fresha, Booksy, Treatwell, Setmore, Calendly'],
  ['Google', 'Google Business Profile and reviews'],
  ['Domain', 'GoDaddy, 123-reg, IONOS, Namecheap, Cloudflare'],
];

const REASSURANCE = [
  'Your site, bookings and data stay in your accounts.',
  'No password sharing. Add me as a user, remove me after.',
  'Nothing new to pay for monthly.',
];

export default function QuickWinPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Quick Win',
    description: 'One tightly scoped fix to a small business website, booking link, Google listing or enquiry form.',
    url: PAGE_URL,
    provider: { '@type': 'Organization', name: 'Maz Works', url: SITE_URL },
    areaServed: 'GB',
    offers: { '@type': 'Offer', price: '150', priceCurrency: 'GBP' },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="quick-win-title">
        <p className="eyebrow">Quick Win · £150 fixed</p>
        <h1 id="quick-win-title">One fix. £150. Done.</h1>
        <p>I fix the one thing losing you customers, inside the system you already use.</p>
        <div className="mw-actions">
          <a className="button button-signal" href={ENQUIRY_HREF}>Tell me what’s broken</a>
        </div>
      </section>

      <section className="mw-qw-section" aria-labelledby="quick-win-fixes-title">
        <h2 id="quick-win-fixes-title">Common fixes</h2>
        <ul className="mw-qw-list">
          {FIXES.map((fix) => <li key={fix}>{fix}</li>)}
        </ul>
      </section>

      <section className="mw-qw-section" id="works-with" aria-labelledby="quick-win-works-title">
        <p className="eyebrow">Works with what you have</p>
        <h2 id="quick-win-works-title">No new system. No rebuild.</h2>
        <dl className="mw-qw-platforms">
          {PLATFORMS.map(([title, tools]) => <div key={title}><dt>{title}</dt><dd>{tools}</dd></div>)}
        </dl>
        <p className="mw-qw-lead">Using something else? Tell me and I’ll check first.</p>
      </section>

      <section className="mw-qw-section" aria-labelledby="quick-win-safe-title">
        <h2 id="quick-win-safe-title">Your accounts stay yours.</h2>
        <ul className="mw-qw-list">
          {REASSURANCE.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </section>

      <section className="mw-resource-cta" aria-labelledby="quick-win-cta-title">
        <div>
          <p className="eyebrow">£75 to start · £75 on completion</p>
          <h2 id="quick-win-cta-title">Tell me what’s broken.</h2>
          <p>Send your website link. I’ll confirm the fix before you pay.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={ENQUIRY_HREF}>Use the enquiry form</a>
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=Quick%20Win%20enquiry`}>Or email me <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
