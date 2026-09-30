import { CHANGES_WINDOW, CARE_PLAN, DEMO_STEPS } from './offers';
import { BOOKING_URL } from './site';
import './demo-path.css';

/**
 * The free demo route, as five plain numbered steps (Maz, 30 Sep).
 * Server-rendered, no animation: it should read like a promise, not a show.
 */
export function DemoPath({ source = 'site', compact = false }: { source?: string; compact?: boolean }) {
  return (
    <div className={`dp${compact ? ' dp-compact' : ''}`}>
      <ol className="dp-steps">
        {DEMO_STEPS.map((step, index) => (
          <li key={step.title} data-tone={index % 6}>
            <span className="dp-num" aria-hidden="true">{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              {compact ? null : <p>{step.body}</p>}
              <small>{step.note}</small>
            </div>
          </li>
        ))}
      </ol>
      <div className="dp-cta">
        <a className="button button-signal s-button-lg" href={`${BOOKING_URL}?utm_source=${encodeURIComponent(source)}`}>Book a call for your free demo</a>
        <p className="dp-micro">15 minutes · free · no obligation</p>
      </div>
    </div>
  );
}

/** What "2 months of unlimited changes" covers, and where the line is. */
export function ChangesWindow() {
  return (
    <div className="cw">
      <p className="cw-lede"><strong>{CHANGES_WINDOW.name}.</strong> {CHANGES_WINDOW.body}</p>
      <div className="cw-cols">
        <div className="cw-yes">
          <h3>Included, as often as you like</h3>
          <ul>{CHANGES_WINDOW.covered.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="cw-no">
          <h3>Priced first, so it stays fair</h3>
          <ul>{CHANGES_WINDOW.notCovered.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <p className="cw-how">{CHANGES_WINDOW.howItWorks} ({CARE_PLAN.name}, {CARE_PLAN.price}.)</p>
    </div>
  );
}
