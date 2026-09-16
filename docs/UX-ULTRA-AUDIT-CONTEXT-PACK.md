# Maz Works UX Ultra Audit — Context Pack

## Purpose

This handoff is for an independent build/audit agent. Audit the current PR as a product/UX system, not as a code-style exercise. The owner’s explicit complaint is that the site feels like a **massive scroll**, has **too many things presented at once**, and the typography feels **too bold / visually loud**. The goal is to make Maz Works feel frictionless, calm, direct and easy to understand while preserving credibility and useful depth.

Repository: `manazoid4/mazos-site`

Current working branch: `feature/ux-compression-ultra-audit`

PR: `#30 — Compress Maz Works UX and reduce scroll`

Production site before merge: `https://mazos-site.vercel.app`

Key routes:
- `/`
- `/3d-printing`
- `/demos`
- `/work/jobfilter`
- `/work/scrap-finance-partners`

## Owner intent

Maz Works is not meant to feel like a generic agency or an Etsy-style 3D-print shop. It should communicate two connected capabilities:

1. **Systems** — websites, automation, AI-assisted workflows and software.
2. **Objects** — useful physical products such as NFC stands, business gifts, recruitment touchpoints, signs, docks and connected customer interfaces.

The differentiator is the ability to connect a physical object to a digital action/workflow, e.g.:

`physical object → NFC/QR → page/form → automation/workflow`

The site should feel designed, restrained and product-led. The owner likes industrial / Teenage Engineering-adjacent clarity: obvious function, simple geometry, restrained colour, tactile logic and minimal visual clutter. Do not imitate Teenage Engineering branding or products.

## Original audit diagnosis

The previous homepage forced almost every proof point into a separate full-width section:

`hero → services → outcomes → objects → impact → work → process → pricing → proof sequence → about → background → AI guardrails → FAQ → contact`

The Objects route similarly forced:

`hero → three large product rows → demo → giant gallery → process → enquiry → business gifting → recruitment → FAQ → custom CTA`

This created four problems:

### 1. Excessive mandatory scroll
Useful content existed, but every visitor had to consume the full hierarchy whether relevant or not.

### 2. Repetition disguised as proof
Services, outcomes and measurable impact described related ideas separately. About, professional background and AI guardrails were separate sections. Process and client-proof sequencing repeated the same conversion story.

### 3. Excessive typographic force
Large headings, default heavy heading weights, 700–900-weight microcopy/buttons and very large vertical paddings made each section feel like a new hero.

### 4. Objects had catalogue friction
The three Touch products were each presented as large alternating editorial rows, followed by more visual explanation and then more use-case sections. This was attractive in isolation but inefficient for a visitor trying to choose or enquire.

## First major pass already implemented

### Shared typography / chrome
- Reduced heading weight to ~600 rather than browser-default heavy bold.
- Reduced button/nav/eyebrow weight.
- Reduced header height.
- Simplified primary nav by removing the redundant “How it works” item while preserving Work, Demos, Services, Objects and demo CTA.
- Added a compact homepage jump bar for Services / Objects / Work / Pricing / Contact.

### Homepage
The architecture was compressed into fewer main decision areas:

1. Hero
2. Services + collapsed outcomes/impact + compact Objects strip
3. Selected work + collapsed secondary work
4. Process + pricing in one shared conversion area
5. About + collapsed professional background / practical AI
6. FAQ
7. Contact

Important changes:
- Services are now four compact cards.
- Outcomes and measurable impact remain in HTML but sit behind a progressive disclosure labelled “What this can improve”.
- Objects is now a compact horizontal strip rather than a standalone full editorial section.
- Only JobFilter and Scrap Finance Partners are visible by default; Agent Nudge and MAZ Pocket remain available under “More work”.
- Five process steps are displayed as a compact strip rather than a large dark full-width block.
- Pricing cards are shorter; client-proof steps are collapsed.
- About, professional background and AI guardrails are merged into one area with optional depth.
- FAQ uses two-column disclosure on larger screens.
- Contact form spacing and input height are reduced.

### Objects route
- Removed the redundant full gallery section entirely.
- Converted Touch One / Touch Three / Touch + Carry from large alternating rows into compact product cards.
- Interactive demo is collapsed by default.
- “How Touch works” is collapsed by default.
- Enquiry remains visible because it is the conversion surface.
- Business gifting, recruitment and custom objects are consolidated into one compact “Beyond the counter” use-case area with expandable rows.
- FAQ remains available but compact.
- Hero and section vertical spacing are substantially reduced.
- Object-specific type weights are softened.

## Important product content that must survive

Homepage:
- “Websites, automation and AI tools built around real business problems.”
- small-business positioning
- free live demo / near-working demo concept
- Microsoft Teams walkthrough option
- transparent pricing: £150 fixed / From £299 / From £499
- £75 start / £75 completion
- support from £49/month / no long contract
- JobFilter
- Scrap Finance Partners
- Agent Nudge
- MAZ Pocket
- operations background / ManyPets / Glide / FCA/DISP
- AI guardrail philosophy

Objects:
- Touch One £29 / £39 with artwork
- Touch Three £49 / £59 with artwork
- Touch + Carry £79 / £89 with artwork
- Optional +£10 supplied artwork
- QR backup
- real-world NFC limitations
- no battery/charging requirement
- link-change caveat for printed QR
- indoor 3D-printed plastic finish
- approval before production
- business gifting
- recruitment agency use cases
- enquiry form

## Tests / non-negotiable implementation constraints

The repository has deterministic tests under `tests/` that assert product language, pricing, accessible navigation, static-export paths and form behaviour. Do not remove required text simply because it is visually collapsed; progressive disclosure is acceptable because content remains in rendered HTML.

Key tests:
- `tests/static-export.test.mjs`
- `tests/objects.test.mjs`

Do not weaken or delete tests merely to make a redesign pass.

The site is Next.js App Router and deploys through Vercel. Main is protected and requires the `verify` status check.

## Files changed in this UX pass

- `app/page.tsx`
- `app/simplified.css`
- `app/credibility.css`
- `app/site-chrome.tsx`
- `app/3d-printing/page.tsx`
- `app/3d-printing/objects-responsive.css`
- this context pack

Avoid unnecessary changes outside those files unless a real regression requires it.

## What the independent audit should inspect

### Information architecture
- Can a first-time small-business visitor understand Maz Works within the first viewport?
- Is the difference between Systems and Objects clear without adding another long explanation?
- Is any remaining section duplicative enough to merge or delete?
- Are the default-open vs collapsed decisions correct?

### Scroll / density
- Compare approximate page length before vs current preview at desktop and mobile.
- Identify any component still consuming too much vertical space for its decision value.
- Check whether collapsed content still creates visual noise via headings or repeated borders.

### Typography
- Is the site now calm enough, or do headings still feel over-weighted/oversized?
- Are mono labels used sparingly enough?
- Is body text comfortably readable without becoming tiny?

### Conversion friction
Homepage path should feel roughly:
`understand offer → see proof → understand price/process → contact`

Objects path should feel roughly:
`understand Touch → compare 3 products → enquire`

Everything else should support those paths rather than interrupt them.

### Mobile
- No giant heading should consume almost a whole viewport.
- Product comparison should be easy to scan.
- CTA buttons should not appear repeatedly without purpose.
- Horizontal layouts should collapse cleanly.
- Disclosure controls must remain obvious and tappable.

### Accessibility
- Preserve focus-visible behaviour.
- Keep semantic headings sensible.
- `<details>/<summary>` must remain keyboard-accessible.
- Avoid reducing text below practical reading size.
- Keep skip target and anchors valid.

### Product tone
Flag anything that feels like:
- agency filler
- AI-generated marketing language
- unnecessary self-description
- invented proof
- generic “digital transformation” language
- ecommerce catalogue clutter

Prefer:
- short concrete claims
- direct product language
- visible proof
- transparent prices
- one clear next action

## What NOT to do

- Do not re-expand the site into many standalone sections.
- Do not replace progressive disclosure with carousels that hide critical comparison information.
- Do not add animations for decoration.
- Do not add large gradients, glassmorphism, generic SaaS cards or AI-style blobs.
- Do not remove price transparency.
- Do not make the physical side look like hobbyist 3D printing.
- Do not promise CRM integrations that have not been scoped.
- Do not invent testimonials, client numbers, conversion percentages or product guarantees.

## Desired independent-agent output

Return a compact audit with:

1. **P0 friction** — anything materially confusing/broken.
2. **P1 reductions** — anything still too long, loud or repetitive.
3. **P2 polish** — typography, spacing, wording or responsive refinement.
4. **Specific code targets** — exact components/classes/files.
5. **Do-not-change list** — parts of the current pass that are working and should stay.

Do not rebuild immediately unless explicitly instructed. The goal of this handoff is to challenge the current direction before the final friction pass.
