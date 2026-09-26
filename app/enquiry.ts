import { CONTACT_EMAIL, FORM_DELIVERY_EMAIL } from './site';

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_DELIVERY_EMAIL}`;
export const NATIVE_FORM_ENDPOINT = `https://formsubmit.co/${FORM_DELIVERY_EMAIL}`;

/** Default time before a hung submission is abandoned so the button never sticks on "Sending…". */
export const SUBMIT_TIMEOUT_MS = 15000;

/**
 * Service context for an enquiry. `id` is what a CTA passes in `?service=`,
 * `label` is what the visitor sees and what arrives in the email.
 */
export const ENQUIRY_SERVICES = [
  { id: 'leak-check', label: 'Free Booking & Enquiry Check: review my website' },
  { id: 'repair', label: 'Booking & Enquiry Repair (£395)' },
  { id: 'google-profile', label: 'Google Profile & Contact Setup (£249)' },
  { id: 'bundle', label: 'Both — Repair and Setup (£595)' },
  { id: 'website', label: 'Website or landing page' },
  { id: 'rebuild', label: 'Full rebuild' },
  { id: 'growth', label: 'More customers: reviews, bookings, enquiries' },
  { id: 'automation', label: 'Automation and repetitive admin' },
  { id: 'software', label: 'Internal tool, AI feature or custom software' },
  { id: 'objects', label: 'Physical product linked to a digital action' },
  { id: 'unsure', label: 'Not sure yet — help me work it out' },
] as const;

export type EnquiryServiceId = (typeof ENQUIRY_SERVICES)[number]['id'];

export const DEFAULT_SERVICE_ID: EnquiryServiceId = 'unsure';

/**
 * Next step the visitor actually wants. A free demo stays the headline route, but an
 * enquiry must be able to ask for a quote or a plain answer without requesting unpaid work.
 */
export const ENQUIRY_NEXT_STEPS = [
  'A free live demo built around my problem',
  'A Microsoft Teams walkthrough',
  'A quote and scope for a specific job',
  'Just answer my question first',
] as const;

export const DEFAULT_NEXT_STEP = ENQUIRY_NEXT_STEPS[0];

/**
 * Reads `?service=` from the current URL. Used from an effect rather than
 * `useSearchParams` so the static export keeps prerendering these pages.
 */
export function readServiceFromLocation(): EnquiryServiceId | null {
  if (typeof window === 'undefined') return null;
  const requested = new URLSearchParams(window.location.search).get('service');
  if (!requested) return null;
  const match = ENQUIRY_SERVICES.find((service) => service.id === requested.toLowerCase());
  return match ? match.id : null;
}

export type EnquiryResult = { ok: true } | { ok: false; reason: 'rejected' | 'timeout' | 'network' };

/** Posts the enquiry and normalises FormSubmit's `success: "false"` body into a real failure. */
export async function sendEnquiry(payload: Record<string, string>, timeoutMs = SUBMIT_TIMEOUT_MS): Promise<EnquiryResult> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const body = await response.json().catch(() => null) as { success?: boolean | string } | null;

    // The timer can fire after a successful status but while the body is still being
    // read. That rejection is swallowed above, so check the signal rather than treat an
    // unread body as delivered — FormSubmit reports rejections in the body, not the status.
    if (controller.signal.aborted) return { ok: false, reason: 'timeout' };

    const confirmed = body?.success === true || body?.success === 'true';
    if (!response.ok || !confirmed) return { ok: false, reason: 'rejected' };
    return { ok: true };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return { ok: false, reason: 'timeout' };
    return { ok: false, reason: 'network' };
  } finally {
    window.clearTimeout(timer);
  }
}

/**
 * Builds a mailto link carrying everything the visitor typed, so a failed
 * submission is still a recoverable enquiry rather than a lost one.
 */
export function buildRecoveryMailto(subject: string, fields: Array<[string, string]>): string {
  const body = fields
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
