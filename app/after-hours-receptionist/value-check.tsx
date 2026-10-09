'use client';

import { useState } from 'react';
import { AFTER_HOURS, formatPrice } from '../offers';

/**
 * "Would one booked job cover it?": the visitor types what a typical job is
 * worth to them, after materials; the page does the sum. No stats, no claims
 * about how many calls they miss. The starting figure is a placeholder they can
 * change, and the note says so.
 */
const DEFAULT_JOB_VALUE = '150';

export function ValueCheck() {
  const [value, setValue] = useState(DEFAULT_JOB_VALUE);
  const amount = Math.max(0, Number(value.replace(/[^0-9.]/g, '')) || 0);
  const months = amount > 0 ? amount / AFTER_HOURS.monthly : 0;
  const answer = amount <= 0
    ? 'Type what a typical job is worth to you.'
    : months >= 1
      ? `One booked job at that figure pays for about ${months >= 10 ? Math.floor(months) : months.toFixed(1).replace(/\.0$/, '')} months.`
      : `It takes about ${Math.ceil(AFTER_HOURS.monthly / amount)} booked jobs a month to pay for it.`;

  return (
    <div className="ah-value">
      <label className="ah-value-input">
        <span>What’s a typical job worth to you, after materials?</span>
        <span className="ah-pound"><span aria-hidden="true">£</span><input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Typical job value after materials, in pounds" /></span>
      </label>
      <div className="ah-value-bars" aria-hidden="true">
        <span className="ah-bar ah-bar-cost" style={{ width: `${Math.min(100, (AFTER_HOURS.monthly / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{AFTER_HOURS.price}</span>
        <span className="ah-bar ah-bar-job" style={{ width: `${Math.min(100, (Math.max(amount, 1) / Math.max(amount, AFTER_HOURS.monthly)) * 100)}%` }}>{amount > 0 ? `${formatPrice(amount)} job` : '—'}</span>
      </div>
      <p className="ah-value-answer" aria-live="polite">{answer}</p>
      <p className="ah-value-note">Your own figure, not a forecast. I don’t promise a number of calls.</p>
    </div>
  );
}
