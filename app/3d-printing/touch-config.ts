export type TouchBundleId = 'touch-one' | 'touch-three' | 'touch-carry';
export type IntendedUseId = 'reviews' | 'menu-orders' | 'bookings' | 'socials' | 'website' | 'other';

export const TOUCH_PRICING = {
  artworkAddOnPrice: 10,
  bundles: [
    {
      id: 'touch-one',
      name: 'Touch One',
      basePrice: 29,
      short: 'For one simple action, such as opening your Google review page.',
      contents: [
        'One compact stand and one tap disc (removable)',
        '1 link + matching QR backup',
        'Business name in plain text',
        'Black-and-white finish + link setup',
      ],
      image: '/objects/touch-one.webp',
      imageAlt: 'Concept render of one rounded black Touch stand with one removable white tap disc',
      imageWidth: 1200,
      imageHeight: 1200,
    },
    {
      id: 'touch-three',
      name: 'Touch Three',
      basePrice: 49,
      short: 'For your menu, reviews and bookings — all on one stand.',
      contents: [
        'One stand with three removable tap discs',
        'Up to 3 links',
        'Matching QR backup for each destination',
        'Business name, black-and-white finish + link setup',
      ],
      image: '/objects/touch-three-hero.webp',
      imageAlt: 'Concept render of a rounded black angled Touch stand with three removable white tap discs',
      imageWidth: 1536,
      imageHeight: 1024,
    },
    {
      id: 'touch-carry',
      name: 'Touch + Carry',
      basePrice: 79,
      short: 'A three-link stand plus five keyrings to share your business on the go.',
      contents: [
        'Everything in Touch Three',
        '5 matching tap keyrings',
        'Keyrings share 1 link',
        'Keyring setup included; no QR codes on keyrings',
      ],
      image: '/objects/touch-carry-bundle.webp',
      imageAlt: 'Concept render of one three-disc Touch stand and exactly five matching tap keyrings',
      imageWidth: 1536,
      imageHeight: 1024,
    },
  ],
} as const;

export const INTENDED_USES: ReadonlyArray<{ id: IntendedUseId; label: string }> = [
  { id: 'reviews', label: 'Reviews' },
  { id: 'menu-orders', label: 'Menu / orders' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'socials', label: 'Socials' },
  { id: 'website', label: 'Website' },
  { id: 'other', label: 'Other' },
];

export function getTouchBundle(id: TouchBundleId) {
  const bundle = TOUCH_PRICING.bundles.find((candidate) => candidate.id === id);
  if (!bundle) throw new Error(`Unknown Touch bundle: ${id}`);
  return bundle;
}

export function getTouchEstimate(id: TouchBundleId, artwork: boolean) {
  return getTouchBundle(id).basePrice + (artwork ? TOUCH_PRICING.artworkAddOnPrice : 0);
}
