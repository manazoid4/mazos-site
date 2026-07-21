const ROLE_EVIDENCE = [
  {
    capability: 'Agent and tool workflows',
    evidence: 'Agent Nudge: MCP server, provider hooks, shared state, and deterministic pre-action decisions.',
    href: '#agent-nudge',
  },
  {
    capability: 'Data pipelines',
    evidence: 'JobFilter: official APIs, OCDS normalisation, amendment merging, deduplication, and CPV filtering.',
    href: '#jobfilter',
  },
  {
    capability: 'Production reliability',
    evidence: 'Abortable requests, explicit failure states, regression fixtures, CI gates, and packaged releases.',
    href: '#evidence',
  },
  {
    capability: 'Full-stack delivery',
    evidence: 'TypeScript, React, Next.js, Node.js, SQLite, Supabase, Electron, REST APIs, and Vercel.',
    href: '#work',
  },
];

const AGENT_NUDGE_BUILD = [
  'TypeScript CLI, localhost daemon, MCP server, provider hooks, and a sandboxed Electron shell.',
  'Project-scoped SQLite state for agent presence, expiring path claims, facts, cursors, and receipts.',
  'Deterministic HOLD / REVIEW / CLEAR decisions with acknowledgement tracked separately from delivery.',
  'Unit, integration, end-to-end, packaging, security, and release-smoke checks for the Windows MVP.',
];

const JOBFILTER_BUILD = [
  'Bounded Find a Tender OCDS retrieval with safe pagination, retries, cancellation, and source health.',
  'Notice normalisation, latest-amendment merging, deduplication, deadline validation, and ranked output.',
  'CPV-first trade matching that rejects medical or IT maintenance notices when authoritative classifications conflict with building work.',
  'Fail-closed radius checks: a buyer headquarters postcode is never treated as proof of job delivery.',
];

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <a className="nameplate" href="#main-content" aria-label="Manazir Hussain, back to top">
          Manazir Hussain
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Projects</a>
          <a href="#evidence">Evidence</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/manazoid4">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="hero-statement">
          <p className="identity">UK-based · Seeking junior applied-AI engineering roles</p>
          <h1 id="intro-title">I build dependable software around AI agents and data.</h1>
          <p className="hero-copy">
            I turn real workflows into agent infrastructure, data pipelines, and full-stack products—with tool
            integrations, explicit failure handling, and tests that make the result inspectable.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#agent-nudge">See the agent system</a>
            <a className="button secondary" href="https://github.com/manazoid4">
              Inspect my GitHub
            </a>
          </div>
        </div>

        <aside className="hero-dossier" aria-label="Current engineering evidence">
          <p>Current public proof</p>
          <ul>
            <li><span>Agents</span>MCP, hooks, shared context, deterministic controls</li>
            <li><span>Data</span>Official APIs, normalisation, scoring, provenance</li>
            <li><span>Delivery</span>CI, regression gates, releases, live deployments</li>
            <li><span>Stack</span>TypeScript, Next.js, Node.js, SQLite, Supabase</li>
          </ul>
        </aside>
      </section>

      <section className="role-fit" aria-labelledby="role-fit-title">
        <div className="section-intro compact">
          <h2 id="role-fit-title">The engineering behind useful AI.</h2>
          <p>
            Agents still need trustworthy context, clean data, safe integrations, verification, recovery paths,
            and decisions a person can inspect.
          </p>
        </div>
        <div className="fit-list">
          {ROLE_EVIDENCE.map((item) => (
            <a href={item.href} key={item.capability}>
              <strong>{item.capability}</strong>
              <span>{item.evidence}</span>
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="section-label">Selected engineering work</p>
          <h2 id="work-title">Three systems. Agent, data, and integration evidence.</h2>
          <p>Agent coordination, public-data qualification, and voice capture/refinement—each with its boundary stated plainly.</p>
        </div>

        <article className="case-study agent-case" id="agent-nudge" aria-labelledby="agent-title">
          <header className="case-heading">
            <div>
              <p className="case-index">Agent infrastructure</p>
              <h3 id="agent-title">Agent Nudge</h3>
            </div>
            <p>
              A released Windows application and local service that warns coding agents before they act on stale
              decisions or collide on the same files.
            </p>
          </header>

          <figure className="artifact artifact-dark">
            <img
              src="/agent-nudge-demo.webp"
              alt="Agent Nudge scenario demo showing two coding agents and a conflict review outcome"
              width="1440"
              height="900"
              loading="eager"
              decoding="async"
            />
            <figcaption>Public fixture demo · desktop runtime stays local · released Windows MVP</figcaption>
          </figure>

          <div className="case-body">
            <div className="case-problem">
              <h4>The problem</h4>
              <p>
                Parallel agents move quickly while their context quietly diverges. A changed decision or overlapping
                edit can arrive after another agent has already planned from stale information.
              </p>
              <h4>The decision</h4>
              <p>
                Keep the verdict deterministic. Agent Nudge routes relevant project facts into a preflight decision;
                it does not pretend to read hidden model state or replace human approval.
              </p>
            </div>
            <div>
              <h4>What I built</h4>
              <ul className="evidence-list">
                {AGENT_NUDGE_BUILD.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <footer className="case-footer">
            <div>
              <strong>Current boundary</strong>
              <span>It coordinates model-driven agents but does not call a model itself; provider hooks can still be bypassed.</span>
            </div>
            <div className="project-links">
              <a href="https://agent-nudge-bay.vercel.app/#demo">Try the scenario demo</a>
              <a href="https://github.com/manazoid4/agent-nudge">Source and release checks</a>
            </div>
          </footer>
        </article>

        <article className="case-study jobfilter-case" id="jobfilter" aria-labelledby="jobfilter-title">
          <header className="case-heading">
            <div>
              <p className="case-index">Data and integration</p>
              <h3 id="jobfilter-title">JobFilter</h3>
            </div>
            <p>
              A full-stack pipeline that turns inconsistent UK procurement notices into ranked opportunities for
              small construction and maintenance teams.
            </p>
          </header>

          <figure className="artifact">
            <picture>
              <source media="(max-width: 680px)" srcSet="/jobfilter-scan-result-mobile.webp" />
              <img
                src="/jobfilter-scan-result.webp"
                alt="JobFilter reporting no verified local matches for a B14 building search after checking configured sources"
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption>Repaired branch · B14 building scan · honest zero when locality is unproven · 21 July 2026</figcaption>
          </figure>

          <div className="case-body">
            <div className="case-problem">
              <h4>The failure I found</h4>
              <p>
                The original current-notice source was stale, keyword matching could admit convincing false
                positives, and buyer headquarters could masquerade as the delivery location.
              </p>
              <h4>The result</h4>
              <p>
                In a 21 July 2026 smoke test, Find a Tender returned 84 current notices: five authoritative electrical
                matches and thirteen building matches. A B14 radius search returned an honest zero when locality
                could not be proven.
              </p>
            </div>
            <div>
              <h4>What I changed</h4>
              <ul className="evidence-list">
                {JOBFILTER_BUILD.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <footer className="case-footer">
            <div>
              <strong>Current boundary</strong>
              <span>The migration works; local coverage, buyer demand, and willingness to pay still need SME validation.</span>
            </div>
            <div className="project-links">
              <a href="https://github.com/manazoid4/JobFilterV1/pull/383">Review the Find a Tender migration</a>
              <a href="https://jobfilter.uk/find-jobs">Open the pre-migration production UI</a>
              <a href="https://github.com/manazoid4/JobFilterV1">View JobFilter code</a>
            </div>
          </footer>
        </article>

        <article className="supporting-project" aria-labelledby="openflow-title">
          <div>
            <p className="case-index">Provider integration</p>
            <h3 id="openflow-title">OpenFlowKit</h3>
          </div>
          <div>
            <p className="supporting-lede">
              A browser voice-capture and deterministic text-refinement MVP, with typed boundaries for future local
              and hosted AI providers.
            </p>
            <p>
              The working web MVP includes browser speech capture, a WebSocket terminal bridge, typed transcription
              and refinement contracts, deterministic cleanup rules, latency tracking, and tests. Native desktop
              injection and production provider routing remain future milestones.
            </p>
          </div>
          <div className="project-links vertical">
            <a href="https://openflowkit-dusky.vercel.app">Try OpenFlowKit</a>
            <a href="https://github.com/manazoid4/openflowkit">View OpenFlowKit code</a>
          </div>
        </article>
      </section>

      <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
        <div className="section-intro">
          <p className="section-label">What I can contribute</p>
          <h2 id="evidence-title">Software engineering around the model.</h2>
          <p>Every capability below points to something implemented—not a keyword added for a recruiter.</p>
        </div>
        <dl className="evidence-matrix">
          <div>
            <dt>Agent workflows</dt>
            <dd>MCP tools, provider hooks, scoped context, shared state, and targeted pre-action decisions.</dd>
          </div>
          <div>
            <dt>Data preparation</dt>
            <dd>Schema mapping, source provenance, classification, normalisation, deduplication, and invalid-record rejection.</dd>
          </div>
          <div>
            <dt>System integration</dt>
            <dd>REST and OCDS APIs, SQLite, Supabase, Stripe, WebSockets, Electron, and deployment boundaries.</dd>
          </div>
          <div>
            <dt>Software verification and reliability</dt>
            <dd>Deterministic fixtures, regression suites, failure taxonomy, timeouts, retries, CI, packaging, and smoke checks.</dd>
          </div>
          <div>
            <dt>Technical communication</dt>
            <dd>Plain-English decisions, reproducible demos, architecture notes, source-linked claims, and explicit limitations.</dd>
          </div>
        </dl>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div>
          <p className="section-label">About</p>
          <h2 id="about-title">Curious about the system. Practical about the outcome.</h2>
        </div>
        <div className="about-copy">
          <p>
            I am an early-career engineer interested in applied AI: systems where models, structured data, and
            software integrations have to work together outside a notebook.
          </p>
          <p>
            My strongest public evidence today is product and systems engineering around AI in TypeScript. I am
            looking for a collaborative junior role where I can contribute that foundation while deepening Python,
            model evaluation, data science, and cloud operations with experienced engineers.
          </p>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <p className="section-label">Get in touch</p>
        <h2 id="contact-title">Looking for an early-career engineer who can bridge agents, data, and dependable software?</h2>
        <p>I am open to junior AI engineer, applied-AI engineer, and AI product-engineering roles across the UK.</p>
        <div className="contact-actions">
          <a className="button light" href="mailto:manazoid4@gmail.com">Email Manazir</a>
          <a className="button outline-light" href="https://github.com/manazoid4">View GitHub</a>
        </div>
      </section>

      <footer className="site-footer">
        <span>Manazir Hussain © 2026</span>
        <span>UK-based · Applied AI and product engineering</span>
        <a href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
      </footer>
    </main>
  );
}
