'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Tab = { id: string; label: string; durationMs: number };

/**
 * Tabs over the animated explainers. Without JavaScript every scene shows,
 * stacked (a <noscript> style un-hides them). With it, one scene shows at a
 * time and the next plays after the current one finishes, until the visitor
 * picks a tab themselves. Nothing auto-advances off-screen or for visitors
 * who prefer reduced motion.
 */
export function ScenePlayer({ tabs, children }: { tabs: Tab[]; children: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (picked || !visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % tabs.length), tabs[active].durationMs);
    return () => window.clearTimeout(timer);
  }, [active, picked, visible, tabs]);

  return (
    <div className="s-player" ref={rootRef}>
      <div className="s-player-tabs" role="tablist" aria-label="Pick a system to see it working">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`scene-tab-${tab.id}`}
            aria-selected={index === active}
            aria-controls={`scene-${tab.id}`}
            tabIndex={index === active ? 0 : -1}
            onKeyDown={(event) => {
              const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
              if (next < 0) return;
              event.preventDefault(); setActive(next); setPicked(true);
              document.getElementById(`scene-tab-${tabs[next].id}`)?.focus();
            }}
            onFocus={() => setPicked(true)}
            onClick={() => { setActive(index); setPicked(true); }}
          >
            {tab.label}
            {index === active && !picked ? <span className="s-player-progress" style={{ animationDuration: `${tab.durationMs}ms`, animationPlayState: visible ? 'running' : 'paused' }} aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
      {children.map((child, index) => (
        <div
          key={tabs[index].id}
          id={`scene-${tabs[index].id}`}
          role="tabpanel"
          aria-labelledby={`scene-tab-${tabs[index].id}`}
          className="s-scene-panel"
          hidden={index !== active}
        >
          {child}
        </div>
      ))}
      <div className="s-scene-action"><a className="button button-signal" href={`/leak-check?src=scene-${tabs[active].id}#leak-check-form`}>Get a free plan and price</a><p className="s-small">No call, no obligation.</p></div>
      <noscript><style>{'.s-scene-panel[hidden]{display:block;visibility:visible}.s-scene-panel{grid-row:auto}.s-player-tabs{display:none}'}</style></noscript>
    </div>
  );
}
