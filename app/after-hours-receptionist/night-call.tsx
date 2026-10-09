'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hero visual: closed sign → call comes in → answered → summary emailed.
 * - Without JavaScript: every stage shows at once (no blank card).
 * - With it: plays through the four stages on a slow loop, pausing off-screen.
 * - Reduced motion: shows the finished state, no movement.
 * A made-up business, labelled as an example.
 */
const STAGES = ['Closed for the night', 'Call coming in', 'Answered for you', 'Summary sent'];

export function NightCall() {
  const [stage, setStage] = useState(3);
  const [live, setLive] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    setLive(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current = 0;
    setStage(0);
    const tick = window.setInterval(() => {
      if (root.current?.hasAttribute('data-offscreen')) return;
      current = (current + 1) % 5; // a short rest on the finished state
      setStage(Math.min(current, 3));
    }, 1900);
    return () => window.clearInterval(tick);
  }, []);

  const at = (n: number) => (!live || stage >= n ? ' is-on' : '');

  return (
    <figure className="ah-night" ref={root} data-pause-offscreen aria-labelledby="ah-night-cap">
      <div className="ah-night-card" role="img" aria-label="Example: at 9:47pm the business is closed, a call comes in, the receptionist answers in the business name and an email summary is sent to the owner.">
        <div className="ah-night-top">
          <span className="ah-moon" aria-hidden="true" />
          <span className="ah-clock">9:47pm</span>
          <span className={`ah-sign${at(0)}`}>Closed</span>
        </div>
        <div className={`ah-ring${at(1)}${live && stage === 1 ? ' is-ringing' : ''}`}>
          <span className="ah-ring-dot" aria-hidden="true" />
          <span><strong>Incoming call</strong><small>07700 900123</small></span>
        </div>
        <p className={`ah-bubble${at(2)}`}>“Good evening, Harbour Street Garage. We’re closed right now, but I can take a message or help with a question.”</p>
        <div className={`ah-mail${at(3)}`}>
          <span className="ah-mail-label">Emailed to you</span>
          <strong>New enquiry: MOT booking</strong>
          <span>Sam · 07700 900123 · call back after 8am</span>
        </div>
      </div>
      <figcaption id="ah-night-cap">
        <span className="ah-stage" aria-live="off">{live ? STAGES[stage] : 'How an after-hours call goes'}</span>
        <span className="ah-example">Example business, not a client.</span>
      </figcaption>
    </figure>
  );
}
