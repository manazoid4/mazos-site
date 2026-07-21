import Link from 'next/link';

const SELECTED_WORK = [
  {
    name: 'JobFilter',
    status: 'Source repair · validation',
    summary:
      'An opportunity-intelligence product for UK trade businesses, currently being repaired around the post-2025 public-procurement data path.',
    proof:
      'The implemented system covers ingestion, normalisation, scoring, server-side access controls, regression gates, Supabase, Stripe, and delivery adapters. Contracts Finder coverage did not yield sellable leads, so migration to the current Find a Tender data path and renewed relevance testing come before launch claims.',
    stack: 'Next.js · TypeScript · public procurement data · Supabase',
    repo: 'https://github.com/manazoid4/JobFilterV1',
    live: 'https://jobfilter.uk',
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
        <a className="wordmark" href="#main-content" aria-label="Manazir Hussain, back to top">
          MH
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
          <Link href="/mazos">MAZos</Link>
        </nav>
      </header>

      <section className="hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <p className="identity">Manazir Hussain · Operational B2B and applied-AI product engineer</p>
        <h1 id="intro-title">I turn messy workflows into bounded, verifiable software.</h1>
        <p className="hero-copy">
          I design and ship full-stack TypeScript systems where data, automation, and human judgment meet. My
          clearest current technical evidence is <strong>Agent Nudge</strong>: a released, local-first coordination
          layer for coding agents.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#agent-nudge">See the technical flagship</a>
          <a
            className="button secondary"
            href="https://github.com/manazoid4/agent-nudge#live-product-proof"
            target="_blank"
            rel="noreferrer"
          >
            Inspect release evidence
          </a>
        </div>
        <p className="availability">
          Based in the UK · Open to product engineering and applied-AI work in operational B2B teams
        </p>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="section-label">Selected work</p>
          <h2 id="work-title">Technical evidence first, with product status kept explicit.</h2>
          <p>Each description separates what works now from what remains unproven.</p>
        </div>

        <article className="flagship" id="agent-nudge">
          <div className="flagship-copy">
            <div className="project-meta">
              <span className="status live">Released Windows MVP</span>
              <span>Current technical flagship</span>
            </div>
            <h3>Agent Nudge</h3>
            <p className="project-lede">
              A local-first preflight and receipt layer that helps coding agents surface overlapping work, changed
              decisions, and failed approaches before another agent acts on stale context.
            </p>

            <h4>What I built</h4>
            <ul className="evidence-list">
              <li>A TypeScript CLI, localhost daemon, MCP server, provider hooks, and sandboxed Electron shell.</li>
              <li>A project-scoped SQLite ledger for agent presence, expiring path claims, facts, cursors, and receipts.</li>
              <li>Deterministic HOLD / REVIEW / CLEAR decisions with acknowledgement tracked separately from delivery.</li>
              <li>Unit, integration, end-to-end, packaging, security, and release-smoke checks for the Windows MVP.</li>
            </ul>

            <div className="project-links">
              <a className="button primary" href="https://agent-nudge-bay.vercel.app/#demo" target="_blank" rel="noreferrer">
                Try the evidence demo
              </a>
              <a className="text-link" href="https://github.com/manazoid4/agent-nudge" target="_blank" rel="noreferrer">
                Inspect code and release checks →
              </a>
            </div>
          </div>

          <figure className="product-shot">
            <img
              src="/agent-nudge-demo.webp"
              alt="Agent Nudge interactive demo showing two coding agents and a conflict review outcome"
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Local-first runtime · public fixture demo · released Windows MVP</figcaption>
          </figure>

          <div className="case-notes">
            <div>
              <h4>Engineering focus</h4>
              <p>TypeScript · SQLite · MCP · Electron · provider hooks · deterministic coordination · release checks</p>
            </div>
            <div>
              <h4>Current truth</h4>
              <p>
                Version 0.4 proves the coordination loop and ships a Windows package. It does not infer hidden model
                state, guarantee coverage of every provider action, or yet provide evidence of external adoption.
              </p>
            </div>
          </div>
        </article>

        <div className="project-list">
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
                <a href={project.live} target="_blank" rel="noreferrer">Open current build ↗</a>
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
            <p>Build ingestion and scoring pipelines, applied-AI workflows, deterministic agent tooling, and privacy-aware access boundaries.</p>
          </div>
          <div>
            <h3>Delivery discipline</h3>
            <p>Use regression tests, dependency audits, CI checks, deployment checks, and honest limitation notes as part of the product.</p>
          </div>
        </div>

        <aside className="method-note" aria-labelledby="mazos-note-title">
          <div>
            <p className="section-label">Operator tooling</p>
            <h3 id="mazos-note-title">MAZos is supporting method evidence, not the headline.</h3>
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
        <h2 id="contact-title">Need an operational workflow turned into reliable software?</h2>
        <a className="contact-email" href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
        <p>
          Start with the Agent Nudge repository for release evidence, or use the project links above to inspect the
          implementation behind each claim.
        </p>
      </section>

      <footer>
        <span>Manazir Hussain © 2026</span>
        <a href="https://github.com/manazoid4" target="_blank" rel="noreferrer">github.com/manazoid4</a>
      </footer>
    </main>
  );
}
