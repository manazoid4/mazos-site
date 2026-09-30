import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { BOOKING_URL } from '../site';
import { OFFERS } from '../offers';
import { LiveDemo } from '../demos/live-demo';

const STARTER = OFFERS[0];

/**
 * LinkedIn landing page (30 Sep): the one link in Maz's profile, Featured
 * section and first comments. It says hello, shows the live demo, and offers
 * the three next steps, each tagged src=linkedin so leads show where they came from.
 * Kept out of search and the sitemap: it is a channel page, not new content.
 */
export const metadata: Metadata = {
  title: 'Hello from LinkedIn',
  description: 'Watch your own system run in your business name, then get a free plan and fixed price.',
  alternates: { canonical: '/linkedin' },
  robots: { index: false, follow: true },
};

export default function LinkedInPage() {
  return (
    <main>
      <SiteHeader />

      <section className="mw-section li-hello" id="main-content" tabIndex={-1} aria-labelledby="li-title">
        <img className="li-photo" src="/maz.webp" alt="Manazir Hussain" width={96} height={96} />
        <div>
          <p className="eyebrow">You found me on LinkedIn</p>
          <h1 id="li-title">Hi, I’m Maz. I build the systems that stop enquiries slipping away.</h1>
          <p className="mw-lede">{`Missed calls, slow replies, no-shows, chasing quotes. I set it up once so it runs on its own. From ${STARTER.price}, fixed price agreed first.`}</p>
        </div>
      </section>

      <section className="mw-section" aria-labelledby="li-demo-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Step 1 · 20 seconds</p>
          <h2 id="li-demo-title">See it working for your business first.</h2>
        </header>
        <LiveDemo source="linkedin" />
      </section>

      <section className="mw-section" aria-labelledby="li-next-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Step 2 · pick one</p>
          <h2 id="li-next-title">Then, whichever suits you.</h2>
        </header>
        <ol className="ld-funnel">
          <li><strong><a href="/leak-check?src=linkedin#leak-check-form">Free plan and fixed price</a></strong><span>Tap what costs you time. I reply within 1 working day.</span></li>
          <li><strong><a href={`${BOOKING_URL}?utm_source=linkedin`}>15-minute call</a></strong><span>Talk it through, no slides, no pressure.</span></li>
          <li><strong><a href="/prices">Every price</a></strong><span>{`From ${STARTER.price}. Half to start, the rest when it works.`}</span></li>
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
