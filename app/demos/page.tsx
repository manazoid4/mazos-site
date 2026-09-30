import { fitDescription } from '../seo';
import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { OFFERS } from '../offers';
import { LiveDemo } from './live-demo';

const DEMO_DESCRIPTION = 'Free live demo: type your business name and watch your own system run, in your name, in 20 seconds. Then get a free plan and fixed price.';

export const metadata: Metadata = {
  title: 'Free live demo of your system',
  description: DEMO_DESCRIPTION,
  alternates: { canonical: '/demos' },
  openGraph: { images: [OG_IMAGE],
    title: 'Free live demo — Maz Works',
    description: fitDescription('Watch your own system run, in your business name, in 20 seconds.'),
    url: '/demos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free live demo — Maz Works',
    description: fitDescription('Watch your own system run, in your business name, in 20 seconds.'),
    images: [OG_IMAGE.url],
  },
};

const STARTER = OFFERS[0];

export default function DemosPage() {
  return (
    <main>
      <SiteHeader />

      <section className="mw-section" id="main-content" tabIndex={-1} aria-labelledby="demos-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Free live demo</p>
          <h1 id="demos-title">Watch your own system run, <em>in your name</em>.</h1>
          <p className="mw-lede">Type your business name, pick your trade and what costs you most. Twenty seconds later you see it working for you.</p>
        </header>
        <LiveDemo />
      </section>

      <section className="mw-section" aria-labelledby="next-title">
        <header className="mw-section-heading">
          <p className="eyebrow">From demo to done</p>
          <h2 id="next-title">Three steps. You only pay at the last one.</h2>
        </header>
        <ol className="ld-funnel">
          <li aria-current="step"><strong>Free live demo</strong><span>What you just watched. No sign-up.</span></li>
          <li><strong>Free plan and fixed price</strong><span>I look at how you work now and reply within 1 working day.</span></li>
          <li><strong>I build it on your tools</strong><span>{`From ${STARTER.price}. Half to start, the rest when it works.`}</span></li>
        </ol>
        <div className="mw-actions">
          <a className="button button-signal" href="/leak-check?src=demos-page#leak-check-form">Get my free plan and price</a>
          <a className="text-link" href="/prices">See every price <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="mw-section" aria-labelledby="private-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Bigger jobs</p>
          <h2 id="private-title">For custom builds, a private demo on your real setup.</h2>
          <p>Before a bigger project is agreed, I can build a private working demo around your business, behind a link and access code only you see.</p>
        </header>
        <div className="mw-actions">
          <a className="button" href="/contact#contact">Ask for a private demo</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
