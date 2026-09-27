/**
 * A clearly labelled example of the free check report. The business is
 * fictional; the kinds of problem match what real checks find.
 */
const FINDINGS = [
  {
    level: 'Fix now',
    title: '“Book now” on a phone opens a dead page',
    evidence: 'Tapped “Book now” on the homepage, 22 Sep, 10:14, on a phone-sized screen. It opened an old booking page saying “This business is no longer taking online bookings”. Screenshot attached.',
    impact: 'Anyone booking from their phone hits a dead end, and has to ring or go elsewhere.',
  },
  {
    level: 'Fix soon',
    title: 'The contact form sends, but nothing arrives',
    evidence: 'Sent a test message through the contact form, 22 Sep, 10:20. The page said “Thanks”, but it had not reached the listed inbox 24 hours later.',
    impact: 'Enquiries from the form are likely being lost without anyone knowing.',
  },
  {
    level: 'Working when checked',
    title: 'Phone number and opening hours',
    evidence: 'The number on Google matches the website, and the call button dialled it correctly.',
    impact: 'Nothing to fix here.',
  },
];

export function SampleReport() {
  return (
    <article className="s-report" aria-label="Example check report for a fictional business">
      <header>
        <span className="s-report-badge">Example</span>
        <p><strong>Booking &amp; Enquiry Check: Hollybank Hair</strong></p>
        <p className="s-small">A fictional business, made up to show the format. Checked 22 Sep 2026.</p>
      </header>
      <ol>
        {FINDINGS.map((finding) => (
          <li key={finding.title}>
            <span className={`s-level s-level-${finding.level.split(' ')[0].toLowerCase()}`}>{finding.level}</span>
            <strong>{finding.title}</strong>
            <p><em>What I tested:</em> {finding.evidence}</p>
            <p><em>What it means:</em> {finding.impact}</p>
          </li>
        ))}
      </ol>
      <p className="s-report-untested"><em>Couldn’t test:</em> whether booking reminders go out. That needs access to your booking system.</p>
      <footer>
        <p><strong>Worth fixing?</strong> Yes. Booking &amp; Enquiry Repair, <strong>£395</strong> fixed, No VAT added: point “Book now” at your live booking page, fix the form so it reaches you, and test both end to end. Working within 7 working days of access, or you don’t pay the rest.</p>
        <p className="s-small">If nothing is worth paying for, the report says so. If your current web person can fix it, it says that instead.</p>
      </footer>
    </article>
  );
}
