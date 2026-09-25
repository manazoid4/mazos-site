export type TouchBundleId = 'touch-one' | 'touch-three' | 'touch-carry';
export type IntendedUseId = 'reviews' | 'menu-orders' | 'bookings' | 'socials' | 'website' | 'other';

export const TOUCH_PRICING = {
  artworkAddOnPrice: 10,
  bundles: [
    {
      id: 'touch-one',
      name: 'Touch One',
      basePrice: 29,
      short: 'One clear customer action in a compact stand.',
      contents: [
        'One compact stand with one tap point',
        '1 link + matching QR backup',
        'Your business name in raised text',
        'Black-and-white finish + setup included',
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
      short: 'Three useful customer actions in one low stand.',
      contents: [
        'One stand with three tap points',
        'Up to 3 different links',
        'Matching QR backup for each link',
        'Your business name + setup included',
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
      short: 'The three-tap stand plus five matching keyrings.',
      contents: [
        'Everything in Touch Three',
        '5 matching tap keyrings',
        'Keyrings open one chosen link',
        'Setup included',
      ],
      image: '/objects/touch-carry-bundle.webp',
      imageAlt: 'Concept render of one three-tap Touch stand and exactly five matching tap keyrings',
      imageWidth: 1536,
      imageHeight: 1024,
    },
  ],
} as const;

export const INTENDED_USES: ReadonlyArray<{ id: IntendedUseId; label: string }> = [
  { id: 'reviews', label: 'Google reviews' },
  { id: 'menu-orders', label: 'Menu / ordering' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'socials', label: 'Social media' },
  { id: 'website', label: 'Website' },
  { id: 'other', label: 'Something else' },
];

export function getTouchBundle(id: TouchBundleId) {
  const bundle = TOUCH_PRICING.bundles.find((candidate) => candidate.id === id);
  if (!bundle) throw new Error(`Unknown Touch bundle: ${id}`);
  return bundle;
}

export function getTouchEstimate(id: TouchBundleId, artwork: boolean) {
  return getTouchBundle(id).basePrice + (artwork ? TOUCH_PRICING.artworkAddOnPrice : 0);
}
