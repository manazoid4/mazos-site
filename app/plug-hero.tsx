/**
 * The idea in one picture: Maz Works plugs into the tools a business already
 * uses. The plug slides in, the strip lights up and each tool gets a wire and
 * a tick. Pure SVG + CSS (no JavaScript); only transform, opacity and
 * stroke-dashoffset animate, so nothing shifts. Reduced motion shows the
 * finished, plugged-in picture. Pauses off-screen via scroll-reveal.tsx.
 */
const TOOLS = [
  { label: 'Phone calls', icon: 'M8 4h3l1.5 4-2 1.5a10 10 0 0 0 4 4l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 6 6a2 2 0 0 1 2-2Z' },
  { label: 'Booking app', icon: 'M5 7h14v12H5ZM5 11h14M9 4v5M15 4v5' },
  { label: 'Email and web forms', icon: 'M4 7h16v11H4ZM4 7l8 6 8-6' },
  { label: 'Google reviews', icon: 'M12 4l2.4 5 5.3.6-4 3.6 1.2 5.3L12 15.8 7.1 18.5l1.2-5.3-4-3.6 5.3-.6Z' },
];

export function PlugHero() {
  return (
    <figure className="s-plug" data-pause-offscreen aria-labelledby="plug-caption">
      <svg viewBox="0 0 440 324" role="img" aria-label="Your phone, booking app, email and Google reviews, with a Maz Works plug connecting them all">
        <rect className="s-plug-bus" x="250" y="20" width="14" height="284" rx="7" />
        {TOOLS.map((tool, index) => {
          const y = 20 + index * 76;
          return (
            <g key={tool.label} style={{ ['--d' as string]: `${1.6 + index * 0.6}s` }}>
              <rect className="s-plug-tile" x="8" y={y} width="196" height="56" rx="14" />
              <circle className="s-plug-icon-bg" cx="38" cy={y + 28} r="17" />
              <path className="s-plug-icon" d={tool.icon} transform={`translate(26 ${y + 16})`} />
              <text className="s-plug-label" x="64" y={y + 33}>{tool.label}</text>
              <line className="s-plug-wire" x1="204" y1={y + 28} x2="250" y2={y + 28} />
              <g className="s-plug-tick">
                <circle cx="186" cy={y + 12} r="9" />
                <path d={`M181.5 ${y + 12}l3 3 5.5-6`} />
              </g>
            </g>
          );
        })}
        <g className="s-plug-plug">
          <rect className="s-plug-prong" x="264" y="146" width="24" height="9" rx="2" />
          <rect className="s-plug-prong" x="264" y="178" width="24" height="9" rx="2" />
          <rect className="s-plug-body" x="286" y="124" width="124" height="86" rx="20" />
          <text className="s-plug-name" x="348" y="164">Maz Works</text>
          <text className="s-plug-sub" x="348" y="186">your systems</text>
          <path className="s-plug-cable" d="M410 167c24 0 26 60 30 150" />
        </g>
      </svg>
      <figcaption id="plug-caption" className="s-small">I plug into what you already use. No new app for you or your customers.</figcaption>
    </figure>
  );
}
