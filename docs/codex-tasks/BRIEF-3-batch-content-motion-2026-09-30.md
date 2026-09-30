# Build brief: content first, motion, seamless (3 batches)

Status: WAITING FOR MAZ TO CONFIRM. Do not start until he says go.
Base: `main` at the PR #89 merge (the live look, including "What changes in your day").
Branch: `claude/mazos-site-sales-overhaul-stekjl`. Open one PR per batch. Merge each only when it is green and Maz has seen the preview.

## Rules for every batch (non-negotiable)
- Keep the live look: the current fonts, weights and hard borders. The only palette change is the Batch 1 orange swap. Do not redesign.
- Prices only from `app/offers.ts`. No invented clients, reviews, logos, stats or results. No "AI" in the offer. Never "quick fixes", "small fixes" or "website repairs".
- No new JS animation libraries. Use CSS first, then tiny client islands only if needed.
- Every animation:
  - uses a full `animation:` shorthand with the keyframe name, because the minifier drops nameless shorthand;
  - animates only `transform` and `opacity`, with two exceptions: `stroke-dashoffset` for drawn lines and icons (per ANIMATION-GUIDE.md), and `height` via `interpolate-size` on `<details>`, which may move content only below the element the visitor opened;
  - pauses off-screen with `data-pause-offscreen` / `data-offscreen`;
  - is static under `prefers-reduced-motion`;
  - is visible without JS.
- Budgets:
  - Lighthouse mobile 95+ performance and 100 accessibility on `/`, `/prices`, `/leak-check` and one `/for/*` page;
  - CLS 0;
  - TBT under 200ms.
- Before each PR:
  - run `npm run verify`;
  - take 390px and 1280px screenshots of every changed page;
  - list any `TODO(Maz)` items.

## What the audit found
Competitors:
- Zaps Studio sells a fixed price from about £800, with delivery in 2–8 weeks. It stresses "you own the workflows" and a free 30-minute audit first.
- MQLFlow lists £800 set-up and £3,200 strategy prices.
- Missed-call text-back sellers charge about $79 a month and lead with the money lost per missed call.

Popular product sites (Stripe, Linear, Attio):
- a product in motion in the hero;
- scroll-driven storytelling;
- smooth page-to-page transitions;
- one clear promise above the fold.

Where Maz Works already wins:
- a £195 entry point, the lowest of those checked;
- plain English;
- the trade picker;
- the 7-working-day guarantee.

Gaps in our site:
1. Above the fold says one feature (missed calls), not what Maz Works does. The three packages sit far down the page.
2. 15 pages have titles over 60 characters or descriptions over 155. The homepage title is 87 characters and its description 250, so they get cut off in Google.
3. There is no Service structured data, so Google can't show the packages.
4. The fixes in PR #88 (accessibility, skip links, SEO) never reached main. PR #88 itself carries the rejected look and must not be merged.
5. "Who owns it" is not stated anywhere. Competitors use it as a trust point, and ours is true: it runs on the client's own tools.
6. `/whats-new` was last updated 27 Sep.
7. There are 10 overlapping CSS files (3,785 lines) with patch layers: friction-pass, final-friction, clean-pass, simplified. This slows every change and risks visual bugs.
8. Guide pages (`/for/*`) have no visuals of the system working. The day scenes exist but only on the homepage.

## Batch 1: Content first (what we do, clearly)
Goal: a visitor knows in 5 seconds what Maz Works does, what it costs to start and what to do next.
1. **Hero:** H1 states the job in plain words, for example "Systems that turn enquiries into bookings and take admin off your plate." Keep the phone animation as the proof on the right. Under the H1:
   - three outcome chips labelled as examples across packages, e.g. "What clients choose: every enquiry answered · fewer no-shows · hours back each week";
   - separately, the Starter price read from offers with its one-job scope, e.g. "Start with one job from £195".

   Never place the chips so the entry price reads as including all three outcomes, because reminders and other add-ons are priced separately in `offers.ts`.
2. **New "What I build" strip** straight after the hero: the three packages as outcome cards, each with the name, the price from offers, one line on who it's for and "Working by …" from the comparison table. Each card links to `/prices#<id>`.
3. **Reorder the homepage:** Hero → What I build → What changes in your day → Pick your trade → Example plan → Free plan form → Prices → How it works → About → FAQ.
4. **Trust line** (true facts only): "Runs on the tools you already use. You own it. Fixed price, agreed first." Keep the 7-day guarantee next to the prices.
5. **Port the invisible PR #88 fixes onto main:**
   - `fitDescription` and title/description limits in `seo.ts`;
   - short titles and descriptions on all 15 flagged pages;
   - Service JSON-LD from offers on `/prices` and `/for/*`;
   - `faqs.ts` and `enquiry.ts` read prices from offers;
   - contrast fixes on rotareason and objects;
   - skip-link targets;
   - the tests that go with these.

   Do not port the look.
6. Update `/whats-new` with this week's work.
7. **Colour: hi-vis orange** (Maz chose it on 30 Sep, after research against Impeccable's warning that AI-made sites default to a cream background, or near-black with one neon accent, plus the Radix and Refactoring UI colour-role guidance). Change the tokens only, in `globals.css`:
   - `--paper` `#f6f6f3` replaces the cream;
   - `--surface` `#ffffff`;
   - `--signal` `#ff6b1a`, used only as a fill behind ink text (6.4:1) and always with an ink border, because orange against the canvas is only 2.7:1;
   - new `--signal-text` `#c2410c` for any orange text or links (4.8:1);
   - new `--ok` `#0f7a4f` for result and success states (white text 5.4:1);
   - `--soft-line` `#c9cbc6`.

   Never put orange text on the canvas at `--signal`, and never pair orange with cream. Grep for any hard-coded lime or cream values and replace them with tokens.

Done when:
- all 15 pages pass the title/description tests;
- the Service schema test passes;
- the homepage above the fold at 390px shows the H1, the price and the CTA;
- the word budget still passes (raise it only with a dated comment);
- Lighthouse is on budget;
- colour contrast passes on every route (Lighthouse accessibility 100), with no leftover `#dfff2f` or `#f3f0e8`.

## Batch 2: Motion and visual effects (smooth, not flashy)
Goal: the site feels alive and joined up without slowing down.
1. **Scroll-driven reveals:** use CSS `animation-timeline: view()` inside `@supports`, with the current IntersectionObserver reveal as the fallback. Section headings and cards rise and fade in with a small 40–60ms stagger.
2. **"What I build" cards:**
   - hover and focus lift, with a border shift to signal;
   - an icon that draws its line in (`stroke-dashoffset`) once, when first seen.
3. **Hero phone polish:** smoother typing dots, a subtle "Delivered" tick pop, and a gentle 1–2px float. It must still pause off-screen.
4. **Day scenes:**
   - animated progress line joining the 3 steps;
   - the result bar slides in after the steps;
   - a small swipe gesture for tabs on mobile.
5. **Prices:**
   - the comparison table highlights the column you hover or focus;
   - the add-on groups expand smoothly with `<details>` and `interpolate-size`;
   - the "Keep It Running" price chip settles into place when seen.
6. **Pick your trade:** cards flip to show the one system that trade gets most, using a CSS 3D transform, with a flat fallback under reduced motion.
7. **Section dividers:** a thin orange (`--signal`) line draws across as each section enters.

Done when:
- every effect passes reduced motion, off-screen pause and no-JS checks;
- CLS stays 0;
- performance is 95+ with TBT under 200ms;
- a short screen recording (or frame screenshots) of each effect is shared with Maz.

## Batch 3: Seamless site-wide, and cleanup
Goal: moving between pages feels like one app, the form converts better, and the CSS is manageable.
1. **Cross-document View Transitions** (`@view-transition { navigation: auto; }`): the header stays put, the page content cross-fades, and a package card morphs into its `/prices` section via `view-transition-name`. Browsers without support just navigate normally.
2. **Day scenes on each `/for/*` guide:** filter to that trade's top 3 systems, reusing `Scenes` with a prop. Prices come from offers.
3. **Free plan form (`/leak-check`):**
   - 2 short steps with an animated progress bar;
   - the answer summary shown before sending;
   - a success state with a tick animation.

   Keep the same fields and endpoint.
4. **Sticky CTA:** appears after the hero leaves the screen and hides near the form and the footer.
5. **CSS consolidation:** fold the friction-pass, final-friction, clean-pass and simplified layers into `globals.css`, `sales.css` and page modules. The result must be visually identical (compare screenshots before and after on every route at 390 and 1280), with fewer than 6 CSS files.
6. **Final audit:**
   - Lighthouse on every route;
   - link check;
   - 390/1280 screenshots of all pages;
   - banned-copy grep;
   - update the handover, both the private copy and `docs/maz-works/SESSION-HANDOVER.md`.

Done when:
- no route scores below 95 on performance or 100 on accessibility (side-project pages are listed separately if they fail);
- screenshot comparisons show no unintended change after the CSS merge;
- the handover is updated.

## Build prompt (paste to the executor per batch)
> Work in manazoid4/mazos-site on branch `claude/mazos-site-sales-overhaul-stekjl`, fresh from main. Read AGENTS.md, `docs/codex-tasks/ANIMATION-GUIDE.md` and this brief. Do **Batch N only**. Keep the live look exactly: same fonts, weights, colours and borders. Follow every rule in "Rules for every batch". Prices only from `app/offers.ts`. Nothing invented. Run `npm run verify` and Lighthouse on `/`, `/prices`, `/leak-check` and `/for/garages`, and take 390/1280 screenshots of changed pages. Open one PR titled "Batch N: …", listing each deliverable as a checkbox with its evidence. Do not merge. Stop and report if any budget fails.
