# 3. Design and pages

## Look
- Base palette (`app/colour.css`): sand, sage, mist, clay, wheat, deep green `--deep`, ink text. Orange `--signal` is the action colour only (buttons).
- Creator pages (`/brand-kit`, the creators card on `/for`) are deliberately brighter. Six tones: pink `#ff5fa2`, lime `#b6f33a`, violet `#7c6cff`, amber `#ffb020`, teal `#22c7b8`, orange `#ff6b1a`. Always dark ink text, 2px ink borders and a hard offset shadow.
- Icons: `app/brand-kit/kit-icon.tsx` is the one icon set (inline SVG paths, 24px grid, 2.2 stroke, round caps). Add an icon by adding one path string. Icons are decorative (`aria-hidden`); a visible label carries the meaning.

## Building a page
1. Copy an existing page (`app/linkedin/page.tsx` is the smallest). Keep `SiteHeader` and `SiteFooter`, one `<h1>`, and `id="main-content"` on the first section.
2. Export `metadata` with title, description (use `fitDescription`) and `alternates.canonical`.
3. Add it to `app/sitemap.ts` (unless noindex). Link it from `app/nav.ts` if it matters. The phone menu stays at 7 links.
4. One job per screen. If a section needs more than three short lines of explanation, cut it.
5. Mobile first. Check 390px, then 768 and 1440. No horizontal scroll. Tap targets 44px or more.
6. Respect `prefers-reduced-motion`.

## Decluttering rule
Fewer sections, fewer words, one clear next step per page. Cards in a list show a label and one line. Extra detail goes to `/prices` or `/what-we-do`, not everywhere.
