import type { CustomerTypeId } from './offers';

/**
 * Real case studies, added only with the client's written permission
 * (audit 2 Oct, finding 6). Empty until one is approved: the pages render
 * nothing for an empty slot, so nothing here is ever invented.
 */
export type CaseStudy = {
  type: CustomerTypeId;
  business: string;
  /** What was set up, in plain words. */
  built: string;
  /** Only a result the client has confirmed in writing; otherwise omit. */
  result?: string;
  /** Their words, quoted with permission. */
  quote?: string;
  href?: string;
};

export const CASE_STUDIES: CaseStudy[] = [];
