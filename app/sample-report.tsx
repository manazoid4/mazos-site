/**
 * A clearly labelled example of the free plan and fixed quote. The business is
 * fictional; the kind of plan matches what a real reply looks like.
 */
const FINDINGS = [
  {
    level: 'Fix now',
    title: 'Enquiries arrive in four places and some are missed',
    evidence: 'Phone, email, the website form and Instagram messages each go to a different place. Nobody sees them all in one list.',
    impact: 'A new client who messages on a busy Saturday may not hear back until Tuesday.',
  },
  {
    level: 'Fix soon',
    title: 'Reminders are sent by hand, when someone remembers',
    evidence: 'The booking tool can send reminders, but they are switched off. Staff text clients the night before instead.',
    impact: 'Missed reminders mean more no-shows, and the texting takes time every evening.',
  },
  {
    level: 'Working well',
    title: 'Online booking itself',
    evidence: 'The booking page is quick and clear on a phone.',
    impact: 'No change needed. The plan builds on it.',
  },
];

export function SampleReport() {
  return (
    <article className="s-report" aria-label="Example plan and quote for a fictional business">
      <header>
        <span className="s-report-badge">Example</span>
        <p><strong>Plan and fixed quote: Hollybank Hair</strong></p>
        <p className="s-small">A fictional business, made up to show the format.</p>
      </header>
      <ol>
        {FINDINGS.map((finding) => (
          <li key={finding.title}>
            <span className={`s-level s-level-${finding.level.split(' ')[0].toLowerCase()}`}>{finding.level}</span>
            <strong>{finding.title}</strong>
            <p><em>What I found:</em> {finding.evidence}</p>
            <p><em>What it means:</em> {finding.impact}</p>
          </li>
        ))}
      </ol>
      <p className="s-report-untested"><em>Not included:</em> a new website. The current one works, so there’s no reason to pay for one.</p>
      <footer>
        <p><strong>The quote.</strong> Starter Automation, <strong>£295</strong>: every enquiry lands in one list and gets an instant reply. Optional extra, <strong>£145</strong>: reminders switched on and set up by text. Total £440, No VAT added. Live within 7 working days of access, or you don’t pay the rest.</p>
        <p className="s-small">If nothing is worth automating, the plan says so.</p>
      </footer>
    </article>
  );
}
