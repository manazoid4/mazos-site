import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { OFFERS, PROMISES } from '../offers';
import { DemoPath } from '../demo-path';

const STARTER = OFFERS[0];

/**
 * LinkedIn landing page (30 Sep): the one link in Maz's profile, Featured
 * section and first comments. It says hello, shows the free demo route and
 * the promises. Links are tagged so leads show where they came from.
 * Kept out of search and the sitemap: it is a channel page, not new content.
 */
export const metadata: Metadata = {
  title: 'Hello from LinkedIn',
  description: 'Book a short call and get a free working demo built around your business.',
  alternates: { canonical: '/linkedin' },
  robots: { index: false, follow: true },
};

export default function LinkedInPage() {
  return (
    <main className="s-home">
      <SiteHeader />

      <section className="s-hero s-hero-short li-hello" id="main-content" tabIndex={-1} aria-labelledby="li-title">
        <img className="li-photo" src="/maz.webp" alt="Manazir Hussain" width={96} height={96} />
        <div>
          <p className="eyebrow">You found me on LinkedIn</p>
          <h1 id="li-title">Hi, I’m Maz. I build the systems that stop enquiries slipping away.</h1>
          <p className="s-lede">{`Missed calls, slow replies, no-shows, chasing quotes. I set it up once so it runs on its own. From ${STARTER.price}, fixed price agreed first.`}</p>
        </div>
      </section>

      <section className="s-section" aria-labelledby="li-demo-title">
        <p className="eyebrow">See it before you pay</p>
        <h2 id="li-demo-title">Start with a free demo.</h2>
        <DemoPath source="linkedin" />
        <p className="s-small">Prefer to write it down? <a href="/leak-check?src=linkedin#leak-check-form">Get a free plan and price</a>.</p>
      </section>

      <section className="s-section" aria-labelledby="li-why-title">
        <p className="eyebrow">Why owners pick this</p>
        <h2 id="li-why-title">What you can count on.</h2>
        <ul className="s-trust">{PROMISES.map((term) => <li key={term.title}><strong>{term.title}</strong><span>{term.body}</span></li>)}</ul>
      </section>

      <SiteFooter />
    </main>
  );
}
