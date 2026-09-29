# 05 · Scroll reveal component

## Goal
Sections ease into view as the owner scrolls, so the page feels alive, without costing speed or moving anything.

## Spec
- A small client component, `app/reveal.tsx`, that exports `<Reveal as="section" ...>`. It uses one shared `IntersectionObserver` and adds `data-shown="true"` once an element is 15% visible. It never un-reveals.
- CSS in `app/sales.css`: `[data-reveal]` starts at `opacity: 0; transform: translateY(12px)` and moves to `opacity: 1; transform: none` over 400ms ease-out. Animate only opacity and transform (no layout properties), so CLS stays 0.
- **No JavaScript, no hiding:** content must be visible if JS fails. Only hide once the component has mounted; add a `.js-reveal` class to `<html>` from the component, and scope the hidden state to `.js-reveal [data-reveal]:not([data-shown])`.
- `@media (prefers-reduced-motion: reduce)`: no transform or transition; content is always visible.
- Apply it to the homepage sections `#trades`, `#running`, `#example` and `#pricing`. Not to the hero; the hero already has its own animation in `app/hero-demo.tsx`.
- Stagger the cards in `.s-trades` and `.s-running` by 60ms each, using a CSS variable `--i` set inline.

## Acceptance criteria
- Lighthouse mobile on `/`: performance 95+, CLS 0, TBT does not rise by more than 20ms.
- With JS disabled, every section is visible (add a test that the built HTML has no inline `opacity:0`).
- `npm run verify` passes.

## Don't touch
The hero demo, copy and prices.
