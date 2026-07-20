import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MAZos case study — Manazir Hussain',
  description:
    'A factual case study of MAZos, a local-first cockpit for gating, verifying, and recording supervised coding-agent work.',
};

const LOOP_STEPS = [
  { n: '01', title: 'Define', detail: 'Choose one outcome, repository, acceptance criteria, and an allowlisted verify command.' },
  { n: '02', title: 'Gate', detail: 'Score the proposed task before launch. A loop without a verification action cannot be saved.' },
  { n: '03', title: 'Separate', detail: 'Use distinct planning and building prompts so deciding and changing code remain explicit stages.' },
  { n: '04', title: 'Verify', detail: 'Run the registered build or test command outside the agent response and capture its real exit code.' },
  { n: '05', title: 'Record', detail: 'Store the commit range, diff size, criteria state, tamper check, and outcome in a receipt.' },
];

const GUARANTEES = [
  'A loop cannot complete unless its latest receipt passes and every criterion is green.',
  'Criteria files are hash-checked; changing the success conditions invalidates the iteration.',
  'Repeated identical failures open a circuit breaker instead of running forever.',
  'The shell surface is limited to registered verification and operations commands.',
  'Agents are launched through operator-approved prompts; MAZos does not autonomously execute them.',
];

function Receipt() {
  return (
    <pre className="receipt" aria-label="Example MAZos verification receipt">
{`{
  `}<span className="receipt-key">{`"kind"`}</span>{`: "run",
  `}<span className="receipt-key">{`"verify"`}</span>{`: [{ "actionId": "verify_jobfilter", "exitCode": 0, "passed": `}<span className="receipt-pass">true</span>{` }],
  `}<span className="receipt-key">{`"commitRange"`}</span>{`: { "from": null, "to": "49019e2", "count": 0 },
  `}<span className="receipt-key">{`"criteriaTampered"`}</span>{`: false,
  `}<span className="receipt-key">{`"outcome"`}</span>{`: `}<span className="receipt-pass">{`"pass"`}</span>{`
}`}
    </pre>
  );
}

export default function Page() {
  return (
    <main>
      <header className="site-nav">
        <Link className="wordmark" href="/" aria-label="Manazir Hussain portfolio">MH</Link>
        <nav aria-label="Case study navigation">
          <Link href="/">Portfolio</Link>
          <a href="https://mazos-command-centre.vercel.app" target="_blank" rel="noreferrer">Live product</a>
          <a href="https://github.com/manazoid4/mazos-ui" target="_blank" rel="noreferrer">Repository</a>
        </nav>
      </header>

      <section className="hero mazos-hero" aria-labelledby="mazos-title">
        <p className="identity">Product case study · Local-first operator tooling</p>
        <h1 id="mazos-title">MAZos keeps agent work bounded and verifiable.</h1>
        <p className="hero-copy">
          It is a control surface for deciding what ships next, preparing a supervised agent loop, running a
          registered check, and recording hard evidence. It supports product delivery; it does not replace human
          approval or execute agents on its own.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="https://mazos-command-centre.vercel.app" target="_blank" rel="noreferrer">Open the cockpit</a>
          <a className="button secondary" href="https://github.com/manazoid4/mazos-ui" target="_blank" rel="noreferrer">Inspect the code</a>
        </div>
      </section>

      <section className="scope-section" aria-labelledby="scope-title">
        <div className="section-intro">
          <p className="section-label">Current scope</p>
          <h2 id="scope-title">One screen for decisions, loops, evidence, and shipped work.</h2>
        </div>
        <div className="scope-columns">
          <div>
            <h3>What exists</h3>
            <ul className="evidence-list">
              <li>A shipping spine across products with the next action, evidence, and blocker.</li>
              <li>A loop deck with plan/build prompts, criteria, registered checks, and receipts.</li>
              <li>Open human decisions, recent commits, repository state, and run history.</li>
              <li>Fourteen API routes plus an allowlisted local command registry.</li>
            </ul>
          </div>
          <div>
            <h3>What it deliberately does not do</h3>
            <ul className="evidence-list muted-list">
              <li>No autonomous agent execution.</li>
              <li>No unrestricted shell access.</li>
              <li>No model calls, email, or cron from the cockpit.</li>
              <li>No claim that a generated response equals verified completion.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="loop-section" aria-labelledby="loop-title">
        <div className="section-intro">
          <p className="section-label">The loop</p>
          <h2 id="loop-title">Five moves from intent to evidence.</h2>
        </div>
        <ol className="loop-steps">
          {LOOP_STEPS.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="receipt-section" aria-labelledby="receipt-title">
        <div className="section-intro">
          <p className="section-label">The artifact</p>
          <h2 id="receipt-title">The verdict comes from the check, not the agent.</h2>
          <p>Receipts join mechanical verification to the code change and the criteria that defined success.</p>
        </div>
        <Receipt />
      </section>

      <section className="guarantees-section" aria-labelledby="guarantees-title">
        <div className="section-intro">
          <p className="section-label">Safety model</p>
          <h2 id="guarantees-title">Constraints built into the workflow.</h2>
        </div>
        <ul className="guarantee-list">
          {GUARANTEES.map((guarantee) => <li key={guarantee}>{guarantee}</li>)}
        </ul>
      </section>

      <aside className="case-conclusion" aria-labelledby="conclusion-title">
        <div>
          <p className="section-label">Why it belongs here</p>
          <h2 id="conclusion-title">MAZos shows how I operate; JobFilter shows what I ship.</h2>
        </div>
        <p>
          The cockpit is useful portfolio evidence because it turns my delivery standards into a working system.
          The main portfolio keeps it secondary so a recruiter can understand the products first.
        </p>
        <Link className="text-link" href="/">Return to the portfolio →</Link>
      </aside>

      <footer>
        <span>MAZos case study © 2026</span>
        <a href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
      </footer>
    </main>
  );
}
