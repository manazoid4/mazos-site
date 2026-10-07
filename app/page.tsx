import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, LINKEDIN_URL, MAIN_CTA } from './site';
import { WalkthroughVideo } from './walkthrough-video';
import { SiteFooter, SiteHeader } from './site-chrome';
import { LeakCheckForm } from './free-plan/leak-check-form';
import { CallLink } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { HeroDemo } from './hero-demo';
import { Scenes } from './scenes';
import { getSystem } from './systems';
import { ScrollReveal } from './scroll-reveal';
import { CUSTOMER_TYPES } from './customer-types';
import { KitIcon } from './brand-kit/kit-icon';
import { FREE_STEP, OFFERS } from './offers';
const STARTER = OFFERS[0];
const PROOF = [
  {
    name: 'JobFilter',
    label: 'My own product · software',
    body: 'Finds and filters public contracts for small trades firms. Live, with paid plans.',
    href: '/work/jobfilter',
    img: '/jobfilter-home-mobile.webp',
    alt: 'JobFilter homepage on a phone',
  },
  {
    name: 'Scrap Finance Partners',
    label: 'Client build · website',
    body: 'Designed and built for a specialist finance firm.',
    href: '/work/scrap-finance-partners',
    img: '/scrap-finance-partners-mobile.webp',
    alt: 'Scrap Finance Partners website on a phone',
  },
];

export default function Page() {
 return <main className="s-home">
  <SiteHeader />
  <section className="s-hero s-hero-split" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
   <div><p className="eyebrow">For small businesses and teams, in any trade</p>
    <h1 id="intro-title">Every enquiry answered and every booking confirmed, <em>without you chasing</em>.</h1>
    <p className="s-lede">I set up the replies, reminders and follow-ups you do by hand, on apps you already use. Start with one task for {STARTER.price}.</p>
    <div className="s-actions"><a className="button button-signal s-button-lg" href="#check">{MAIN_CTA}</a><a className="text-link" href="#demo-video">Watch it work (30s) <span aria-hidden="true">→</span></a></div>
    <p className="s-face-cta"><img src="/maz.webp" alt="" width={56} height={56} /><span><strong>Manazir Hussain</strong>, Computer Science graduate (Swansea). I plan and build every job myself.</span></p>
   </div><HeroDemo />
  </section>
  <section className="s-section" id="build" aria-labelledby="build-title">
   <p className="eyebrow">What do you run?</p><h2 id="build-title">Pick yours. See your problems, what I’d set up and the price.</h2>
   <ul className="s-types" aria-label="Kinds of business">{CUSTOMER_TYPES.map(type => <li key={type.id}><a href={`/for/${type.id}`}>
    <span className="s-type-icon" aria-hidden="true"><KitIcon name={type.icon} /></span>
    <strong>{type.name}</strong><span>{type.examples}</span><em>{type.recipes[0].name.split(': ')[1]?.trim() ?? type.recipes[0].name} · {type.recipes[0].offer.price}</em>
   </a></li>)}</ul>
   <p><a className="s-details-link" href="/prices">Every price, websites and what’s included →</a></p>
  </section>
  <section className="s-section" id="how" data-reveal aria-labelledby="how-title">
   <p className="eyebrow">See it working</p><h2 id="how-title">What changes in your day.</h2><WalkthroughVideo /><Scenes systems={['enquiries', 'reminders', 'reviews'].map((id) => getSystem(id))} />
  </section>
  <section className="s-section s-check" id="check" aria-labelledby="check-title">
   <div className="s-check-copy"><p className="eyebrow">Your free plan</p><h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
    <ul className="s-check-list">
     <li><strong>{FREE_STEP.name}: {FREE_STEP.price}.</strong> What to automate first, or if it isn’t worth it.</li>
     <li><strong>A written scope sheet and fixed price</strong> before you pay anything.</li>
    </ul>
    <p className="s-small"><CallLink href={BOOKING_URL} className="text-link" placement="free-plan">Prefer to talk? Book a 15-minute call →</CallLink></p>
   </div><LeakCheckForm />
  </section>
      <section className="s-section s-about" id="about" aria-labelledby="about-title">
        <div className="s-about-head">
          <img className="s-face" src="/maz.webp" alt="Manazir Hussain, who plans and builds every job" width={96} height={96} loading="lazy" />
          <div>
            <p className="eyebrow">Who you’re dealing with</p>
            <h2 id="about-title">I’m Manazir. I plan it and build it myself.</h2>
            <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <p><a className="button button-dark s-linkedin" href={LINKEDIN_URL} rel="me noopener" target="_blank">Connect on LinkedIn</a></p>
          </div>
        </div>
        <p className="s-small">Work you can open yourself:</p>
        <div className="s-proof">
          {PROOF.map((item) => (
            <a className="s-proof-card" href={item.href} key={item.name}>
              <img src={item.img} alt={item.alt} width={390} height={600} loading="lazy" />
              <span className="relationship">{item.label}</span>
              <strong>{item.name}</strong>
              <span>{item.body}</span>
            </a>
          ))}
        </div>
        <p className="s-small"><a href="/lab">Other things I’ve built →</a></p>
      </section>

<SiteFooter /><StickyCheckCta href="#check" hideWhenVisible="check" /><ScrollReveal />
 </main>;
}
