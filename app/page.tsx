import Link from 'next/link';

const SELECTED_WORK = [
  {
    name: 'Agent Nudge',
    status: 'Windows MVP',
    summary:
      'A local-first coordination layer that warns coding agents about conflicting edits, changed decisions, and failed approaches before they act.',
    proof:
      'Ships a SQLite ledger, CLI, MCP server, hook bridge, desktop shell, integration tests, and a public two-agent proof with HOLD / REVIEW / CLEAR outcomes.',
    stack: 'TypeScript · SQLite · MCP · Windows desktop',
    repo: 'https://github.com/manazoid4/agent-nudge',
    live: 'https://agent-nudge-bay.vercel.app/#demo',
  },
  {
    name: 'OpenFlowKit',
    status: 'Working web MVP',
    summary:
      'An open-source, provider-neutral voice layer for dictation and text refinement across browser, terminal, IDE, and LLM workflows.',
    proof:
      'Implements browser voice capture, a terminal bridge, typed provider contracts, refinement rules, latency tracking, and test coverage. Native desktop injection is the next milestone.',
    stack: 'React · TypeScript · Web Speech · WebSocket',
    repo: 'https://github.com/manazoid4/openflowkit',
    live: 'https://openflowkit-dusky.vercel.app',
  },
  {
    name: 'Recall',
    status: 'Product prototype',
    summary:
      'A user-owned memory layer that turns authorised saves, notes, links, and thoughts into traceable context for future assistants.',
    proof:
      'Defines a typed memory and profile model, universal capture flow, editable graph, privacy controls, exports, and deterministic demo agents. Persistence and live ingestion remain future work.',
    stack: 'Next.js · TypeScript · Graph data · Privacy controls',
    repo: 'https://github.com/manazoid4/recall',
    live: 'https://saved-brain.vercel.app',
  },
];

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Manazir Hussain, back to top">
          MH
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
          <Link href="/mazos">MAZos</Link>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="intro-title">
        <p className="identity">Manazir Hussain · Product-minded TypeScript engineer</p>
        <h1 id="intro-title">I turn messy operating problems into working software.</h1>
        <p className="hero-copy">
          I design, build, test, and ship full-stack products—usually where data, automation, and human judgment
          meet. My strongest project is <strong>JobFilter</strong>, a live opportunity-intelligence product for UK
          trades.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#jobfilter">See the flagship project</a>
          <a className="button secondary" href="https://github.com/manazoid4" target="_blank" rel="noreferrer">
            GitHub profile
          </a>
        </div>
        <p className="availability">Based in the UK · Open to product engineering, AI systems, and technical founder roles</p>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="section-label">Selected work</p>
          <h2 id="work-title">One flagship, then the supporting systems.</h2>
          <p>Each description below reflects what is implemented in the linked repository—not a future pitch.</p>
        </div>

        <article className="flagship" id="jobfilter">
          <div className="flagship-copy">
            <div className="project-meta">
              <span className="status live">Production</span>
              <span>Flagship case study</span>
            </div>
            <h3>JobFilter</h3>
            <p className="project-lede">
              Opportunity intelligence for UK trades. It ingests public procurement data, normalises and scores
              opportunities, protects paid buyer details, and presents the strongest work for a trade and postcode.
            </p>

            <h4>What I built</h4>
            <ul className="evidence-list">
              <li>A source pipeline for ingestion, normalisation, deduplication, scoring, ranking, and partial failures.</li>
              <li>Server-side free/paid redaction for buyer identity, exact value, deadlines, actions, and score depth.</li>
              <li>Next.js account and API surfaces with Supabase, Stripe, WhatsApp, and provider activation checks.</li>
              <li>Release gates covering security, type safety, postcode rules, privacy, lead quality, hidden routes, and production builds.</li>
            </ul>

            <div className="project-links">
              <a className="button primary" href="https://jobfilter.uk" target="_blank" rel="noreferrer">Open live product</a>
              <a className="text-link" href="https://github.com/manazoid4/JobFilterV1" target="_blank" rel="noreferrer">Read the repository →</a>
            </div>
          </div>

          <figure className="product-shot">
            {/* The image is served from the product repository so this case study stays tied to shipped work. */}
            <img
              src="https://raw.githubusercontent.com/manazoid4/JobFilterV1/main/docs/screenshots/home-desktop.png"
              alt="JobFilter homepage showing its yellow and black opportunity-intelligence interface"
              width="1440"
              height="900"
            />
            <figcaption>Live Next.js product · deployed on Vercel</figcaption>
          </figure>

          <div className="case-notes">
            <div>
              <h4>Engineering focus</h4>
              <p>Next.js · TypeScript · Supabase · Stripe · data ingestion · scoring · privacy gates · GitHub Actions</p>
            </div>
            <div>
              <h4>Current truth</h4>
              <p>
                The product is live, but source coverage still needs proving before a broad launch: a 42-scan audit
                returned no sellable lead. Provider credentials and payment/delivery activation remain explicit
                dependencies rather than hidden claims.
              </p>
            </div>
          </div>
        </article>

        <div className="project-list" aria-label="Supporting projects">
          {SELECTED_WORK.map((project) => (
            <article className="project-row" key={project.name}>
              <div className="project-title">
                <span className="status">{project.status}</span>
                <h3>{project.name}</h3>
                <p className="stack">{project.stack}</p>
              </div>
              <div className="project-detail">
                <p className="project-summary">{project.summary}</p>
                <p>{project.proof}</p>
              </div>
              <div className="row-links">
                <a href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>
                <a href={project.repo} target="_blank" rel="noreferrer">Repository ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="approach" aria-labelledby="approach-title">
        <div className="section-intro">
          <p className="section-label">How I work</p>
          <h2 id="approach-title">Product judgment backed by release evidence.</h2>
        </div>
        <div className="capability-list">
          <div>
            <h3>Product engineering</h3>
            <p>Translate an unclear operating problem into a focused user journey, typed data model, APIs, and a deployable interface.</p>
          </div>
          <div>
            <h3>Data and automation</h3>
            <p>Build ingestion and scoring pipelines, deterministic agent tooling, provider integrations, and privacy-aware access boundaries.</p>
          </div>
          <div>
            <h3>Delivery discipline</h3>
            <p>Use regression tests, dependency audits, protected branches, CI, deployment checks, and honest limitation notes as part of the product.</p>
          </div>
        </div>

        <aside className="method-note" aria-labelledby="mazos-note-title">
          <div>
            <p className="section-label">Operator tooling</p>
            <h3 id="mazos-note-title">MAZos is the method, not the headline.</h3>
          </div>
          <p>
            I built a local-first loop cockpit to gate agent tasks, run allowlisted verification commands, and record
            receipts. It supports the portfolio; the shipped products remain the proof.
          </p>
          <Link className="text-link" href="/mazos">Read the MAZos case study →</Link>
        </aside>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <p className="section-label">Contact</p>
        <h2 id="contact-title">Let&rsquo;s talk about the system you need to make real.</h2>
        <a className="contact-email" href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
        <p>Code and detailed implementation evidence are available through the repositories above.</p>
      </section>

      <footer>
        <span>Manazir Hussain © 2026</span>
        <a href="https://github.com/manazoid4" target="_blank" rel="noreferrer">github.com/manazoid4</a>
      </footer>
    </main>
  );
}
