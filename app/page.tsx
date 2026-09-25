import { CONTACT_EMAIL } from './site';
import { DemoRequestForm, ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { NewsletterSignup } from './newsletter-signup';

type WorkStage = 'flagship' | 'live' | 'building';

const WORK: {
  name: string;
  type: string;
  stage: WorkStage;
  summary: string;
  links: { label: string; href: string }[];
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
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Contract client build',
    stage: 'flagship',
    summary: 'Website, lead capture and client area for a specialist finance practice.',
    links: [
      { label: 'Case study', href: '/work/scrap-finance-partners' },
      { label: 'View site', href: 'https://scrap-finance-partners.vercel.app' },
    ],
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
  { name: 'Websites', body: 'Pages that bring enquiries in.', service: 'website' },
  { name: 'Automation', body: 'The admin you repeat, done for you.', service: 'automation' },
  { name: 'Software', body: 'Tools built around how you work.', service: 'software' },
  { name: 'Physical products', body: 'Tap stands that send customers to your reviews.', href: '/3d-printing' },
] as const;

const FLAGSHIP_WORK = WORK.filter((project) => project.stage === 'flagship');
const FURTHER_WORK = WORK.filter((project) => project.stage !== 'flagship');

const OFFERS = [
  {
    name: 'Quick Win',
    price: '£150 fixed',
    body: 'One broken or missing thing, fixed.',
    note: '£75 to start · £75 on completion',
    service: 'quick-win',
    action: 'Ask about a Quick Win',
    details: '/quick-win',
  },
  {
    name: 'Website Launch',
    price: 'From £299',
    body: 'A simple website that brings you enquiries.',
    note: 'Fixed price agreed before work starts',
    service: 'website',
    action: 'Ask about a website',
  },
  {
    name: 'Growth System',
    price: 'From £499',
    body: 'Your website plus one job automated, like booking reminders.',
    note: 'One workflow, not a whole department',
    service: 'automation',
    action: 'Ask about automation',
  },
];

const STEPS = [
  ['01', 'Tell me the problem', 'One line is enough.'],
  ['02', 'I suggest the fix', 'A quote, a call or a quick demo.'],
  ['03', 'We agree the price', 'Before any paid work.'],
  ['04', 'I build and hand over', 'Tested, and yours to keep.'],
];

function WorkRow({ project }: { project: (typeof WORK)[number] }) {
  return (
    <article className="mw-work-row" id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="mw-work-main">
        <p className="relationship">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="mw-work-summary">{project.summary}</p>
      </div>
      <nav className="mw-work-links" aria-label={`${project.name} links`}>
        {project.links.map((link) => <a href={link.href} key={link.href}>{link.label} <span aria-hidden="true">→</span></a>)}
      </nav>
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
          <h1 id="intro-title">I fix what’s costing you customers.</h1>
          <p className="mw-lede">Whatever form the fix takes, I build it. From £150, fixed price.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="#contact">Tell me the problem</a>
            <a className="text-link" href="#pricing">See prices <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">You deal with me directly. The price is agreed before any work.</p>
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
          <div className="mw-price-grid">
            {OFFERS.map((offer) => (
              <article className="mw-price-option" key={offer.name}>
                <p>{offer.name}</p>
                <strong>{offer.price}</strong>
                <span>{offer.body}</span>
                <small>{offer.note}</small>
                {offer.details ? <a className="text-link" href={offer.details}>See common fixes <span aria-hidden="true">→</span></a> : null}
                <ServiceEnquiryLink service={offer.service}>{offer.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
              </article>
            ))}
          </div>
          <p className="mw-pricing-extra">
            Support from £49/month. Optional, no long contract. · <a href="/3d-printing">Maz Works Objects: tap-to-review stands from £29 <span aria-hidden="true">→</span></a>
          </p>
        </div>
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
          {HOMEPAGE_FAQS.slice(0, 3).map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="mw-faq-more"><a className="text-link" href="/faq">All questions <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div className="mw-contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title">Tell me what&apos;s not working.</h2>
          <p className="mw-contact-copy">One line is enough. I’ll reply with what I’d do.</p>
          <p className="mw-contact-fallback">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <DemoRequestForm />
      </section>

      <NewsletterSignup />

      <SiteFooter />
    </main>
  );
}
