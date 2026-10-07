'use client';

import { useEffect, useState } from 'react';
import { HeroDemo } from './hero-demo';
import { cleanBusinessName } from './personal-link';

/**
 * Shown only when a trade page is opened from a personal link (?biz=Business+Name):
 * the missed-call example with their name in the text. Nothing renders without it,
 * so the static page and its word budget are unchanged.
 */
export function PersonalPreview({ trade }: { trade: string }) {
  const [business, setBusiness] = useState<string | null>(null);
  useEffect(() => { setBusiness(cleanBusinessName(new URLSearchParams(window.location.search).get('biz'))); }, []);
  if (!business) return null;
  return (
    <section className="s-section s-personal" id="your-preview" aria-labelledby="personal-title">
      <p className="eyebrow">Made for {business}</p>
      <h2 id="personal-title">A missed call at {business}, answered for you.</h2>
      <p>Tap Call and play your customer. This is an example preview, not built yet.</p>
      <HeroDemo business={business} />
      <p className="s-personal-cta"><a className="button button-signal" href={`/free-plan?src=for-${trade}&trade=${trade}`}>Get my free plan</a></p>
    </section>
  );
}
