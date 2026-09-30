'use client';

import type { ReactNode } from 'react';

/** Event the free-plan form listens for, so a price card can pre-fill it. */
export const CHECK_PICK_EVENT = 'maz-check-pick';

/**
 * A price-card link that goes to the free plan form with that package or
 * add-on already named, so the owner has less to type. On the same page it
 * scrolls to the form; on another page it carries `?package=` in the URL.
 * Without JavaScript it is a plain link to the form.
 */
export function PackageLink({ href, pick, className = 'mw-service-link', children }: { href: string; pick: string; className?: string; children: ReactNode }) {
  const samePage = false;
  const base = href.startsWith('#') ? '/leak-check?src=home-price' : href;
  const url = `${base}${base.includes('?') ? '&' : '?src=price-card&'}package=${encodeURIComponent(pick)}#leak-check-form`;
  return (
    <a
      className={className}
      href={url}
      onClick={(event) => {
        if (!samePage || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        window.dispatchEvent(new CustomEvent(CHECK_PICK_EVENT, { detail: pick }));
      }}
    >
      {children}
    </a>
  );
}
