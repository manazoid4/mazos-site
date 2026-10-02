import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, LINKEDIN_URL } from './site';
import { SystemBuilder } from './system-builder';
import { WalkthroughVideo } from './walkthrough-video';
import { SiteFooter, SiteHeader } from './site-chrome';
import { LeakCheckForm } from './free-plan/leak-check-form';
import { CallLink } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { HeroDemo } from './hero-demo';
import { Scenes } from './scenes';
import { ScrollReveal } from './scroll-reveal';
import { NICHE_GUIDES } from './for/niches';
import { CUSTOMER_TYPES } from './customer-types';
import { KitIcon } from './brand-kit/kit-icon';
import { CARE_PLAN, FREE_STEP, LADDER, OFFERS, PROMISES, REFERRAL_REWARD, getOffer } from './offers';
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
    <h1 id="intro-title">Systems that turn enquiries <em>into bookings</em> and take the admin off you.</h1>
    <p className="s-lede">Automation, connected tools and custom software. Start with one job from {STARTER.price}.</p>
    <div className="s-actions"><a className="button button-signal s-button-lg" href="#check">Get my free plan</a><a className="text-link" href="/demos">Or see a free demo first <span aria-hidden="true">→</span></a></div>
    <p className="s-note">I usually reply within {CHECK_REPLY_TIME}. No call needed.</p>
   </div><HeroDemo />
   <p className="s-small">Examples across packages: enquiries answered, bookings confirmed, quotes followed up. Each job is scoped and priced first.</p>
  </section>
  <section className="s-section" id="build" aria-labelledby="build-title">
   <p className="eyebrow">What do you run?</p><h2 id="build-title">Pick yours. See your problems, the fix and the price.</h2>
   <ul className="s-types" aria-label="Kinds of business">{CUSTOMER_TYPES.map(type => <li key={type.id}><a href={`/for/${type.id}`}>
    <span className="s-type-icon" aria-hidden="true"><KitIcon name={type.icon} /></span>
    <strong>{type.name}</strong><span>{type.examples}</span><em>{type.recipes[0].name.split(':')[1]?.trim() ?? type.recipes[0].name} · {type.recipes[0].offer.price}</em>
   </a></li>)}</ul>
   <ol className="s-ladder s-ladder-mini" aria-label="The fix ladder">{LADDER.map(rung => <li key={rung.step}><a href={rung.href}><strong>{rung.step}</strong><b>{rung.price}</b></a></li>)}</ol>
   <SystemBuilder />
   <ul className="s-trust">{PROMISES.map(term => <li key={term.title}><strong>{term.title}</strong><span>{term.body}</span></li>)}</ul>
   <p className="s-small" id="trades">Your trade: {NICHE_GUIDES.map((guide, i) => <span key={guide.id}>{i ? ' · ' : ''}<a href={`/for/${guide.id}`}>{guide.shortName}</a></span>)}. <a href="/for/creators">Trainer, maker or creator? See creator options</a>. Any trade welcome.</p>
   <p className="s-small">Need somewhere customers can book or buy? <a href="/prices#websites">{getOffer('website').name} {getOffer('website').price.toLowerCase()}</a>, with the system built in, or <a href="/prices#creators">{getOffer('creator-launch').name} {getOffer('creator-launch').price}</a> for creators. <a href="/prices">Every price →</a></p>
  </section>
  <section className="s-section" id="how" data-reveal aria-labelledby="how-title">
   <p className="eyebrow">See it working</p><h2 id="how-title">What changes in your day.</h2><Scenes />
  </section>
  <section className="s-section s-check" id="check" aria-labelledby="check-title">
   <div className="s-check-copy"><p className="eyebrow">Your free plan</p><h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
    <ul className="s-check-list">
     <li><strong>{FREE_STEP.name}: {FREE_STEP.price}.</strong> I tell you what to automate first — or if it is not worth it.</li>
     <li><strong>One job from {STARTER.price}.</strong> <a href="/prices">See every price →</a></li>
     <li><strong>{CARE_PLAN.name}: {CARE_PLAN.price}.</strong> Optional help after the included changes period.</li>
    </ul>
    <CallLink href={BOOKING_URL} className="button" placement="free-plan">Want to see it first? Book a free demo</CallLink>
    <p className="s-small">Know a business that needs this? I'll send you {REFERRAL_REWARD} when they become a paying client. <a href="/faq#do-you-pay-for-referrals">How →</a></p>
   </div><LeakCheckForm />
  </section>
      <section className="s-section s-about" id="about" aria-labelledby="about-title">
        <div className="s-about-head">
          <img className="s-face" src="/maz.webp" alt="Manazir Hussain, who plans and builds every job" width={96} height={96} loading="lazy" />
          <div>
            <p className="eyebrow">Who you’re dealing with</p>
            <h2 id="about-title">I’m Manazir. I plan it and build it myself.</h2>
            <p>I studied Computer Science at Swansea University. Maz Works is me: I plan, build and test every job. Email me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
            <p><a className="button button-dark s-linkedin" href={LINKEDIN_URL} rel="me noopener" target="_blank">Connect on LinkedIn</a></p>
          </div>
        </div>
        <WalkthroughVideo />
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
