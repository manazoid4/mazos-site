'use client';

import { useEffect, useRef, useState } from 'react';
import { OFFERS, getMenuJob } from './offers';

const TEXT_BACK = { name: getMenuJob('missed-call').name, price: `${OFFERS[0].name} ${OFFERS[0].price}` };

/**
 * Optional wording for a trade page. Every field falls back to the homepage's
 * missed-call example, so the homepage output is unchanged.
 */
export type HeroDemoCopy = {
  /** Small line under "Missed call". */
  caller?: string;
  /** The text that goes out, ending just before the link. */
  text?: string;
  /** The link shown at the end of the text. */
  link?: string;
  /** Title and detail of the booking row. */
  booked?: string;
  bookedDetail?: string;
  /** Caption under the phone (the example is always labelled as not a real customer). */
  caption?: string;
  /** Label of the button inside the text (default "Book"; "Send" for an enquiry form). */
  action?: string;
};

/** 0 ready to call · 1 missed call · 2 text arrived · 3 booked */
type Step = 0 | 1 | 2 | 3;
const ANNOUNCE = ['Tap Call to ring the business.', 'Missed call. The business is with a customer.', 'A text arrived with a booking link. Tap Book.', 'Booked for Tuesday at 10:30, added to the diary.'];

/**
 * The money moment, shown and then playable (Batch 2): a missed call, the text
 * that goes out on its own, and the booking that follows.
 * - Without JavaScript it is the original pure-CSS loop.
 * - With it, the story plays once when first on screen, then the visitor can
 *   play the customer: tap Call → missed call → the text arrives → tap Book.
 * - Real buttons, so it works by keyboard; a live region says each step.
 * - Pauses off-screen; reduced motion shows the finished thread, still playable.
 * Every row keeps its space from the first paint, so nothing shifts.
 * Labelled as an example: not a real customer.
 */
export function HeroDemo({ copy = {} }: { copy?: HeroDemoCopy }) {
  const custom = Boolean(copy.booked);
  const { caller = 'New caller · 2:14pm', text = 'Sorry we missed you! We’re with a customer. Book here and pick a time that suits: ', link = 'yourbusiness.co.uk/book', booked = 'New booking', bookedDetail = 'Tuesday 10:30 · added to your diary', caption = `${TEXT_BACK.name}, ${TEXT_BACK.price}. Not a real customer.`, action = 'Book' } = copy;
  // Screen-reader steps follow the page's own outcome; the homepage keeps its original wording.
  const announce = custom ? [ANNOUNCE[0], ANNOUNCE[1], `A text arrived with a link. Tap ${action}.`, `${booked}: ${bookedDetail}.`] : ANNOUNCE;
  const [live, setLive] = useState(false);
  const [step, setStep] = useState<Step>(3);
  const [played, setPlayed] = useState(false);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setLive(true);
    const element = root.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { setPlayed(true); return; }
    // Keep the finished thread on screen (never a blank phone); replay it once after a pause.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // Auto-play once: call, missed, text, booked.
      const run = (next: Step) => {
        if (element.hasAttribute('data-offscreen')) { timer.current = window.setTimeout(() => run(next), 500); return; }
        setStep(next);
        if (next < 3) timer.current = window.setTimeout(() => run((next + 1) as Step), 1100);
        else setPlayed(true);
      };
      timer.current = window.setTimeout(() => run(1), 3000);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => { observer.disconnect(); window.clearTimeout(timer.current); };
  }, []);

  const call = () => {
    window.clearTimeout(timer.current);
    setPlayed(true);
    setStep(1);
    timer.current = window.setTimeout(() => setStep(2), 1000);
  };
  const on = (row: Step) => (live ? (step >= row ? ' is-on' : ' is-off') : '');

  return (
    <figure className="s-demo" aria-labelledby="demo-caption" data-pause-offscreen data-live={live || undefined} ref={root}>
      <div className="s-demo-phone" role={live ? 'group' : 'img'} aria-label={live ? 'Example phone you can play: be the customer' : 'Example phone screen: a missed call, then an automatic text with a booking link, then a new booking'}>
        <p className="s-demo-bar"><span>9:41</span><span>Messages</span></p>
        {/* Always rendered so hydration never moves the thread (CLS 0). */}
        <div className="s-demo-play">
          {!live ? <span className="s-demo-hint">Watch what happens</span> : step === 0 || step === 3 ? (
            <button type="button" className="s-demo-call" onClick={call}>
              {step === 3 ? 'Try it: call again' : 'Call'}
            </button>
          ) : <span className="s-demo-hint">{step === 1 ? 'Ringing… no answer' : `Tap ${action} in the text`}</span>}
        </div>
        <ol className="s-demo-thread" aria-hidden={live ? undefined : true}>
          <li className={`s-demo-row s-demo-missed${on(1)}`}>
            <span className="s-demo-icon">✕</span>
            <span><strong>Missed call</strong><small>{caller}</small></span>
          </li>
          <li className={`s-demo-row s-demo-text${on(2)}`}>
            <span className="s-demo-label">Sent automatically</span>
            {live ? null : <span className="s-demo-dots"><i /><i /><i /></span>}
            <span className="s-demo-bubble">{text}{live && step === 2 ? <button type="button" className="s-demo-book" onClick={() => setStep(3)}>{action}</button> : <u>{link}</u>}</span>
            <small className="s-demo-delivered">Delivered ✓</small>
          </li>
          <li className={`s-demo-row s-demo-booked${on(3)}`}>
            <span className="s-demo-icon s-demo-tick">✓</span>
            <span><strong>{booked}</strong><small>{bookedDetail}</small></span>
          </li>
        </ol>
        {live ? <p className="s-visually-hidden" aria-live="polite">{played ? announce[step] : ''}</p> : null}
      </div>
      <figcaption id="demo-caption" className="s-small">
        <span className="s-demo-tag">Example</span> {caption}
      </figcaption>
    </figure>
  );
}
