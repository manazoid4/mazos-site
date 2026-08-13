import { ProjectImage, ProjectLinks } from './project-elements';
import { FEATURED_PROJECTS, FLAGSHIP_PROJECTS } from './projects';
import { CONTACT_LINKS } from './site';
import { SiteFooter, SiteHeader } from './site-chrome';

const BUILD_AREAS = [
  ['Build', 'Useful products and focused software shaped around one real job.'],
  ['Automate', 'Small systems that remove repetitive handoffs, copy-paste work, and fragile admin.'],
  ['Improve', 'Repair or extend an existing workflow with clearer data, interfaces, and applied AI.'],
];

const PROCESS = [
  ['01', 'Problem', 'Start with the awkward workflow or missed opportunity.'],
  ['02', 'Demo', 'Make one bounded solution tangible before a larger commitment.'],
  ['03', 'Build', 'Agree the scope, payment points, ownership, and exclusions.'],
  ['04', 'Proof', 'Present the working result and verify the path that matters.'],
];

export default function Page() {
  return (
    <main>
      <SiteHeader />

      <section className="hero hero-quiet" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="hero-copy-block">
          <p className="eyebrow">Independent software builder / Birmingham, UK</p>
          <h1 id="intro-title">Useful software, AI tools and automation around real problems.</h1>
          <p className="hero-copy">I&rsquo;m Manazir Hussain. Maz Works is where I show the products, client systems and practical experiments I have built—and the limits still left to prove.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#work">View selected work</a>
            <a className="text-link" href="#client">Show me the problem <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <aside className="hero-proof" aria-label="Current proof">
          <span>Four inspectable builds</span>
          <span>One commissioned client</span>
          <span>One named builder</span>
        </aside>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <header className="section-heading">
          <p className="eyebrow">Selected work / Products and client systems</p>
          <h2 id="work-title">The work carries the claim.</h2>
          <p>Two flagships receive the space. Every public project keeps a status, inspectable evidence, and a limitation.</p>
        </header>

        <div className="flagship-list">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <article className="flagship flagship-quiet" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
              <header className="project-heading">
                <div>
                  <p className="relationship">{project.relationship}</p>
                  <p className="status">{project.status}</p>
                </div>
                <div>
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3 id={`${project.id}-title`}>{project.name}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>
              </header>
              <ProjectImage project={project} eager={index === 0} />
              <div className="project-brief">
                <div><h4>Problem</h4><p>{project.problem}</p></div>
                <div><h4>Judgment</h4><p>{project.insight}</p></div>
                <div><h4>Proof</h4><p>{project.proof}</p><ProjectLinks project={project} includeCaseStudy /></div>
              </div>
              <footer className="limitation limitation-quiet"><strong>Current limitation</strong><span>{project.limitation}</span></footer>
            </article>
          ))}
        </div>

        <div className="selected-index" aria-labelledby="selected-title">
          <header><p className="eyebrow">Selected work / More evidence</p><h3 id="selected-title">Smaller builds, kept in proportion.</h3></header>
          <div className="selected-list">
            {FEATURED_PROJECTS.map((project, index) => (
              <article className="selected-row" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
                <span className="project-number">0{index + 3}</span>
                <div className="selected-title"><p className="relationship">{project.relationship}</p><h3 id={`${project.id}-title`}>{project.name}</h3></div>
                <div className="selected-copy"><p>{project.summary}</p><small><strong>{project.status}.</strong> <span className="limitation-label">Current limitation:</span> {project.limitation}</small></div>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="build-process" aria-labelledby="build-title">
        <div className="build-column">
          <p className="eyebrow">What I build</p>
          <h2 id="build-title">Build. Automate. Improve.</h2>
          <div className="build-list">{BUILD_AREAS.map(([title, body]) => <div key={title}><h3>{title}</h3><p>{body}</p></div>)}</div>
        </div>
        <div className="process-column">
          <p className="eyebrow">How I work</p>
          <ol>{PROCESS.map(([number, title, body]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{body}</p></li>)}</ol>
        </div>
      </section>

      <section className="client client-quiet" id="client" aria-labelledby="client-title">
        <div className="client-intro">
          <p className="eyebrow">For clients / A bounded first step</p>
          <h2 id="client-title">Show me the problem. I&rsquo;ll build a small tailored demonstration first.</h2>
          <p>The free demo makes one solution tangible. It is not production delivery or days of unpaid bespoke work. You keep ownership of the agreed implementation and receive a clear handoff.</p>
          <a className="button button-signal" href={CONTACT_LINKS.client}>Request a free demo</a>
        </div>
        <div className="offer-frame offer-quiet">
          <div className="offer-title"><span>Founding implementation</span><strong>£150 total</strong></div>
          <div className="payment-row"><span>01</span><p><strong>£75 upfront</strong>After the demo and written implementation scope are agreed.</p></div>
          <div className="payment-row"><span>02</span><p><strong>£75 after execution</strong>When the agreed implementation is complete and presented.</p></div>
          <div className="scope-note"><strong>Quoted separately</strong><p>Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds.</p></div>
        </div>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div><p className="eyebrow">About / Manazir Hussain</p><h2 id="about-title">One builder, accountable from problem to proof.</h2></div>
        <div className="about-copy">
          <p>I&rsquo;m a UK-based software builder drawn to messy processes, scattered information, and small problems that quietly waste time. Maz Works gives that work one home without inventing a studio team behind it.</p>
          <p>I work across product thinking, interfaces, data, backend systems, AI integration, testing, and deployment. I prefer the smallest system that can prove the idea—and I state what it cannot prove yet.</p>
        </div>
      </section>

      <section className="contact-block" id="contact" aria-labelledby="contact-title">
        <div><p className="eyebrow">Start with the real situation</p><h2 id="contact-title">What is slowing you down?</h2></div>
        <div className="contact-routes">
          <a href={CONTACT_LINKS.hire}><span>Employment</span><strong>Hire me</strong><em>Role and team context →</em></a>
          <a href={CONTACT_LINKS.client}><span>Client</span><strong>Get a free demo</strong><em>Problem and current workflow →</em></a>
          <a href={CONTACT_LINKS.collaborate}><span>Partnership</span><strong>Collaborate</strong><em>What we could build →</em></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}