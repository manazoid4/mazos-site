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

const WORK = [
  {
    name: 'JobFilter',
    type: 'Product',
    summary: 'Find relevant UK public-sector opportunities without searching multiple procurement sites manually.',
    role: 'Built the product, matching system, interface and deployment.',
    links: [
      { label: 'View case study', href: '/work/jobfilter' },
      { label: 'Try it', href: 'https://jobfilter.uk/find-jobs' },
    ],
  },
  {
    name: 'Scrap Finance Partners',
    type: 'Client work',
    summary: 'A specialist website and enquiry system for a finance consultancy serving the scrap and recycling industry.',
    role: 'Handled positioning, design, development, enquiry flow and launch.',
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
  ['02', 'See a free demo', 'For suitable projects, I make a small demonstration so you can see the direction before committing.'],
  ['03', 'Agree the build', 'We agree what is being delivered, the price and the important requirements.'],
  ['04', 'I build and hand it over', 'I design, implement, test and deploy the agreed solution.'],
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
            I help small businesses and individuals turn awkward manual processes and ideas into simple working software — from design and development to automation, AI integrations and deployment.
          </p>
          <div className="mw-actions">
            <a className="button button-signal" href={CONTACT_LINKS.client}>Get a free demo</a>
            <a className="text-link" href="#work">See my work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="mw-capabilities" aria-label="Core capabilities">
          <span>Web development</span>
          <span>Automation</span>
          <span>AI integration</span>
          <span>Design</span>
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

      <section className="mw-offer" id="client" aria-labelledby="client-title">
        <div className="mw-offer-copy">
          <p className="eyebrow">Founding client offer</p>
          <h2 id="client-title">Start small. See it working first.</h2>
          <p>For suitable projects, I will create a small tailored demonstration before you commit to the full build.</p>
          <a className="button button-signal" href={CONTACT_LINKS.client}>Get a free demo</a>
        </div>
        <div className="mw-price-card">
          <p>Founding implementation</p>
          <strong>£150 total</strong>
          <div><b>£75 to start</b><span>After the demo and agreed scope.</span></div>
          <div><b>£75 on completion</b><span>When the agreed work is finished and presented.</span></div>
          <small>Larger builds, ongoing work or additional features are quoted separately.</small>
        </div>
      </section>

      <section className="mw-section mw-about" id="about" aria-labelledby="about-title">
        <header className="mw-section-heading">
          <p className="eyebrow">About Maz Works</p>
          <h2 id="about-title">One person from idea to deployment.</h2>
        </header>
        <div className="mw-about-copy">
          <p>I&apos;m Manazir Hussain, founder of Maz Works. I build practical websites, automations and AI-powered tools from idea through to deployment.</p>
          <p>I handle the research, design, development, integrations and implementation myself, so clients deal directly with the person building the work.</p>
        </div>
      </section>

      <section className="mw-contact" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Have something in mind?</p>
          <h2 id="contact-title">Tell me what is slowing you down.</h2>
        </div>
        <div className="mw-contact-action">
          <a className="button button-dark" href={CONTACT_LINKS.client}>Get a free demo</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
