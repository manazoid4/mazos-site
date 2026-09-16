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
    body: 'See how your business could look, read and guide customers before committing to a full rebuild.',
  },
  {
    title: 'Customer journey',
    body: 'Make ordering, booking, contacting, reviewing or visiting easier with a clearer path from interest to action.',
  },
  {
    title: 'Follow-up & admin',
    body: 'Show how repeated chasing, copying or missed follow-up could be simplified before changing your day-to-day process.',
  },
  {
    title: 'Physical + digital',
    body: 'Connect the website to useful things in the real world such as review taps, menu stands, signs or campaign pieces.',
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
          <p className="mw-lede">For suitable projects, I prepare a private demo around the real business — not a template, not a slide deck, and not a long technical explanation.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="/#contact">Ask for a private demo</a>
            <a className="text-link" href="#examples">What a demo can show <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">Each demo is shared privately with the business it was made for. Public examples stay selective by design.</p>
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
          <p>The point is to make the decision easier: see what changes for the customer or the team before discussing a larger project.</p>
        </header>
        <div className="mw-outcome-list">
          {DEMO_TYPES.map((item) => <div key={item.title}><strong>{item.title}</strong><span>{item.body}</span></div>)}
        </div>
      </section>

      <section className="mw-section mw-pricing" aria-labelledby="privacy-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Built for real conversations</p>
          <h2 id="privacy-title">Your business stays the focus.</h2>
          <p>I keep client-specific demos behind a private link and access code instead of turning every conversation into a public case study. Each one has its own address, opened when it suits you and shared only with the people who need to see it.</p>
        </header>
        <div className="mw-actions">
          <a className="button button-signal" href="/#contact">Request yours</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
