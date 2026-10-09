# Reference brief: quality bar for the mazworks.uk redesign
Inspected 9 Oct 2026 with Playwright at 390px (screenshots kept in the session scratchpad, not committed). "Observed" = seen on the page; "Claimed" = third-party/search summary, not inspected.

## 1. Who / what / benefit / next step on mobile
**Plausible** https://plausible.io (observed). H1 names the category and the swap in one line ("Easy to use and privacy-friendly Google Analytics alternative"); one sentence of proof; full-width primary button "Start free trial" plus a clearly secondary "View live demo"; real product UI sits directly below. First screen = what, why, action, evidence. Adapt: H1 = who + outcome; one primary button, demo as secondary link (matches MAIN_CTA rule); show a real artefact immediately.
**Designjoy** https://designjoy.co (observed). Solo-run studio that says so plainly ("run entirely by Brett"); one offer, "pause or cancel anytime" under the H1; two actions (See pricing, Book intro call). Weakness: no price on the first screen; headline touches the viewport edge. Adapt: solo-founder honesty as trust; but put "from £X" above the fold.
**Design Pickle** https://www.designpickle.com/pricing (observed, mixed). Strong single CTA and a "30 minutes / after the call / you decide, no pressure" expectation block. Weakness: price hidden behind a consultation; cookie banner covers lower hero. Adapt: spell out what happens after the click; do not hide price.

## 2. Pricing pages
**Basecamp** https://basecamp.com/pricing (observed). Plan picker as radio list at top (name + one-line limit), one plan's detail shown at a time under it, price beside plan name, a "Not sure? Start here" tag on one plan, green ticks and red crosses so exclusions are visible, "?" tooltips per line, fixed-price promise in the H1. Adapt: one selector, one detail card, explicit crosses for what is NOT included.
**Designjoy pricing block** (observed): one plan, flat monthly fee, turnaround ("avg 48h"), "one request at a time" stated as a limit. Adapt: state the limit (rounds, one job) next to the price.
**Automation-agency pattern** (Claimed, from search snippets of freelancer Make/n8n pages; not inspected): fixed-price build, then separate care plan, platform subscriptions as a separate line, client owns accounts. Adapt: show three lines per package: pay now, pay monthly (optional), pay to third parties (tools they already hold). Figures there are anecdotal; use none.

## 3. Short demo video / animated hero
**Loom** https://www.loom.com (observed). Poster frame with large play button, speed control visible, short H1, one primary and one secondary button above it. Adapt: poster + play, never autoplay with sound; video below the CTA, not instead of it.
**Linear** https://linear.app (observed). Product UI under the H1 shows a real chain (message to issue to status change with timestamps), but at 390px the UI is cropped on the right. Lesson: a workflow demo must be authored for portrait, not scaled down from desktop.
No short captioned one-workflow explainer was found by cheap search; treat as original work: one trigger, one tool-to-tool hop, one result, burned-in captions, 15-25s, labelled "Example workflow (demo data)".

## 4. Interactive demo / calculator
**Gigabit ROI calculator** https://gigabit.agency/tools/ai-roi-calculator/ (observed). Two inputs (hours/week, hourly cost) with sane defaults, the arithmetic shown in words (10 x $75 x 52; x 50-70% automatable = range), result as a range not a point, payback per named package, then an email-me-the-memo CTA. Adapt: a "what is admin costing me" tool with defaults pre-filled, visible formula, conservative range, payback against Starter £149 / Business System from £595. Label as an estimate; no invented stats.
**Vertex Systems calculator** (https://vertexsystems.com/roi-calculator-time-money-saved/, loaded; sliders per search summary, Claimed): note its "results vary" disclaimer pattern.

## 5. Promo infographics / LinkedIn carousels
Login-walled; no primary examples inspected. Secondary guidance only (UNVERIFIED as outcomes; vendor blogs, e.g. oktopost.com/blog/linkedin-carousel-pdf-best-practices): benefit on slide 1, one point per slide, large type, phone-first, CTA slide last. Ignore vendor-reported lead counts. Adapt: 5-slide template (problem, before/after, how it works in 3 steps, what it costs, next step), each slide one question.

## 6. Frontier-model attribution
- **Qonto case study** https://claude.com/customers/qonto: VERIFIED as published by Anthropic that Qonto built in-app agents on Claude (via Amazon Bedrock); stated figures (2x transfers, 3x invoices, 5x payroll) are the case study's own claims, measurement not explained, vendor-authored. Do not reuse the numbers.
- **Anthropic customer stories index** https://claude.com/customers (observed, 284 stories): primary source for which companies claim Claude use. Named stories (Notion, Slack, Figma, HubSpot, Zendesk) VERIFIED only as headlines on that page.
- **Claude for Small Business** (Axios, 13 May 2026; seen as search result only): UNVERIFIED by me beyond the headline.
- **Solo agency accepted into Anthropic partner network** (IndieHackers post): UNVERIFIED, self-reported.
- Found NO primary source that a specific named small-business website was "built with Claude". Maz Works must not claim any, and per rules must not advertise AI at all.

## Patterns to apply
1. First screen: who, outcome, "from £", one button, trust cue. Demo is a secondary link.
2. Real artefact above the fold, authored for 390px portrait.
3. Pricing: one selector, one detail card, three cost lines (today / monthly optional / third-party tools), ticks AND crosses.
4. State limits beside price (one job, 30 days, two rounds).
5. "What happens after you click" 3-step strip.
6. Calculator: defaults, visible formula, range, honest label, payback vs package.
7. Every visual answers one distinct question and says "demo" or "example".
8. Solo-founder honesty as trust; zero invented proof.

## Acceptance criteria (testable)
- At 390px, without scrolling: audience, outcome, "from £149", "Get my free plan" are all visible; no horizontal scroll; no overlay (cookie/banner) covers the H1 or button.
- Single primary CTA text identical everywhere; demo link styled secondary.
- Pricing: for each package a reader can find what is included, what is not, pay-now amount, monthly optional amount, third-party tool costs, within one card; prices match `app/offers.ts` (grep shows no hard-coded prices elsewhere).
- Each visual/video has a one-line question it answers, a "demo / example, not a client" label, captions, alt/text equivalent.
- Video: 15-25s, captions burned in, poster image, no autoplay with sound, respects prefers-reduced-motion, does not block LCP.
- Calculator: works with keyboard, shows formula, outputs a range, labelled estimate, no stored data without consent.
- Infographic/carousel slides: one idea each, readable at 390px, final slide = main CTA.
- Lighthouse mobile >= 95; no AI wording; no location/phone/personal email; no unverified claim from section 6 reused.
