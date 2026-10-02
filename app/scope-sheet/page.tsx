import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { ScopeSheet } from './scope-sheet';

/**
 * Scope sheet / proposal generator (plan v3, C10). Every quote reads from
 * app/offers.ts, so no two quotes clash. Maz opens
 * /scope-sheet?package=Starter%20Automation&jobs=missed-call&business=Hollybank%20Plumbing&trade=trades
 * tweaks nothing by hand, prints to PDF, sends. The visitor can open the same
 * link from their free plan and see exactly what they'd be buying.
 */
export const metadata: Metadata = {
  title: 'Scope sheet',
  description: 'What is built, what isn’t, the date and the price, before you pay anything.',
  alternates: { canonical: '/scope-sheet' },
  robots: { index: false, follow: true },
};

export default function ScopeSheetPage() {
  return (
    <main className="s-home">
      <SiteHeader />
      <ScopeSheet />
      <SiteFooter />
    </main>
  );
}
