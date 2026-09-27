import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL, LOCATION } from './site';
import { ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { SampleReport } from './sample-report';
import { REAL_FINDINGS } from './real-findings';

const TRUST = [
  ['You deal with Manazir', 'The person who checks it fixes it.'],
  [LOCATION, 'Working with businesses UK-wide.'],
  ['Fixed price, No VAT added', 'Agreed before any work starts.'],
  ['7-working-day guarantee', 'Working in time, or you don’t pay the rest.'],
] as const;

const SYMPTOMS = [
  'The phone has gone quiet, but your work is as good as ever.',
  'Someone said they tried to book online and gave up.',
  'Your website form hasn’t sent you anything in weeks.',
  'Google shows old hours, an old number or the wrong link.',
];

const OFFERS = [
  {
    name: 'Booking & Enquiry Repair',
    price: '£395',
    tag: 'Most people start here',
    body: 'How customers book or enquire, fixed and tested on what you already use.',
    bullets: [
      'Booking links, forms and phone buttons fixed',
      'A real test booking or enquiry followed to your inbox',
      'A dated Journey Receipt: before and after',
    ],
    deposit: '£200 to start · £195 on completion',
    service: 'repair',
  },
  {
    name: 'Google Profile & Contact Setup',
    price: '£249',
    tag: '',
    body: 'Your Google listing right, and every contact route reaching you.',
    bullets: [
      'Google Business Profile checked and corrected',
      'A review-request message ready to send',
      'A print-ready QR card for the counter',
    ],
    deposit: '£125 to start · £124 on completion',
    service: 'google-profile',
  },
  {
    name: 'Both together',
    price: '£595',
    tag: '',
    body: 'The Repair and the Google setup in one job.',
    bullets: [
      'Everything in the Repair',
      'Everything in the Google setup',
      'One Journey Receipt covering both',
    ],
    deposit: '£300 to start, £295 on completion',
    service: 'bundle',
  },
] as const;

const STEPS = [
  ['01', 'Tell me what’s wrong', `Send your link. I test it myself and email you within ${CHECK_REPLY_TIME}.`],
  ['02', 'I confirm the fix and price', 'Only if a fix is worth paying for. If it isn’t, I say so.'],
  ['03', 'You pay half to start', 'Once access is sorted. The rest when it works.'],
  ['04', 'Working within 7 working days', 'Or you don’t pay the rest.'],
];

const PROOF = [
  {
    name: 'JobFilter',
    label: 'My own product · built and launched',
    body: 'Finds public contracts that suit small trades firms. Live at jobfilter.uk.',
    href: '/work/jobfilter',
    img: '/jobfilter-home-mobile.webp',
    alt: 'JobFilter homepage on a phone',
  },
  {
    name: 'Scrap Finance Partners',
    label: 'Client website · built by me',
    body: 'A website for a specialist finance practice.',
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
        <p className="eyebrow">For UK businesses customers book, call or message</p>
        <h1 id="intro-title">Customers trying to book you might be hitting a dead end.</h1>
        <p className="s-lede">Broken booking links, forms that never arrive, the wrong number on Google. I check yours for free, then fix what’s broken for a fixed £395.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get my free check</a>
          <CallLink className="button" href={BOOKING_URL} placement="hero">Or book a 15-minute call</CallLink>
        </div>
        <p className="s-note">Free. Checked by hand. Emailed within {CHECK_REPLY_TIME}. No call needed.</p>
      </section>

      <ul className="s-trust" aria-label="Why owners trust Maz Works">
        {TRUST.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}
      </ul>

      <section className="s-section" id="problem" aria-labelledby="problem-title">
        <p className="eyebrow">Sound familiar?</p>
        <h2 id="problem-title">Quiet week, or a broken link?</h2>
        <ul className="s-ticks">
          {SYMPTOMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="s-found">
          <p><strong>Real problems I found on UK business websites this month:</strong></p>
          <ul>
            {REAL_FINDINGS.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>Each one is a customer who tried, gave up and went elsewhere. The owner never hears about them.</p>
        </div>
      </section>

      <section className="s-section s-check" id="check" aria-labelledby="check-title">
        <div className="s-check-copy">
          <p className="eyebrow">Free Booking &amp; Enquiry Check · £0</p>
          <h2 id="check-title">Send your link. I’ll test it like a customer would.</h2>
          <ul className="s-ticks">
            <li>I tap your booking and call buttons on a phone</li>
            <li>I send a real test enquiry and see if it reaches you</li>
            <li>I check your Google listing matches your website</li>
            <li>You get one clear finding, dated proof, and a fixed price only if a fix is worth paying for</li>
          </ul>
          <p className="s-small"><a href="#example">See an example report ↓</a></p>
        </div>
        <LeakCheckForm />
      </section>

      <section className="s-section" id="example" aria-labelledby="example-title">
        <p className="eyebrow">What you get back</p>
        <h2 id="example-title">An example check report.</h2>
        <SampleReport />
      </section>

      <section className="s-section" id="pricing" aria-labelledby="pricing-title">
        <PricingViewTracker targetId="pricing" />
        <p className="eyebrow">Prices</p>
        <h2 id="pricing-title">Fixed prices. No VAT added.</h2>
        <p className="s-small">Start with the free Booking &amp; Enquiry Check. Any fix will be one of these.</p>
        <div className="s-prices">
          {OFFERS.map((offer) => (
            <article className={`s-price${offer.tag ? ' s-price-main' : ''}`} key={offer.name}>
              {offer.tag ? <p className="s-price-tag">{offer.tag}</p> : null}
              <h3>{offer.name}</h3>
              <p className="s-price-amount">{offer.price}</p>
              <p>{offer.body}</p>
              <ul>{offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <p className="s-price-deposit">{offer.deposit}</p>
              <ServiceEnquiryLink service={offer.service}>Know what’s broken? Ask about this <span aria-hidden="true">→</span></ServiceEnquiryLink>
            </article>
          ))}
        </div>
        <div className="s-guarantee">
          <strong>The guarantee.</strong> Your repair is working within 7 working days of me getting access, or you don’t pay the rest. I still finish it. If I can’t deliver it, your deposit is refunded. You own everything I build.
        </div>
        <div className="s-actions">
          <a className="button button-signal" href="#check">Start with the free check</a>
        </div>
        <p className="s-small">Google sets its own verification times. Bigger job, like a new website? <a href="/contact">Tell me what you need →</a></p>
        <p className="s-small">Know a business with this problem? Introduce them and I&apos;ll thank you with £40 when they become a paying client. <a href="/faq#do-you-pay-for-referrals">How it works →</a></p>
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
          <h2 id="about-title">I’m Manazir. I do the work myself.</h2>
          <p>I’m based in {LOCATION} and work with businesses across the UK. No account managers, no sales team. Email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <p className="s-small">Maz Works is new, so there are no client reviews here yet. What I can show is work you can open yourself:</p>
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
        <h2 id="final-title">Find out what’s stopping customers reaching you.</h2>
        <p>Free, by hand, within {CHECK_REPLY_TIME}. No call, no obligation.</p>
        <div className="s-actions">
          <a className="button button-signal s-button-lg" href="#check">Get my free check</a>
          <CallLink className="button" href={BOOKING_URL} placement="footer-cta">Book a 15-minute call</CallLink>
        </div>
      </section>

      <SiteFooter />
      <StickyCheckCta href="#check" hideWhenVisible="check" />
    </main>
  );
}
