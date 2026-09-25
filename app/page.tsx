import Image from 'next/image';
import { CONTACT_EMAIL } from './site';
import { DemoRequestForm, ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';
import { HOMEPAGE_FAQS } from './faqs';
import { formatUpdateDate, LATEST_MAZ_WORKS_UPDATE } from './updates';

const SERVICES = [
  {
    title: 'Capture and follow up enquiries',
    body: 'A website, landing page or enquiry form that reaches you, with follow-up that does not rely on memory.',
    service: 'website',
    action: 'Talk about enquiries',
  },
  {
    title: 'Cut repetitive admin',
    body: 'The weekly copying, chasing and re-typing, handled by connecting the systems you already use.',
    service: 'automation',
    action: 'Talk about admin',
  },
  {
    title: 'Build a tool your team will use',
    body: 'Internal tools, customer software and AI features built for one job. AI where it helps. Human control where it matters.',
    service: 'software',
    action: 'Talk about a tool',
  },
];

const MEASURES = [
  ['Respond faster', 'lead & customer response time'],
  ['Give hours back to the team', 'admin hours per week'],
  ['Make sales follow-up consistent', 'follow-up coverage & time to next action'],
  ['Increase team capacity', 'work handled per person'],
  ['Reduce dropped work', 'overdue tasks & missed handoffs'],
  ['See where time and sales are leaking', 'response, time-to-quote, pipeline & workload signals'],
];

type WorkStage = 'flagship' | 'live' | 'building';

const WORK: {
  name: string;
  type: string;
  stage: WorkStage;
  problem: string;
  summary: string;
  role: string;
  links: { label: string; href: string }[];
}[] = [
  {
    name: 'JobFilter',
    type: 'Full build and setup / Construction',
    stage: 'flagship',
    problem: 'Trades and maintenance teams lose hours hunting for contract opportunities and working out by hand which ones are worth bidding for.',
    summary: 'A construction-focused product that finds, scores and organises relevant contract opportunities so qualification stops being manual admin.',
    role: 'Built and set up everything end to end: opportunity scanning, trade-fit scoring, alerts, calendar export and response templates, plus the domain, hosting, £39/month subscription checkout and launch.',
    links: [
      { label: 'View case study', href: '/work/jobfilter' },
      { label: 'Try it', href: 'https://jobfilter.uk/find-jobs' },
    ],
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Contract client build',
    stage: 'flagship',
    problem: 'A specialist finance practice serving UK scrap and recycling firms needed a credible digital presence and a working route from interest to enquiry.',
    summary: 'A contract build covering the practice\u2019s positioning, website, lead journey and the automation behind it.',
    role: 'Handled positioning, marketing implementation, web development, launch, lead capture, a secure client workspace and guarded acquisition automation with approval and suppression controls.',
    links: [
      { label: 'View case study', href: '/work/scrap-finance-partners' },
      { label: 'View live site', href: 'https://scrap-finance-partners.vercel.app' },
    ],
  },
  {
    name: 'Agent Nudge',
    type: 'Product / Released',
    stage: 'live',
    problem: 'Running several AI coding agents on one repository at once means they can claim the same files, duplicate work and act on information that has already changed.',
    summary: 'A local-first Windows tool that checks an agent\u2019s context before it acts and returns one of three explicit outcomes, with a downloadable release and a browser demo you can try without installing anything.',
    role: 'Built the desktop app, background service, provider hooks, coordination checks, the public documentation site and the signed release pipeline.',
    links: [
      { label: 'Try the demo', href: 'https://agent-nudge-bay.vercel.app/demo/overview' },
      { label: 'Download for Windows', href: 'https://github.com/manazoid4/agent-nudge/releases' },
      { label: 'View code', href: 'https://github.com/manazoid4/agent-nudge' },
    ],
  },
  {
    name: 'OpenFlowKit',
    type: 'Open source / Live MVP',
    stage: 'live',
    problem: 'Typing is slow for drafting, prompting and other writing-heavy work, and most dictation tools leave you cleaning up filler words by hand.',
    summary: 'An open-source voice-to-text workbench that captures speech in the browser, cleans it with explicit rules rather than a vague AI layer, and bridges the result into a terminal.',
    role: 'Built the speech capture, the typed transcription contracts, the deterministic refinement rules with latency tracking, and the tested WebSocket terminal bridge.',
    links: [
      { label: 'Try the MVP', href: 'https://openflowkit-dusky.vercel.app' },
      { label: 'View code', href: 'https://github.com/manazoid4/openflowkit' },
    ],
  },
  {
    name: 'Khutba.io',
    type: 'Product / Live prototype',
    stage: 'live',
    problem: 'Mosques with a mixed-language congregation have no calm way to put live translation on the screen they already own.',
    summary: 'A screen-first live captioning platform built around the Friday workflow: pair the existing screen, check it is ready, start explicitly, then present multilingual captions readable at worship-hall distance.',
    role: 'Built the product direction, the pairing and readiness flow, the presentation layer and an account-free demo anyone can open.',
    links: [
      { label: 'Try the demo', href: 'https://khutba-io.vercel.app/demo' },
      { label: 'View code', href: 'https://github.com/manazoid4/khutba-io' },
    ],
  },
  {
    name: 'MAZ Pocket',
    type: 'Hardware + software / In progress',
    stage: 'building',
    problem: 'Capturing a thought, checking on a long-running job or approving something on the PC usually means unlocking a phone and opening an app first.',
    summary: 'A card-sized handheld and paired PC service: hold a key to talk and hear an answer back, record a PC workflow by demonstrating it, and approve short-lived PC access from a phone rather than letting the model approve itself.',
    role: 'Building the firmware, the six-tile interface, the paired PC service, the phone approval broker and the packaged installer and release pipeline.',
    links: [{ label: 'Ask about this build', href: '#contact' }],
  },
];

const FLAGSHIP_WORK = WORK.filter((project) => project.stage === 'flagship');
const FURTHER_WORK = WORK.filter((project) => project.stage !== 'flagship');
const FURTHER_WORK_SUMMARY = FURTHER_WORK.map((project) => project.name).join(' \u00b7 ');

const PROCESS = [
  ['01', 'Tell me the problem', 'Describe what is taking too much time. No technical detail needed.'],
  ['02', 'I show you the direction', 'A demo, screen-share walkthrough, or written scope and quote — whichever suits the job.'],
  ['03', 'We agree the work', 'What is delivered, the price and the requirements — agreed before any paid work.'],
  ['04', 'I build, test and hand it over', 'I handle the build, testing and deployment, then hand it over clearly.'],
];

const OFFERS = [
  {
    name: 'Quick Win',
    price: '£150 fixed',
    body: 'One tightly scoped improvement to a website, workflow or automation.',
    scope: 'One agreed change — not a rebuild',
    note: '£75 to start · £75 on completion',
    service: 'quick-win',
    action: 'Ask about a Quick Win',
    details: '/quick-win',
  },
  {
    name: 'Website Launch',
    price: 'From £299',
    body: 'A focused small-business website or landing experience with a clear enquiry route and deployment.',
    scope: 'Scope and fixed price agreed before work starts',
    note: 'Best for a first site or replacement',
    service: 'website',
    action: 'Ask about a website',
  },
  {
    name: 'Growth System',
    price: 'From £499',
    body: 'A website or customer journey plus one useful automation or AI-assisted workflow.',
    scope: 'One workflow automated, not a whole department',
    note: 'Best for lead flow, follow-up or admin reduction',
    service: 'automation',
    action: 'Ask about a growth system',
  },
];

const BACKGROUND = [
  {
    company: 'ManyPets',
    role: 'Complaints Specialist',
    body: 'Complex complaint investigations in a regulated FCA/DISP environment, de-escalation, fair customer outcomes and cross-team problem solving.',
  },
  {
    company: 'Glide',
    role: 'Complaints & Escalations Coordinator',
    body: 'High-level telecoms escalations, operational ownership, cross-team coordination, service improvement and customer issue resolution.',
  },
];

function WorkRow({ project, index }: { project: (typeof WORK)[number]; index: number }) {
  return (
    <article className="mw-work-row" id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
      <div className="mw-work-index">0{index + 1}</div>
      <div className="mw-work-main">
        <p className="relationship">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="mw-work-problem">{project.problem}</p>
        <p className="mw-work-summary">{project.summary}</p>
        <p className="mw-work-role">{project.role}</p>
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
          <h1 id="intro-title">Stop losing time and enquiries to jobs done by hand.</h1>
          <p className="mw-lede">I build websites, software, automations and useful physical products for small businesses — from a tap-to-book stand to the booking page and follow-up behind it.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="#contact">Tell me the problem</a>
            <a className="text-link" href="#work">See real work <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">Ask for a quote, a walkthrough, or a near-working version first. I’ll tell you which is useful for the job.</p>
          <p className="mw-hero-proof">Recent work: <a href="#jobfilter">JobFilter</a> and <a href="#scrap-finance-partners">Scrap Finance Partners</a>.</p>
          <p className="mw-hero-update">
            <span>{LATEST_MAZ_WORKS_UPDATE.label}</span>
            <a href={`/whats-new#${LATEST_MAZ_WORKS_UPDATE.id}`}>{LATEST_MAZ_WORKS_UPDATE.title}</a>
            <small>{formatUpdateDate(LATEST_MAZ_WORKS_UPDATE.publishedAt)}</small>
          </p>
        </div>
        <div className="mw-capabilities" aria-label="How working with Maz Works works">
          <span>Direct with the builder</span><span>Fixed scope and price</span><span>See the direction first</span>
        </div>
        <nav className="mw-jumpbar" aria-label="Jump to page section">
          <a href="#work">Work</a><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
        </nav>
      </section>

      <section className="mw-section mw-work" id="work" aria-labelledby="work-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Selected work</p><h2 id="work-title">Built, not just proposed.</h2></div>
          <p>Inspect the work before reading more claims.</p>
        </header>
        <div className="mw-work-list">
          {FLAGSHIP_WORK.map((project, index) => <WorkRow project={project} index={index} key={project.name} />)}
        </div>
        <details className="mw-disclosure mw-more-work">
          <summary><span>Products and tools</span><small>{FURTHER_WORK_SUMMARY}</small></summary>
          <div className="mw-work-list mw-work-list-secondary">
            {FURTHER_WORK.map((project, index) => (
              <WorkRow project={project} index={index + FLAGSHIP_WORK.length} key={project.name} />
            ))}
          </div>
        </details>
      </section>

      <section className="mw-section mw-services-compact" id="services" aria-labelledby="services-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">What I help with</p><h2 id="services-title">Start with the problem.</h2></div>
          <p>The technology comes second.</p>
        </header>
        <div className="mw-service-grid">
          {SERVICES.map((service) => (
            <article className="mw-service-card" key={service.title}>
              <h3>{service.title}</h3><p>{service.body}</p>
              <ServiceEnquiryLink service={service.service}>{service.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
            </article>
          ))}
        </div>
        <details className="mw-disclosure" id="impact">
          <summary><span>What gets measured</span><small>Only where it matters</small></summary>
          <div className="mw-disclosure-body">
            <div className="mw-impact-intro">
              <h3>Less waiting. Less admin. More useful work.</h3>
              <p>I’d rather agree something you can actually measure than promise a percentage before seeing the problem.</p>
            </div>
            <div className="mw-measure-grid">
              {MEASURES.map(([title, measure]) => <div key={title}><strong>{title}</strong><span>{measure}</span></div>)}
            </div>
          </div>
        </details>
      </section>

      <section className="mw-section mw-client-flow" id="pricing" aria-labelledby="pricing-title">
        <div className="mw-compact-block mw-pricing" id="client">
          <header className="mw-section-heading mw-heading-inline">
            <div><p className="eyebrow">Pricing</p><h2 id="pricing-title">Clear starting points.</h2></div>
            <p>Scope and price agreed before paid work.</p>
          </header>
          <div className="mw-price-grid">
            {OFFERS.map((offer) => (
              <article className="mw-price-option" key={offer.name}>
                <p>{offer.name}</p>
                <strong>{offer.price}</strong>
                <span>{offer.body}</span>
                <em className="mw-price-scope">{offer.scope}</em>
                <small>{offer.note}</small>
                {offer.details ? <a className="text-link" href={offer.details}>See common fixes <span aria-hidden="true">→</span></a> : null}
                <ServiceEnquiryLink service={offer.service}>{offer.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
              </article>
            ))}
          </div>
          <div className="mw-pricing-foot">
            <div><strong>£0 first step</strong><span>Tell me the problem. I’ll show you the direction before you commit.</span></div>
            <div><strong>Support from £49/month</strong><span>Optional. No long contract.</span></div>
            <a className="button button-signal" href="#contact">Tell me the problem</a>
          </div>
        </div>

        <aside className="mw-objects-strip" aria-labelledby="objects-showcase-title">
          <Image src="/objects/touch-three-hero.webp" alt="Concept visual of the black-and-white Touch Three NFC stand" width={1536} height={1024} sizes="(max-width: 760px) 32vw, 240px" unoptimized />
          <div><p className="eyebrow">Maz Works Objects</p><h3 id="objects-showcase-title">Physical products that lead somewhere useful.</h3><p>Review, booking, menu and lead-flow objects from £29.</p></div>
          <a className="text-link" href="/3d-printing">Explore Objects <span aria-hidden="true">→</span></a>
        </aside>

        <div className="mw-compact-block" id="process">
          <details className="mw-disclosure">
            <summary><span>How a project works</span><small>Four steps</small></summary>
            <ol className="mw-process-strip">
              {PROCESS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}
            </ol>
          </details>
        </div>
      </section>

      <section className="mw-section mw-about" id="about" aria-labelledby="about-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">About</p><h2 id="about-title">Operations thinking behind the build.</h2></div>
          <p>Find the actual failure point, explain it clearly, then build the simplest thing that fixes it.</p>
        </header>
        <details className="mw-disclosure">
          <summary><span>Professional background</span><small>ManyPets + Glide</small></summary>
          <div className="mw-background-grid">
            {BACKGROUND.map((item) => <article key={item.company}><p>{item.company}</p><h3>{item.role}</h3><span>{item.body}</span></article>)}
          </div>
          <div className="mw-skill-strip"><span>Problem investigation</span><span>Process improvement</span><span>Client communication</span><span>Operational ownership</span><span>Regulated environments</span></div>
        </details>
      </section>

      <section className="mw-section mw-faq" aria-labelledby="faq-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Questions</p><h2 id="faq-title">Straight answers.</h2></div>
          <p>Three common objections here. The rest live on one page.</p>
        </header>
        <div className="mw-faq-list">
          {HOMEPAGE_FAQS.slice(0, 3).map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
        </div>
        <div className="mw-faq-more"><a className="text-link" href="/faq">Read the full FAQ <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div className="mw-contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title">Tell me what&apos;s not working.</h2>
          <p className="mw-contact-copy">A short description is enough. I’ll tell you what I’d do next.</p>
          <p className="mw-contact-fallback">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <DemoRequestForm />
      </section>

      <SiteFooter />
    </main>
  );
}
