'use client';

import { useState } from 'react';
import { OFFERS, formatPrice } from './offers';

const STARTER = OFFERS[0];

/**
 * "What it's costing you" (Batch 2). Only the visitor's own numbers: no
 * defaults, no industry figures. Without JavaScript it shows the sum to do by
 * hand. Monthly = per week × share lost × job value × 52 ÷ 12.
 */
export function CostCalculator() {
  const [perWeek, setPerWeek] = useState('');
  const [share, setShare] = useState('');
  const [value, setValue] = useState('');
  const numbers = [perWeek, share, value].map((item) => Number(item));
  const ready = [perWeek, share, value].every((item) => item.trim() !== '') && numbers.every((item) => Number.isFinite(item) && item >= 0) && numbers[1] <= 100;
  const monthly = ready ? Math.round((numbers[0] * (numbers[1] / 100) * numbers[2] * 52) / 12) : 0;

  return (
    <div className="s-calc" role="group" aria-labelledby="calc-title">
      <p className="eyebrow">Your numbers, your estimate</p>
      <h3 id="calc-title">What slow replies could be costing you</h3>
      <div className="s-calc-fields">
        <label><span>Missed calls or enquiries a week</span><input inputMode="decimal" name="per_week" value={perWeek} onChange={(event) => setPerWeek(event.target.value)} /></label>
        <label><span>Share you think you lose (%)</span><input inputMode="decimal" name="share" value={share} onChange={(event) => setShare(event.target.value)} /></label>
        <label><span>Average job value (£)</span><input inputMode="decimal" name="value" value={value} onChange={(event) => setValue(event.target.value)} /></label>
      </div>
      <div className="s-calc-result" aria-live="polite">
        {ready ? (
          <p><strong>{formatPrice(monthly)} a month</strong>, by your own numbers. {STARTER.name} is {STARTER.price} once.</p>
        ) : (
          <p>Add your three numbers. The sum: per week × share lost × job value × 52 ÷ 12. Compare it with {STARTER.name} at {STARTER.price} once.</p>
        )}
      </div>
      <p className="s-small">An estimate from what you entered, not a promise of results. <a href="/what-we-do#builder">Build my system →</a></p>
    </div>
  );
}
