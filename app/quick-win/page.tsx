import type { Metadata } from 'next';
import { CONTACT_EMAIL, SITE_URL } from '../site';
import { SiteFooter, SiteHeader } from '../site-chrome';

const PAGE_URL = `${SITE_URL}/quick-win`;
const ENQUIRY_HREF = '/?service=repair#contact';

export const metadata: Metadata = {
  title: 'Quick Win has moved',
  description: 'Quick Win has been replaced by the Booking & Enquiry Repair. Same idea, properly scoped and tested.',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Quick Win has moved — Maz Works',
    description: 'This offer has been replaced by the Booking & Enquiry Repair.',
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
  return (
    <main>
      <SiteHeader />

      <section className="mw-resource-hero" id="main-content" tabIndex={-1} aria-labelledby="quick-win-title">
        <p className="eyebrow">This offer has moved</p>
        <h1 id="quick-win-title">Quick Win is now the Booking &amp; Enquiry Repair.</h1>
        <p>Same idea — one thing fixed — but properly scoped, tested and backed by a guarantee. £395, fixed price agreed first.</p>
        <div className="mw-actions">
          <a className="button button-signal" href={ENQUIRY_HREF}>Ask about a repair</a>
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
          <p className="eyebrow">£200 to start · £195 on completion</p>
          <h2 id="quick-win-cta-title">Tell me what’s broken.</h2>
          <p>Send your website link. I’ll confirm the fix and price before you pay.</p>
        </div>
        <div className="mw-actions">
          <a className="button button-signal" href={ENQUIRY_HREF}>Use the enquiry form</a>
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=Booking%20%26%20Enquiry%20Repair%20enquiry`}>Or email me <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
