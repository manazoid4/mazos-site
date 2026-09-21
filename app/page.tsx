import Image from 'next/image';
import { CONTACT_EMAIL } from './site';
import { DemoRequestForm, ServiceEnquiryLink } from './demo-request-form';
import { SiteFooter, SiteHeader } from './site-chrome';

const SERVICES = [
  {
    title: 'Capture and follow up enquiries',
    body: 'A website, landing page or enquiry form that actually reaches you, with follow-up that does not rely on memory.',
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
    body: 'Internal tools, customer software and AI features built for one job, with approval steps where judgment matters.',
    service: 'software',
    action: 'Talk about a tool',
  },
  {
    title: 'Physical products that lead somewhere',
    body: 'Tap stands, keyrings and gifts that send a customer straight to your reviews, booking page or menu.',
    href: '/3d-printing',
    action: 'Explore Maz Works Objects',
  },
];

const WORK = [
  {
    name: 'JobFilter',
    type: 'Product / Construction',
    problem: 'Trades and maintenance teams lose hours hunting for contract opportunities and working out by hand which ones are actually worth bidding for.',
    summary: 'A construction-focused product that finds, scores and organises relevant contract opportunities so the qualifying stops being manual admin.',
    role: 'Built the opportunity scanning, trade-fit scoring, qualification, alerts, calendar export, response templates and outcome-tracking workflows.',
    links: [
      { label: 'View case study', href: '/work/jobfilter' },
      { label: 'Try it', href: 'https://jobfilter.uk/find-jobs' },
    ],
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Contract client build',
    problem: 'A specialist finance practice serving UK scrap and recycling firms needed a credible digital presence and a working route from interest to enquiry.',
    summary: 'A contract build covering the practice’s positioning, website, lead journey and the automation behind it.',
    role: 'Handled positioning, marketing implementation, web development, launch, lead capture, a secure client workspace and guarded acquisition automation with approval and suppression controls.',
    links: [
      { label: 'View case study', href: '/work/scrap-finance-partners' },
      { label: 'View live site', href: 'https://scrap-finance-partners.vercel.app' },
    ],
  },
  {
    name: 'Agent Nudge',
    type: 'Product / In progress',
    problem: 'Running several AI coding agents at once means they duplicate work and act on stale information.',
    summary: 'A desktop tool that keeps multiple AI coding agents from overlapping or working from out-of-date context.',
    role: 'Designed and built the desktop workflow, coordination checks and release system.',
    links: [{ label: 'View project', href: 'https://github.com/manazoid4/agent-nudge' }],
  },
  {
    name: 'MAZ Pocket',
    type: 'Hardware + software / In progress',
    problem: 'Capturing a thought or reminder usually means unlocking a phone and opening an app first.',
    summary: 'A pocket AI assistant built around quick voice capture, reminders and remote interaction with AI tools.',
    role: 'Building the firmware, interface and hardware/software integration.',
    links: [{ label: 'Ask about this build', href: '#contact' }],
  },
];

const PROCESS = [
  ['01', 'Tell me the problem', 'Describe what is taking too much time. No technical detail needed.'],
  ['02', 'I show you the direction', 'A demo, a screen-share walkthrough, or a written scope and quote — whichever suits the job.'],
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
    service: 'unsure',
    action: 'Ask about a Quick Win',
  },
  {
    name: 'Website Launch',
    price: 'From £299',
    body: 'A focused small-business website or landing experience with a clear enquiry route and deployment.',
    scope: 'Scope and fixed price agreed before work starts',
    note: 'Best for a first site or a replacement',
    service: 'website',
    action: 'Ask about a website',
  },
  {
    name: 'Growth System',
    price: 'From £499',
    body: 'A website or customer journey plus one useful automation or AI-assisted workflow, built with sensible controls.',
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

const FAQS = [
  ['Do I need to know what technology I need?', 'No. Start with the business problem. I choose the simplest approach that solves it rather than forcing a particular tool.'],
  ['What does the free demo include?', 'For a suitable problem, a small near-working version of the intended workflow so you can see the experience before paying for the full build. It is not the finished production system.'],
  ['Do you use AI in client systems?', 'Where it helps. Important workflows should not be blindly autonomous, so I use limits, validation, approval steps, suppression rules or manual fallback routes when the risk calls for it. AI where it helps. Human control where it matters.'],
  ['Can you work with systems we already use?', 'Often, yes. Existing software, APIs and workflows are checked during scoping so we reuse what already works instead of rebuilding it.'],
  ['What happens after launch?', 'I hand over the agreed work clearly. Ongoing support, extra features or further automation can be quoted separately, from £49/month with no long contract.'],
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
          <p className="mw-lede">I&apos;m Manazir Hussain. I build websites, software, automations and useful physical products for small businesses — from a tap-to-book stand to the booking page and follow-up behind it.</p>
          <div className="mw-actions">
            <a className="button button-signal" href="#contact">Tell me the problem</a>
            <a className="text-link" href="#work">See real work <span aria-hidden="true">↓</span></a>
          </div>
          <p className="mw-hero-note">Ask for a quote, a walkthrough, or a free demo built around your problem — whichever is actually useful.</p>
          <p className="mw-hero-proof">Recently built: <a href="#jobfilter">JobFilter</a>, a live product for construction firms, and <a href="#scrap-finance-partners">Scrap Finance Partners</a>, a contract client build.</p>
        </div>
        <div className="mw-capabilities" aria-label="How working with Maz Works works">
          <span>Direct with the builder</span><span>Fixed scope and price</span><span>See the direction first</span>
        </div>
        <nav className="mw-jumpbar" aria-label="Jump to page section">
          <a href="#work">Work</a><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="/3d-printing">Objects</a><a href="#contact">Contact</a>
        </nav>
      </section>

      <section className="mw-section mw-work" id="work" aria-labelledby="work-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Selected work</p><h2 id="work-title">Built, not just proposed.</h2></div>
          <p>Start with inspectable work, not promises. Unfinished projects are labelled as such.</p>
        </header>
        <div className="mw-work-list">
          {WORK.slice(0, 2).map((project, index) => <WorkRow project={project} index={index} key={project.name} />)}
        </div>
        <details className="mw-disclosure mw-more-work">
          <summary><span>Work in progress</span><small>Agent Nudge + MAZ Pocket</small></summary>
          <div className="mw-work-list mw-work-list-secondary">
            {WORK.slice(2).map((project, index) => <WorkRow project={project} index={index + 2} key={project.name} />)}
          </div>
        </details>
      </section>

      <section className="mw-section mw-services-compact" id="services" aria-labelledby="services-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">What I help with</p><h2 id="services-title">Start with the problem.</h2></div>
          <p>Pick the outcome you need. The technology comes second.</p>
        </header>
        <div className="mw-service-grid">
          {SERVICES.map((service) => (
            <article className="mw-service-card" key={service.title}>
              <h3>{service.title}</h3><p>{service.body}</p>
              {service.href ? <a className="mw-service-link" href={service.href}>{service.action} <span aria-hidden="true">→</span></a>
                : <ServiceEnquiryLink service={service.service ?? 'unsure'}>{service.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>}
            </article>
          ))}
        </div>
      </section>

      <section className="mw-section mw-client-flow" id="pricing" aria-labelledby="pricing-title">
        <div className="mw-compact-block mw-pricing" id="client">
          <header className="mw-section-heading mw-heading-inline">
            <div><p className="eyebrow">Pricing</p><h2 id="pricing-title">Clear starting prices.</h2></div>
            <p>Fixed scope agreed before anything is charged.</p>
          </header>
          <div className="mw-price-grid">
            {OFFERS.map((offer) => (
              <article className="mw-price-option" key={offer.name}>
                <p>{offer.name}</p>
                <strong>{offer.price}</strong>
                <span>{offer.body}</span>
                <em className="mw-price-scope">{offer.scope}</em>
                <small>{offer.note}</small>
                <ServiceEnquiryLink service={offer.service}>{offer.action} <span aria-hidden="true">→</span></ServiceEnquiryLink>
              </article>
            ))}
          </div>
          <div className="mw-pricing-foot">
            <div><strong>£0 first step</strong><span>Tell me the problem and I&apos;ll show you the direction before you commit to anything.</span></div>
            <div><strong>Optional support from £49/month</strong><span>No long contract. Third-party usage costs are separate.</span></div>
            <a className="button button-signal" href="#contact">Tell me the problem</a>
          </div>
        </div>

        <aside className="mw-objects-strip" aria-labelledby="objects-showcase-title">
          <Image src="/objects/touch-three-hero.webp" alt="Concept visual of the black-and-white Touch Three NFC stand" width={1536} height={1024} sizes="(max-width: 760px) 32vw, 240px" unoptimized />
          <div><p className="eyebrow">Maz Works Objects</p><h3 id="objects-showcase-title">A tap that leads somewhere useful.</h3><p>Stands, keyrings and business gifts that send a customer straight to your reviews, booking page or menu. From £29.</p></div>
          <a className="button button-dark" href="/3d-printing">Explore Objects</a>
        </aside>

        <div className="mw-compact-block" id="process">
          <details className="mw-disclosure">
            <summary><span>How we go from enquiry to handover</span><small>Four steps, with scope and price agreed first</small></summary>
            <ol className="mw-process-strip">
              {PROCESS.map(([number, title, body]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}
            </ol>
          </details>
        </div>
      </section>

      <section className="mw-section mw-about" id="about" aria-labelledby="about-title">
        <header className="mw-section-heading">
          <p className="eyebrow">About Maz Works</p>
          <h2 id="about-title">Operations thinking behind the build.</h2>
          <p>I&apos;m Manazir Hussain. My background is in complaints, investigations and operations: find the actual failure point, explain it clearly, then build the simplest thing that fixes it.</p>
        </header>
        <div className="mw-about-panels">
          <details className="mw-disclosure">
            <summary><span>Professional background</span><small>Why operations experience matters</small></summary>
            <div className="mw-background-grid">
              {BACKGROUND.map((item) => <article key={item.company}><p>{item.company}</p><h3>{item.role}</h3><span>{item.body}</span></article>)}
            </div>
            <div className="mw-skill-strip"><span>Problem investigation</span><span>Process improvement</span><span>Client communication</span><span>Operational ownership</span><span>Regulated environments</span></div>
          </details>
        </div>
      </section>

      <section className="mw-section mw-faq" aria-labelledby="faq-title">
        <header className="mw-section-heading mw-heading-inline">
          <div><p className="eyebrow">Questions</p><h2 id="faq-title">Useful answers, when you need them.</h2></div>
          <p>Only open the ones relevant to you.</p>
        </header>
        <div className="mw-faq-list">
          {FAQS.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div className="mw-contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title">Tell me what&apos;s not working. I&apos;ll tell you what I&apos;d do.</h2>
          <p className="mw-contact-copy">A short description is enough — no technical detail needed. Ask for a quote, a walkthrough, a free demo, or an answer. I&apos;ll confirm what suits the job.</p>
          <p className="mw-contact-fallback">Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
        <DemoRequestForm />
      </section>

      <SiteFooter />
    </main>
  );
}
