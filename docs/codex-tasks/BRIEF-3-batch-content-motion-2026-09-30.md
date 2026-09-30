# Build brief v2: clearest, most useful Maz Works site (3 batches)

Status: APPROVED PLAN (Maz, 30 Sep 2026). Execute one batch at a time. Each batch gets its own PR and waits for Maz to check the preview before merging.
Base: `main`. The live look is the "old" style: same fonts, weights, hard borders and layout, plus "What changes in your day" (PR #89).
Branch: `claude/mazos-site-sales-overhaul-stekjl`, or the branch the session names.

## Maz's decisions (do not reopen)
1. Keep the live look: fonts, boldness and hard borders. The rejected redesign (PR #88) is never merged, and its look is never ported.
2. Keep "What changes in your day" and its animations.
3. **Colour: hi-vis orange on a clean off-white.** Remove the cream and the lime. Tokens are listed in Batch 1.
4. Add a new page, `/what-we-do`: "this is what we do", as a fuller animated explainer.
5. Three batches, a plan first, then execution, then a merge after Maz has seen each one.
6. Adopt the "10x" upgrades:
   - the "Build my system" tool;
   - the cost calculator;
   - the tappable phone;
   - a video of Maz;
   - one source of truth for systems;
   - hard cuts to copy;
   - measurement.

## The one goal
**More free-plan requests per week.** Each batch is judged on that, not on looks. The secondary measures are the form-start → form-submit rate and the click rate on "Get a free plan".

## Audit (30 Sep, whole built site, 26 routes)
What already works (keep it):
- Clear fixed prices from `offers.ts`, with £195 as the lowest entry among the UK competitors checked (Zaps Studio and MQLFlow start at about £800).
- The guarantee, half now and half when it works, and "you own everything".
- The Hollybank Hair example plan, and real proof: JobFilter (live, with paid plans) and the Scrap Finance Partners build.
- The £40 referral, the trade guides, and the day scenes.

What holds it back, most costly first:
1. **The form breaks the promise we sell.** We sell "every enquiry gets an instant reply", but the free-plan form (FormSubmit AJAX) sends **no confirmation** (see `leak-check-form.tsx`: AJAX gets no autoresponse), and we promise a reply "within 3 working days". A visitor who tries us gets exactly the problem we fix. The site should prove the product on the visitor.
2. **It tells people things instead of involving them.** The homepage runs to about 1,960 words over 10 sections, and nothing uses the visitor's own situation. Home, `/prices`, `/for/*` and the planned `/what-we-do` repeat each other.
3. **The top of the page describes one feature** (missed calls), not what Maz Works is. The three packages only appear far down the page.
4. **The positioning is diluted.** The main menu and footer lead to "Objects (concept range)", "Architecture models" (3D printing) and "Lab", including a page titled "MAZ Pocket AI Bridge". A small-business owner looking for systems lands on 3D-printed stands and an "AI" product, which clashes with the no-AI offer rule.
5. **Trade guides lean on "website problems"** (for example the garage page's lorem ipsum and untappable phone numbers). That drifts toward the "website fixes" framing AGENTS.md bans. Keep the evidence, but frame every finding as a lost customer or lost time, with a system as the answer.
6. **SEO:**
   - 15 pages have titles over 60 characters or descriptions over 155; the homepage title is 87 and its description 250;
   - there is no Service structured data;
   - PR #88's invisible fixes (SEO, accessibility, skip links) never reached main.
7. **Visual:**
   - cream plus near-black plus a single neon accent is exactly the "AI-made site" look that Impeccable warns against;
   - the lime is Zaps Studio's colour;
   - lime against the canvas is 1.06:1, so it only works as a fill.
8. **No trust from people:** there are no reviews yet, and invented ones are banned. A real face and voice is the strongest honest signal available.
9. **There are 10 overlapping CSS files (3,785 lines)** with patch layers, which makes every change slow and risky.
10. **`/whats-new`** was last updated 27 Sep.

## Rules for every batch (non-negotiable)
- **Look:** keep the current fonts, weights and hard borders. The only palette change is the orange swap.
- **Content:**
  - prices only from `app/offers.ts`, through helper functions and never hard-coded;
  - no invented clients, reviews, logos, stats, percentages or results;
  - calculators use only the visitor's own numbers;
  - no "AI" in anything sold;
  - never say "quick fixes", "small fixes" or "website repairs";
  - never publish Maz's location, personal email or phone number (public contact: info@mazworks.uk).
- **Motion:**
  - no new JS animation libraries: CSS first, then tiny client islands only if needed;
  - use the full `animation:` shorthand with the keyframe name, because the minifier drops nameless shorthand;
  - animate only `transform` and `opacity`, with two exceptions:
    - `stroke-dashoffset` for drawn lines (see ANIMATION-GUIDE.md);
    - `height` via `interpolate-size` on `<details>`, which may move content only below the element the visitor opened;
  - pause off-screen with `data-pause-offscreen` / `data-offscreen`;
  - show a static state under `prefers-reduced-motion`;
  - the page must work and read fully without JS.
- **Decoration** must help someone understand or act, or it goes. Flipping cards and decorative lines drawing across sections are cut.
- **Budgets:**
  - Lighthouse mobile 95+ performance and 100 accessibility on `/`, `/what-we-do`, `/prices`, `/leak-check` and `/for/garages`;
  - CLS 0;
  - TBT under 200ms.
- **Before each PR:**
  - run `npm run verify`;
  - take 390px and 1280px screenshots of every changed page;
  - list every `TODO(Maz)`;
  - make the PR body a checkbox list of deliverables, each with its evidence.

## Batch 1: Foundation and clarity
Goal: in 5 seconds a visitor knows what Maz Works does, what it costs to start, and what to do next, and the site proves the product on them.

1. **One source of truth for systems:** create `app/systems.ts`. Each system (missed calls, enquiries, reminders, reviews, quotes, online booking, rebooking, weekly report, plus the three packages) has:
   - an id and name;
   - the problem it solves ("headache");
   - the 3–4 animation steps;
   - its result line;
   - the offer or extra it maps to, with the price read through `offers.ts`;
   - the trades it suits.

   Homepage scenes, `/what-we-do`, `/for/*` and later the Batch 2 tool all read from this file. Add a test that every system maps to a real offer or extra.
2. **Colour: hi-vis orange.** Change the tokens only, in `globals.css`:
   - `--paper` `#f6f6f3`;
   - `--surface` `#ffffff`;
   - `--signal` `#ff6b1a`, as a fill behind ink text only (6.4:1) and always with an ink border, because it is 2.7:1 against the canvas;
   - new `--signal-text` `#c2410c` for orange text and links (4.8:1);
   - new `--ok` `#0f7a4f` for results and success, with white text (5.4:1);
   - `--soft-line` `#c9cbc6`.

   Never use orange with cream. Remove every hard-coded `#dfff2f` and `#f3f0e8`.
3. **Hero:**
   - the H1 says what Maz Works does, e.g. "Systems that turn enquiries into bookings and take the admin off you.";
   - keep the phone animation as the proof;
   - under it, example outcomes clearly labelled as examples across packages;
   - separately, "Start with one job from £195", read from offers;
   - one primary CTA: "Get a free plan and price".
4. **"What I build" strip** straight after the hero: three package cards with the name, price, who it's for and the working-by date. Each links to its section on `/what-we-do`.
5. **Cut the homepage to five sections, about 1,200 words:**
   - Hero;
   - What I build;
   - See it working (the day scenes);
   - Prices (short, linking to `/prices`) together with the free plan form;
   - About Maz and the real work.

   Move the example plan, "how it works" and the FAQ detail to `/what-we-do`, `/leak-check` and `/faq`. The trade picker becomes one line of links. Lower `WORD_BUDGET` in `tests/static-export.test.mjs` to 1300, with a dated comment.
6. **New page `/what-we-do`:**
   - **Top:** one line on what Maz Works builds, then the three packages as jump links.
   - **One section per package, each with:**
     - who it's for;
     - a larger 4-step animated walkthrough: trigger → what happens on its own → what you see → result;
     - a before and after ("today you…" / "with this…");
     - what's included and what's not;
     - the working-by date;
     - the price;
     - a CTA.
   - **Every system in detail**, built from `systems.ts`. Tools are named generically ("your calendar", "your booking app") unless support has been confirmed.
   - **The rest of the page:**
     - "How it works" (the 4 steps and how I set it up);
     - "What you own at the end";
     - "What I need from you" (access, one call, sign-off);
     - the example plan;
     - a closing CTA.

   Every animation is labelled "Illustrations of how it works, not real customers". Add the page to the nav and sitemap, with its own title, description and Service JSON-LD.
7. **Instant confirmation, so the site uses its own product:**
   - add `api/enquiry.js`, a Vercel function following the same pattern as `api/subscribe.js`, that accepts the free-plan form;
   - it emails Maz the enquiry;
   - it sends the visitor an **instant confirmation** from info@mazworks.uk through the existing Resend setup (free tier, 3,000 emails a month): what happens next and when;
   - keep FormSubmit as the fallback if the function fails, and keep the no-JS route;
   - honeypot plus a basic rate limit, and no secrets in the client;
   - the success screen says "Check your inbox. The confirmation is the same kind of instant reply I set up for clients."

   This is transactional mail to someone who asked, so it is not outreach. `TODO(Maz)`: confirm this use of Resend.
8. **Reply time as a token:** move "3 working days" into one constant. `TODO(Maz)`: decide whether it becomes "1 working day", a HubSpot task he owns. Change the constant only once he confirms.
9. **Positioning clean-up:**
   - remove Objects, Architecture models and Lab from the main menu and the "Other projects" group in the header menu;
   - keep one small footer link, "Other things I've built", pointing to `/lab`;
   - keep the pages live, but `noindex` `maz-pocket-ai` and `maz-core` so an "AI" product never shows up in search next to the offer;
   - reframe the trade-guide "real examples" as lost customers or lost time, each with its system, keeping the evidence.
10. **Bring across the invisible PR #88 fixes, but not its look:**
    - `fitDescription` and the title/description limits in `seo.ts`;
    - short titles and descriptions on all 15 flagged pages;
    - Service JSON-LD from offers on `/prices`, `/for/*` and `/what-we-do`;
    - `faqs.ts` and `enquiry.ts` read prices from offers;
    - the contrast fixes and skip-link targets;
    - the tests that go with these.
11. **Measurement:** add conversion events:
    - `CTA clicked`, with its placement;
    - `Form started`;
    - `Form submitted`;
    - `Confirmation sent`;
    - `What-we-do section viewed`.

    Record the baseline weekly free-plan count in the PR.
12. **`/whats-new`:** update it with this week's work.

Done when:
- the homepage has 5 sections and passes a 1,300-word budget;
- at 390px, above the fold shows the H1, "from £195" and the CTA;
- `/what-we-do` is live in the nav and sitemap and passes the SEO tests;
- a test submission sends Maz an email and the visitor an instant confirmation, and the fallback path works;
- there is no `#dfff2f` or `#f3f0e8` left, and contrast passes everywhere (Lighthouse accessibility 100);
- every page passes the title/description tests;
- the `systems.ts` mapping test passes;
- Lighthouse is on budget.

## Batch 2: Make it interactive (the 10x)
Goal: visitors use their own situation and leave with a personal plan, not a brochure.

1. **"Build my system" tool** (a small client island, used on the homepage and `/what-we-do`):
   - **Step 1:** pick a trade, or "Other".
   - **Step 2:** tap the headaches: missed calls, slow replies, no-shows, chasing quotes, few reviews, copying between apps, admin at night.
   - **The system assembles live:** the matching systems from `systems.ts` animate in as a short timeline of their day. The price is read through a helper in `offers.ts` that applies the offer rules:
     - the first job is Starter;
     - an extra job uses Extra automation;
     - the weekly report is free inside Business System;
     - when the add-ons would cost more than Business System, recommend Business System instead.
   - Show the working-by date.
   - **"Send me this plan"** opens the free-plan form pre-filled, with the chosen systems in hidden fields and a `src=builder` tag.
   - Without JS it falls back to links. Unit-test the pricing helper against every rule in AGENTS.md.
2. **"What it's costing you" calculator:** the visitor enters missed calls or enquiries per week, the share they think they lose, and an average job value. It shows their own monthly figure next to the Starter price.
   - no defaults presented as facts, and no industry stats;
   - label it "Your numbers, your estimate";
   - link to the builder.
3. **Tappable phone:** the hero phone becomes playable.
   - Tap "Call" → missed call → the text arrives → tap "Book" → booked.
   - It still auto-plays once for people who don't tap.
   - It pauses off-screen, is static under reduced motion, and is fully keyboard accessible.
4. **Motion polish, only where it aids understanding:**
   - scroll-driven reveals with `animation-timeline: view()` inside `@supports`, with the IntersectionObserver fallback;
   - package cards lift on hover and focus, and their icon draws in once;
   - day scenes get a progress line joining the steps, the result slides in after the steps, and tabs swipe on mobile;
   - the prices table highlights the column you hover or focus;
   - `<details>` expand smoothly.

Done when:
- the builder's pricing matches `offers.ts` rules in tests;
- a builder submission arrives pre-filled;
- every effect passes the reduced-motion, off-screen and no-JS checks;
- Lighthouse is on budget;
- Maz gets a screen recording.

## Batch 3: Seamless site, trust, and cleanup
Goal: the site feels like one smooth product, builds human trust, and is cheap to change.

1. **Page transitions:** cross-document View Transitions (`@view-transition { navigation: auto; }`).
   - The header stays put and the content cross-fades.
   - A package card morphs into its `/what-we-do` section.
   - Other browsers just navigate normally.
2. **Trade pages:** each `/for/*` guide gets the builder preset to that trade and its top three day scenes from `systems.ts`.
3. **Free plan form (`/leak-check`):**
   - two short steps with a progress bar;
   - a summary of the answers before sending;
   - a success state with a tick and the instant confirmation.

   Keep the same fields and endpoint.
4. **Video slot:** add a 60-second "Maz walks through one system" video on `/what-we-do` and the homepage About section.
   - Load it lazily, with a poster image and captions.
   - Leave it hidden until the file exists.
   - `TODO(Maz)`: record it (free with Loom or a phone).
5. **Sticky CTA:** appears after the hero leaves the screen and hides near the form and the footer.
6. **CSS consolidation:** fold the friction-pass, final-friction, clean-pass and simplified layers into `globals.css`, `sales.css` and page modules, ending with fewer than 6 CSS files. Prove it with before-and-after screenshots of every route at 390 and 1280, showing no unintended change.
7. **Final audit:**
   - Lighthouse on every route;
   - link check;
   - 390/1280 screenshots;
   - banned-copy grep for AI, quick fix, small fix and website repair;
   - update the handover (the private `HANDOVER.md` and `docs/maz-works/SESSION-HANDOVER.md`).

Done when:
- no route scores below 95 on performance or 100 on accessibility (side projects listed separately);
- the screenshot diff is clean after the CSS merge;
- the handover is updated.

## TODO(Maz)
- Confirm Resend for the instant confirmation email (Batch 1).
- Decide the reply time, "3 working days" or "1 working day" (Batch 1).
- Record a 60-second walkthrough video (Batch 3).

## Executor prompt (paste per batch)
> Work in manazoid4/mazos-site. Start a fresh branch from main (or use the branch you are given). Read AGENTS.md, `docs/codex-tasks/ANIMATION-GUIDE.md` and `docs/codex-tasks/BRIEF-3-batch-content-motion-2026-09-30.md`, then do **Batch N only**. Keep the live look exactly (same fonts, weights and borders); the only palette change is Batch 1's orange tokens. Follow every rule under "Rules for every batch": prices only through `app/offers.ts`, nothing invented, no "AI" in the offer, no website-fix wording. Run `npm run verify` and Lighthouse on `/`, `/what-we-do`, `/prices`, `/leak-check` and `/for/garages`, and take 390/1280 screenshots of every changed page. Open one PR titled "Batch N: …" whose body is the batch's deliverables as checkboxes with evidence, plus the TODO(Maz) list. Do not merge. Stop and report if any budget fails.
