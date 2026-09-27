import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL } from './site';
import { ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { SampleReport } from './sample-report';
import { REAL_FINDINGS } from './real-findings';
import { FREE_STEP, GUARANTEE, OFFERS, PAYMENT_TERMS } from './offers';

const POSITIONING_EYEBROW = 'For UK small businesses that run on bookings and enquiries';

const TRUST = [
  ['You deal with Manazir', 'The person who plans it builds it.'],
  ['UK-wide, done remotely', 'No site visit needed.'],
  ['Fixed quote, No VAT added', 'Agreed before any work starts.'],
  ['Delivery guarantee', 'Live on time, or you don’t pay the rest.'],
] as const;

const SYMPTOMS = [
  'People say they tried to book or get in touch, and gave up.',
  'Quotes go out and nobody follows them up.',
  'Customers explain the same thing three times to three people.',
  'Your evenings go on admin that a system could do.',
];

const STEPS = [
  ['01', 'Tell me what’s wrong', `Send your link. I review it myself and email you within ${CHECK_REPLY_TIME}.`],
  ['02', 'I confirm the fix and price', 'A fixed quote, only if it’s worth doing. If it isn’t, I say so.'],
  ['03', 'You pay half to start', 'Once access is sorted. The rest when it’s live.'],
  ['04', 'Live on the agreed date', 'Or you don’t pay the rest.'],
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
        <p className="s-lede">Booking and enquiry systems, automated follow-up and custom tools for UK small businesses. Fewer customers lost, less chasing, evenings back.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get my free review</a>
          <CallLink className="button" href={BOOKING_URL} placement="hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="s-note">Start with a {FREE_STEP.name}. Done by hand, emailed within {CHECK_REPLY_TIME}. No call needed.</p>
      </section>

      <ul className="s-trust" aria-label="Why owners trust Maz Works">
        {TRUST.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}
      </ul>

      <section className="s-section" id="problem" aria-labelledby="problem-title">
        <p className="eyebrow">Sound familiar?</p>
        <h2 id="problem-title">Busy business, leaky system?</h2>
        <ul className="s-ticks">
          {SYMPTOMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="s-found">
          <p><strong>Real problems I found reviewing UK businesses in September 2026:</strong></p>
          <ul>
            {REAL_FINDINGS.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>Any one of these can send a customer elsewhere, and the owner would never hear about it.</p>
        </div>
      </section>

      <section className="s-section s-check" id="check" aria-labelledby="check-title">
        <div className="s-check-copy">
          <p className="eyebrow">{FREE_STEP.name} · {FREE_STEP.price}</p>
          <h2 id="check-title">Send your link. I’ll go through it like a customer would.</h2>
          <ul className="s-ticks">
            <li>I try to book, call and enquire, on a phone</li>
            <li>I follow a real test enquiry through to you</li>
            <li>I check your Google listing, reminders and follow-up</li>
            <li>You get the change worth making first, with dated proof</li>
          </ul>
          <p className="s-small"><a href="#example">See an example report ↓</a></p>
        </div>
        <LeakCheckForm />
      </section>

      <section className="s-section" id="example" aria-labelledby="example-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="example-title">An example review.</h2>
        <SampleReport />
      </section>

      <section className="s-section" id="pricing" aria-labelledby="pricing-title">
        <PricingViewTracker targetId="pricing" />
        <p className="eyebrow">What I build</p>
        <h2 id="pricing-title">Three ways I can help.</h2>
        <p className="s-small">Every job starts with the {FREE_STEP.short}. {PAYMENT_TERMS}</p>
        <div className="s-prices">
          {OFFERS.map((offer) => (
            <article className={`s-price${offer.tag ? ' s-price-main' : ''}`} key={offer.id}>
              {offer.tag ? <p className="s-price-tag">{offer.tag}</p> : null}
              <h3>{offer.name}</h3>
              <p className="s-price-amount">{offer.price}</p>
              <p>{offer.body}</p>
              <ul>{offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <ServiceEnquiryLink service={offer.service}>Ask about this <span aria-hidden="true">→</span></ServiceEnquiryLink>
            </article>
          ))}
        </div>
        <div className="s-guarantee">
          <strong>The guarantee.</strong> {GUARANTEE} You own everything I build.
        </div>
        <div className="s-actions">
          <a className="button button-signal" href="#check">Start with the free review</a>
        </div>
        <p className="s-small">Introduce a business and I&apos;ll thank you with £40 when they become a paying client. <a href="/faq#do-you-pay-for-referrals">How →</a></p>
      </section>

      <section className="s-section" id="process" aria-labelledby="process-title">
        <p className="eyebrow">How it works</p>
        <h2 id="process-title">Four simple steps.</h2>
        <ol className="s-steps">
          {STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></li>)}
        </ol>
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
        <p>Free, by hand, within {CHECK_REPLY_TIME}. No call, no obligation.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get my free review</a>
          <CallLink className="button" href={BOOKING_URL} placement="footer-cta">Book a 15-minute call</CallLink>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#check" hideWhenVisible="check" />
    </main>
  );
}
