import { DELIVERY, PROMISES, THIRD_PARTY_NOTE } from './offers';

const promises = [
  'One person, start to finish',
  PROMISES[0].title,
  PROMISES[1].title,
  PROMISES[2].title,
  DELIVERY[0].title,
  THIRD_PARTY_NOTE.split('. ').at(-1)!.replace(/\.$/, ''),
];

export function WhyMaz() {
  return (
    <aside className="s-why" aria-labelledby="why-title">
      <h2 id="why-title">Why Maz Works?</h2>
      <ul>{promises.map((promise) => <li key={promise}><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg><span>{promise}</span></li>)}</ul>
      <a className="button button-signal" href="/leak-check?src=why-maz#leak-check-form">Get a free plan and price</a>
      <p className="s-small">No call, no obligation.</p>
    </aside>
  );
}
