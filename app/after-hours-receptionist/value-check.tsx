'use client';

import { useState } from 'react';
import { AFTER_HOURS, formatPrice } from '../offers';

/**
 * "What one missed customer can cost": the visitor types what a typical job
 * is worth to them; the page does the sum. No stats, no claims about how many
 * calls they miss. The starting value is a placeholder they can change.
 */
export function ValueCheck() {
  const [value, setValue] = useState('100');
  const amount = Math.max(0, Number(value.replace(/[^0-9.]/g, '')) || 0);
  const months = amount > 0 ? amount / AFTER_HOURS.monthly : 0;
  const answer = amount <= 0
    ? 'Type what a typical job is worth to you.'
    : months >= 1
      ? `If one additional job is won, its contribution equals about ${months >= 10 ? Math.floor(months) : months.toFixed(1).replace(/\.0$/, '')} months of cover.`
      : `You would need about ${Math.ceil(AFTER_HOURS.monthly / amount)} additional completed jobs at that contribution to cover one month.`;

  return (
    <div className="ah-value">
      <label className="ah-value-input">
        <span>What do you keep from one completed job after direct costs?</span>
        <span className="ah-pound"><span aria-hidden="true">£</span><input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Estimated contribution per completed job in pounds" /></span>
      </label>
      <div className="ah-value-bars" aria-hidden="true">
        <span className="ah-bar ah-bar-cost" style={{ width: `${Math.min(100, (AFTER_HOURS.monthly / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{AFTER_HOURS.price}</span>
        <span className="ah-bar ah-bar-job" style={{ width: `${Math.min(100, (Math.max(amount, 1) / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{amount > 0 ? `${formatPrice(amount)} contribution` : '—'}</span>
      </div>
      <p className="ah-value-answer" aria-live="polite">{answer}</p>
      <p className="ah-value-note">Illustration only, not a forecast. Only count money remaining after direct costs; no extra customers or profit are promised.</p>
    </div>
  );
}
