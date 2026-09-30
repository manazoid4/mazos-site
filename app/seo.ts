import { OFFERS } from './offers';

const STARTER_PRICE = OFFERS[0].price;

/** Search engines cut titles near 60 characters and descriptions near 155 (brief 03). */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

/** Trim to the last whole sentence that fits, or the last whole word. */
export function fitDescription(text: string, max = DESCRIPTION_MAX): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > max * 0.5) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '')}…`;
}

/** Numeric price for structured data, e.g. "From £1,950" → 1950. */
export function priceNumber(price: string): number {
  return Number(price.replace(/[^\d.]/g, ''));
}

export const SITE_TITLE = `Automation for UK small businesses, from ${STARTER_PRICE} | Maz Works`;
export const SITE_DESCRIPTION = `I build the systems that turn enquiries into paying customers: missed calls texted back, reminders, reviews and follow-ups. From ${STARTER_PRICE}, no VAT added.`;

export const OG_IMAGE = {
  url: '/og-card.png',
  width: 1200,
  height: 630,
  alt: `Maz Works: I build the systems that turn enquiries into paying customers. Automation from ${STARTER_PRICE}.`,
};
