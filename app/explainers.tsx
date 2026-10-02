import { CHANGES_WINDOW, NEXT_STEPS, OFFERS, PACKAGE_VALUE, formatPrice } from './offers';
import './explainers.css';

/**
 * Animations that explain, each in place of a paragraph (plan v3, B5).
 * Pure CSS keyframes; every one has a reduced-motion still that shows the
 * finished state, and nothing moves for visitors who prefer reduced motion.
 * Counted with the hero demo and the storyboards in scenes.tsx, that is the
 * full set of eight.
 */

/** Three Starter tiles slide together into one line: why £149 × 3 becomes a £595 System. */
export function TilesJoin() {
  const starter = OFFERS[0];
  const system = OFFERS[1];
  const value = PACKAGE_VALUE['business-system']!;
  return (
    <figure className="ex ex-tiles" aria-labelledby="ex-tiles-caption">
      <div className="ex-tiles-row" aria-hidden="true">
        {['Missed calls', 'Quotes', 'Reviews'].map((job, index) => <span key={job} className="ex-tile" style={{ ['--i' as string]: index }}>{job}<small>{starter.price}</small></span>)}
        <span className="ex-tile ex-tile-sum">{system.name}<small>{system.price} · weekly report in</small></span>
      </div>
      <figcaption id="ex-tiles-caption" className="s-small">Bought one by one, three jobs plus the weekly report, team training, three set-ups and a month of care come to {formatPrice(value.total)}. Joined up as a {system.name} they share one customer list and cost {system.price.toLowerCase()}.</figcaption>
    </figure>
  );
}

/** A 90-day bar: the 30-day tweaks window fills, then the fix promise runs to day 90. */
export function TweaksTimeline() {
  return (
    <figure className="ex ex-tweaks" aria-labelledby="ex-tweaks-caption">
      <div className="ex-bar" aria-hidden="true">
        <i className="ex-bar-tweaks"><b>30 days of tweaks</b></i>
        <i className="ex-bar-fix"><b>90-day fix promise</b></i>
        <span className="ex-bar-mark" style={{ ['--at' as string]: '0%' }}>Live</span>
        <span className="ex-bar-mark" style={{ ['--at' as string]: '33.3%' }}>Day 30</span>
        <span className="ex-bar-mark" style={{ ['--at' as string]: '100%' }}>Day 90</span>
      </div>
      <figcaption id="ex-tweaks-caption" className="s-small">{CHANGES_WINDOW.body}</figcaption>
    </figure>
  );
}

/** What happens next, with day numbers; the line draws through the steps. */
export function NextSteps() {
  return (
    <ol className="ex ex-steps" aria-label="What happens next">
      {NEXT_STEPS.map((step, index) => (
        <li key={step.day} style={{ ['--i' as string]: index }}>
          <span className="ex-step-day">{step.day}</span>
          <strong>{step.title}</strong>
          <span>{step.body}</span>
        </li>
      ))}
    </ol>
  );
}
