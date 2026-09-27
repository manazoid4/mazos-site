import { BOOKING_URL, CHECK_REPLY_TIME, CONTACT_EMAIL } from './site';
import { ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { LeakCheckForm } from './leak-check/leak-check-form';
import { CallLink, PricingViewTracker } from './analytics';
import { StickyCheckCta } from './sticky-cta';
import { SampleReport } from './sample-report';
import { CARE_PLAN, COMPARISON, EXTRA_GROUPS, FREE_STEP, GUARANTEE, NOT_INCLUDED, OFFERS, PROMISES } from './offers';

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
        <p className="eyebrow">What I build</p>
        <h2 id="pricing-title">Start small. Add what you need.</h2>
        <p className="s-small">Every job starts with a {FREE_STEP.short}. Pick a package, then add only the extras you want.</p>
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

        <div className="s-compare" id="compare">
          <h3>Compare packages</h3>
          <p className="s-small s-compare-hint">Swipe the table to see all three.</p>
          <div className="s-compare-scroll" tabIndex={0} role="region" aria-label="Package comparison table">
            <table>
              <thead>
                <tr><th scope="col"><span className="s-visually-hidden">What you get</span></th>{OFFERS.map((offer) => <th scope="col" key={offer.id}>{offer.name}</th>)}</tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ row, values }) => (
                  <tr key={row}><th scope="row">{row}</th>{values.map((value, index) => <td key={OFFERS[index].id}>{value}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ul className="s-promises" aria-label="Included with every package">
          {PROMISES.map((promise) => <li key={promise.title}><strong>{promise.title}</strong><span>{promise.body}</span></li>)}
        </ul>

        <div className="s-extras" id="extras">
          <h3>Add-ons</h3>
          <p className="s-small">Standard set-ups with a fixed, one-off price. Add them to any package, or buy one on its own. They go on the same invoice.</p>
          {EXTRA_GROUPS.map((group) => (
            <div className="s-extras-group" key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((extra) => <li key={extra.name}><div><strong>{extra.name}</strong><span>{extra.what}</span></div><strong className="s-extras-price">{extra.price}</strong></li>)}
              </ul>
            </div>
          ))}
          <div className="s-extras-care">
            <h4>After it’s built</h4>
            <p><strong>{CARE_PLAN.name}, {CARE_PLAN.price}.</strong> {CARE_PLAN.body}</p>
          </div>
        </div>

        <div className="s-not-included">
          <h3>What’s not included</h3>
          <ul>{NOT_INCLUDED.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <div className="s-guarantee">
          <strong>The guarantee.</strong> {GUARANTEE} You own everything I build.
        </div>
        <div className="s-actions">
          <a className="button button-signal" href="#check">Get a free plan and price</a>
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
