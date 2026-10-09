'use client';

import { useState } from 'react';
import { AFTER_HOURS, formatPrice } from '../offers';

/**
 * "What one missed customer can cost": the visitor types what a typical job
 * is worth to them; the page does the sum. No stats, no claims about how many
 * calls they miss. The starting value is a placeholder they can change.
 */
export function ValueCheck() {
  const [value, setValue] = useState('150');
  const amount = Math.max(0, Number(value.replace(/[^0-9.]/g, '')) || 0);
  const months = amount > 0 ? amount / AFTER_HOURS.monthly : 0;
  const answer = amount <= 0
    ? 'Type what a typical job is worth to you.'
    : months >= 1
      ? `One after-hours caller who books covers about ${months >= 10 ? Math.floor(months) : months.toFixed(1).replace(/\.0$/, '')} months of cover.`
      : `It takes about ${Math.ceil(AFTER_HOURS.monthly / amount)} booked callers a month to cover it.`;

  return (
    <div className="ah-value">
      <label className="ah-value-input">
        <span>What is one typical job worth to you?</span>
        <span className="ah-pound"><span aria-hidden="true">£</span><input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Typical job value in pounds" /></span>
      </label>
      <div className="ah-value-bars" aria-hidden="true">
        <span className="ah-bar ah-bar-cost" style={{ width: `${Math.min(100, (AFTER_HOURS.monthly / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{AFTER_HOURS.price}</span>
        <span className="ah-bar ah-bar-job" style={{ width: `${Math.min(100, (Math.max(amount, 1) / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{amount > 0 ? `${formatPrice(amount)} job` : '—'}</span>
      </div>
      <p className="ah-value-answer" aria-live="polite">{answer}</p>
      <p className="ah-value-note">Your own figure, your own sum. I don’t promise a number of calls.</p>
    </div>
  );
}
