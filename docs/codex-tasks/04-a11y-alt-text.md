# 04 · Alt text and accessibility pass

## Goal
Lighthouse accessibility stays at 100 across every route, and every image tells a screen-reader user something useful.

## Do
1. Run Lighthouse mobile (or axe) on every route in `out/` after `npm run build`. List the failures in the PR description.
2. Every `<img>` gets a specific `alt` (what it shows and why it matters), or `alt=""` if it's decorative. Never write "image of".
3. Check colour contrast for the new homepage parts in `app/sales.css` (`.s-demo-*`, `.s-trades`, `.s-running-*`), including focus rings on the trade cards.
4. Check that the form's chip buttons expose `aria-pressed` and that errors are announced (`role="alert"`). This already works; add a test so it stays that way.
5. Check that tab order on the homepage matches the visual order.

## Acceptance criteria
- Accessibility is 100 on `/`, `/leak-check`, `/prices`, `/for/*`, `/work/*`, `/faq` and `/contact`.
- `npm run verify` passes.

## Don't touch
Copy meaning, prices or layout order.
