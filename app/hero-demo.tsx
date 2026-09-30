import { EXTRAS } from './offers';

const TEXT_BACK = EXTRAS.find((extra) => extra.name === 'Missed-call text-back')!;

/**
 * The money moment, shown rather than described: a missed call, the text that
 * goes out on its own, and the booking that follows. Pure CSS, so it costs no
 * JavaScript. Every row keeps its space from the first paint (only opacity and
 * transform animate), so nothing shifts. Reduced motion shows the finished
 * thread with no movement. The loop pauses while off-screen (see
 * scroll-reveal.tsx); a typing bubble and a Delivered tick show the send.
 * Labelled as an example: not a real customer.
 */
export function HeroDemo() {
  return (
    <figure className="s-demo" aria-labelledby="demo-caption" data-pause-offscreen>
      <div className="s-demo-phone" role="img" aria-label="Example phone screen: a missed call, then an automatic text with a booking link, then a new booking">
        <p className="s-demo-bar"><span>9:41</span><span>Messages</span></p>
        <ol className="s-demo-thread" aria-hidden="true">
          <li className="s-demo-row s-demo-missed">
            <span className="s-demo-icon">✕</span>
            <span><strong>Missed call</strong><small>New caller · 2:14pm</small></span>
          </li>
          <li className="s-demo-row s-demo-text">
            <span className="s-demo-label">Sent automatically</span>
            <span className="s-demo-dots"><i /><i /><i /></span>
            <span className="s-demo-bubble">Sorry we missed you! We’re with a customer. Book here and pick a time that suits: <u>yourbusiness.co.uk/book</u></span>
            <small className="s-demo-delivered">Delivered ✓</small>
          </li>
          <li className="s-demo-row s-demo-booked">
            <span className="s-demo-icon s-demo-tick">✓</span>
            <span><strong>New booking</strong><small>Tuesday 10:30 · added to your diary</small></span>
          </li>
        </ol>
      </div>
      <figcaption id="demo-caption" className="s-small">
        <span className="s-demo-tag">Example</span> {`${TEXT_BACK.name}, ${TEXT_BACK.price}. Not a real customer.`}
      </figcaption>
    </figure>
  );
}
