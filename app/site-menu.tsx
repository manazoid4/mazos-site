'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { NAV_GROUPS } from './nav';

/**
 * Phone menu. A labelled "Menu" button (not a bare icon) opens every route,
 * grouped the same way as the footer. Closes on a link tap, Escape or a tap outside.
 */
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.dataset.menuOpen = '';
    else delete document.body.dataset.menuOpen;
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const onClick = (event: MouseEvent) => { if (wrap.current && !wrap.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);

  return (
    <div className="mw-menu" ref={wrap}>
      <button type="button" className="mw-menu-button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true" className="mw-menu-icon" />
        {open ? 'Close' : 'Menu'}
      </button>
      <div className="mw-menu-panel" id={panelId} hidden={!open}>
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p>{group.title}</p>
            <ul>
              {group.links.map((link) => <li key={link.href}><a href={link.href} onClick={() => setOpen(false)}>{link.label}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
