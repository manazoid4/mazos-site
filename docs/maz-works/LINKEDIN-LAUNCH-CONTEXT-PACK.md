# Maz Works — LinkedIn launch context pack

**For:** Agent B (content, design, information structure), resuming after a
usage-budget stop.
**Written by:** Agent A (positioning, conversion, technical).
**Aligned with `main` at:** `6c40269` (PR #47), 25 Sep 2026. This file has been wrong
about merge state once already — it merged carrying a caveat that had expired three days
earlier. **Anything it asserts about what is merged has a shelf life of days, because
several agents land changes in parallel. Recheck before writing in the past tense.**
Facts about what was *measured* age well; facts about what is *merged* do not.
**Your deliverable:** five complete, ready-to-post LinkedIn drafts, then orchestration
of the next stage.

The LinkedIn company page is `https://www.linkedin.com/company/maz-works`. **It has no
posts.** Whatever you write is the first thing anyone sees.

---

## 0. Do this first: recap, then work

Post a short recap (10–15 lines) covering: what you understand the positioning to be,
which claims you believe you may and may not make, and what you intend the five posts
to do. Then start drafting. Do not spend a second pass re-deriving what is already in
this pack — it exists so you don't have to.

Your earlier scope note is at `spine/projects/mazworks/AGENT-B-2026-09-19.md` in the
`unified-memory-database` repo. **It is marked SUPERSEDED.** You never created the
branch it names, and Agent A absorbed your previous scope. Read it only for your own
prior intent; the canonical state is
`spine/projects/mazworks-site/STATUS.md` in that repo.

---

## 1. What happened while you were out

Agent A took the content/typography/structure pass because you were unavailable and
the work was blocking. Landed or in flight:

Everything in this table is **merged and live** unless marked otherwise.

| PR | State | What |
| --- | --- | --- |
| mazos-site #34 | merged `81742c6` | Enquiry hardening, service context, sitemap fix, positioning brief |
| mazos-site #40 | merged `9e0ebc9` | Homepage rewrite, 11.5px typography floor, nav trim, DESIGN.md correction |
| mazos-site #41 | merged `dfde002` | Shipped products shown on the homepage |
| mazos-site #42 | merged `49784ca` | Enquiry forms work before scripts load; keyboard flow |
| mazos-site #45 | merged `19a69cd` | `/quick-win` page — the £150 fix, on its own page |
| mazos-site #46 | merged `f0a03b6` | Canonical URLs moved to `www.mazworks.uk`; JobFilter presented as a full build |
| mazos-site #47 | merged `6c40269` | Site copy cut to short, plain sentences |
| mazos-site #35 | **closed unmerged** | Its content reached `main` via #40 on 21 Sep. Merging it would have reverted newer work. Do not cite #35 as pending. |
| mazos-site #48 | **open** | RotaReason demo text raised to the readable floor (see §3) |
| unified-memory #4, #5 | merged | Positioning, enquiry P0, content pass, corrections |

The homepage you are writing posts about is therefore **not** the one described in
earlier notes. #47 cut it to five short blocks with a word budget enforced by a test.

**The single most important fact for your content work:** the Maz Works contact form
was **silently failing for three days**. FormSubmit approves per-domain; the switch to
`mazworks.uk` on 16 Sep left the new domain unapproved, so every enquiry from the live
site was rejected. Found by submitting real test data to both origins, not by reading
code. Maz clicked the activation link; delivery is confirmed working at both ends now.

Second: the smallest rendered text on the site was **9px**, and headings were set at a
line-height below 1.0 so letters collided when a heading wrapped. Both measured in a
real browser.

Both of these are *true, first-person, verifiable stories about the exact service Maz
sells*. They are sourced in §3 and recommended as material in §4.

---

## 2. Positioning — settled, do not relitigate

Maz Works is **one person** who solves practical business problems through software,
automation, websites and useful physical products. Not an agency. Not a website
company. Never "AI transformation".

**Promise:** find the part of a business that is leaking time or enquiries, then build
the smallest thing that fixes it.

**Four outcomes**, in the order businesses ask for them — websites live *inside* the
first one, they are not a category of their own:

1. Capture and follow up enquiries
2. Cut repetitive admin and missed work
3. Build internal tools and customer experiences
4. Connect physical products to reviews, bookings and other useful actions

**Audience:** UK owner-managers and operations/sales leads, roughly 1–50 people. The
business already works; time and enquiries leak out of manual steps. Secondary: local
customer-facing businesses (hospitality, retail, trades, salons).

Full brief: `docs/maz-works/AGENT-HANDOFF-POSITIONING.md`.

### One open tension you need to know about

The positioning above is settled. **The live homepage is currently narrower than it.**
After #47 the hero reads:

> I fix what's costing you customers.
> Websites, booking and admin fixes for small businesses. From £150, fixed price.

Software, internal tools and the physical products are not in the hero. Objects appear
once, as a trailing link under the prices. Read cold, the homepage now sounds close to
"a cheap website and booking guy" — which is a clear, sellable position, and also the
narrower one Maz explicitly said the business is not.

Both readings are defensible: a £150 entry offer needs a blunt hero, and a one-person
business cannot lead with four categories at once. **This is Maz's call, not yours and
not mine.** What matters for your work:

- **Write the posts to the positioning in §2**, not to the current hero. The set is
  supposed to establish what Maz Works actually does, and a cold LinkedIn reader has no
  homepage context yet.
- **Do not describe the homepage as saying something it does not say.** If a post sends
  someone to `/#contact`, what they land on is the narrow version.
- **Flag the mismatch to Maz explicitly in your recap**, with a recommendation: either
  widen the hero, or accept websites-and-booking as the front door and let the rest be
  discovered after contact. Do not fix the homepage yourself as part of this task.

---

## 3. Truth inventory — what may and may not be claimed

This is the part that matters most. Maz Works' entire credibility position is that it
does not invent results. **A single fabricated number on a first post would cost more
than the post earns.**

### May be claimed

| Asset | Status | Safe to say |
| --- | --- | --- |
| **Scrap Finance Partners** | Contract client build, delivered — **the client did not pay** | Positioning, marketing implementation, web development, launch, lead capture, a secure client workspace, guarded acquisition automation with approval and suppression controls. Live at `scrap-finance-partners.vercel.app`. Say "contract client build" or "a client build". **Never "paid client", "paying client", "my first paid project" or anything implying money changed hands.** The work is real and shippable as proof; the payment is not. Corrected 25 Sep — an earlier version of this pack said "paid contract client", which was wrong. |
| **JobFilter** | Own product, live, **priced but no paying customers** | Construction-focused; finds public contracts that fit a trades firm, then scores and qualifies them so that stops being manual admin. Live at `jobfilter.uk`, with £39/month plans published. Present it as "built and launched, with paid plans" — never as a client contract, it is Maz's own product. **There are no paying customers. Do not state or imply a customer count, subscriber number, revenue or traction of any kind.** |
| **Maz Works Objects (Touch)** | Product, priced, **not physically validated** | Touch One £29, Touch Three £49, Touch + Carry £79, artwork add-on +£10. Tap stands/keyrings that send a customer to a review, booking or menu page. |
| **Agent Nudge** | Own product, **released** | Stops AI coding tools clashing over the same files. Public demo and source. Released, not "being built" — that changed in #41. |
| **OpenFlowKit** | Own product, open source | Voice-to-text in the browser, cleaned up. Live demo. |
| **Khutba.io** | Live prototype | Live translated captions for mosque screens. Say "prototype" — it is labelled that way on the site. |
| **MAZ Pocket** | Own product, in progress | A pocket device to talk to your PC and approve its actions. Must stay labelled unfinished. |
| **RotaReason** | Own product, in progress | Explainable shift scheduling. Public demo at `/rotareason`. Describe as being built. |
| **Background** | Verifiable employment | ManyPets, Complaints Specialist — complex investigations in a regulated FCA/DISP environment. Glide, Complaints & Escalations Coordinator — telecoms escalations, operational ownership. **Note:** #47 removed this from the site entirely, so a post citing it is no longer corroborated by anything on `mazworks.uk`. It is still true and still on Maz's own profile — just don't say "as my site says". |
| **Pricing** | Public on the site | **Quick Win £150 fixed** (£75 to start / £75 on completion) — one broken or missing thing, fixed; it has its own page at `/quick-win`, which names the platforms it works with (Wix, Squarespace, WordPress, Square, Fresha, Booksy, Google Business Profile) and promises no password sharing. **Website Launch from £299.** **Growth System from £499** — website plus one job automated. **Support from £49/month**, optional, no long contract. Objects from £29. |

### First-person facts from this session — also claimable, also sourced

These are Maz's own work, so no client confidentiality applies and no permission is
needed. They are recorded here, in the inventory, so the claims register in §7 can cite
them like anything else. Dates and figures below are the verified ones — use these, do
not round them up.

| Fact | Verified detail | Caveat |
| --- | --- | --- |
| **The contact form failed silently for roughly three days** | FormSubmit approves per submitting domain. The site moved to `mazworks.uk` on 16 Sep; from then until 19 Sep 11:29 UTC every submission from `www.mazworks.uk` was rejected with an activation notice, while the old `mazos-site.vercel.app` origin still returned success. Found by submitting real test data to both origins, not by reading code. Fixed the same day and confirmed at both ends — endpoint returns success, and Maz confirmed receiving every test submission. | Say "roughly three days" or "16–19 September". Do not claim a number of lost enquiries — **that number is unknown and must not be invented or estimated.** |
| **The site's smallest text was 9px** | Measured in Chromium at 390px and 1440px: smallest rendered text 9.0–9.3px across pages; headings set below a 1.0 line-height so letters collided when a heading wrapped; section headings clamped up to 85px. | **Fixed and live on the pages Maz sells from.** The 11.5px floor reached `main` via #40 on 21 Sep; 0 sub-floor declarations remain across those stylesheets. One page was missed and is **not yet live**: the `/rotareason` demo, whose smallest text measured 8.3px — the fix is on open **PR #48**. So write it as "the pages I sell from", never "the whole site". **Do not claim a before/after business effect — none was measured.** |
| **The enquiry form now asks what you actually want** | Free demo, a walkthrough, a quote, or just an answer — so a £29 order or a £150 fixed job does not have to route through an unpaid custom build. | Merged in PR #34 and live. Safe to describe in the present tense. |
| **The enquiry form worked before its own JavaScript did** | Before scripts loaded, the homepage form fell back to a plain GET — which would have put the visitor's contact details into the URL. Found in Agent A's own code and fixed in #42, along with the keyboard path through the form. | Merged and live. This is a defect Maz found in his own work, which is why it is safe and strong material. |

All three facts above are live as of 25 Sep 2026. The `/rotareason` exception in the
second row is the only part not yet on the live site. Past tense is fine for the rest —
but see the shelf-life warning at the top of this file before assuming that on a later
date.

### Must NOT be claimed

- **No numbers that were never measured.** No percentages, no "saved X hours", no
  revenue, conversion, lead-volume or ROI figures for any client or product. None exist.
- **No testimonials or quotes.** Nobody has given one.
- **No client list or logos.** Scrap Finance Partners is the one nameable client build,
  and it is unpaid — see its row above before writing a word about it.
- **No revenue, no customers, no traction.** Nothing Maz Works sells has a paying
  customer yet. JobFilter has published prices; that is not the same thing, and a post
  must not blur the two. This is the single easiest place to fabricate by accident.
- **Dessert Lane is a PROSPECT, not a client.** There is a private demo built for them
  behind an access gate. **Do not name them publicly.** You may describe the *approach*
  generically ("one business, one action, one tap, one review button") without the name.
- **Objects are concept visuals only.** No real unit has been printed, photographed or
  NFC-tested. Never claim durability, waterproofing, magnets, exact dimensions, outdoor
  use, food-contact safety or "production-tested" fit. Do not imply units have shipped.
- **JobFilter never guarantees contract awards.** It helps find and qualify
  opportunities. That is all.
- **No team language.** No "we", "our team", "the studio has". First person singular.
- **No urgency or scarcity.** No "3 slots left", no fake deadlines.
- **No competitor disparagement.**

If you want to say something and cannot source it from the tables in this section,
**do not say it** — flag it to Maz as a gap instead. Everything the pack recommends as
material is sourced above; nothing recommended requires you to go outside §3.

---

## 4. What the five posts have to achieve

Maz has no posts. A cold reader has no context. The set should, between them:

1. Establish **who this is and what problem he fixes** — in a way a non-technical owner
   recognises as their own situation.
2. Make clear this is **one person, direct**, and that scope and price are agreed
   before paid work.
3. Show **real delivered work**, honestly bounded.
4. Make the **physical products** legible as a business tool, not a 3D-printing hobby.
5. Give **one obvious next step** — the enquiry form at `https://www.mazworks.uk/#contact`.
   **Use the `www.` host.** #46 made it canonical; the bare apex 308-redirects to it, and
   a redirect in a LinkedIn post is a needless hop. For the £150 offer specifically,
   `https://www.mazworks.uk/quick-win` is the better landing page.

Not every post does all five. The *set* does.

### Requirements

- **Drafts, not themes.** Each post must be complete and postable as written. An
  outline is not the deliverable.
- **One idea per post.** Do not cram.
- Open with the reader's problem, not with "I'm excited to announce".
- No engagement-bait ("thoughts?", "agree?"), no emoji walls, no hashtag stuffing —
  three relevant hashtags maximum.
- British English. Plain words. Short sentences. If a sentence needs technical
  knowledge to parse, rewrite it.
- State clearly for each post: **the one action** you want the reader to take, and
  whether a link belongs in the post or the first comment.
- Include a suggested **order and spacing** (which post first, and why).
- Flag anything you think needs a photo or screenshot that **does not yet exist** —
  do not assume assets.

### Strong material you already have

Use these if they earn their place; you are not obliged to:

- **"My own contact form was broken for three days and I didn't know."** Sourced in §3.
  True, specific, recent, and it demonstrates the exact skill being sold: finding the
  thing that is quietly costing you money. Ends naturally on "when did you last
  actually test yours?" This is probably the strongest single post available. Note the
  caveat: the count of enquiries lost is unknown, and must stay unknown.
- **"The text on my site was 9 pixels."** Sourced in §3. Also Maz's own, and it makes
  the point that the problems worth fixing are usually invisible until measured. The fix
  is live on the pages Maz sells from — write it in the past tense, but scope it to those
  pages and claim no business effect.
- **"My own form would have put a customer's details in the URL."** Sourced in §3 (#42).
  A second self-caught defect, and a sharper one: it only happened in the seconds before
  the page's own JavaScript loaded, which is exactly the kind of failure nobody tests
  for. Pairs with the contact-form story; **don't use both in the same post.**
- **The operations background.** Complaints and escalations work is genuinely unusual
  for someone who builds software, and it is the honest reason the approach is
  "investigate the real failure point first". Do not turn it into a CV.

Note that the first two are about **Maz's own** work, so no client confidentiality
applies and no permission is needed.

---

## 5. Then: you are the orchestrator

Once the five drafts are done and Maz has them, **you own coordination of the next
stage.** That means:

- Decide what happens after the posts: what gets built, measured or written next, and
  in what order.
- Hand specific, bounded work to other agents with the same discipline this pack uses —
  name the files, name the constraints, name what must not be claimed.
- Keep `spine/projects/mazworks-site/STATUS.md` in `unified-memory-database` current.
  Use its state markers exactly: `[LIVE]`, `[MERGED #nn]`, `[OPEN PR #nn]`,
  `[DECISION]`. Never invent a new ambiguous marker — one was retired today for meaning
  two things at once.
- Do not merge or publish anything without Maz saying so.

---

## 6. Traps in this codebase, learned the hard way today

If your next stage touches the site:

- **Chromium and Playwright ARE available.** `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`,
  launched via `executablePath` — the npm package and installed browser versions differ.
  An earlier record claimed no browser was available; that was wrong and cost real
  findings. Measure, don't estimate.
- **Positional CSS selectors break when list lengths change.** Four instances hit in one
  pass: a nav link hidden by `:nth-child(2)`, a hero chip hidden by a rule written for a
  six-item list, a five-column grid left behind by a four-step process, and dead rules
  for deleted components. **Before changing any array rendered as a list in
  `app/page.tsx`, grep the stylesheets for `nth-child` against that component.** Two of
  these shipped as real visual faults that typecheck, the build and all 44 tests passed
  clean.
- **Typography floor is `.72rem`.** Enforcing it requires covering three patterns:
  `font-size:`, the `font:` shorthand the Objects stylesheet uses, and bare `<small>`
  (a ~0.83em browser shrink). Use a negative lookbehind `(?<![\d.])` or you will rewrite
  the decimal inside `2.5rem` into `2.72rem`.
- **That lookbehind has a blind spot, and it cost a page.** `(?<![\d.])\.\d+rem` skips
  every **leading-zero** value, so a stylesheet written as `0.57rem` is invisible to it —
  and `rotareason.module.css` is written that way throughout. The floor pass never
  touched it *and* the "0 sub-floor declarations" check silently walked past it, leaving
  8.3px text on a public, sitemap-listed demo for four days. Correct pattern:
  `(?<![\d.])0?\.\d+rem`, validated in both directions. **The lesson is broader than the
  regex: a verification that shares a bug with the thing it verifies reports success.**
  `tests/typography.test.mjs` (PR #48) now parses values as numbers instead, so no
  pattern is in the loop.
- **`style.zoom` is not a reflow test.** It does not reflow layout. Use narrow
  viewports (320/360/390px).
- **Stale docs are the recurring failure here.** Three separate artefacts today asserted
  things that had stopped being true. When a decision reverses, grep for every document
  still asserting the old one.
- **Impeccable:** not installed as a skill in Agent A's environment, but you reported
  reading the official `pbakaus/impeccable` v4.3.1 instructions upstream. If you use it,
  say which parts you actually applied.

---

## 7. Definition of done

- Five complete LinkedIn post drafts, postable as written.
- A stated order and spacing.
- Per post: the one action, and where any link goes.
- A list of any assets (photo, screenshot) that would strengthen a post and do not exist.
- A short "claims register": for each factual statement across the five posts, which
  row of §3 it comes from. Anything unsourceable is cut or flagged to Maz, not softened
  into something sayable. Where a row carries a caveat, the register states how the
  draft respects it.
- Saved to unified memory with the state markers above.
- Nothing published. Maz posts.
