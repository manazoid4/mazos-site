'use client';

import { useEffect } from 'react';

/**
 * One observer for the whole page (29 Sep, Codex brief 05, built by Claude):
 * - `[data-reveal]` sections ease in once, the first time they are 15% visible.
 *   Content is only hidden after this mounts (`.js-reveal` on <html>), so a page
 *   without JavaScript shows everything.
 * - `[data-pause-offscreen]` (the hero demo) pauses its CSS loop while off-screen.
 * Reduced motion: CSS shows everything with no movement.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');

    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-shown', 'true');
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((element) => reveal.observe(element));

    const pause = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting);
    });
    document.querySelectorAll('[data-pause-offscreen]').forEach((element) => pause.observe(element));

    return () => {
      reveal.disconnect();
      pause.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);

  return null;
}
