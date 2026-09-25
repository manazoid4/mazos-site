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
  ['Your website shows a security warning', 'Phones say “Not secure” or refuse to open the site. Usually a certificate or domain setting, not a new website.'],
  ['Your Book button goes to the wrong place', 'It opens an old or closed booking page. I point every button to the booking system you use now.'],
  ['Customers can’t call you from their phone', 'Your number is missing or is plain text. I add a tap-to-call button where people look for it.'],
  ['Your name is wrong on Google', 'A typo, an old business name or “Home” in the search title. I correct the title and the Google listing details.'],
  ['No easy way to leave a review', 'I add a direct Google review link to your site, and a QR code you can print if you want one.'],
  ['Enquiries don’t reach you', 'A contact form that fails quietly. I fix it and test it end to end, so every message lands in your inbox.'],
];

const PLATFORMS = [
  {
    title: 'Your website',
    tools: 'Wix · Squarespace · WordPress · Shopify · GoDaddy · custom-built sites',
    body: 'I make the change inside the site you already have. No rebuild, no moving hosts, and your design stays as it is.',
  },
  {
    title: 'Your booking system',
    tools: 'Square · Fresha · Booksy · Treatwell · Setmore · Calendly',
    body: 'Your bookings, clients and payments stay where they are. I link or embed your live booking page so customers land on it first time.',
  },
  {
    title: 'Google',
    tools: 'Google Business Profile · Google reviews · Google Search',
    body: 'I fix what people see when they search for you: your name, your links and your review button.',
  },
  {
    title: 'Your domain',
    tools: 'GoDaddy · 123-reg · IONOS · Namecheap · Cloudflare',
    body: 'For security warnings or broken links, I fix the domain settings. You keep the domain in your own name.',
  },
];

const REASSURANCE = [
  ['You keep everything', 'Your website, booking system, domain and customer data stay in your accounts. Nothing moves to me.'],
  ['No password sharing', 'Most platforms let you add me as a contributor or staff user, and you remove me when the job is done. Or we do it together on a screen-share.'],
  ['One agreed change', 'We agree the fix before any payment. If it turns out bigger than £150, I tell you first and you decide.'],
  ['Nothing new to pay for monthly', 'The fix uses the tools you already pay for. Ongoing support is optional, never required.'],
];

const STEPS = [
  ['01', 'Tell me what’s wrong', 'A sentence is enough, or send me your website link and I’ll look.'],
  ['02', 'I check it and confirm', 'I tell you what the fix is and which system it touches, before you pay anything.'],
  ['03', 'I fix it and show you', '£75 to start. I make the change and show you it working on your own phone.'],
  ['04', 'You pay the rest', '£75 on completion, once you’re happy it works.'],
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
        <h1 id="quick-win-title">Fix the one thing that’s losing you customers.</h1>
        <p>One broken or missing thing on your website, booking link or Google listing, fixed for £150. It works with the system you already use, so there’s no rebuild and nothing new to learn.</p>
        <div className="mw-actions">
          <a className="button button-signal" href={ENQUIRY_HREF}>Tell me what’s broken</a>
          <a className="text-link" href="#works-with">See what it works with <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="mw-resource-list" aria-labelledby="quick-win-fixes-title">
        <h2 className="mw-qw-heading" id="quick-win-fixes-title">Common £150 fixes</h2>
        {FIXES.map(([title, body], index) => (
          <article className="mw-resource-row" key={title}>
            <span className="mw-resource-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mw-qw-section" id="works-with" aria-labelledby="quick-win-works-title">
        <p className="eyebrow">Works with what you have</p>
        <h2 id="quick-win-works-title">No new system. I fix it where it lives.</h2>
        <p className="mw-qw-lead">These are the platforms small businesses use most. If yours isn’t listed, tell me which one it is and I’ll check before quoting.</p>
        <div className="mw-qw-grid">
          {PLATFORMS.map((platform) => (
            <article className="mw-qw-card" key={platform.title}>
              <h3>{platform.title}</h3>
              <p className="mw-qw-tools">{platform.tools}</p>
              <p>{platform.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mw-qw-section" aria-labelledby="quick-win-safe-title">
        <p className="eyebrow">Safe to say yes</p>
        <h2 id="quick-win-safe-title">Your accounts stay yours.</h2>
        <div className="mw-qw-grid">
          {REASSURANCE.map(([title, body]) => (
            <article className="mw-qw-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mw-resource-list" aria-labelledby="quick-win-steps-title">
        <h2 className="mw-qw-heading" id="quick-win-steps-title">How it works</h2>
        {STEPS.map(([index, title, body]) => (
          <article className="mw-resource-row" key={index}>
            <span className="mw-resource-index">{index}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mw-resource-cta" aria-labelledby="quick-win-cta-title">
        <div>
          <p className="eyebrow">£75 to start · £75 on completion</p>
          <h2 id="quick-win-cta-title">Tell me what’s broken.</h2>
          <p>Send your website link and one line about the problem. I’ll confirm the fix and the price before any work starts.</p>
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
