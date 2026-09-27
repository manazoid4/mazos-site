'use client';

import { useEffect, useState } from 'react';
import { CHECK_REPLY_TIME } from './site';

/**
 * Phone-only bar that keeps the free check one tap away. It hides while the
 * check form itself is on screen so it never covers the fields.
 */
export function StickyCheckCta({ href, hideWhenVisible }: { href: string; hideWhenVisible?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!hideWhenVisible || typeof IntersectionObserver === 'undefined') return;
    const target = document.getElementById(hideWhenVisible);
    if (!target) return;
    const observer = new IntersectionObserver((entries) => setHidden(entries.some((entry) => entry.isIntersecting)), { threshold: 0.05 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenVisible]);

  return (
    <div className={`s-sticky${hidden ? ' s-sticky-hidden' : ''}`} aria-hidden={hidden || undefined}>
      <a className="button button-signal" href={href} tabIndex={hidden ? -1 : undefined}>Free plan and price</a>
      <span>Free · reply in {CHECK_REPLY_TIME}</span>
    </div>
  );
}
