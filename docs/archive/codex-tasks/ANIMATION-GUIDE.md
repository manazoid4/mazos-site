# Animation guide for agents (30 Sep 2026)

Read this before adding or changing any motion on mazworks.uk. It comes from people known for great interface animation:
- Emil Kowalski ("7 Practical Animation Tips", "Great Animations", emilkowal.ski)
- Jhey Tompkins (@jh3yy, CSS scroll-driven animation)
- Moritz Petersen (@moritzpetersen, meaningful scroll animation)
- Rauno Freiberg (@raunofreiberg, interaction design at Vercel)

Checked 30 Sep 2026.

## The one rule
Animate only when the motion **explains something** (how a system works, what changed, what happens next). If it only decorates, remove it.

## Two kinds of motion on this site
| Kind | Examples | Speed and easing |
|---|---|---|
| **Interface feedback** | button press, tab switch, chip select, menu open | Fast: 125–200ms, never over 300ms. `ease-out`. |
| **Storytelling** | plug hero, explainer scenes, messy inbox → one list, "how it works" line, "live in 7 days" calendar | Deliberate: steps 400–700ms each, `cubic-bezier(.2,.8,.2,1)`, staggered so the eye can follow. |

## Practical rules
1. **Tap feedback:** buttons and chips scale to `0.97` on `:active` (≈100ms). The site should feel solid on a phone.
2. **Never pop in from nothing:** enter from `scale(.9)` or more, plus opacity, never `scale(0)`.
3. **Enter and exit with `ease-out`.** Avoid `ease-in` for UI; it feels slow.
4. **Play once:** explainers and scroll pictures play once when first seen. Only the hero plug loops, gently, and it pauses off-screen.
5. **Don't animate what people see over and over** (menus, the sticky button, form fields). Repeated motion feels slow.
6. **Interruptible:** a tap on a tab switches straight away, never waiting for an animation to finish.
7. **Scroll-drawn lines in pure CSS:** use an SVG path with `pathLength="1"` and animate `stroke-dashoffset` from 1 to 0. Where supported, drive it with `animation-timeline: view()` inside `@supports`, and fall back to the existing `data-reveal` observer (`app/scroll-reveal.tsx`). No new JS libraries.
8. **Progress rings or countdowns** (the "live in 7 days" calendar) use `stroke-dashoffset` on a circle.
9. **If something still looks off,** a tiny `filter: blur(2px)` on the entering frame can hide it. Use rarely.

## Non-negotiables (tests and Maz's rules)
- **Only `transform`, `opacity` and `stroke-dashoffset` animate.** Never width, height, top or margin. CLS stays 0.
- **`prefers-reduced-motion: reduce` shows the finished frame.** Nothing moves and nothing is hidden.
- **Always write the full `animation:` shorthand including the keyframe name.** The CSS minifier turns a nameless shorthand into `animation: none`. Add every new keyframe name to the test "the hero demo animation survives CSS minification" in `tests/static-export.test.mjs`.
- **Loops pause off-screen** with `data-pause-offscreen`.
- **Speed:** Lighthouse mobile on `/` stays at 95+ performance with TBT under 200ms. No animation libraries: CSS and SVG only, plus the one small observer that already exists.
- **Calm, not flashy:** no bouncing, flashing, parallax, or text that animates letter by letter.

## Quick check before a PR
- [ ] Does each animation explain something?
- [ ] Are interface animations under 200ms?
- [ ] Do storytelling animations play once, or loop gently while pausing off-screen?
- [ ] Does reduced motion show the finished picture?
- [ ] Is CLS 0, and is Lighthouse mobile 95+?
- [ ] Are new keyframe names added to the minification test?
