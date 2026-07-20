import Link from 'next/link';

type Project = {
  name: string;
  what: string;
  stack: string;
  status: 'Live' | 'In development' | 'Internal';
  href: string;
  internal?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: 'FlowLens',
    what: 'Workflow-evidence SaaS — captures how work actually happened and turns it into proof a team can show.',
    stack: 'Next.js · TypeScript · Supabase',
    status: 'Live',
    href: 'https://github.com/manazoid4/flowlens',
  },
  {
    name: 'JobFilter',
    what: 'Lead-filtering engine for UK trades: live Contracts Finder procurement notices scored into winnable work.',
    stack: 'Next.js · TypeScript · LLM pipelines',
    status: 'Live',
    href: 'https://github.com/manazoid4/JobFilterV1',
  },
  {
    name: 'MAZos',
    what: 'The loop cockpit — a control plane for supervised AI agent loops with machine-verified receipts. Runs this portfolio.',
    stack: 'Next.js · TypeScript · Claude agents',
    status: 'In development',
    href: '/mazos',
    internal: true,
  },
  {
    name: 'OpenFlowKit',
    what: 'Privacy-first voice dictation and AI text refinement for developers — local-or-cloud speech-to-text in any field.',
    stack: 'TypeScript · local STT',
    status: 'In development',
    href: 'https://github.com/manazoid4/openflowkit',
  },
  {
    name: 'Recall',
    what: 'Personal intelligence layer: saved content becomes a living memory graph that agents can actually use.',
    stack: 'Next.js · TypeScript',
    status: 'In development',
    href: 'https://github.com/manazoid4/recall',
  },
  {
    name: 'InkWeave',
    what: 'AI snippet-to-book platform — scattered notes into structured, publish-ready long-form manuscripts.',
    stack: 'Next.js · LLM orchestration',
    status: 'In development',
    href: 'https://github.com/manazoid4/inkweave',
  },
];

export default function Page() {
  return (
    <main>
      <section aria-label="Introduction">
        <p className="kicker">Manazir Hussain — @manazoid4</p>
        <h1>System architect and founder. I ship products by designing the loops that build them.</h1>
        <p className="lede">
          A portfolio of revenue products built and operated by one person, supervised through{' '}
          <Link href="/mazos"><strong>MAZos</strong></Link> — my own control plane for AI agent loops with
          machine-verified receipts.
        </p>
      </section>

      <section aria-label="Projects">
        <p className="kicker">Projects</p>
        <h2>What I&rsquo;m building</h2>
        <div className="cards">
          {PROJECTS.map((p) => (
            <article className="card" key={p.name}>
              <div className="card-head">
                <h3>{p.name}</h3>
                <span className={`status ${p.status === 'Live' ? 'live' : ''}`}>{p.status}</span>
              </div>
              <p className="card-what">{p.what}</p>
              <p className="card-stack">{p.stack}</p>
              {p.internal ? (
                <Link className="card-link" href={p.href}>Read the pitch →</Link>
              ) : (
                <a className="card-link" href={p.href} target="_blank" rel="noreferrer">View repository →</a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section aria-label="How I work">
        <p className="kicker">Method</p>
        <h2>Loop engineering, dogfooded</h2>
        <p className="lede" style={{ marginTop: 0 }}>
          Every project above ships through gated agent loops: work is discovered by a scheduled triage, gated
          before launch, verified mechanically, and recorded in receipts. The method has its own page —{' '}
          <Link href="/mazos">how MAZos works</Link>.
        </p>
      </section>

      <section aria-label="Contact">
        <p className="kicker">Contact</p>
        <a className="cta" href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
        <p className="contact-note">
          Code: <a href="https://github.com/manazoid4" target="_blank" rel="noreferrer">github.com/manazoid4</a>
        </p>
      </section>

      <footer>
        <span>Manazir Hussain © 2026</span>
        <span>built and shipped through MAZos loops</span>
      </footer>
    </main>
  );
}
