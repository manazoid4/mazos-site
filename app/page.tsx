import { FEATURED_PROJECTS, FLAGSHIP_PROJECTS, type Project } from './projects';

const BUILD_AREAS = [
  ['Workflow automation', 'Replace repetitive handoffs, copy-paste work, and fragile admin with a small dependable system.'],
  ['AI tools with boundaries', 'Use models where judgment helps, and deterministic rules where correctness matters more.'],
  ['Opportunity and data tools', 'Turn scattered feeds or records into a ranked answer someone can act on.'],
  ['Websites that do a job', 'Explain a specialist offer, establish trust, and move the right person toward an enquiry.'],
];

const PROCESS = [
  ['01', 'Problem', 'Start with the awkward workflow, missed opportunity, or bottleneck — not a technology shopping list.'],
  ['02', 'Demo', 'Build one bounded, tailored demonstration so the idea can be judged before a larger commitment.'],
  ['03', 'Build', 'Agree the implementation scope, payment points, and what explicitly sits outside the work.'],
  ['04', 'Proof', 'Present the working result, verify the path that matters, and capture reusable lessons with permission.'],
];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <nav className="project-links" aria-label={`${project.name} evidence links`}>
      {project.links.map((link) => (
        <a href={link.href} key={link.href}>{link.label}<span aria-hidden="true"> ↗</span></a>
      ))}
    </nav>
  );
}

function ProjectImage({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (!project.image) return null;
  return (
    <figure className="project-frame">
      <picture>
        {project.image.mobileSrc ? <source media="(max-width: 680px)" srcSet={project.image.mobileSrc} /> : null}
        <img src={project.image.src} alt={project.image.alt} width="1440" height="900" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </picture>
      <figcaption>{project.image.caption}</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#main-content" aria-label="Maz Works, back to top">
          <span className="brand-mark">MW</span>
          <span><strong>Maz Works</strong><small>by Manazir Hussain</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#services">What I build</a><a href="#about">About</a>
          <a href="#client">Client</a><a href="#contact">Contact</a><a href="https://github.com/manazoid4">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="hero-copy-block">
          <p className="eyebrow">Independent software builder / Birmingham, UK</p>
          <h1 id="intro-title">Useful software, AI tools and automation around real problems.</h1>
          <p className="hero-copy">Maz Works is the umbrella for what I build as Manazir Hussain: shipped products, client systems, practical experiments, and the thinking behind them.</p>
          <div className="actions"><a className="button button-dark" href="#work">See selected work</a><a className="button button-signal" href="#client">Show me the problem</a></div>
        </div>
        <aside className="proof-ledger" aria-label="Current proof">
          <div className="ledger-head"><span>Proof / 2026</span><span className="live-mark">Built and shipped</span></div>
          <ol>
            <li><span>01</span><strong>Live product</strong><small>JobFilter</small></li>
            <li><span>02</span><strong>Commissioned client work</strong><small>Scrap Finance Partners</small></li>
            <li><span>03</span><strong>Windows release</strong><small>Agent Nudge</small></li>
            <li><span>04</span><strong>Open-source MVP</strong><small>OpenFlowKit</small></li>
          </ol>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Maz Works principles">
        <p><strong>Four shipped builds</strong><span>Product, client, desktop, and open source.</span></p>
        <p><strong>Evidence over claims</strong><span>Live work, code, releases, and stated limits.</span></p>
        <p><strong>One person, clearly</strong><span>Maz Works is Manazir Hussain — not a pretend agency.</span></p>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <header className="section-heading">
          <p className="eyebrow">Selected work / Flagships</p><h2 id="work-title">Real problems, framed by proof.</h2>
          <p>Each project is presented by what changed, how it works, what can be inspected, and what remains unproven.</p>
        </header>
        <div className="flagship-list">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <article className="flagship" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <header className="project-heading">
                <div><p className="eyebrow">{project.eyebrow}</p><p className="status">{project.status}</p></div>
                <div><h3 id={`${project.id}-title`}>{project.name}</h3><p className="project-summary">{project.summary}</p></div>
              </header>
              <ProjectImage project={project} eager={index === 0} />
              <div className="story-grid">
                <div><h4>Problem</h4><p>{project.problem}</p></div><div><h4>Insight</h4><p>{project.insight}</p></div>
                <div className="built-cell"><h4>What I built</h4><ul>{project.built.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><h4>Proof</h4><p>{project.proof}</p><ProjectLinks project={project} /></div>
              </div>
              <footer className="limitation"><strong>Current limitation</strong><span>{project.limitation}</span></footer>
            </article>
          ))}
        </div>
        <div className="featured-heading"><p className="eyebrow">Selected work / Featured</p><h3>Smaller builds, still inspectable.</h3></div>
        <div className="featured-grid">
          {FEATURED_PROJECTS.map((project) => (
            <article className="featured" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <header><p className="eyebrow">{project.eyebrow}</p><p className="status">{project.status}</p><h3 id={`${project.id}-title`}>{project.name}</h3><p className="project-summary">{project.summary}</p></header>
              <ProjectImage project={project} />
              <div className="featured-copy"><h4>Build</h4><ul>{project.built.map((item) => <li key={item}>{item}</li>)}</ul><h4>Current limitation</h4><p>{project.limitation}</p></div>
              <ProjectLinks project={project} />
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="services" aria-labelledby="services-title">
        <header className="section-heading compact"><p className="eyebrow">What I build</p><h2 id="services-title">Systems that remove friction.</h2></header>
        <div className="service-list">{BUILD_AREAS.map(([title, body], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
      </section>

      <section className="process" aria-labelledby="process-title">
        <header><p className="eyebrow">Maz Works process</p><h2 id="process-title">Problem → Demo → Build → Proof</h2></header>
        <ol>{PROCESS.map(([number, title, body]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></li>)}</ol>
      </section>

      <section className="client" id="client" aria-labelledby="client-title">
        <div className="client-intro">
          <p className="eyebrow">For clients / Founding offer</p><h2 id="client-title">Show me the problem. I&rsquo;ll build a small tailored demonstration first.</h2>
          <p>The free demo is one bounded way to make the solution tangible. It is not production delivery and it should not turn into days of unpaid bespoke work.</p>
          <a className="button button-signal" href="mailto:manazoid4@gmail.com?subject=Free%20tailored%20demo&body=Hi%20Manazir%2C%0A%0AHere%27s%20the%20problem%3A%20%0AWhat%20happens%20today%3A%20%0AWho%20does%20it%3A%20%0AWhat%20a%20better%20outcome%20looks%20like%3A%20%0A">Request a free demo</a>
        </div>
        <div className="offer-frame">
          <div className="offer-title"><span>Founding implementation</span><strong>£150 total</strong></div>
          <div className="payment-row"><span>01</span><p><strong>£75 upfront</strong>After the demo and a written scope agreement.</p></div>
          <div className="payment-row"><span>02</span><p><strong>£75 after execution</strong>When the agreed implementation is complete and presented.</p></div>
          <div className="scope-note"><strong>Separate scope</strong><p>Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds are quoted separately.</p></div>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div><p className="eyebrow">About / Manazir Hussain</p><h2 id="about-title">Builder first. Technology second.</h2></div>
        <div className="about-copy"><p>I&rsquo;m a UK-based software builder drawn to messy processes, scattered information, and small problems that quietly waste time. Maz Works gives that work one home without pretending it came from a large studio.</p><p>I work across product thinking, interface design, data, backend systems, AI integration, testing, and deployment. The common thread is choosing the smallest system that can prove the idea, then making its limits visible.</p></div>
      </section>

      <section className="pathways" id="contact" aria-labelledby="contact-title">
        <header><p className="eyebrow">Work with me</p><h2 id="contact-title">Three clear ways in.</h2></header>
        <div className="pathway-grid">
          <a href="mailto:manazoid4@gmail.com?subject=Role%20enquiry&body=Hi%20Manazir%2C%0A%0ARole%3A%20%0ACompany%3A%20%0ALocation%2Fremote%3A%20%0A"><span>01 / Employment</span><strong>Hire me</strong><p>For software, product, automation, or applied-AI roles where shipping judgment matters.</p><em>Start a role conversation →</em></a>
          <a href="mailto:manazoid4@gmail.com?subject=Free%20tailored%20demo&body=Hi%20Manazir%2C%0A%0AThe%20problem%20is%3A%20%0AWho%20it%20affects%3A%20%0AWhat%20happens%20today%3A%20%0A"><span>02 / Client</span><strong>Get a free demo</strong><p>Bring a real workflow or business problem. I&rsquo;ll look for one bounded way to demonstrate a solution.</p><em>Show me the problem →</em></a>
          <a href="mailto:manazoid4@gmail.com?subject=Collaboration&body=Hi%20Manazir%2C%0A%0AWhat%20we%27re%20building%3A%20%0AWhat%20I%27m%20looking%20for%3A%20%0A"><span>03 / Partnership</span><strong>Collaborate</strong><p>For useful products, experiments, or technical work that becomes stronger with another perspective.</p><em>Explore a collaboration →</em></a>
        </div>
      </section>

      <footer className="site-footer">
        <div><strong>Maz Works</strong><span>Useful systems around real problems.</span></div>
        <div><span>Manazir Hussain / Birmingham, UK</span><a href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a></div>
        <div><a href="https://github.com/manazoid4">GitHub ↗</a><span>© 2026</span></div>
      </footer>
    </main>
  );
}
