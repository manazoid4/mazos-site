const BUILT_INDEX = [
  {
    name: 'JobFilter',
    summary: 'Live tool that scans UK public tenders so small trade firms don’t have to.',
    href: '#jobfilter',
  },
  {
    name: 'Scrap Finance Partners',
    summary: 'A contract build: a full consultancy website with a working lead pipeline, designed and shipped end-to-end.',
    href: '#scrap-finance-partners',
  },
  {
    name: 'Agent Nudge',
    summary: 'Windows app that stops AI coding agents colliding or acting on stale information.',
    href: '#agent-nudge',
  },
  {
    name: 'OpenFlowKit',
    summary: 'Browser voice-to-text tool with rule-based cleanup. Open source, still growing.',
    href: '#openflowkit',
  },
];

const HELP_CATEGORIES = [
  {
    title: 'Repetitive-work automation',
    body: 'Scripts and small apps that take over the manual, boring parts of a job.',
    href: '#agent-nudge',
  },
  {
    title: 'Business websites and lead generation',
    body: 'Sites that explain what you do, look credible, and capture enquiries automatically.',
    href: '#scrap-finance-partners',
  },
  {
    title: 'Opportunity and data-matching tools',
    body: 'Pulling scattered public data into one ranked, useful list instead of a manual search.',
    href: '#jobfilter',
  },
  {
    title: 'AI-assisted workflows, with limits stated',
    body: 'Using AI where it earns its place, with plain fallbacks for when it doesn’t.',
    href: '#openflowkit',
  },
];

const JOBFILTER_BUILD = [
  'Retrieval from the official Find a Tender OCDS feed, with pagination, retries, and cancellation.',
  'Notice normalisation, latest-amendment merging, and deduplication across releases.',
  'CPV-first trade matching that rejects medical or IT-maintenance notices misfiled as building work.',
  'Fail-closed location checks: a buyer’s head-office postcode is never treated as proof a job is local.',
];

const AGENT_NUDGE_BUILD = [
  'A local Windows app, a background service, and hooks into Claude Code, Codex, and OpenCode.',
  'A project-scoped record of what each agent is doing, so a second agent can check before it acts.',
  'Three plain outcomes per check: continue, review first, or stop — never a silent guess.',
  'Packaged Windows installer and portable build, with checksums, for the current MVP release.',
];

const SCRAP_FINANCE_BUILD = [
  'A full page set: services, pricing, health-check offer, case studies, and a founder page.',
  'A working enquiry endpoint that emails new leads through Resend, with spam honeypot protection.',
  'A restrained, paper-and-serif design system built for a finance-advisory audience.',
];

const TECH_CAPABILITY = [
  {
    label: 'Frontend and product',
    detail: 'TypeScript, React, Next.js — building interfaces people can actually use, not just demo well.',
  },
  {
    label: 'Backend and data',
    detail: 'Node.js, REST and OCDS APIs, SQLite, Supabase — moving and shaping data reliably.',
  },
  {
    label: 'Desktop and packaging',
    detail: 'Electron, Windows installers, release checksums, and versioned builds.',
  },
  {
    label: 'AI integration',
    detail: 'MCP tools and provider hooks where they add real value, kept separate from anything unverified.',
  },
  {
    label: 'Shipping discipline',
    detail: 'Tests, CI gates, staging smoke checks, and deployment on Vercel — so releases are boring, not risky.',
  },
];

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <a className="nameplate" href="#main-content" aria-label="Manazir Hussain, back to top">
          Manazir Hussain
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#build">What I build</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/manazoid4">GitHub</a>
        </nav>
      </header>

      <section className="hero" id="main-content" tabIndex={-1} aria-labelledby="intro-title">
        <div className="hero-statement">
          <p className="identity">UK-based &middot; Open to roles, projects and partnerships</p>
          <h1 id="intro-title">I build useful automations that actually work, specific to your business.</h1>
          <p className="hero-copy">
            I turn repetitive work, scattered information, and difficult processes into straightforward digital
            tools. If you&rsquo;ve got a problem software could fix, I&rsquo;d like to hear about it.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#work">View my work</a>
            <a className="button secondary" href="#contact">Discuss a project</a>
          </div>
        </div>

        <aside className="hero-dossier" aria-label="What I have built">
          <p>What I&rsquo;ve built</p>
          <ul>
            {BUILT_INDEX.map((item) => (
              <li key={item.name}>
                <a href={item.href}>
                  <span>{item.name}</span>
                  {item.summary}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="role-fit" id="build" aria-labelledby="build-title">
        <div className="section-intro compact">
          <h2 id="build-title">What I can build for you.</h2>
          <p>
            Four broad categories, each backed by something already shipped &mdash; not a keyword list.
          </p>
        </div>
        <div className="fit-list">
          {HELP_CATEGORIES.map((item) => (
            <a href={item.href} key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
              <span aria-hidden="true">&darr;</span>
            </a>
          ))}
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-intro">
          <p className="section-label">Selected work</p>
          <h2 id="work-title">Four things I&rsquo;ve actually shipped.</h2>
          <p>A live public product, a contract-built consultancy site, a released Windows app, and an open-source browser tool &mdash; each with its status stated plainly.</p>
        </div>

        <article className="case-study jobfilter-case" id="jobfilter" aria-labelledby="jobfilter-title">
          <header className="case-heading">
            <div>
              <p className="case-index">Live product &middot; public sector</p>
              <h3 id="jobfilter-title">JobFilter</h3>
            </div>
            <p>
              Small builders and maintenance firms miss winnable public-sector contracts because notices are
              scattered across procurement portals in inconsistent formats. JobFilter scans the official feed and
              hands back a ranked, trade-matched shortlist.
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
                loading="eager"
                decoding="async"
              />
            </picture>
            <figcaption>Live scan result &middot; honest zero when a match can&rsquo;t be verified</figcaption>
          </figure>

          <div className="case-body">
            <div className="case-problem">
              <h4>Who it&rsquo;s for</h4>
              <p>UK construction and maintenance small businesses who want public-sector work but don&rsquo;t have time to trawl procurement sites daily.</p>
              <h4>What I changed</h4>
              <p>
                The original source was stale and keyword matching let through false positives &mdash; a buyer&rsquo;s
                head-office postcode could pass as proof a job was local. I rebuilt retrieval on the official Find a
                Tender feed and made every match fail closed rather than guess.
              </p>
            </div>
            <div>
              <h4>What I built</h4>
              <ul className="evidence-list">
                {JOBFILTER_BUILD.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>

          <footer className="case-footer">
            <div>
              <strong>Current limitation</strong>
              <span>The migration to the official feed works; how many small firms will actually pay for it is still unproven.</span>
            </div>
            <div className="project-links">
              <a href="https://jobfilter.uk/find-jobs">Try a free scan</a>
              <a href="https://github.com/manazoid4/JobFilterV1/pull/383">Review the Find a Tender migration</a>
              <a href="https://github.com/manazoid4/JobFilterV1">View code</a>
            </div>
          </footer>
        </article>

        <article className="case-study scrap-case" id="scrap-finance-partners" aria-labelledby="scrap-title">
          <header className="case-heading">
            <div>
              <p className="case-index">Contract build &middot; consultancy website</p>
              <h3 id="scrap-title">Scrap Finance Partners</h3>
            </div>
            <p>
              Scrap yards run on thin, informal bookkeeping and rarely get financial advice built for their trade. I
              was contracted to design and build a complete consultancy website end-to-end for a real client:
              services, pricing, a health-check pathway, and a working enquiry pipeline.
            </p>
          </header>

          <div className="case-body">
            <div className="case-problem">
              <h4>What I built</h4>
              <ul className="evidence-list">
                {SCRAP_FINANCE_BUILD.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4>Outcome</h4>
              <p>
                A shipped, deployed site with a real backend: enquiries submitted through the contact form send an
                email through Resend, with spam protection built in. It demonstrates the full build &mdash; strategy,
                design, copy, and a working lead pipeline &mdash; not just a static mockup.
              </p>
            </div>
          </div>

          <footer className="case-footer">
            <div>
              <strong>Current limitation</strong>
              <span>The founder-bio and case-study figures shown on the live site are illustrative brand copy, not independently confirmed client figures.</span>
            </div>
            <div className="project-links">
              <a href="https://scrap-finance-partners.vercel.app">View the live site</a>
              <a href="https://github.com/manazoid4/scrap-finance-partners">View code</a>
            </div>
          </footer>
        </article>

        <article className="case-study agent-case" id="agent-nudge" aria-labelledby="agent-title">
          <header className="case-heading">
            <div>
              <p className="case-index">Released Windows app</p>
              <h3 id="agent-title">Agent Nudge</h3>
            </div>
            <p>
              When two AI coding agents work on the same project at once, one can act on information that&rsquo;s
              already out of date, or edit a file the other is already mid-change on. Agent Nudge checks in before an
              agent acts and stops it when something&rsquo;s changed or another agent has already claimed the file.
            </p>
          </header>

          <figure className="artifact artifact-dark">
            <img
              src="/agent-nudge-demo.webp"
              alt="Agent Nudge scenario demo showing two coding agents and a conflict review outcome"
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Public fixture demo &middot; desktop runtime stays local &middot; released Windows MVP</figcaption>
          </figure>

          <div className="case-body">
            <div className="case-problem">
              <h4>What I built</h4>
              <ul className="evidence-list">
                {AGENT_NUDGE_BUILD.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h4>How it decides</h4>
              <p>
                The verdict stays deterministic: Agent Nudge routes project facts into a preflight check. It doesn&rsquo;t
                read hidden model state and it doesn&rsquo;t replace a human approving the change.
              </p>
            </div>
          </div>

          <footer className="case-footer">
            <div>
              <strong>Current limitation</strong>
              <span>It coordinates agents but doesn&rsquo;t call a model itself, and provider hooks can still be bypassed if an agent skips them.</span>
            </div>
            <div className="project-links">
              <a href="https://agent-nudge-bay.vercel.app/#demo">Try the scenario demo</a>
              <a href="https://github.com/manazoid4/agent-nudge/releases">Download the Windows release</a>
              <a href="https://github.com/manazoid4/agent-nudge">View code</a>
            </div>
          </footer>
        </article>

        <article className="supporting-project" id="openflowkit" aria-labelledby="openflow-title">
          <div>
            <p className="case-index">Open-source browser MVP</p>
            <h3 id="openflow-title">OpenFlowKit</h3>
          </div>
          <div>
            <p className="supporting-lede">
              Typing is slow for a lot of writing work. OpenFlowKit lets you talk instead, then cleans up the
              transcript with rule-based text refinement, right in the browser.
            </p>
            <p>
              The working web MVP covers browser speech capture, a WebSocket terminal bridge, typed transcription and
              refinement contracts, deterministic cleanup rules, latency tracking, and test coverage. It&rsquo;s
              unreleased and open source; native desktop injection and hosted AI provider routing are the next
              milestones, not built yet.
            </p>
          </div>
          <div className="project-links vertical">
            <a href="https://openflowkit-dusky.vercel.app">Try OpenFlowKit</a>
            <a href="https://github.com/manazoid4/openflowkit">View code</a>
          </div>
        </article>
      </section>

      <section className="evidence-section" id="capability" aria-labelledby="capability-title">
        <div className="section-intro">
          <p className="section-label">Technical capability</p>
          <h2 id="capability-title">What&rsquo;s actually behind the projects above.</h2>
          <p>No enormous keyword wall &mdash; every line below is something used in a shipped project on this page.</p>
        </div>
        <dl className="evidence-matrix">
          {TECH_CAPABILITY.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div>
          <p className="section-label">About</p>
          <h2 id="about-title">I like turning messy problems into software that just works.</h2>
        </div>
        <div className="about-copy">
          <p>
            A manual process, a pile of scattered data, a slow workflow &mdash; that&rsquo;s the kind of problem I want
            to look at. I&rsquo;ve shipped four different products solo: a released Windows app, a live
            procurement-matching tool, a full consultancy-style website with a working lead pipeline, and a
            voice-to-text browser tool.
          </p>
          <p>
            I use AI where it earns its place in a build, and I say plainly where it doesn&rsquo;t belong yet. I work
            best with people who care whether something actually solves the problem, not whether it sounds
            impressive.
          </p>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <p className="section-label">Get in touch</p>
        <h2 id="contact-title">Got a role, a project, or an idea worth building?</h2>
        <p>UK-based and open to employment, freelance projects, and partnerships. Pick whichever fits:</p>
        <div className="contact-routes">
          <a className="contact-route" href="mailto:manazoid4@gmail.com?subject=Role%20enquiry">
            <strong>Hire me</strong>
            <span>Full-time or contract roles in software or applied AI.</span>
          </a>
          <a className="contact-route" href="mailto:manazoid4@gmail.com?subject=Project%20enquiry">
            <strong>Commission a project</strong>
            <span>You&rsquo;ve got a business problem and want it turned into working software.</span>
          </a>
          <a className="contact-route" href="mailto:manazoid4@gmail.com?subject=Collaboration">
            <strong>Collaborate</strong>
            <span>You&rsquo;re building something and want a technical partner.</span>
          </a>
        </div>
        <div className="contact-actions">
          <a className="button light" href="mailto:manazoid4@gmail.com">Email Manazir</a>
          <a className="button outline-light" href="https://github.com/manazoid4">View GitHub</a>
        </div>
      </section>

      <footer className="site-footer">
        <span>Manazir Hussain &copy; 2026</span>
        <span>UK-based &middot; Open to roles, projects and partnerships</span>
        <a href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
      </footer>
    </main>
  );
}
