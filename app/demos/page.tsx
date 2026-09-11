import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';

export const metadata: Metadata = {
  title: 'Private business demos — Maz Works',
  description: 'See how Maz Works turns a real business problem into a private working demo before a full build is agreed.',
  alternates: { canonical: '/demos' },
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

const STEPS = [
  ['01', 'I look at the business', 'I review the public website, customer journey and the problem you want to improve.'],
  ['02', 'I build the useful part first', 'You get a focused private demo built around your business rather than a generic sales presentation.'],
  ['03', 'You open one private link', 'Your demo has its own access code. You can explore it in your own time or we can walk through it together.'],
  ['04', 'Only build what earns its place', 'If the direction makes sense, we agree the useful parts, the price and what should happen next.'],
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
          <p>The point is to make the decision easier. You should be able to see what changes for the customer or the team before discussing a larger project.</p>
        </header>
        <div className="mw-service-grid">
          {DEMO_TYPES.map((item) => (
            <article className="mw-service-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mw-process" aria-labelledby="demo-process-title">
        <header>
          <p className="eyebrow">How private demos work</p>
          <h2 id="demo-process-title">Small first step. Clear decision afterwards.</h2>
        </header>
        <ol>
          {STEPS.map(([number, title, body]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mw-section mw-pricing" aria-labelledby="privacy-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Built for real conversations</p>
          <h2 id="privacy-title">Your business stays the focus.</h2>
          <p>Private demos can include a website direction, customer journey, physical product idea, campaign or workflow. I keep client-specific demos behind private access instead of turning every conversation into a public case study.</p>
        </header>
        <div className="mw-pricing-foot">
          <div><strong>One link</strong><span>Your demo has a simple private address made for your business.</span></div>
          <div><strong>One access code</strong><span>You can open it when it suits you and share it with the people who need to see it.</span></div>
          <a className="button button-signal" href="/#contact">Request yours</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
