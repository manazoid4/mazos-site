import { fitDescription } from '../seo';
import { OG_IMAGE } from '../seo';
import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { CHANGES_WINDOW, DELIVERY_PROMISE } from '../offers';
import { CHECK_REPLY_TIME } from '../site';
import { DemoPath } from '../demo-path';

const DEMO_DESCRIPTION = 'Bigger build? Start with the free plan, then see a working preview built around your business before you pay. One fixed price and 30 days of tweaks.';

export const metadata: Metadata = {
  title: 'Free demo, built around your business',
  description: DEMO_DESCRIPTION,
  alternates: { canonical: '/demos' },
  openGraph: { images: [OG_IMAGE],
    title: 'Free demo, built around your business — Maz Works',
    description: fitDescription('Start with the free plan, then see a working preview of a bigger build before you pay.'),
    url: '/demos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free demo, built around your business — Maz Works',
    description: fitDescription('Start with the free plan, then see a working preview of a bigger build before you pay.'),
    images: [OG_IMAGE.url],
  },
};

const FAQ = [
  ['Is the demo really free?', 'Yes. You pay nothing for the plan or the preview, and you are under no obligation to go ahead.'],
  ['When do I get it?', 'The date is in your free plan, based on what the preview needs to show. Prefer to talk it through? A 15-minute call is optional.'],
  ['What if a demo won’t help?', 'Some jobs are clearer as a written plan. If so, the plan and fixed price are all you need.'],
  ['What happens after the demo?', 'If you like it, I send the full plan with one fixed price. Every item is listed and invoiced clearly, with no extra charges later.'],
  ['What counts as a tweak in the 30 days?', 'Anything that adjusts what I built: wording, timings, steps, notifications, small layout changes, in up to two rounds. Anything not working as agreed is fixed free for 90 days. Something new, like another page, system or app, is priced first so it stays fair.'],
];

export default function DemosPage() {
  return (
    <main className="s-home">
      <SiteHeader />

      <section className="s-hero s-hero-short" id="main-content" tabIndex={-1} aria-labelledby="demos-title">
        <p className="eyebrow">See it before you pay</p>
        <h1 id="demos-title">Bigger build? <em>See it working</em> before you pay.</h1>
        <p className="s-lede">Start with the free plan: no call needed. If your job is a Business System, Launch Page, Website or Custom Software, a free working preview comes next, by a date we agree. Smaller jobs get the written plan and a fixed price straight away.</p>
        <DemoPath source="demos" />
        <p className="s-small">I usually reply within {CHECK_REPLY_TIME}.</p>
      </section>

      <p className="s-section s-small"><a className="s-details-link" href="/prices#next">After it goes live: {CHANGES_WINDOW.name} →</a></p>

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
