# 07 · "Real over polished" homepage redesign (Codex, high effort)

Owner: Maz. Reviewer: Claude. Branch to continue: `claude/real-direction` (work in progress, not merged).

## Why
Maz's verdict on the current homepage: "extremely AI sloppy". It isn't the colour. The problems:
1. Every section has the same shape (small label, giant headline, grid of identical cards).
2. Generic line icons sit in tinted squares.
3. Fake mock-ups and "Example" tags are everywhere, and nothing real is shown.
4. Headlines come in slogan-style pairs.
5. The page has 11 sections, all the same width and rhythm.
6. Hard black borders, neon lime blocks and shouty mono UPPERCASE labels make it harsh on the eyes.

Research (30 Sep) covered ManyPets, Octopus Energy, Tide, Calendly, Jobber and Fresha. Good sellers share these patterns:
- One main button that names the result, repeated in the same words down the page.
- A reassurance line under every button.
- A trust strip right under the hero.
- Real product pictures.
- A "why we're different" grid.
- Rounded, calm cards and plenty of white space.
- An FAQ, then a final button.

Maz approved the new direction: calm and real, with **animated explainers** showing how Maz Works plugs into a business. He does **not** want new photos or video of himself yet; keep the existing small photo (`public/maz.webp`).

## Already done on `claude/real-direction` (review before building on it)
- `app/refresh.css`, loaded last from `app/layout.tsx`: the calm modern design system.
  - Navy `--ink #13293a`, soft lime `--signal #c7ea6e`, `--accent #13405a`, `--tint #ebf5dc`.
  - Soft borders, rounded cards, pill buttons.
  - Labels in normal sentence case, not mono capitals.
- Heading font: `Bricolage_Grotesque` via `next/font/google` as `--font-display`, used on h1, h2 and prices. Body text stays on system fonts.
- `app/plug-hero.tsx`: hero SVG. The Maz Works plug slides into a strip, then wires draw and ticks appear on four tools (Phone calls, Booking app, Email and web forms, Google reviews). Pure CSS, loops every 10s, pauses off-screen, and shows the finished frame under reduced motion.
- `app/scenes.tsx` and `app/scene-player.tsx`: a tabbed player of five explainers.
  - Missed calls reuses the existing phone animation (`app/hero-demo.tsx`).
  - Enquiries, Reminders, Reviews and Quotes are three-step storyboards plus a result line, with prices from `offers.ts`.
  - The player auto-advances until the visitor picks a tab, and never auto-advances off-screen or under reduced motion.
  - Without JS, every panel shows (a `<noscript>` style un-hides them).
- `app/page.tsx`:
  - New hero: "Your phone, inbox and booking app, finally working together.", a first-person lede, trade pills linking to `/for/<id>`, and `<PlugHero />`.
  - `#trades` and `#running` are replaced by `#how` ("See it working"). `HOME_SECTIONS` is updated in `app/nav.ts`.
  - The add-on descriptions and the "You deal with Manazir" line are dropped from the homepage to save words.
- Tests updated for the above. **Status: 88 pass, 1 fails.** The homepage word count is just over the 1,600 budget (`tests/static-export.test.mjs`). Fix it by trimming copy, never by raising the budget.

## What to build (in this order)
1. **Finish the homepage** on `claude/real-direction`.
   - Get under 1,600 words.
   - Vary the section layouts: no two neighbouring sections share the same card-grid shape. Use a wide text-plus-picture split, a single full-width card, and a two-column list.
   - Keep these exact phrases (tests and Maz's rules depend on them):
     - "I build the systems that turn enquiries into paying customers"
     - "For UK small businesses and teams, in any trade"
     - "Tell me the job"
     - the four terms under the hero
   - Target about 6 sections after the hero: See it working · Example plan · Free plan form · Prices · How it works + about Manazir · FAQ + final button.
2. **Plug animations for more real work.** Add three more storyboards to `app/scenes.tsx` in the same style, taken from real add-ons in `offers.ts`:
   - "Online booking setup": booking at 10pm without a phone call.
   - "Rebooking reminders": a past customer nudged when they're due back.
   - "Weekly report": one Monday email with enquiries, bookings, quotes waiting and money due.
   - Keep each step to 3–5 words for the title and at most 6 words for the detail.
3. **"Messy inbox → one list" animation** for the Example plan section. Calls, emails and DMs scattered around settle into one tidy list, played once when scrolled into view.
4. **"How it works" line** that draws through the 4 steps as you scroll, ticking each one.
5. **"Live in 7 days" mini calendar** beside the guarantee: days tick over to "Working ✓". Wording from `GUARANTEE` in `offers.ts`.
6. **"Why Maz Works" grid** (ManyPets style), placed before prices. Six short, true promises with small icons:
   - one person start to finish
   - fixed price
   - half now, half when it works
   - no contracts
   - on your tools
   - you own everything
   Read them from `offers.ts` (`PROMISES`, `DELIVERY`) where possible.
7. **Roll the look out** to `/leak-check`, `/prices`, `/for/*` and `/contact`. `refresh.css` is global, so check each page visually and fix anything that clashes with the older stylesheets.
8. **Brief 01** (`01-trade-guides-template.md`), then **02, 03, 04 and 06** as before. 05 is done.

## Hard rules (Maz's, non-negotiable)
- **Prices only from `app/offers.ts`.** Never type a price anywhere else.
- **Nothing invented:** no testimonials, reviews, star ratings, client names, logos, stats or results. Illustrations are labelled once as "Illustrations of how each system works, not real customers." Use `TODO(Maz):` for anything real that's missing, for example Google reviews once clients leave them.
- **No AI in the offer:** never write "AI assistant" or "AI agent" anywhere in site copy.
- **Positioning:** never write "website repairs", "small fixes" or "quick fixes".
- **Privacy:** never publish Maz's town, county, address, personal email or phone number. The public contact is info@mazworks.uk.
- **Animations:**
  - Every animation respects `prefers-reduced-motion` and shows the finished frame.
  - Animate only `transform`, `opacity` or `stroke-dashoffset`, with CLS at 0.
  - Pause loops off-screen (`data-pause-offscreen`, handled by `app/scroll-reveal.tsx`).
  - **Always write the full `animation:` shorthand including the name.** The CSS minifier turns a nameless shorthand into `animation: none`. There's a test for this; add new keyframe names to it.
- **Text:** no text smaller than 0.75rem (typography test).
- **Workflow:** branch and PR only, never push to main. `npm run verify` must pass before the PR.
- **Performance:** Lighthouse mobile on `/` must stay at 95+ performance, 100 accessibility, 100 SEO and CLS 0. Run it and paste the numbers in the PR.
- **Dark mode:** not in this pass. The older stylesheets hard-code colours, so it would break pages.

## Definition of done
- A PR from `claude/real-direction` with:
  - phone (390px) and desktop (1280px) screenshots of every changed page;
  - Lighthouse before and after;
  - `npm run verify` green;
  - a list of every `TODO(Maz)`.
- Claude reviews the PR before Maz merges.
