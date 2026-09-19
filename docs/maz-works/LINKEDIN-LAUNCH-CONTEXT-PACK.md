# Maz Works — LinkedIn launch context pack

**For:** Agent B (content, design, information structure), resuming 19 Sep 2026 after a
usage-budget stop.
**Written by:** Agent A (positioning, conversion, technical).
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

| PR | State | What |
| --- | --- | --- |
| mazos-site #34 | **merged** (`81742c6`) | Enquiry hardening, service context, sitemap fix, positioning brief |
| mazos-site #35 | **open** | Homepage rewrite, typography floor, nav trim, DESIGN.md correction |
| unified-memory #4 | merged | Positioning + enquiry P0 record |
| unified-memory #5 | open | Content pass record + corrections |

**The single most important fact for your content work:** the Maz Works contact form
was **silently failing for three days**. FormSubmit approves per-domain; the switch to
`mazworks.uk` on 16 Sep left the new domain unapproved, so every enquiry from the live
site was rejected. Found by submitting real test data to both origins, not by reading
code. Maz clicked the activation link; delivery is confirmed working at both ends now.

Second: the smallest rendered text on the site was **9px**, and headings were set at a
line-height below 1.0 so letters collided when a heading wrapped. Both measured in a
real browser.

Both of these are *true, first-person, verifiable stories about the exact service Maz
sells*. See §5.

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

---

## 3. Truth inventory — what may and may not be claimed

This is the part that matters most. Maz Works' entire credibility position is that it
does not invent results. **A single fabricated number on a first post would cost more
than the post earns.**

### May be claimed

| Asset | Status | Safe to say |
| --- | --- | --- |
| **Scrap Finance Partners** | Paid contract client, delivered | Positioning, marketing implementation, web development, launch, lead capture, a secure client workspace, guarded acquisition automation with approval and suppression controls. Live at `scrap-finance-partners.vercel.app`. |
| **JobFilter** | Own product, live | Construction-focused; finds, scores, qualifies and organises contract opportunities so qualifying stops being manual admin. Live at `jobfilter.uk`. |
| **Maz Works Objects (Touch)** | Product, priced, **not physically validated** | Touch One £29, Touch Three £49, Touch + Carry £79, artwork add-on +£10. Tap stands/keyrings that send a customer to a review, booking or menu page. |
| **Agent Nudge / MAZ Pocket / RotaReason** | Own products, in progress | Describe as being built. RotaReason has a public demo at `/rotareason`. |
| **Background** | Verifiable employment | ManyPets, Complaints Specialist — complex investigations in a regulated FCA/DISP environment. Glide, Complaints & Escalations Coordinator — telecoms escalations, operational ownership. |
| **Pricing** | Public on the site | Quick Win £150 fixed (£75 start / £75 completion). Website Launch from £299. Growth System from £499. Support from £49/month, optional, no long contract. |

### Must NOT be claimed

- **No numbers that were never measured.** No percentages, no "saved X hours", no
  revenue, conversion, lead-volume or ROI figures for any client or product. None exist.
- **No testimonials or quotes.** Nobody has given one.
- **No client list or logos.** Scrap Finance Partners is the one nameable client build.
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

If you want to say something and cannot source it from this table, **do not say it** —
flag it to Maz as a gap instead.

---

## 4. What the five posts have to achieve

Maz has no posts. A cold reader has no context. The set should, between them:

1. Establish **who this is and what problem he fixes** — in a way a non-technical owner
   recognises as their own situation.
2. Make clear this is **one person, direct**, and that scope and price are agreed
   before paid work.
3. Show **real delivered work**, honestly bounded.
4. Make the **physical products** legible as a business tool, not a 3D-printing hobby.
5. Give **one obvious next step** — the enquiry form at `https://mazworks.uk/#contact`.

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

- **"My own contact form was broken for three days and I didn't know."** True, specific,
  recent, and it demonstrates the exact skill being sold: finding the thing that is
  quietly costing you money. Ends naturally on "when did you last actually test yours?"
  This is probably the strongest single post available and it costs nothing to verify.
- **"The text on my site was 9 pixels."** Also true, also mine-not-a-client's, and it
  makes the point that the problems worth fixing are usually invisible until measured.
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
- A short "claims register": for each factual statement across the five posts, where it
  is sourced from in §3. Anything unsourceable is cut or flagged, not softened.
- Saved to unified memory with the state markers above.
- Nothing published. Maz posts.
