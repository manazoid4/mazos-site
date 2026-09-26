import { BOOKING_URL, CONTACT_EMAIL } from './site';
import { DemoRequestForm, ServiceEnquiryLink } from './demo-request-form';
import { TellMazForm } from './tell-maz-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { NewsletterSignup } from './newsletter-signup';

type WorkStage = 'flagship' | 'live' | 'building';
type WorkProof = {
  src: string;
  mobileSrc: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  emphasis: 'primary' | 'secondary';
};

const WORK: {
  name: string;
  type: string;
  stage: WorkStage;
  summary: string;
  links: { label: string; href: string }[];
  proof?: WorkProof;
}[] = [
  {
    name: 'JobFilter',
    type: 'Full build and setup',
    stage: 'flagship',
    summary: 'Finds public contracts that fit a trades firm. Built and launched, with paid plans.',
    links: [
      { label: 'Case study', href: '/work/jobfilter' },
      { label: 'Try it', href: 'https://jobfilter.uk/find-jobs' },
    ],
    proof: {
      src: '/jobfilter-home.webp',
      mobileSrc: '/jobfilter-home-mobile.webp',
      alt: 'JobFilter homepage: know which public works opportunities fit your firm, and which to skip',
      caption: 'JobFilter / live at jobfilter.uk',
      width: 1440,
      height: 900,
      emphasis: 'primary',
    },
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Client website',
    stage: 'flagship',
    summary: 'A website for a specialist finance practice.',
    links: [
      { label: 'Case study', href: '/work/scrap-finance-partners' },
      { label: 'View site', href: 'https://scrap-finance-partners.vercel.app' },
    ],
    proof: {
      src: '/scrap-finance-partners.webp',
      mobileSrc: '/scrap-finance-partners-mobile.webp',
      alt: 'Scrap Finance Partners website homepage for a specialist finance practice',
      caption: 'Scrap Finance Partners / client website',
      width: 1440,
      height: 1000,
      emphasis: 'secondary',
    },
  },
  {
    name: 'Agent Nudge',
    type: 'Released',
    stage: 'live',
    summary: 'Stops AI tools clashing over the same files.',
    links: [
      { label: 'Try the demo', href: 'https://agent-nudge-bay.vercel.app/demo/overview' },
      { label: 'View code', href: 'https://github.com/manazoid4/agent-nudge' },
    ],
  },
  {
    name: 'OpenFlowKit',
    type: 'Open source',
    stage: 'live',
    summary: 'Voice-to-text in the browser, cleaned up for you.',
    links: [{ label: 'Try it', href: 'https://openflowkit-dusky.vercel.app' }],
  },
  {
    name: 'Khutba.io',
    type: 'Live prototype',
    stage: 'live',
    summary: 'Live translated captions for mosque screens.',
    links: [{ label: 'Try the demo', href: 'https://khutba-io.vercel.app/demo' }],
  },
  {
    name: 'MAZ Pocket',
    type: 'In progress',
    stage: 'building',
    summary: 'A pocket device to talk to your PC and approve its actions.',
    links: [{ label: 'Ask about this build', href: '#contact' }],
  },
];

const BUILDS = [
  { name: 'Websites', body: 'New sites and quick fixes.', service: 'website' },
  { name: 'Full rebuilds', body: 'Old sites and systems, rebuilt.', service: 'rebuild' },
  { name: 'More customers', body: 'Booking, enquiries and reviews.', service: 'repair' },
  { name: 'Automation', body: 'Repeat admin, done for you.', service: 'automation' },
  { name: 'Software', body: 'Tools built around your work.', service: 'software' },
  { name: 'Physical products', body: 'Tap stands and useful objects.', href: '/3d-printing' },
] as const;

const FLAGSHIP_WORK = WORK.filter((project) => project.stage === 'flagship');
const FURTHER_WORK = WORK.filter((project) => project.stage !== 'flagship');

const PRIMARY_OFFERS = [
  {
    name: 'Booking & Enquiry Repair',
    price: '£395',
    highlight: true,
    body: 'One booking or enquiry journey, repaired and tested on what you already use.',
    bullets: [
      'Booking links, forms and routing checked and fixed',
      'A real test enquiry followed through to a reply',
      'A dated Journey Receipt showing what changed',
    ],
    deposit: '£200 to start · £195 on completion',
    service: 'repair',
    action: 'Ask about a repair',
  },
  {
    name: 'Google Profile & Contact Setup',
    price: '£249',
    highlight: false,
    body: 'An accurate Google listing and contact routes that actually reach you.',
    bullets: [
      'Google Business Profile checked and corrected',
      'A review-request message ready to send',
      'A print-ready QR card for the counter',
    ],
    deposit: '£125 to start · £124 on completion',
    service: 'google-profile',
    action: 'Ask about Google setup',
  },
] as const;

const SECONDARY_OFFERS = [
  { name: 'Website Launch', price: 'From £495', body: 'A new site, when repairing the old one is not practical.', service: 'website', action: 'Ask about a website' },
  { name: 'Full Rebuild', price: 'From £1,000', body: 'Your old site or system, rebuilt properly.', service: 'rebuild', action: 'Ask about a rebuild' },
] as const;

const JOURNEY_RECEIPT_EXAMPLE = {
  action: 'Tap "Book a Treatment"',
  before: 'Opens an old booking page saying the business is no longer available',
  after: 'Opens the real booking page and confirms the slot',
};

const STEPS = [
  ['01', 'Tell me what’s wrong', 'A free check, or send it straight to me.'],
  ['02', 'I confirm the fix and price', 'Before you pay anything.'],
  ['03', 'You pay half to start', 'The rest when it’s working.'],
  ['04', 'Working within 7 days', 'Or you don’t pay the rest.'],
];

function WorkRow({ project }: { project: (typeof WORK)[number] }) {
  return (
    <article className={`mw-work-row${project.proof ? ' mw-work-row-with-proof' : ''}`} id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="mw-work-main">
        <p className="relationship">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="mw-work-summary">{project.summary}</p>
      </div>
      <nav className="mw-work-links" aria-label={`${project.name} links`}>
        {project.links.map((link) => <a href={link.href} key={link.href}>{link.label} <span aria-hidden="true">→</span></a>)}
      </nav>
      {project.proof ? (
        <figure className={`mw-work-proof mw-work-proof-${project.proof.emphasis}`}>
          <picture>
            <source media="(max-width: 640px)" srcSet={project.proof.mobileSrc} />
            <img src={project.proof.src} alt={project.proof.alt} width={project.proof.width} height={project.proof.height} loading="lazy" />
          </picture>
          <figcaption>{project.proof.caption}</figcaption>
        </figure>
      ) : null}
    </article>
  );
}

export default function Page() {
  return (
    <main>
      <SiteHeader />

      <section className="mw-hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="mw-hero-copy">
          <p className="eyebrow">Maz Works / Manazir Hussain</p>
          <h1 id="intro-title">I fix what’s costing your business time, customers, or money.</h1>
          <p className="mw-lede">I find and fix broken booking links, confusing enquiry routes and incorrect business information, so customers can reach you. Fixed price agreed before work starts.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="/leak-check">Get a free Booking &amp; Enquiry Check</a>
            <a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">15-minute walkthrough</a>
            <a className="text-link" href="#pricing">See prices <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">You deal with me directly. Price agreed before any work.</p>
        </div>
        <ul className="mw-builds" aria-label="What I build">
          {BUILDS.map((build) => {
            const content = <><strong>{build.name}</strong><span>{build.body}</span></>;
            return (
              <li key={build.name}>
                {'href' in build
                  ? <a className="mw-service-link" href={build.href}>{content}</a>
                  : <ServiceEnquiryLink service={build.service}>{content}</ServiceEnquiryLink>}
              </li>
            );
          })}
        </ul>
        <details className="mw-leak-check">
          <summary><span>What&apos;s the problem?</span><small>Not sure what you need? Pick your problem.</small></summary>
          <div className="mw-leak-options">
            <ServiceEnquiryLink service="repair">Something is broken</ServiceEnquiryLink>
            <ServiceEnquiryLink service="website">I need a website</ServiceEnquiryLink>
            <ServiceEnquiryLink service="rebuild">My site needs replacing</ServiceEnquiryLink>
            <ServiceEnquiryLink service="growth">I want more customers</ServiceEnquiryLink>
            <ServiceEnquiryLink service="automation">Admin takes too long</ServiceEnquiryLink>
            <ServiceEnquiryLink service="software">I need a custom tool</ServiceEnquiryLink>
            <a className="mw-service-link" href="/3d-printing">I want tap stands or signs</a>
            <ServiceEnquiryLink service="unsure">Not sure, help me</ServiceEnquiryLink>
          </div>
        </details>
      </section>

      <section className="mw-section mw-work" id="work" aria-labelledby="work-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Work</p><h2 id="work-title">Real builds you can open.</h2></div>
        </header>
        <div className="mw-work-list">
          {FLAGSHIP_WORK.map((project) => <WorkRow project={project} key={project.name} />)}
        </div>
        <details className="mw-disclosure mw-more-work">
          <summary><span>More projects</span><small>{FURTHER_WORK.length} products and tools</small></summary>
          <div className="mw-work-list mw-work-list-secondary">
            {FURTHER_WORK.map((project) => <WorkRow project={project} key={project.name} />)}
          </div>
        </details>
      </section>

      <section className="mw-section mw-client-flow" id="pricing" aria-labelledby="pricing-title">
        <div className="mw-compact-block mw-pricing" id="services">
          <header className="mw-section-heading mw-heading-inline">
            <div><p className="eyebrow">Prices</p><h2 id="pricing-title">Fixed prices. No surprises.</h2></div>
          </header>
          <div className="mw-free-check">
            <p><strong>Start free.</strong> Send your link. Get a plain check of what&apos;s stopping customers reaching you.</p>
            <a className="mw-service-link" href="/leak-check">Get a free Booking &amp; Enquiry Check <span aria-hidden="true">→</span></a>
          </div>
          <div className="mw-price-grid mw-price-grid-2">
            {PRIMARY_OFFERS.map((offer) => (
              <article className={`mw-price-option${offer.highlight ? ' mw-price-option-highlight' : ''}`} key={offer.name}>
                <p>{offer.name}</p>
                <strong>{offer.price}</strong>
                <span>{offer.body}</span>
                <ul className="mw-price-bullets">
                  {offer.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <small>{offer.deposit}</small>
                <ServiceEnquiryLink service={offer.service}>{offer.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
              </article>
            ))}
          </div>
          <p className="mw-pricing-extra">
            Need both? <ServiceEnquiryLink service="bundle">£595 together <span aria-hidden="true">→</span></ServiceEnquiryLink>. Guarantee: working within 7 working days of getting access, or you don&apos;t pay the rest. If I can&apos;t deliver it, your deposit is refunded.
          </p>

          <div className="mw-journey-receipt">
            <p className="eyebrow">Example Journey Receipt</p>
            <table>
              <thead>
                <tr><th>Customer action</th><th>Before</th><th>After</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{JOURNEY_RECEIPT_EXAMPLE.action}</td>
                  <td>{JOURNEY_RECEIPT_EXAMPLE.before}</td>
                  <td>{JOURNEY_RECEIPT_EXAMPLE.after}</td>
                </tr>
              </tbody>
            </table>
            <p className="mw-hero-note">Example from a real, anonymised repair. Yours comes dated, with your own before and after.</p>
          </div>

          <div className="mw-secondary-offers">
            <p className="eyebrow">When repairing what you have isn&apos;t practical</p>
            <ul className="mw-qw-list">
              {SECONDARY_OFFERS.map((offer) => (
                <li key={offer.name}>
                  <strong>{offer.name}, {offer.price}.</strong> {offer.body} <ServiceEnquiryLink service={offer.service}>{offer.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
                </li>
              ))}
            </ul>
          </div>

          <p className="mw-pricing-extra">
            No VAT added. Every price is fixed before work starts. You own everything I build. Know a business with this problem? Introduce them and I&apos;ll thank you with £40 when they become a paying client — <a href="/faq#do-you-pay-for-referrals">how it works <span aria-hidden="true">→</span></a>. · <a href="/3d-printing">Maz Works Objects: tap-to-review stands from £29 <span aria-hidden="true">→</span></a>
          </p>
        </div>
      </section>

      <section className="mw-section mw-tell-maz" id="tell-maz" aria-labelledby="tell-maz-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Already know what&apos;s wrong?</p><h2 id="tell-maz-title">Something&apos;s broken? Tell Maz.</h2></div>
        </header>
        <TellMazForm />
      </section>

      <section className="mw-section" id="process" aria-labelledby="process-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">How it works</p><h2 id="process-title">Four simple steps.</h2></div>
        </header>
        <ol className="mw-process-strip">
          {STEPS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}
        </ol>
      </section>

      <section className="mw-section mw-faq" aria-labelledby="faq-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Questions</p><h2 id="faq-title">Quick answers.</h2></div>
        </header>
        <div className="mw-faq-list">
          {HOMEPAGE_FAQS.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="mw-faq-more"><a className="text-link" href="/faq">All questions <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div className="mw-contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title">Tell me what&apos;s not working.</h2>
          <p className="mw-contact-copy">One line is enough. I’ll reply with what I’d do.</p>
          <p className="mw-contact-book"><a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Book a 20-min call</a></p>
          <p className="mw-contact-fallback">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <DemoRequestForm />
      </section>

      <NewsletterSignup />

      <SiteFooter />
    </main>
  );
}
