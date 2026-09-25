import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';

const DEMO_DESCRIPTION = 'See how Maz Works turns a real business problem into a private working demo before a full build is agreed.';

export const metadata: Metadata = {
  title: 'Private business demos',
  description: DEMO_DESCRIPTION,
  alternates: { canonical: '/demos' },
  openGraph: {
    title: 'Private business demos — Maz Works',
    description: 'See the useful part working before committing to the full build.',
    url: '/demos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private business demos — Maz Works',
    description: 'See the useful part working before committing to the full build.',
  },
};

const DEMO_TYPES = [
  {
    title: 'Website direction',
    body: 'See how your site could look and guide customers first.',
  },
  {
    title: 'Customer journey',
    body: 'Make ordering, booking or contacting you easier for customers.',
  },
  {
    title: 'Follow-up & admin',
    body: 'Show how chasing, copying or missed follow-ups could be simpler.',
  },
  {
    title: 'Physical + digital',
    body: 'Link your website to review taps, menu stands or signs.',
  },
];

export default function DemosPage() {
  return (
    <main>
      <SiteHeader />

      <section className="mw-hero" id="main-content" tabIndex={-1} aria-labelledby="demos-title">
        <div className="mw-hero-copy">
          <p className="eyebrow">Maz Works / Private demos</p>
          <h1 id="demos-title">See the idea working before you pay for the full build.</h1>
          <p className="mw-lede">For suitable projects, I build a private demo around your business. No templates and no slide decks.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="/#contact">Ask for a private demo</a>
            <a className="text-link" href="#examples">What a demo can show <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">Each demo is shared only with its business. Public examples stay selective by design.</p>
        </div>
        <div className="mw-capabilities" aria-label="Private demo benefits">
          <span>Built around your business</span>
          <span>Private link + access code</span>
          <span>No commitment to the full build</span>
          <span>Plain-English walkthrough</span>
          <span>Works on phone and desktop</span>
          <span>Next step agreed only if useful</span>
        </div>
      </section>

      <section className="mw-section" id="examples" aria-labelledby="examples-title">
        <header className="mw-section-heading">
          <p className="eyebrow">What I can demonstrate</p>
          <h2 id="examples-title">A working direction, not a promise on a page.</h2>
          <p>See what changes for customers or staff before a bigger project.</p>
        </header>
        <div className="mw-outcome-list">
          {DEMO_TYPES.map((item) => <div key={item.title}><strong>{item.title}</strong><span>{item.body}</span></div>)}
        </div>
      </section>

      <section className="mw-section mw-pricing" aria-labelledby="privacy-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Built for real conversations</p>
          <h2 id="privacy-title">Your business stays the focus.</h2>
          <p>Client demos sit behind a private link and access code. Only the people you choose see them.</p>
        </header>
        <div className="mw-actions">
          <a className="button button-signal" href="/#contact">Request yours</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
