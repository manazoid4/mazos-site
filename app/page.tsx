import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, LINKEDIN_URL } from './site';
import { SystemBuilder } from './system-builder';
import { WalkthroughVideo } from './walkthrough-video';
import { SiteFooter, SiteHeader } from './site-chrome';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { HeroDemo } from './hero-demo';
import { Scenes } from './scenes';
import { ScrollReveal } from './scroll-reveal';
import { NICHE_GUIDES } from './for/niches';
import { CARE_PLAN, FREE_STEP, GUARANTEE, OFFERS, PROMISES, REFERRAL_REWARD, workingBy } from './offers';
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

/** One drawn line per package: one job, jobs joined up, a system built for you. */
const PACKAGE_ICONS: Record<string, string> = {
  starter: 'M8 24h24M26 16l8 8-8 8',
  'business-system': 'M10 12h10v10H10ZM28 26h10v10H28ZM20 17h13v9M15 22v9h13',
  custom: 'M8 8h32v32H8ZM8 20h32M20 20v20M26 28h8M26 33h5',
};

export default function Page() {
 return <main className="s-home">
  <SiteHeader />
  <section className="s-hero s-hero-split" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
   <div><p className="eyebrow">For small businesses and teams, in any trade</p>
    <h1 id="intro-title">Systems that turn enquiries <em>into bookings</em> and take the admin off you.</h1>
    <p className="s-lede">Automation, connected tools and custom software. Start with one job from {STARTER.price}.</p>
    <div className="s-actions"><a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a><a className="text-link" href="/demos">Or see a free demo first <span aria-hidden="true">→</span></a></div>
    <p className="s-note">I reply within {CHECK_REPLY_TIME}. No call needed, no obligation.</p>
   </div><HeroDemo />
   <p className="s-small">Examples across packages: enquiries answered, bookings confirmed, quotes followed up. Each job is scoped and priced first.</p>
  </section>
  <section className="s-section" id="build" aria-labelledby="build-title">
   <p className="eyebrow">What I build</p><h2 id="build-title">One job, a joined-up system, or something built for you.</h2>
   <div className="s-prices">{OFFERS.map(offer => <a className="s-price s-package-card" href={`/what-we-do#${offer.id}`} key={offer.id} style={{ viewTransitionName: `package-${offer.id}` }}>
    <svg className="s-package-icon" viewBox="0 0 48 48" width="40" height="40" aria-hidden="true"><path pathLength={1} d={PACKAGE_ICONS[offer.id]} /></svg>
    <h3>{offer.name}</h3><p className="s-price-amount">{offer.price}</p><p>{offer.body}</p><p><strong>{workingBy(offer.id)}</strong></p><span>See how it works →</span>
   </a>)}</div>
   <SystemBuilder />
   <ul className="s-trust">{PROMISES.map(term => <li key={term.title}><strong>{term.title}</strong><span>{term.body}</span></li>)}</ul>
   <p className="s-small" id="trades">Your trade: {NICHE_GUIDES.map((guide, i) => <span key={guide.id}>{i ? ' · ' : ''}<a href={`/for/${guide.id}`}>{guide.shortName}</a></span>)}. <a href="/brand-kit">Trainer, maker or creator? Brand Kit</a>. Any trade welcome.</p>
  </section>
  <section className="s-section" id="how" data-reveal aria-labelledby="how-title">
   <p className="eyebrow">See it working</p><h2 id="how-title">What changes in your day.</h2><Scenes />
  </section>
  <section className="s-section s-check" id="check" aria-labelledby="check-title">
   <div className="s-check-copy"><p className="eyebrow">Prices and your free plan</p><h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
    <p>{STARTER.name}: {STARTER.price} for one job. Bigger systems are scoped first. <a href="/prices">Every price, compared →</a></p>
    <p>{CARE_PLAN.name}: {CARE_PLAN.price} if you want help afterwards.</p>
    
    <p>{FREE_STEP.name}: {FREE_STEP.price}. If it isn’t worth automating, I say so.</p>
    <CallLink href={BOOKING_URL} className="text-link" placement="free-plan">Rather see it first? Book a call for a free demo</CallLink>
    <p className="s-small">Introduce a business: {REFERRAL_REWARD} when they become a paying client. <a href="/faq#do-you-pay-for-referrals">How →</a></p>
   </div><LeakCheckForm />
  </section>
      <section className="s-section s-about" id="about" aria-labelledby="about-title">
        <div className="s-about-head">
          <img className="s-face" src="/maz.webp" alt="Manazir Hussain, who plans and builds every job" width={96} height={96} loading="lazy" />
          <div>
            <p className="eyebrow">Who you’re dealing with</p>
            <h2 id="about-title">I’m Manazir. I plan it and build it myself.</h2>
            <p>I studied Computer Science at Swansea University, and now I run Maz Works: software, automation and websites for UK small businesses. No account managers, no hand-offs. Email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
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
