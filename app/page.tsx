import { HOME_SECTIONS } from './nav';
import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL } from './site';
import { PackageLink } from './package-link';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { InboxStory } from './inbox-story';
import { SampleReport } from './sample-report';
import { PlugHero } from './plug-hero';
import { Scenes } from './scenes';
import { ScrollReveal } from './scroll-reveal';
import { NICHE_GUIDES } from './for/niches';
import { CARE_PLAN, DELIVERY, EXTRAS, FREE_STEP, GUARANTEE, OFFERS, PROMISES } from './offers';

const [STARTER, ...BIGGER] = OFFERS;
const extra = (name: string) => EXTRAS.find((item) => item.name === name)!;
const POPULAR_EXTRAS = ['Missed-call text-back', 'Appointment reminders', 'Review requests', 'Google Business Profile setup'].map(extra);

const POSITIONING_EYEBROW = 'For UK small businesses and teams, in any trade';

/**
 * Risk reversal sits straight under the hero (29 Sep rebuild): the four terms
 * that make saying yes safe, read from offers.ts so no price or term drifts.
 */
const TERMS = [
  PROMISES.find((promise) => promise.title.startsWith('One fixed price'))!,
  PROMISES.find((promise) => promise.title.startsWith('Half now'))!,
  PROMISES.find((promise) => promise.title.startsWith('No VAT'))!,
  { title: 'Delivery guarantee', body: 'Working on time, or you don’t pay the rest.' },
];

const STEPS = [
  ['01', 'Tell me the job', `Tap what’s costing you. I reply within ${CHECK_REPLY_TIME}.`],
  ['02', 'I send a plan and fixed price', 'Start small or go bigger. Add-ons are priced up front.'],
  ['03', 'You pay half to start', 'Once access is sorted. The rest when it’s working.'],
  ['04', 'Working by the agreed date', 'Or you don’t pay the rest.'],
];

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
  return (
    <main className="s-home">
      <SiteHeader />

      <section className="s-hero s-hero-split" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div>
          <p className="eyebrow">{POSITIONING_EYEBROW}</p>
          <h1 id="intro-title">Your phone, inbox and booking app, finally working together.</h1>
          <p className="s-lede">I build the systems that turn enquiries into paying customers. Less chasing, fewer missed calls. On your existing tools, from {STARTER.price}.</p>
          <div className="s-actions">
            <a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a>
          </div>
          <p className="s-note">Emailed within {CHECK_REPLY_TIME}. No call, no obligation.</p>
          <p className="s-trade-pills" id="trades"><span>See it for your trade:</span>{NICHE_GUIDES.map((guide) => <a key={guide.id} href={`/for/${guide.id}`}>{guide.shortName}</a>)}</p>
        </div>
        <PlugHero />
      </section>

      <ul className="s-trust" aria-label="The terms, before you ask">
        {TERMS.map((term) => <li key={term.title}><strong>{term.title}</strong><span>{term.body}</span></li>)}
      </ul>

      <nav className="mw-onpage" aria-label="On this page">
        <span>On this page</span>
        {HOME_SECTIONS.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}
      </nav>

      <section className="s-section s-how" id="how" data-reveal aria-labelledby="how-title">
        <p className="eyebrow">See it working</p>
        <h2 id="how-title">What changes in your day.</h2>
        <Scenes />
      </section>

      <section className="s-section s-example" id="example" data-reveal aria-labelledby="example-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="example-title">Here’s what your plan looks like.</h2>
        <div className="s-example-split"><InboxStory /><SampleReport /></div>
      </section>

      <section className="s-section s-check" id="check" aria-labelledby="check-title">
        <div className="s-check-copy">
          <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
          <h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
          <ul className="s-ticks">
            <li>Tap a problem, add your name and email</li>
                        <li>A plan and fixed price, by email</li>
            <li>If it isn’t worth automating, I say so</li>
          </ul>
        </div>
        <LeakCheckForm />
      </section>

      <section className="s-section" id="pricing" data-reveal aria-labelledby="pricing-title">
        <PricingViewTracker targetId="pricing" />
        <p className="eyebrow">Prices</p>
        <h2 id="pricing-title">Start with one job. Add only what you need.</h2>
        <div className="s-prices s-prices-home">
          <article className="s-price s-price-main">
            <p className="s-price-tag">{STARTER.tag}</p>
            <h3>{STARTER.name}</h3>
            <p className="s-price-amount">{STARTER.price}</p>
            <p>{STARTER.body}</p>
            <p className="s-small">{STARTER.bullets[2]}</p>
            <PackageLink className="button button-signal" href="#check" pick={STARTER.name}>Get a free plan and price</PackageLink>
          </article>
          <div className="s-extras s-extras-home" id="extras">
            <h3>Popular add-ons</h3>
            <p className="s-small">One-off. Buy alone or add to Starter. <a href="/prices#extras">What each one does</a></p>
            <ul>
              {POPULAR_EXTRAS.map((item) => <li key={item.name}><div><strong>{item.name}</strong><PackageLink href="#check" pick={item.name}>Ask for this <span aria-hidden="true">→</span></PackageLink></div><strong className="s-extras-price">{item.price}</strong></li>)}
            </ul>
          </div>
        </div>

        <div className="s-bigger">
          <h3>Bigger jobs</h3>
          <ul>
            {BIGGER.map((offer) => <li key={offer.id}><strong>{offer.name}, {offer.price.replace(/^From/, 'from')}.</strong> {offer.body}</li>)}
          </ul>
          <p><strong>{CARE_PLAN.name}, {CARE_PLAN.price}</strong> if you want me to look after it afterwards.</p>
        </div>

        <div className="s-guarantee">
          <strong>The guarantee.</strong> {GUARANTEE} You own everything I build.
        </div>
        <div className="s-actions">
          <a className="button button-signal" href="#check">Get a free plan and price</a>
          <a className="button" href="/prices">Every price, compared</a>
        </div>
        <p className="s-small">Introduce a business and I&apos;ll thank you with £40 when they become a paying client. <a href="/faq#do-you-pay-for-referrals">How →</a></p>
      </section>

      <section className="s-section" id="process" data-reveal aria-labelledby="process-title">
        <p className="eyebrow">How it works</p>
        <h2 id="process-title">Four simple steps.</h2>
        <ol className="s-steps">
          {STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></li>)}
        </ol>
        <details className="s-delivery"><summary>How I set it up</summary>
          <ul>{DELIVERY.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.body}</span></li>)}</ul>
        </details>

      <div className="s-about" id="about" aria-labelledby="about-title">
        <div className="s-about-head">
          <img className="s-face" src="/maz.webp" alt="Manazir Hussain, who plans and builds every job" width={96} height={96} loading="lazy" />
          <div>
            <p className="eyebrow">Who you’re dealing with</p>
            <h2 id="about-title">One person, start to finish.</h2>
            <p>I’m Manazir, UK-wide. I plan and build your system myself. Reach me at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
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
      </div>
      </section>

      <section className="s-section" id="faq" aria-labelledby="faq-title">
        <p className="eyebrow">Questions</p>
        <h2 id="faq-title">Quick answers.</h2>
        <div className="s-faq">
          {HOMEPAGE_FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <p className="s-small"><a href="/faq">All questions →</a></p>
      <div className="s-final" aria-labelledby="final-title">
        <h2 id="final-title">What would you stop chasing?</h2>
        <p>A free plan and fixed price within {CHECK_REPLY_TIME}. No call, no obligation.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a>
          <CallLink href={BOOKING_URL} placement="footer-cta">Prefer a call?</CallLink>
        </div>
      </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#check" hideWhenVisible="check" />
      <ScrollReveal />
    </main>
  );
}
