'use client';

import { useState } from 'react';

const DESTINATIONS = [
  { id: 'menu', label: 'Menu', symbol: '01', url: 'example.com/menu', title: 'See the menu', body: 'Customers can go straight to your current menu or ordering page.' },
  { id: 'review', label: 'Reviews', symbol: '02', url: 'example.com/review', title: 'Leave a review', body: 'Send customers straight to your Google review page after a good experience.' },
  { id: 'booking', label: 'Bookings', symbol: '03', url: 'example.com/book', title: 'Book a time', body: 'Open the booking page without making customers search for it.' },
] as const;

export function TouchDemo() {
  const [selectedId, setSelectedId] = useState<(typeof DESTINATIONS)[number]['id']>('menu');
  const selected = DESTINATIONS.find((item) => item.id === selectedId) ?? DESTINATIONS[0];

  return (
    <section className="objects-section objects-demo" id="demo" aria-labelledby="demo-title">
      <div className="objects-demo-copy">
        <p className="objects-kicker">Try the idea</p>
        <h2 id="demo-title">One stand. Three obvious next steps.</h2>
        <p>Choose an example below to see what a customer could open. The real stand would use your own links.</p>
        <div className="objects-demo-discs" role="group" aria-label="Choose an example tap action">
          {DESTINATIONS.map((destination) => (
            <button key={destination.id} type="button" className={selectedId === destination.id ? 'is-active' : ''} onClick={() => setSelectedId(destination.id)} aria-pressed={selectedId === destination.id}>
              <span aria-hidden="true">{destination.symbol}</span>
              {destination.label}
            </button>
          ))}
        </div>
      </div>
      <div className="objects-destination" aria-live="polite">
        <div className="objects-browser-bar"><span /><span /><span /><strong>What opens</strong></div>
        <p>{selected.url}</p>
        <h3>{selected.title}</h3>
        <span>{selected.body}</span>
        <button type="button" disabled>Example only</button>
      </div>
    </section>
  );
}
