import { CONTACT_EMAIL, CONTACT_LINKS } from './site';
import { SiteFooter, SiteHeader } from './site-chrome';

const SERVICES = [
  {
    title: 'Websites',
    body: 'Clear, fast websites, landing pages and online tools designed around what your customer actually needs to do.',
  },
  {
    title: 'Automation',
    body: 'Simple systems that remove repetitive admin, copying, chasing and manual handoffs.',
  },
  {
    title: 'AI & software',
    body: 'Useful AI features, internal tools and custom software built around a specific business problem.',
  },
];

const OUTCOMES = [
  ['Get more enquiries', 'Improve a website, enquiry path, follow-up process or lead flow.'],
  ['Reduce repetitive admin', 'Connect systems and remove repeated copying, chasing and updating.'],
  ['Improve customer operations', 'Build clearer workflows around enquiries, support, complaints and internal handoffs.'],
  ['Find and manage opportunities', 'Research, qualify and organise business-development opportunities with less manual work.'],
  ['Add AI safely', 'Use AI where it helps, with validation, approval steps and manual fallbacks where judgment matters.'],
];

const WORK = [
  {
    name: 'JobFilter',
    type: 'Product / Construction',
    summary: 'A construction-focused growth and automation product that helps trades and maintenance teams find, qualify and follow relevant contract opportunities with less admin.',
    role: 'Built the opportunity scanning, trade-fit scoring, qualification, alerts, calendar export, response templates and outcome-tracking workflows.',
    links: [
      { label: 'View case study', href: '/work/jobfilter' },
      { label: 'Try it', href: 'https://jobfilter.uk/find-jobs' },
    ],
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Contract client build',
    summary: 'A contract build for a specialist finance practice serving UK scrap and recycling firms, covering its digital presence, lead journey and business automation.',
    role: 'Handled positioning, marketing implementation, web development, launch, lead capture, a secure client workspace and guarded acquisition automation with approval and suppression controls.',
    links: [
      { label: 'View case study', href: '/work/scrap-finance-partners' },
      { label: 'View live site', href: 'https://scrap-finance-partners.vercel.app' },
    ],
  },
  {
    name: 'Agent Nudge',
    type: 'Product',
    summary: 'A desktop tool that helps multiple AI coding agents avoid stale information and overlapping work.',
    role: 'Designed and built the desktop workflow, coordination checks and release system.',
    links: [{ label: 'View project', href: 'https://github.com/manazoid4/agent-nudge' }],
  },
  {
    name: 'MAZ Pocket',
    type: 'Hardware + software',
    summary: 'A pocket AI assistant built around quick voice capture, reminders and remote interaction with AI tools.',
    role: 'Building the firmware, interface and hardware/software integration.',
    links: [{ label: 'View project', href: 'https://github.com/manazoid4/maz-pocket' }],
  },
];

const PROCESS = [
  ['01', 'Tell me the problem', 'Explain what is taking too much time, what you want built or what currently does not work.'],
  ['02', 'See the direction', 'For suitable projects, I map a useful starting point and make a small demonstration before you commit.'],
  ['03', 'Agree the build', 'We agree exactly what is being delivered, the price and the important requirements.'],
  ['04', 'I build and test it', 'I handle design, development, integrations, testing and deployment.'],
  ['05', 'Handover and next steps', 'You receive the agreed working result, a clear handover and an honest view of what is worth improving next.'],
];

const OFFERS = [
  {
    name: 'Quick Win',
    price: '£150 fixed',
    body: 'One tightly scoped improvement to a website, workflow or automation.',
    note: '£75 to start · £75 on completion',
  },
  {
    name: 'Website Launch',
    price: 'From £299',
    body: 'A focused small-business website or landing experience with a clear enquiry route and deployment.',
    note: 'Scope and fixed price agreed first',
  },
  {
    name: 'Growth System',
    price: 'From £499',
    body: 'A website or customer journey plus one useful automation or AI-assisted workflow, built with sensible controls.',
    note: 'Best for lead flow, follow-up or admin reduction',
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
  ['Do I need to know what technology I need?', 'No. Start with the business problem. I choose the simplest appropriate approach rather than forcing a particular tool.'],
  ['What does the free demo include?', 'A small demonstration or clear problem map for one suitable issue. It makes the direction tangible; it is not an entire production build for free.'],
  ['Do you use AI in client systems?', 'Where it is useful. Important workflows should not be blindly autonomous, so I use limits, validation, approval steps or manual fallbacks when the risk calls for them.'],
  ['Can you work with systems we already use?', 'Often, yes. Existing software, APIs and workflows are checked during scoping so we can reuse what already works instead of rebuilding unnecessarily.'],
  ['What happens after launch?', 'I hand over the agreed work clearly. Ongoing support, extra features or further automation can be quoted separately.'],
];

export default function Page() {
  return (
    <main>
      <SiteHeader />

      <section className="mw-hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="mw-hero-copy">
          <p className="eyebrow">Maz Works / Manazir Hussain</p>
          <h1 id="intro-title">Websites, automation and AI tools built around real business problems.</h1>
          <p className="mw-lede">
            I help small businesses turn awkward manual processes and ideas into simple working systems — from design and development to automation, AI integrations, marketing implementation and deployment.
          </p>
          <div className="mw-actions">
            <a className="button button-signal" href={CONTACT_LINKS.client}>Get a free problem map + demo</a>
            <a className="text-link" href="#work">See my work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="mw-capabilities" aria-label="Core capabilities">
          <span>Direct with the builder</span>
          <span>Clear scope first</span>
          <span>Web development</span>
          <span>Automation</span>
          <span>AI with guardrails</span>
          <span>Deployment</span>
        </div>
      </section>

      <section className="mw-section" id="services" aria-labelledby="services-title">
        <header className="mw-section-heading">
          <p className="eyebrow">What I can help with</p>
          <h2 id="services-title">Build the useful thing. Remove the busywork.</h2>
        </header>
        <div className="mw-service-grid">
          {SERVICES.map((service) => (
            <article className="mw-service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>

        <div className="mw-outcomes" aria-labelledby="outcomes-title">
          <div>
            <p className="eyebrow">Useful starting points</p>
            <h3 id="outcomes-title">Start with the outcome, not the technology.</h3>
          </div>
          <div className="mw-outcome-list">
            {OUTCOMES.map(([title, body]) => (
              <div key={title}><strong>{title}</strong><span>{body}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mw-section mw-work" id="work" aria-labelledby="work-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">A few things I have built.</h2>
          <p>Short descriptions first. Deeper technical detail is available only when you want it.</p>
        </header>
        <div className="mw-work-list">
          {WORK.map((project, index) => (
            <article className="mw-work-row" id={project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={project.name}>
              <div className="mw-work-index">0{index + 1}</div>
              <div className="mw-work-main">
                <p className="relationship">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="mw-work-summary">{project.summary}</p>
                <p className="mw-work-role">{project.role}</p>
              </div>
              <nav className="mw-work-links" aria-label={`${project.name} links`}>
                {project.links.map((link) => (
                  <a href={link.href} key={link.href}>{link.label} <span aria-hidden="true">→</span></a>
                ))}
              </nav>
            </article>
          ))}
        </div>
      </section>

      <section className="mw-process" id="process" aria-labelledby="process-title">
        <header>
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">From problem to working result.</h2>
        </header>
        <ol>
          {PROCESS.map(([number, title, body]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mw-section mw-pricing" id="client" aria-labelledby="client-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Founding offers</p>
          <h2 id="client-title">Competitive pricing. Clear finish lines.</h2>
          <p>Start with a free problem map and, where suitable, a small demo. Paid work is scoped before I start, with larger or unusual builds quoted separately.</p>
        </header>
        <div className="mw-price-grid">
          {OFFERS.map((offer) => (
            <article className="mw-price-option" key={offer.name}>
              <p>{offer.name}</p>
              <strong>{offer.price}</strong>
              <span>{offer.body}</span>
              <small>{offer.note}</small>
            </article>
          ))}
        </div>
        <div className="mw-pricing-foot">
          <div><strong>£0 first step</strong><span>Tell me the problem. I will identify a useful starting point and, where suitable, show a small demonstration.</span></div>
          <div><strong>Optional support from £49/month</strong><span>For agreed maintenance or small ongoing improvements. No long contract; third-party usage costs are separate.</span></div>
          <a className="button button-signal" href={CONTACT_LINKS.client}>Get a free problem map + demo</a>
        </div>
      </section>

      <section className="mw-section mw-about" id="about" aria-labelledby="about-title">
        <header className="mw-section-heading">
          <p className="eyebrow">About Maz Works</p>
          <h2 id="about-title">Operations experience behind the build.</h2>
        </header>
        <div className="mw-about-copy">
          <p>I&apos;m Manazir Hussain, founder of Maz Works. My background is in complaints, investigations and operations, where I spent years working through complicated problems and coordinating solutions across teams.</p>
          <p>Today I apply the same approach to websites, automation and software: understand the real problem first, then build the simplest useful system around it.</p>
        </div>
      </section>

      <section className="mw-section mw-background" aria-labelledby="background-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Professional background</p>
          <h2 id="background-title">Experience finding the failure point.</h2>
          <p>Before Maz Works, I worked in complaints and escalations. That experience taught me to investigate properly, communicate clearly, coordinate across teams and improve processes rather than treating symptoms.</p>
        </header>
        <div className="mw-background-grid">
          {BACKGROUND.map((item) => (
            <article key={item.company}>
              <p>{item.company}</p>
              <h3>{item.role}</h3>
              <span>{item.body}</span>
            </article>
          ))}
        </div>
        <div className="mw-skill-strip" aria-label="Transferable professional strengths">
          <span>Problem investigation</span>
          <span>Process improvement</span>
          <span>Client communication</span>
          <span>Operational ownership</span>
          <span>Regulated environments</span>
        </div>
      </section>

      <section className="mw-section mw-guardrails" aria-labelledby="guardrails-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Practical AI</p>
          <h2 id="guardrails-title">AI where it helps. Human control where it matters.</h2>
          <p>Useful automation does not mean handing every decision to a model. Depending on the workflow, I can use validation, limits, approval steps, suppression rules and manual fallback routes so important actions remain controlled.</p>
        </header>
      </section>

      <section className="mw-section mw-faq" aria-labelledby="faq-title">
        <header className="mw-section-heading">
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title">Before you contact me.</h2>
        </header>
        <div className="mw-faq-list">
          {FAQS.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Have something in mind?</p>
          <h2 id="contact-title">Tell me what is slowing you down.</h2>
          <p className="mw-contact-copy">You do not need to know the solution yet. Send the problem, what happens now and what you would rather happen.</p>
        </div>
        <div className="mw-contact-action">
          <a className="button button-dark" href={CONTACT_LINKS.client}>Get a free problem map + demo</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
