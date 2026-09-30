import { EXTRAS, OFFERS } from './offers';
const starter = OFFERS[0];
const reminder = EXTRAS.find((extra) => extra.name === 'Appointment reminders')!;
const total = starter.from + Number(reminder.price.replace(/[^0-9.]/g, ''));

/**
 * A clearly labelled example of the free plan and fixed quote. The business is
 * fictional; the kind of plan matches what a real reply looks like.
 */
const FINDINGS = [
  {
    level: 'Fix now',
    title: 'Enquiries scattered across four apps',
    evidence: 'Calls, emails, forms and DMs stay separate.',
    impact: 'Saturday’s enquiry waits until Tuesday.',
  },
  {
    level: 'Fix soon',
    title: 'Reminders still sent by hand',
    evidence: 'The booking app’s reminders are switched off.',
    impact: 'Staff spend evenings texting.',
  },
  {
    level: 'Working well',
    title: 'Online booking itself',
    evidence: 'Easy to book on a phone.',
    impact: 'Keep it.',
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
      <p className="s-report-untested"><em>Not included:</em> a new website. This one works.</p>
      <footer>
        <p><strong>The quote.</strong> {starter.name}, <strong>{starter.price}</strong>: every enquiry lands in one list and gets an instant reply. Add-on, <strong>{reminder.price}</strong>: appointment reminders switched on. Total £{total}, No VAT added. Working within 7 working days of access, or you don’t pay the rest.</p>
        <p className="s-small">If nothing is worth automating, the plan says so.</p>
      </footer>
    </article>
  );
}
