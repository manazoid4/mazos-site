import { HOME_SECTIONS } from './nav';
import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL } from './site';
import { PackageLink } from './package-link';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { SampleReport } from './sample-report';
import { CARE_PLAN, DELIVERY, EXTRAS, FREE_STEP, GUARANTEE, OFFERS, PROMISES } from './offers';

const [STARTER, ...BIGGER] = OFFERS;
const POPULAR_EXTRAS = ['Missed-call text-back', 'Appointment reminders', 'Review requests', 'Google Business Profile setup']
  .map((name) => EXTRAS.find((extra) => extra.name === name)!);

const POSITIONING_EYEBROW = 'For UK small businesses and teams, in any trade';

const TRUST = [
  ['You deal with Manazir', 'The person who plans it builds it.'],
  ['UK-wide, done remotely', 'No site visit needed.'],
  ['Fixed quote, No VAT added', 'Agreed before any work starts.'],
  ['Delivery guarantee', 'Live on time, or you don’t pay the rest.'],
] as const;

const SYMPTOMS = [
  'Enquiries arrive by phone, email, form and DM, and some get missed.',
  'Quotes go out and nobody follows them up.',
  'Customers explain the same thing three times to three people.',
  'Your evenings go on admin that a system could do.',
];

const EXAMPLES = [
  ['Trades', 'Quote requests logged, priced from a template and followed up after three days.'],
  ['Salons and clinics', 'Confirmations, reminders and rebooking prompts that send themselves.'],
  ['Professional services', 'New client details collected once and passed to everyone who needs them.'],
  ['Shops and cafés', 'Orders, stock notes and reviews gathered in one place instead of five.'],
];

const STEPS = [
  ['01', 'Tell me the job', `What eats your week or loses you customers. I reply within ${CHECK_REPLY_TIME}.`],
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

      <section className="s-hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <p className="eyebrow">{POSITIONING_EYEBROW}</p>
        <h1 id="intro-title">I build the systems that turn enquiries into paying customers.</h1>
        <p className="s-lede">Automation, connected tools and custom software that take the chasing and admin off you. Start from £195, add only what you need.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get a free plan and price</a>
          <CallLink className="button" href={BOOKING_URL} placement="hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="s-note">{FREE_STEP.name}, emailed within {CHECK_REPLY_TIME}. No call needed, no obligation.</p>
      </section>

      <ul className="s-trust" aria-label="Why owners trust Maz Works">
        {TRUST.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}
      </ul>

      <nav className="mw-onpage" aria-label="On this page">
        <span>On this page</span>
        {HOME_SECTIONS.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}
      </nav>

      <section className="s-section" id="problem" aria-labelledby="problem-title">
        <p className="eyebrow">Sound familiar?</p>
        <h2 id="problem-title">Busy business, leaky system?</h2>
        <ul className="s-ticks">
          {SYMPTOMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="s-found">
          <p><strong>The kind of thing I build:</strong></p>
          <ul>
            {EXAMPLES.map(([who, what]) => <li key={who}><strong>{who}:</strong> {what}</li>)}
          </ul>
          <p>Examples of the work, not client results. <a href="/for">See the guide for your trade</a>.</p>
        </div>
      </section>

      <section className="s-section s-check" id="check" aria-labelledby="check-title">
        <div className="s-check-copy">
          <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
          <h2 id="check-title">Tell me the job. I’ll send a plan and a price.</h2>
          <ul className="s-ticks">
            <li>One line is enough: what takes too long, or where customers slip away</li>
            <li>I look at how you work now and what you already use</li>
            <li>You get a short plan and a fixed price, with any extras listed</li>
            <li>If it isn’t worth automating, I say so</li>
          </ul>
          <p className="s-small s-proof-line">Work you can open: <a href="/work/jobfilter">JobFilter</a>, my own software, live with paid plans. <a href="/work/scrap-finance-partners">Scrap Finance Partners</a>, a client website.</p>
          <p className="s-small"><a href="#example">See an example plan ↓</a></p>
        </div>
        <LeakCheckForm />
      </section>

      <section className="s-section" id="example" aria-labelledby="example-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="example-title">An example plan.</h2>
        <SampleReport />
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
              {POPULAR_EXTRAS.map((extra) => <li key={extra.name}><div><strong>{extra.name}</strong><span>{extra.what}</span><PackageLink href="#check" pick={extra.name}>Ask for this <span aria-hidden="true">→</span></PackageLink></div><strong className="s-extras-price">{extra.price}</strong></li>)}
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

        <ul className="s-promises" aria-label="Included with every package">
          {PROMISES.map((promise) => <li key={promise.title}><strong>{promise.title}</strong><span>{promise.body}</span></li>)}
        </ul>
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
        <div>
          <p className="eyebrow">Who you’re dealing with</p>
          <h2 id="about-title">I’m Manazir. I plan it and build it myself.</h2>
          <p>I build software, automation and websites for UK small businesses. No account managers, no hand-offs. Email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <p className="s-small">Work you can open yourself:</p>
        </div>
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
        <h2 id="final-title">Find out where customers and hours are slipping away.</h2>
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
