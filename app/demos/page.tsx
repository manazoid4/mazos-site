import { fitDescription } from '../seo';
import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { CHANGES_WINDOW, GUARANTEE } from '../offers';
import { CHECK_REPLY_TIME } from '../site';
import { ChangesWindow, DemoPath } from '../demo-path';

const DEMO_DESCRIPTION = 'Book a 15-minute call and get a free working demo built around your business, by a date we agree. Then one fixed price and 2 months of unlimited changes.';

export const metadata: Metadata = {
  title: 'Free demo, built around your business',
  description: DEMO_DESCRIPTION,
  alternates: { canonical: '/demos' },
  openGraph: { images: [OG_IMAGE],
    title: 'Free demo, built around your business — Maz Works',
    description: fitDescription('A short call, then a free working demo by the date we agree. See it before you pay.'),
    url: '/demos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free demo, built around your business — Maz Works',
    description: fitDescription('A short call, then a free working demo by the date we agree. See it before you pay.'),
    images: [OG_IMAGE.url],
  },
};

const FAQ = [
  ['Is the demo really free?', 'Yes. You pay nothing for the call or the demo, and you are under no obligation to go ahead.'],
  ['When do I get it?', 'We agree the date on the call, based on what the demo needs to show. You know it before we hang up.'],
  ['What if a demo won’t help?', 'Some jobs are clearer as a written plan. If so, I tell you on the call and send the plan and fixed price instead.'],
  ['What happens after the demo?', 'If you like it, I send the full plan with one fixed price. Every item is listed and invoiced clearly, with no extra charges later.'],
  ['What counts as a change in the 2 months?', 'Anything that adjusts what I built: wording, timings, steps, notifications, fixes. Something new, like another system or app, is priced first so it stays fair.'],
];

export default function DemosPage() {
  return (
    <main className="s-home">
      <SiteHeader />

      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="demos-title">
        <p className="eyebrow">See it before you pay</p>
        <h1 id="demos-title">A free demo, <em>built around your business</em>.</h1>
        <p className="s-lede">A short call first. Then a working demo of your system, by a date we agree on the call. Only if you like it do we talk price.</p>
        <DemoPath source="demos" />
        <p className="s-small">Prefer to write it down? <a href="/leak-check?src=demos-page#leak-check-form">Get a free plan and price instead</a>. I reply within {CHECK_REPLY_TIME}.</p>
      </section>

      <section className="s-section" id="changes" aria-labelledby="changes-title">
        <p className="eyebrow">After it goes live</p>
        <h2 id="changes-title">{CHANGES_WINDOW.name}, no extra charge.</h2>
        <ChangesWindow />
        
      </section>

      <section className="s-section" id="questions" aria-labelledby="questions-title">
        <p className="eyebrow">Straight answers</p>
        <h2 id="questions-title">Questions people ask first.</h2>
        <div className="dp-faq">
          {FAQ.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
        <p className="s-small">Your demo sits behind a private link and access code. Only the people you choose see it.</p>
      </section>

      <SiteFooter />
    </main>
  );
}
