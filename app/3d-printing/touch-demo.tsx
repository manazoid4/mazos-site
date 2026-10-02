'use client';

import Image from 'next/image';
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
        <p className="objects-kicker">A tap in everyday life</p>
        <h2 id="demo-title">They tap. Your page opens.</h2>
        <p>A café menu, a shop review or a salon booking. Choose an example below to see what your customer could open.</p>
        <figure className="objects-demo-stand"><Image src="/objects/touch-three-hero.webp" alt="Concept visual: three-disc stand for menu, reviews and bookings" width={1536} height={1024} sizes="(max-width: 680px) 90vw, 40vw" loading="lazy" unoptimized /><figcaption>Concept visual · Hold your phone near a disc</figcaption></figure>
        <div className="objects-demo-discs" role="group" aria-label="Choose an example page">
          {DESTINATIONS.map((destination) => (
            <button key={destination.id} type="button" className={selectedId === destination.id ? 'is-active' : ''} onClick={() => setSelectedId(destination.id)} aria-pressed={selectedId === destination.id}>
              <span aria-hidden="true">{destination.symbol}</span>
              {destination.label}
            </button>
          ))}
        </div>
      </div>
      <div className="objects-destination" aria-live="polite">
        <div className="objects-browser-bar"><span /><span /><span /><strong>Example on a phone</strong></div>
        <p>{selected.url}</p>
        <h3>{selected.title}</h3>
        <span>{selected.body}</span>
        <small>Illustration only. No order or booking is made.</small>
      </div>
    </section>
  );
}
