# 02 · Trade illustrations and mock UI images

## Goal
Show the systems working rather than describing them: simple, on-brand SVGs of a phone or dashboard doing the job for each trade.

## Style
Match `public/architecture/*.svg`: flat line art, ink `#151615`, signal yellow `#dfff2f`, surface `#fbfaf5` (the `--ink`, `--signal` and `--surface` tokens), 1.5 to 2px strokes, no gradients, no stock photos, no real business names or logos. Every file carries the text `ILLUSTRATIVE ONLY` in small mono type, as the architecture SVGs do.

## Files to create
- `public/salons/`: booking confirmation on a phone; a reminder text the day before; a rebooking prompt.
- `public/groomers/`: missed call becoming a text with a booking link; a "next groom due" reminder.
- `public/garages/`: an MOT reminder text; a quote follow-up after three days; a job list with statuses.
- `public/cafes/`: orders and messages in one inbox; a review request after a visit.
- `public/clinics/`: an intake form sent before the first appointment; a reminder the day before.
- `public/mock/`: three generic mock screens for the homepage (missed call becoming a text; enquiries in one list; a weekly summary email).

Each SVG must be under 12 KB, have a `viewBox`, `role="img"` and a `<title>`, and use no external fonts (use `font-family="monospace"` or `sans-serif`).

## Acceptance criteria
- Every file contains `ILLUSTRATIVE ONLY`. Add a test like the architecture one in `tests/static-export.test.mjs`.
- No real names, phone numbers, emails or addresses. Use `yourbusiness.co.uk` and first names only.

## Don't touch
Page copy or prices. Brief 01 wires the files into the guides.
