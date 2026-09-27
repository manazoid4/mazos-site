'use client';

import { usePathname } from 'next/navigation';
import { PRIMARY_NAV } from './nav';

/** Header links that mark the section you're in, like the big sites do. */
export function NavLinks() {
  const pathname = usePathname() || '/';
  return (
    <>
      {PRIMARY_NAV.map((link) => {
        const base = link.href.split('#')[0] || '/';
        const current = base !== '/' && (pathname === base || pathname.startsWith(`${base}/`));
        return <a key={link.href} className="mw-nav-link" href={link.href} aria-current={current ? 'page' : undefined}>{link.label}</a>;
      })}
    </>
  );
}
