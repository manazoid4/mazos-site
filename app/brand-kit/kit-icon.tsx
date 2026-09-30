/** Bold line icons for the Brand Kit page. Decorative: the label next to each one carries the meaning. */
const PATHS: Record<string, string> = {
  dumbbell: 'M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  gift: 'M4 11h16v10H4zM3 7h18v4H3zM12 7v14M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0',
  cake: 'M4 21h16v-8H4zM4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0M12 13V9M12 6a1 1 0 1 0 0-.1',
  scissors: 'M6 9a3 3 0 1 0 0-.1M6 18a3 3 0 1 0 0-.1M8.5 7.5 20 18M8.5 16.5 20 6',
  camera: 'M3 8h4l2-3h6l2 3h4v12H3zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7',
  brush: 'M18 3 9 12M9 12c-3 0-4 2-4 4s-1 3-2 4c4 1 8-1 8-5z',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3M20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3',
  palette: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-2 0-3h3a4 4 0 0 0 4-4c0-5-4-9-9-9M7.5 11h.01M10 7h.01M15 7h.01',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  phone: 'M7 2h10v20H7zM11 18h2',
  layers: 'M12 3 2 8l10 5 10-5zM2 13l10 5 10-5M2 17.5l10 5 10-5',
  cart: 'M3 4h2l2.5 11h11L21 8H6.5M9 20h.01M18 20h.01',
  pin: 'M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  chat: 'M4 5h16v11H9l-5 4z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  calendar: 'M4 5h16v16H4zM4 10h16M9 3v4M15 3v4',
  star: 'M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4l-5.5 2.9 1-6.2L3 9.7l6.2-.9z',
  repeat: 'M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4',
};

export function KitIcon({ name }: { name: string }) {
  return (
    <svg className="bk-icon" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name] ?? PATHS.star} />
    </svg>
  );
}
