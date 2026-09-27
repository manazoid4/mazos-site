'use client';

import { track } from '@vercel/analytics';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Conversion events for Vercel Web Analytics. Custom events only show in the
 * dashboard on a paid Vercel plan; on Hobby the calls are harmless no-ops, so
 * the site is ready the day the plan changes.
 */
export type ConversionEvent = 'Check submitted' | 'Enquiry sent' | 'Call clicked' | 'Pricing viewed';

export function trackConversion(name: ConversionEvent, data?: Record<string, string>) {
  try {
    track(name, data);
  } catch {
    // Analytics must never break a form or a link.
  }
}

/** Outbound link to the 15-minute call that records where it was clicked. */
export function CallLink({ href, placement, className, children }: { href: string; placement: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer" onClick={() => trackConversion('Call clicked', { placement })}>
      {children}
    </a>
  );
}

/** Fires one "Pricing viewed" event the first time the wrapped section is half on screen. */
export function PricingViewTracker({ targetId }: { targetId: string }) {
  const sent = useRef(false);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      if (sent.current || !entries.some((entry) => entry.isIntersecting)) return;
      sent.current = true;
      trackConversion('Pricing viewed', { page: window.location.pathname });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);
  return null;
}
