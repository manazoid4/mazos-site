import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { CHANGES_WINDOW, OFFERS, workingBy } from '../offers';
import { ChangesWindow, DemoPath } from '../demo-path';
import { CHECK_REPLY_TIME } from '../site';
import { SampleReport } from '../sample-report';
import { ScrollReveal } from '../scroll-reveal';
import { ServiceSchema } from '../service-schema';
import { SystemBuilder } from '../system-builder';
import { CostCalculator } from '../cost-calculator';
import { DeliveryTabs } from '../delivery-tabs';
import { SystemExplorer } from '../system-explorer';
import { StickyCheckCta } from '../sticky-cta';
export const metadata: Metadata = {
 title: 'What we do: systems that work for you',
 description: 'See how enquiries, bookings and follow-ups work together. Three packages, clear prices, and a free plan for your business.',
 alternates: {canonical:'/what-we-do'},
};
export default function WhatWeDo() {
 return <main className="s-home"><SiteHeader /><ServiceSchema path="/what-we-do" />
  <section className="s-hero s-hero-short" id="main-content" tabIndex={-1}>
   <p className="eyebrow">What we do</p><h1>The systems your business runs on.</h1>
   <p className="s-lede">Enquiries answered. Bookings confirmed. Follow-ups sent. Less chasing for you.</p>
   <nav className="s-actions" aria-label="Choose a package">{OFFERS.map(offer=><a className="button" key={offer.id} href={`#${offer.id}`}>{offer.name} · {offer.price}</a>)}</nav>
  </section>
  <section className="s-section s-build" id="build-my-system" aria-labelledby="build-my-system-title"><p className="eyebrow">Your business, your plan</p><h2 id="build-my-system-title">Build your system in two taps.</h2>
   <div className="s-build-grid"><SystemBuilder /></div>
  </section>
  {OFFERS.map((offer,index)=><section className="s-section s-package-detail" id={offer.id} key={offer.id} aria-labelledby={`${offer.id}-title`} style={{ viewTransitionName: `package-${offer.id}` }}>
   <p className="eyebrow">{index === 0 ? 'Start with one repeated job' : index === 1 ? 'Join up several jobs' : 'When normal apps do not fit'}</p>
   <h2 id={`${offer.id}-title`}>{offer.name}</h2><p className="s-price-amount">{offer.price}</p><p>{offer.body}</p>
   <ul>{offer.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul>
   <p><strong>Working by: {workingBy(offer.id)}.</strong></p>
   <a className="button button-signal" href={`/free-plan?package=${encodeURIComponent(offer.name)}`}>Get my free plan for this</a>
  </section>)}
  <p className="s-section s-small"><a href="/prices">See every price, add-on and what’s not included →</a></p>
  <section className="s-section" id="systems"><p className="eyebrow">Jobs you can hand over</p><h2>Pick a job. Watch it run.</h2>
   <p>Use the tools you already have where possible. Anything bigger gets a fixed quote first.</p>
   <SystemExplorer />
  </section>
  <section className="s-section" id="process"><p className="eyebrow">From first call to live</p><h2>How it works.</h2>
   <DemoPath source="what-we-do" />
   <h3>{CHANGES_WINDOW.name}</h3><ChangesWindow />
   <CostCalculator />
   <DeliveryTabs />
  </section>
  <section className="s-section" id="example"><h2>An example of the plan you get.</h2><SampleReport /></section>
  <section className="s-final"><h2>Start with the job that costs you time.</h2><p>A personal reply, usually within {CHECK_REPLY_TIME}.</p><a className="button button-signal" href="/free-plan">Get my free plan</a></section>
  <SiteFooter /><StickyCheckCta href="/free-plan" /><ScrollReveal />
 </main>;
}
