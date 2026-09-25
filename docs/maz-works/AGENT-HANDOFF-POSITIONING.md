> Current recovery and release gates: [RECOVERY-CONTEXT-2026-09-20.md](RECOVERY-CONTEXT-2026-09-20.md). The dated status below is historical, not current release acceptance.

# Maz Works — positioning brief and agent handoff

**Owner of this file:** Agent A (positioning, conversion, technical).
**Status:** recorded before editing. Agent B may start.
**Branch:** `claude/mazworks-positioning-enquiry-4frq0b`.
**Live site at time of audit:** `https://www.mazworks.uk` (apex 308-redirects to `www`).

---

## 1. Positioning brief (for Agent B)

### Audience

Primary: UK owner-managers, operations leads and sales leads in businesses of roughly
1–50 people. The business already works; time and enquiries leak out of manual steps.

Secondary: local customer-facing businesses (hospitality, retail, trades, salons) that
need one physical-to-digital action to work reliably.

Neither audience is technical. Neither is buying "a website" as a category.

### Promise

> Find the part of the business that is leaking time or enquiries, then build the
> smallest working thing that fixes it.

Delivered directly by one person, with the scope and price agreed before paid work.

### Service grouping

Four outcomes, in the order businesses actually ask for them. Websites are a route
inside the first outcome, not a category of their own.

1. **Capture and follow up enquiries** — websites, landing pages, enquiry paths, lead
   routing, follow-up prompts.
2. **Reduce repetitive admin and missed work** — connect systems, remove repeated
   copying and chasing, make handoffs and reminders explicit.
3. **Build useful internal tools and customer experiences** — custom software, portals,
   dashboards, AI features with validation, approval steps and manual fallbacks.
4. **Connect physical products to useful actions** — Maz Works Objects: tap stands,
   keyrings and gifts that lead to reviews, bookings, menus or a page Maz also builds.

### Proof, by honesty tier

Keep these tiers distinct in copy. Never merge them into one "work" list without labels.

| Tier | Item | What may be claimed |
| --- | --- | --- |
| Paid client work, delivered | Scrap Finance Partners | Positioning, marketing implementation, web build, launch, lead capture, secure client workspace, guarded acquisition automation. No revenue, conversion or lead-volume figures. |
| Live private client demo | Dessert Lane (`/demos`) | A real prospect demo exists behind an access gate. Not a paying client. |
| Own product, live | JobFilter (`jobfilter.uk`) | Shipped and usable. Never implies guaranteed contract awards. |
| Own product, in progress | Agent Nudge, MAZ Pocket, RotaReason | Building. Do not imply finished or in production use. |
| Product, not physically validated | Maz Works Objects Touch | Images stay labelled concept visuals. No claims about magnets, dimensions, waterproofing, outdoor durability, food contact or production-tested fits until a real print is photographed and NFC-tested. |
| Background | ManyPets, Glide | Operations credibility only — complaints, investigations, regulated environments. Not a CV section. |

No invented percentages, testimonials, urgency or guarantees.

### Main action

One enquiry, one place: `/#contact`. Every CTA leads there.

### Language rules

- First person singular. One person, not a team. No "we", "our team", "agency".
- No "AI transformation", "digital transformation" or similar category language.
- "Maz Works" is the studio; Manazir Hussain is the person. Both stay visible.
- Do not replace "website company" with vagueness. Name the outcome, then the method.

---

## 2. Free-demo suitability per service (decision)

The free live demo stays, but it is no longer the only route in. Requiring an unpaid
custom build for every enquiry costs unpaid days and slows the cheap jobs.

| Service | Free demo suits it? | Sensible default next step |
| --- | --- | --- |
| Capture and follow up enquiries | Yes — a near-working page or journey is cheap to show | Free live demo |
| Reduce repetitive admin | Partly — the flow can be demonstrated, the integration cannot without their system access | Teams walkthrough, then a scoped quote |
| Internal tools and AI features | Yes for the interface; no for anything needing their real data | Bounded free live demo |
| Objects (physical) | No — it is a catalogued product with published prices | Quote and design proof |
| Quick Win (£150) | No — the job is smaller than the demo would be | Quote and start |

Implemented by Agent A: the enquiry form now asks **"What would be most useful next?"**
with four answers — free live demo, Teams walkthrough, a quote and scope for a specific
job, or just answer my question first. The free demo remains the default selection.

---

## 3. Packages and scope (no price changes)

Current ladder, unchanged:

| Package | Price | Scope |
| --- | --- | --- |
| Quick Win | £150 fixed (£75 start / £75 completion) | One tightly scoped improvement to a website, workflow or automation |
| Website Launch | From £299 | Focused small-business website or landing experience with a clear enquiry route and deployment |
| Growth System | From £499 | Website or customer journey plus one useful automation or AI-assisted workflow with sensible controls |
| Support | From £49/month, optional | No long contract; third-party usage costs separate |
| Objects — Touch One / Touch Three / Touch + Carry | £29 / £49 / £79 | Artwork add-on +£10 per bundle; delivery and nonstandard requests confirmed separately |

### Duplicate found: Quick Win vs Website Rescue Sprint — RESOLVED 2026-09-19

Resolved in the content pass: "Website Rescue Sprint" is gone and Quick Win is the only
£150 fixed-scope package. A test now asserts the name cannot come back.


`app/page.tsx` defines both `OFFERS[0]` — *Quick Win, £150 fixed, "One tightly scoped
improvement to a website, workflow or automation"* — and `CLIENT_PROOF_STEPS[3]` —
*Website Rescue Sprint, "One agreed improvement, delivered with a clear handoff for
£150"*. These are the same product at the same price under two names.

**Decision: keep Quick Win as the only £150 fixed-scope package. Drop "Website Rescue
Sprint" as a separate name.** Step 04 of the client-proof sequence should refer to
Quick Win. No price changes, no new commitments.

**Also for Agent B (copy, no new promises):** each package should state what it is
*not*. Quick Win is one change, not a rebuild. Website Launch has its scope agreed
before work starts. Growth System includes one workflow, not a department.

---

## 3b. Agent B's scope was absorbed by Agent A (2026-09-19)

Agent B ran out of usage budget ~13 minutes in, during reconnaissance. It pushed no
branch and changed no files, so there was nothing to merge or reconcile. With B out of
the session, the one-editor-per-file split below had no second editor to protect
against, so A took the content/typography/composition pass as well. The ownership table
still describes the intended split if a second agent rejoins.

## 4. File ownership — one editor per file

### Agent A (positioning, conversion, technical)

- `app/enquiry.ts`, `app/enquiry.css` — enquiry logic, service ids, delivery, feedback states
- `app/demo-request-form.tsx`
- `app/3d-printing/touch-enquiry-form.tsx`, `touch-config.ts`, `touch-selection.tsx`
- `app/layout.tsx` — metadata, structured data, stylesheet imports
- `app/site.ts`, `app/sitemap.ts`, `app/robots.ts`
- `app/rotareason/**`, `app/maz-core/**`, `app/maz-pocket-ai/**` — tool and demo routes,
  not marketing pages
- `vercel.json`, `next.config.js`, `api/demo-gate.js`
- `tests/**`
- `docs/maz-works/AGENT-HANDOFF-POSITIONING.md` (this file)

### Agent B (copy, typography, navigation presentation, page composition)

- `app/page.tsx`, `app/demos/page.tsx`, `app/3d-printing/page.tsx`,
  `app/work/[slug]/page.tsx`, `app/mazos/page.tsx`
- `app/projects.ts`
- `app/site-chrome.tsx`, `app/project-elements.tsx`
- `app/globals.css`, `app/simplified.css`, `app/credibility.css`, `app/final-friction.css`
- `app/3d-printing/objects*.css`, `touch-collection.tsx`, `touch-demo.tsx`

Nothing is co-edited. Requests cross the boundary as interface requirements, below.

---

## 5. Interface requirements for Agent B

1. **Service deep-links.** Any CTA may carry `?service=<id>` and land on `#contact`;
   the enquiry form prefills the matching option. Valid ids, stable and test-covered:
   `website`, `automation`, `software`, `objects`, `unsure`.
   Example: `<a href="/?service=objects#contact">`. An unknown or absent id falls back
   to "Not sure yet". Use this instead of writing a separate form per service.
2. **Form labels and options belong to Agent A.** Send wording changes to A rather than
   editing `demo-request-form.tsx` or `touch-enquiry-form.tsx`.
3. **Copy that must change because the form changed.** The homepage CTA button now reads
   **"Send enquiry"**, not "Send demo request". The old field "How would you like to see
   the demo?" is replaced by "What do you need help with?" and "What would be most
   useful next?". Surrounding copy that promises a demo as the only route should read as
   one option among several.
4. **New CSS hooks already exist** in `app/enquiry.css` (A's): `.mw-form-error`,
   `.objects-form-error`, `button.text-link`. Do not redefine them in B's stylesheets.
5. **Remove the "Website Rescue Sprint" name** per section 3.
6. **Tests assert exact strings.** `tests/enquiry.test.mjs` and
   `tests/static-export.test.mjs` pin the service labels, the next-step options and the
   headline copy. Run `npm test` before pushing; tell A if a needed copy change breaks a
   test rather than editing `tests/`.

---

## 6. Findings from this pass

### P0 — the live enquiry form is not delivering (confirmed, 19 Sep 2026)

FormSubmit activation is scoped to the submitting origin. Verified directly against the
live endpoint:

- `Origin: https://www.mazworks.uk` → `{"success":"false","message":"This form needs
  Activation. We've sent you an email containing an 'Activate Form' link..."}`
- `Origin: https://mazos-site.vercel.app` → `{"success":"true"}`

The old Vercel origin still delivers; the live custom domain does not. Every enquiry
submitted from `mazworks.uk` since the domain switch has failed. Visitors see the error
state and the email fallback, so nothing is silently swallowed — but the lead is lost
unless they email manually.

**Needs Manazir:** open the FormSubmit "Activate Form" email (sent to
`manazoid4@gmail.com` during this audit, 19 Sep 2026) and click the activation link,
then re-test from the live site. No code change can substitute for this.

**Mitigated in code by Agent A:** a failed submission now offers a prefilled `mailto:`
carrying everything the visitor typed, so the enquiry is recoverable in one click.

### P2 — canonical URL points at a redirect

`app/site.ts` sets `SITE_URL = 'https://mazworks.uk'`, so every canonical, `og:url`,
sitemap entry and structured-data `@id` names the apex — which 308-redirects to `www`.
Search engines follow it, but the canonical should name the URL actually served.

**Needs Manazir — one decision, then A implements:** either make the apex the primary
domain in Vercel (no code change), or keep `www` primary and A changes `SITE_URL` to
`https://www.mazworks.uk`. Not changed unilaterally because it moves structured-data ids.

### P3 — `/rotareason` was indexable but missing from the sitemap (fixed)

`/rotareason` ships a canonical and no `noindex`, so it is a public, indexable page —
but `app/sitemap.ts` never listed it. Added, at priority 0.7. Two tests now guard the
whole class: every exported page without its own `noindex` must appear in the sitemap,
and every sitemap entry must point at a page that was actually exported. Verified the
first test fails on the original sitemap.

### Verified healthy

- All public routes return 200: `/`, `/demos`, `/3d-printing`, `/work/jobfilter`,
  `/work/scrap-finance-partners`, `/mazos`, `/rotareason`, `/maz-core`,
  `/maz-pocket-ai`, `/sitemap.xml`, `/robots.txt`.
- Security headers present and intact on the live domain, including the CSP that
  permits `https://formsubmit.co` in `connect-src`.
- Indexing control per route is correct: `/maz-core` and `/maz-pocket-ai` carry
  `noindex, nofollow, nocache`; `/mazos` carries `noindex, follow` and canonicalises to
  `/`; the public marketing routes are indexable with their own canonicals.
- Private client demos are properly excluded from search. `api/demo-gate.js` sets both
  an `x-robots-tag: noindex, nofollow` header and a `noindex,nofollow` meta tag on the
  gate page, so no `robots.txt` disallow is needed and none was added.

### Accepted, not changed

`/maz-core` and `/maz-pocket-ai` inherit the root canonical (`https://mazworks.uk`)
rather than declaring their own. Both are `noindex`, so the canonical is inert. Left
alone rather than churning two files for no behavioural change.

---

## 7. Not done / next

- The `Website Rescue Sprint` rename is Agent B's copy change, not made here.
- No second delivery path (server-side enquiry store) was added. Worth considering:
  the repo already runs a Supabase project and Edge Functions for private demos, so an
  enquiry could be persisted there as well as emailed. Not built — it is new
  infrastructure, not a fix, and the activation click resolves the immediate P0.
- Objects units remain physically unvalidated. Unchanged by this pass.
