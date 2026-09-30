import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { SYSTEMS, systemPrice } from '../systems';
import { Storyboard } from '../scenes';
import { OFFERS, DELIVERY, NOT_INCLUDED, workingBy } from '../offers';
import { CHECK_REPLY_TIME } from '../site';
import { SampleReport } from '../sample-report';
import { ScrollReveal } from '../scroll-reveal';
import { ServiceSchema } from '../service-schema';
import { SystemBuilder } from '../system-builder';
import { CostCalculator } from '../cost-calculator';
import { WalkthroughVideo } from '../walkthrough-video';
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
   <p className="s-lede">I build automation, connected tools and custom software that turn enquiries into bookings and take admin off you.</p>
   <nav className="s-actions" aria-label="Choose a package">{OFFERS.map(offer=><a className="button" key={offer.id} href={`#${offer.id}`}>{offer.name} · {offer.price}</a>)}</nav>
  </section>
  <WalkthroughVideo />
  <section className="s-section s-build" id="build-my-system" aria-labelledby="build-my-system-title"><p className="eyebrow">Your business, your plan</p><h2 id="build-my-system-title">Build your system in two taps.</h2>
   <div className="s-build-grid"><SystemBuilder /><CostCalculator /></div>
  </section>
  {OFFERS.map((offer,index)=><section className="s-section s-package-detail" id={offer.id} key={offer.id} aria-labelledby={`${offer.id}-title`} style={{ viewTransitionName: `package-${offer.id}` }}>
   <p className="eyebrow">{index === 0 ? 'For one repeated job' : index === 1 ? 'For owners joining up several jobs' : 'For a business normal apps do not fit'}</p>
   <h2 id={`${offer.id}-title`}>{offer.name}</h2><p className="s-price-amount">{offer.price}</p><p>{offer.body}</p>
   <Storyboard system={SYSTEMS.find(system=>system.id===offer.id)!} /><p className="s-small">Illustrations of how it works, not real customers.</p>
   <div className="s-before-after"><p><strong>Today you…</strong> {index===0?'repeat the same task by hand.':index===1?'copy customer details and chase the next step.':'work around tools that do not fit your process.'}</p>
    <p><strong>With this…</strong> {index===0?'let one agreed task happen on its own.':index===1?'see the customer and next action in one place.':'use a system built around the way you work.'}</p></div>
   <h3>What’s included</h3><ul>{offer.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul>
   <h3>What’s not included</h3><ul>{NOT_INCLUDED.map(line=><li key={line}>{line}</li>)}{index===0?<li>Several separate jobs: choose add-ons or a Business System.</li>:null}</ul>
   <p><strong>Working by: {workingBy(offer.id)}.</strong></p>
   <a className="button button-signal" href={`/leak-check?package=${encodeURIComponent(offer.name)}`}>Get a free plan for this</a>
  </section>)}
  <section className="s-section" id="systems"><p className="eyebrow">The jobs you can hand over</p><h2>Every system, explained.</h2>
   <p>Standard add-ons use tools you already have. I check support first. A new build gets its own fixed quote.</p>
   {SYSTEMS.filter(system=>!system.packageId).map(system=><article className="s-system-detail" id={system.id} key={system.id}>
    <h3>{system.name}</h3><p><strong>The headache:</strong> {system.headache}.</p>
    <ol>{system.steps.map(step=><li key={step.title}><strong>{step.title}.</strong> {step.detail}</li>)}</ol>
    <p><strong>{system.result}</strong></p><p>{systemPrice(system)}</p>
    <a href={`/leak-check?package=${encodeURIComponent(system.offerName)}`}>Ask for this system →</a>
   </article>)}
  </section>
  <section className="s-section" id="process"><h2>How it works.</h2>
   <ol className="s-steps">{[['Tell me the job',`I reply within ${CHECK_REPLY_TIME}.`],['Your plan and fixed price','Scope, app costs and date agreed first.'],['Half to start','Once access is ready, I build and test with you.'],['See it working','The rest is due when the agreed work works.']].map(([title,body],index)=><li key={title}><span>0{index+1}</span><strong>{title}</strong><p>{body}</p></li>)}</ol>
   <h3>How I set it up</h3><ul className="s-promises">{DELIVERY.map(item=><li key={item.title}><strong>{item.title}</strong><span>{item.body}</span></li>)}</ul>
   <h3>What you own at the end</h3><p>Your accounts, your customer data, and everything I build. A written handover explains how it works. You can remove my access.</p>
   <h3>What I need from you</h3><p>Add me as a user to the tools we agree on; never send passwords. Allow one setup call if the job needs it, and sign off the test before launch. You do not need a call to request your free plan.</p>
  </section>
  <section className="s-section" id="example"><h2>An example of the plan you get.</h2><SampleReport /></section>
  <section className="s-final"><h2>Start with the job that costs you time.</h2><p>A personal reply within {CHECK_REPLY_TIME}. No obligation.</p><a className="button button-signal" href="/leak-check">Get a free plan and price</a></section>
  <SiteFooter /><StickyCheckCta href="/leak-check" /><ScrollReveal />
 </main>;
}
