import { HOME_SECTIONS } from './nav';
import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL } from './site';
import { PackageLink } from './package-link';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { SampleReport } from './sample-report';
import { HeroDemo } from './hero-demo';
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

/** One concrete line per trade, matching what each trade guide offers. */
const TRADE_CARDS: Record<string, { line: string; icon: string }> = {
  'salons-and-beauty': { line: 'Bookings confirmed and reminded, so fewer no-shows.', icon: 'M8 7a3 3 0 1 0 0 .1M8 25a3 3 0 1 0 0 .1M10.5 9 26 23M10.5 23 26 9' },
  'dog-groomers': { line: 'Miss a call mid-groom and the owner gets your booking link.', icon: 'M16 26c-5 0-8-3-8-6s3-5 8-5 8 2 8 5-3 6-8 6ZM7 12a2.5 3 0 1 0 0 .1M13 7a2.5 3 0 1 0 0 .1M19 7a2.5 3 0 1 0 0 .1M25 12a2.5 3 0 1 0 0 .1' },
  garages: { line: 'Every quote and MOT request logged, with a follow-up if they go quiet.', icon: 'M5 20h22M7 20l3-7h12l3 7M9 24a2 2 0 1 0 0 .1M23 24a2 2 0 1 0 0 .1M5 20v4h22v-4' },
  'cafes-and-food': { line: 'Orders and messages in one place, and a review asked for after each visit.', icon: 'M7 12h15v7a6 6 0 0 1-6 6h-3a6 6 0 0 1-6-6ZM22 14h3a3 3 0 0 1 0 6h-3M11 4v4M15 4v4M19 4v4' },
  'clinics-and-therapists': { line: 'New enquiries answered at once, and reminders the day before.', icon: 'M13 5h6v8h8v6h-8v8h-6v-8H5v-6h8Z' },
  architects: { line: 'Project enquiries captured with the key details, then followed up.', icon: 'M5 27V12l11-7 11 7v15ZM12 27v-8h8v8M5 27h22' },
};

/** What owners actually see once it's running. Mock messages, labelled as examples. */
const RUNNING = [
  { extra: extra('Missed-call text-back'), when: 'Straight after a missed call', message: 'Sorry we missed you! Book here: yourbusiness.co.uk/book' },
  { extra: extra('Appointment reminders'), when: 'The day before', message: 'Hi Sam, see you tomorrow at 10:30. Reply C to change your time.' },
  { extra: extra('Review requests'), when: 'After the visit', message: 'Thanks for coming in today! Would you leave us a quick Google review?' },
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
          <h1 id="intro-title">Miss a call, and the caller gets a text with your booking link.</h1>
          <p className="s-lede">One of the systems I set up. I build the systems that turn enquiries into paying customers: automation, connected tools and custom software that take the chasing and admin off you. From {STARTER.price}.</p>
          <div className="s-actions">
            <a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a>
            <CallLink className="button" href={BOOKING_URL} placement="hero">Or book a 15-minute call</CallLink>
          </div>
          <p className="s-note">{FREE_STEP.name}, emailed within {CHECK_REPLY_TIME}. No call needed, no obligation.</p>
        </div>
        <HeroDemo />
      </section>

      <ul className="s-trust" aria-label="The terms, before you ask">
        {TERMS.map((term) => <li key={term.title}><strong>{term.title}</strong><span>{term.body}</span></li>)}
      </ul>
      <p className="s-small s-trust-who">You deal with Manazir, who plans it and builds it. UK-wide, done remotely.</p>

      <nav className="mw-onpage" aria-label="On this page">
        <span>On this page</span>
        {HOME_SECTIONS.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}
      </nav>

      <section className="s-section" id="trades" aria-labelledby="trades-title">
        <p className="eyebrow">Pick your trade</p>
        <h2 id="trades-title">See what it looks like in a business like yours.</h2>
        <ul className="s-trades">
          {NICHE_GUIDES.map((guide) => (
            <li key={guide.id}>
              <a href={`/for/${guide.id}`}>
                <svg viewBox="0 0 32 32" width="40" height="40" aria-hidden="true" focusable="false"><path d={TRADE_CARDS[guide.id]?.icon} /></svg>
                <strong>{guide.shortName}</strong>
                <span>{TRADE_CARDS[guide.id]?.line}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="s-small">Not listed? It works for any trade. <a href="#check">Tell me the job</a>.</p>
      </section>

      <section className="s-section" id="running" aria-labelledby="running-title">
        <p className="eyebrow">What your customers see</p>
        <h2 id="running-title">Messages that go out without you.</h2>
        <ul className="s-running">
          {RUNNING.map((item) => (
            <li key={item.extra.name}>
              <span className="s-running-when">{item.when}</span>
              <p className="s-running-bubble">{item.message}</p>
              <span className="s-running-name"><strong>{item.extra.name}</strong> {item.extra.price}</span>
            </li>
          ))}
        </ul>
        <p className="s-small">Example messages. You choose the wording.</p>
      </section>

      <section className="s-section" id="example" aria-labelledby="example-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="example-title">An example plan, before you ask for yours.</h2>
        <SampleReport />
      </section>

      <section className="s-section s-check" id="check" aria-labelledby="check-title">
        <div className="s-check-copy">
          <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
          <h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
          <ul className="s-ticks">
            <li>Tap what’s costing you. Typing is optional</li>
                        <li>You get a plan like the one above, with a fixed price</li>
            <li>If it isn’t worth automating, I say so</li>
          </ul>
        </div>
        <LeakCheckForm />
      </section>

      <section className="s-section" id="pricing" aria-labelledby="pricing-title">
        <PricingViewTracker targetId="pricing" />
        <p className="eyebrow">Prices</p>
        <h2 id="pricing-title">Start with one job. Add only what you need.</h2>
        <div className="s-prices s-prices-home">
          <article className="s-price s-price-main">
            <p className="s-price-tag">{STARTER.tag}</p>
            <h3>{STARTER.name}</h3>
            <p className="s-price-amount">{STARTER.price}</p>
            <p>{STARTER.body}</p>
            <ul>{STARTER.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <PackageLink className="button button-signal" href="#check" pick={STARTER.name}>Get a free plan for this</PackageLink>
          </article>
          <div className="s-extras s-extras-home" id="extras">
            <h3>Popular add-ons</h3>
            <p className="s-small">Fixed, one-off prices. Buy one on its own or add it to Starter.</p>
            <ul>
              {POPULAR_EXTRAS.map((item) => <li key={item.name}><div><strong>{item.name}</strong><span>{item.what}</span><PackageLink href="#check" pick={item.name}>Ask for this <span aria-hidden="true">→</span></PackageLink></div><strong className="s-extras-price">{item.price}</strong></li>)}
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

      <section className="s-section" id="process" aria-labelledby="process-title">
        <p className="eyebrow">How it works</p>
        <h2 id="process-title">Four simple steps.</h2>
        <ol className="s-steps">
          {STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></li>)}
        </ol>
        <h3 className="s-subhead">How I set it up</h3>
        <ul className="s-promises" aria-label="How the work is set up">
          {DELIVERY.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.body}</span></li>)}
        </ul>
      </section>

      <section className="s-section s-about" id="about" aria-labelledby="about-title">
        <div className="s-about-head">
          {/* TODO(Maz): add a real photo of yourself at public/maz.webp (square, 400px) and swap this monogram for an <img>. */}
          <span className="s-face" aria-hidden="true">MH</span>
          <div>
            <p className="eyebrow">Who you’re dealing with</p>
            <h2 id="about-title">I’m Manazir. I plan it and build it myself.</h2>
            <p>I build software, automation and websites for UK small businesses. No account managers, no hand-offs. Email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
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

      <section className="s-section" id="faq" aria-labelledby="faq-title">
        <p className="eyebrow">Questions</p>
        <h2 id="faq-title">Quick answers.</h2>
        <div className="s-faq">
          {HOMEPAGE_FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <p className="s-small"><a href="/faq">All questions →</a></p>
      </section>

      <section className="s-final" aria-labelledby="final-title">
        <h2 id="final-title">Stop losing the customers who called when you were busy.</h2>
        <p>A free plan and fixed price within {CHECK_REPLY_TIME}. No call, no obligation.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a>
          <CallLink className="button" href={BOOKING_URL} placement="footer-cta">Book a 15-minute call</CallLink>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#check" hideWhenVisible="check" />
    </main>
  );
}
