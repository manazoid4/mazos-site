'use client';

import { useState } from 'react';

const DESTINATIONS = [
  { id: 'menu', label: 'Menu', symbol: '01', url: 'example.com/menu', title: 'Today’s menu', body: 'Browse dishes, allergens and ordering choices.' },
  { id: 'review', label: 'Review page', symbol: '02', url: 'example.com/review', title: 'Leave a review', body: 'Open the business review page; the platform may ask you to sign in.' },
  { id: 'booking', label: 'Booking page', symbol: '03', url: 'example.com/book', title: 'Book a time', body: 'Choose an available service and continue on the booking site.' },
] as const;

export function TouchDemo() {
  const [selectedId, setSelectedId] = useState<(typeof DESTINATIONS)[number]['id']>('menu');
  const selected = DESTINATIONS.find((item) => item.id === selectedId) ?? DESTINATIONS[0];

  return (
    <section className="objects-section objects-demo" id="demo" aria-labelledby="demo-title">
      <div className="objects-demo-copy">
        <p className="objects-kicker">Interaction demonstration</p>
        <h2 id="demo-title">One object. Three clear next steps.</h2>
        <p>Select an example disc to see the destination it represents. This illustrates the customer journey—it does not detect NFC or represent a completed order.</p>
        <div className="objects-demo-discs" role="group" aria-label="Choose an example NFC disc">
          {DESTINATIONS.map((destination) => (
            <button key={destination.id} type="button" className={selectedId === destination.id ? 'is-active' : ''} onClick={() => setSelectedId(destination.id)} aria-pressed={selectedId === destination.id}>
              <span aria-hidden="true">{destination.symbol}</span>
              {destination.label}
            </button>
          ))}
        </div>
      </div>
      <div className="objects-destination" aria-live="polite">
        <div className="objects-browser-bar"><span /><span /><span /><strong>Example destination</strong></div>
        <p>{selected.url}</p>
        <h3>{selected.title}</h3>
        <span>{selected.body}</span>
        <button type="button" disabled>Example only</button>
      </div>
    </section>
  );
}
