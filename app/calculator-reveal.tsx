'use client';

import { useState } from 'react';
import { CostCalculator, type CalculatorPreset } from './cost-calculator';

/**
 * The cost calculator behind one tap (sprint task 3), so short pages stay
 * short: only the button is in the page until a visitor asks for it.
 */
export function CalculatorReveal({ preset, trade }: { preset?: CalculatorPreset; trade?: string }) {
  const [open, setOpen] = useState(false);
  if (open) return <CostCalculator preset={preset} trade={trade} buildLink={false} />;
  return (
    <button type="button" className="ce-chip ce-reveal" aria-expanded="false" onClick={() => setOpen(true)}>
      What are missed calls costing you? Work it out →
    </button>
  );
}
