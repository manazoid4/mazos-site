'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { linkedInHref } from './linkedin-source';

/** A normal server-rendered link, enhanced with the incoming LinkedIn tag. */
export function CampaignLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const [search, setSearch] = useState('');
  useEffect(() => { setSearch(window.location.search); }, []);
  return <a className={className} href={linkedInHref(href, search)}>{children}</a>;
}
