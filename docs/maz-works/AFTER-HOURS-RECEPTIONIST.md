# After-Hours Receptionist (£79/month): research, plan, ops checklist

Launched on branch `claude/after-hours-receptionist` (9 Oct 2026). Price lives only in `AFTER_HOURS` in `app/offers.ts`.

## Research: what leading services do (patterns only, no copied wording)
Sources opened: ringcentral.com/ai-receptionist.html, smith.ai/ai-receptionist, moneypenny.com/uk.
1. **Demo CTA in the hero, repeated per section.** Smith.ai repeats one CTA; RingCentral offers a number you can ring. Moneypenny has no demo, only a form.
2. **Open pricing.** Moneypenny hides price, while Smith.ai shows tiers. Showing £79 in the hero is a differentiator for small businesses.
3. **Three or four plain steps** for how it works (RingCentral: add info, personalise, go live).
4. **Safety block:** RingCentral links a trust centre and says it doesn't train on your data; Smith.ai covers encryption. We say only what is operationally true.
5. **Audio or transcript examples by industry** (RingCentral). We use an in-browser example call with a made-up garage.
6. **FAQ handles disclosure** (will callers know it isn't a person), cost vs staff, cancelling, data.
7. **Urgent-call handling** matters most for after-hours, so it gets its own rule card, FAQ and 999 note.

## What was built
- `/after-hours-receptionist`: hero with an animated night-call card, chips and best-for strip, before/after, 4 steps, pricing card plus the "one missed customer" value check, the "Play an example call" demo (3 scenarios), safety and privacy cards, next steps, 13 FAQs, final CTA, Service + FAQPage schema.
- Wired in: homepage teaser, /services featured card, /prices (extras fold, monthly service), contact form option, free-demo form `?package=`, footer nav, sitemap, privacy notice section.
- Tests: `tests/after-hours.test.mjs` covers the price source, honesty checks (no AI, no fake trial, no certification claims) and wiring.

## Honest-by-design decisions
- No "AI" wording (AGENTS.md rule). It is an "automated receptionist" that says so to callers.
- "Play an example call" is labelled as an in-browser example. A real test line exists only once Maz sets one up.
- No free trial claimed. The promise is "you hear it answering as your business before your first month is billed".
- 300 fair-use minutes. Above that the price is agreed first, never billed by surprise.
- Recording is off by default. Transcripts are kept 30 days by default.

## Before merging (Maz)
- [ ] Phone provider account set up (Telnyx or Twilio, UK number KYC) and one demo number answering as a test business.
- [ ] Confirm you are happy to deliver: monthly tuning, greeting changes usually within 2 working days (as the page says), 30-day transcript retention.
- [ ] Payment: monthly Stripe subscription link for £79 (not yet in `BUY_LINKS`).

## Next
Daytime overflow cover (copy says "comes next"), a real recorded demo call with consent, and a public test number.

## Free talk-to-it demo (9 Oct 2026)
- `/receptionist-demo`: a pretend after-hours call, out loud, in the browser. Speech uses the browser's own tools (free); answers come from `app/receptionist-demo/engine.mjs` (rules, only the business's own details, never guesses a price, urgent → 999 line). Typing works where speech doesn't. Not indexed.
- `/receptionist-demo/make`: Maz fills in a prospect's name, hours, services (prices only if they publish them), urgent words → copies their personal link. Details live in the link's `#c=` hash, nothing is stored.
- Cost £0. Paid clients still need a real number + a more natural voice (about £5–10/month each).

## Audit and sprint 1 (9 Oct 2026, evening)
Full audit, costs, competitor check and roadmap: private memory repo `handoffs/2026-10-09-receptionist-audit/` (audit.md, plan.md, build-prompt.md).
- **Fixed in the demo:** urgent words checked at every step (not only the first); "no" inside a sentence no longer ends the call; the number is read back digit by digit and the caller confirms or corrects it; questions and refusals at the name step are handled; personalised links can't carry long digit strings, web addresses or long text (same rule as the `?biz=` previews); every screen says it is a demo and a custom link says it isn't that business's real line; tap to interrupt; suggestion chips so it works with no microphone; "Get my free demo" inside the call summary with the package and business filled in.
- **Not built on purpose:** paid realtime voice on the public page (an open page on a per-minute service is an uncapped bill), a mic waveform (second microphone stream and permission prompt), open-mic interrupting (the browser would hear its own voice).
- **Running cost per answered minute** (vendor pages, 9 Oct, $1 = £0.75): Telnyx Voice AI about 4.6p, Twilio + Vapi about 6.9p, Twilio + OpenAI realtime about 4.4p (assumption-heavy). 300 minutes is roughly £15 to £23 a month before alerts. The bigger cost is Maz's time on set-up and monthly tuning.
- **Phone networks:** UK mobile networks divert *when unanswered*; none publishes a time-of-day divert. "After hours only" therefore means switching forwarding on each evening or answering missed calls at any time. Decision for Maz before the first client.
- **Before the first paid line:** provider account with a spend cap (no Telnyx spend-limit feature was found; use prepaid with auto top-up off), £79 Stripe link, ICO fee, a short data note for clients. Runbook comes with sprint 2.
