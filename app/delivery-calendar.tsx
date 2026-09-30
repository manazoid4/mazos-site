import { GUARANTEE } from './offers';

export function DeliveryCalendar() {
  // The duration and qualification stay tied to the actual offer.
  const days = Number(GUARANTEE.match(/within (\d+) working days/)?.[1]);
  if (!Number.isInteger(days) || days < 1) throw new Error('Guarantee needs its working-day duration');
  return (
    <div className="s-guarantee s-calendar-guarantee" data-reveal>
      <div className="s-calendar" aria-hidden="true">
        <span>After access is ready</span>
        <div className="s-calendar-days">
          {Array.from({ length: days }, (_, index) => <span key={index} style={{ ['--i' as string]: index }}>{index + 1}<b>✓</b></span>)}
        </div>
        <svg className="s-calendar-ring" viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="16" pathLength="1" /></svg><strong>Working ✓</strong>
      </div>
      <p><strong>The guarantee.</strong> {GUARANTEE} You own everything I build.</p>
    </div>
  );
}
