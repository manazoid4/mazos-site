const LOOP_STEPS = [
  { n: '01', t: 'Discover', d: 'A scheduled triage reads repo state, CI, and the shipping spine, and proposes what deserves a loop.' },
  { n: '02', t: 'Gate', d: 'Every proposed loop is scored before launch. No verify command, no loop — hard rule.' },
  { n: '03', t: 'Prompt', d: 'Plan and build passes are separate prompts. The agent that decides is never the agent that does.' },
  { n: '04', t: 'Verify', d: 'The build/test command runs mechanically inside the cockpit. A failing check can never produce a pass.' },
  { n: '05', t: 'Receipt', d: 'Each iteration ends in a machine-filled receipt: exit code, commit range, diff size, tamper check.' },
];

const PROOF = [
  'Loops cannot mark themselves complete — completion requires a passing receipt and every criterion green',
  'Criteria files are hash-checked; an agent editing its own success conditions renders the iteration failed',
  'A morning triage loop discovers work and proposes new loops unattended; a human approves every one',
  'Repeated identical failures trip a circuit breaker; silent zombie loops auto-stop after three days',
  'Built on the published playbooks: Anthropic harness engineering, generator–evaluator splits, plan/build loops',
];

function Receipt() {
  return (
    <pre className="receipt" aria-label="Example loop receipt">
{`{
  `}<span className="k">{'"kind"'}</span>{`: "run",
  `}<span className="k">{'"loopId"'}</span>{`: "custom_jobfilter_dogfood_…_89ab2546",
  `}<span className="k">{'"verify"'}</span>{`: [{ "actionId": "verify_jobfilter", "exitCode": 0, "passed": `}<span className="ok">true</span>{` }],
  `}<span className="k">{'"commitRange"'}</span>{`: { "from": null, "to": "49019e2", "count": 0 },
  `}<span className="k">{'"criteriaTampered"'}</span>{`: false,
  `}<span className="k">{'"outcome"'}</span>{`: `}<span className="ok">{'"pass"'}</span>{`,
  `}<span className="k">{'"note"'}</span>{`: "dogfood: first machine receipt"
}`}
    </pre>
  );
}

export default function Page() {
  return (
    <main>
      <section aria-label="Introduction">
        <p className="kicker">MAZos — the loop cockpit</p>
        <h1>AI agents write the code. Someone has to keep the score.</h1>
        <p className="lede">
          MAZos is an operating console where a solo founder turns <strong>&ldquo;what ships next&rdquo;</strong> into
          supervised agent loops with <strong>machine-verified receipts</strong>. Agents generate; MAZos gates,
          verifies, and remembers.
        </p>
      </section>

      <section aria-label="How a loop works">
        <p className="kicker">The primitive</p>
        <h2>One loop, five moves</h2>
        <div className="loop-strip">
          {LOOP_STEPS.map((s) => (
            <div className="loop-step" key={s.n}>
              <div className="n">{s.n}</div>
              <div className="t">{s.t}</div>
              <div className="d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Receipts">
        <p className="kicker">The artifact</p>
        <h2>No receipt, it didn&rsquo;t happen</h2>
        <Receipt />
        <p className="receipt-caption">
          A real receipt from the cockpit&rsquo;s own logs. The verify command ran, the exit code was captured, the
          commit was recorded, and the success criteria were hash-checked against tampering. You cannot click your
          way to a completed loop.
        </p>
      </section>

      <section aria-label="Design guarantees">
        <p className="kicker">Design guarantees</p>
        <h2>Trust is structural, not vibes</h2>
        <ul className="proof">
          {PROOF.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section aria-label="Why now">
        <p className="kicker">Why now</p>
        <h2>Generation became free. Judgment didn&rsquo;t.</h2>
        <div className="grafs">
          <div className="graf">
            <h3>The loop-engineering wave</h3>
            <p>
              In mid-2026 the people building coding agents converged on the same conclusion: stop prompting agents,
              design the loops that prompt them. The tooling exists. The control plane doesn&rsquo;t.
            </p>
          </div>
          <div className="graf">
            <h3>Verification is the bottleneck</h3>
            <p>
              Agents produce plausible work at machine speed. The scarce resource is knowing what is actually done,
              actually verified, actually safe to ship. MAZos makes that mechanical.
            </p>
          </div>
          <div className="graf">
            <h3>Solo-operator leverage</h3>
            <p>
              MAZos runs daily as the control plane for a five-product portfolio built by one person. It is dogfooded
              infrastructure, not a demo.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Operator">
        <p className="kicker">Operator</p>
        <div className="operator">
          <p>
            Built and run daily by <strong>Manazir Hussain</strong> — shipping FlowLens, JobFilter, and MAZos itself
            through the loops it supervises.
          </p>
          <p className="role">system architect · founder · AI engineer</p>
        </div>
      </section>

      <section aria-label="Contact">
        <p className="kicker">Contact</p>
        <a className="cta" href="mailto:manazoid4@gmail.com">manazoid4@gmail.com</a>
        <p className="contact-note">Deck, live walkthrough, and receipts on request.</p>
      </section>

      <footer>
        <span>MAZos © 2026</span>
        <span>every claim on this page is receipt-backed</span>
      </footer>
    </main>
  );
}
