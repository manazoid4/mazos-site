# Implementation Plan: Maz Works Quiet Framework Refinement

## Outcome

Refine the tested Maz Works preview into a calm, minimal, evidence-led portfolio that serves employers, clients, collaborators, and LinkedIn visitors without reading like a low-cost agency sales page. Evolve the current implementation; do not restart it.

## Baseline

- Branch: `agents/maz-works-framework`
- PR: https://github.com/manazoid4/mazos-site/pull/8
- Preview: https://mazos-site-git-agents-maz-works-framework-manazir-s-projects1.vercel.app
- Existing build/tests/preview: green before this plan
- Current captures: `docs/maz-works/review-desktop.png`, `review-mobile.png`, `review-mobile-client.png`
- Visual contract: `DESIGN.md`

## Why refine

The current build is truthful, structured, and distinctive, but the same ideas are repeated across the hero ledger, proof strip, project story cells, service list, process, client section, and pathway cards. Yellow occupies too much area in the client section, the mobile hero/header are crowded, and real product visuals do not yet carry enough of the story.

The refinement should cut roughly one third of homepage copy, remove redundant containers, and move confidence from claims to project evidence.

## Target architecture

```text
Compact identity/header
Short hero + one proof line
JobFilter flagship
Scrap Finance Partners client flagship
Selected work index
What I build / How I work
Bounded client offer
About + one contact block
Footer
```

## Task 1 — Simplify the homepage information architecture

This is the exact next task and one coherent visual checkpoint.

### Work

- Reduce the header to the essential internal destinations; keep external links in the footer on narrow screens.
- Replace the hero's proof ledger and two competing large buttons with a shorter statement, one primary action, one quiet secondary route, and one concise proof line.
- Remove the separate proof strip.
- Keep JobFilter first and Scrap Finance Partners second, but use larger media and shorter factual summaries.
- Render Agent Nudge and OpenFlowKit as a compact selected-work index rather than equal flagship cards.
- Merge “What I build” and “Process” into one short section.
- Replace the three large Hire / Client / Collaborate cards with one contact block that preserves three distinct links/intents.
- Keep the client offer after Scrap proof and make its visual hierarchy quieter without changing any commercial wording.

### Acceptance

- A first-time visitor understands who Manazir is, what he builds, sees shipped proof, and can reach work from the first screen.
- No important project truth, limitation, external link, email intent, or scope protection is lost.
- No section repeats an earlier section's primary purpose.
- The commercial offer remains fully readable but is not the largest colored object on the page.
- Mobile navigation and hero fit comfortably without tiny crowded links or an excessively tall first screen.

### Likely files

- `app/page.tsx`
- `app/globals.css`
- `tests/static-export.test.mjs`

### Verification

- `npm run verify`
- Inspect 390px and 1280px views with no overflow or console errors.
- Save new captures beside the existing review images with clear `quiet-framework` names.
- Update `PROGRESS.md`, `HANDOFF.md`, `PLAN.md`, and `NEXT-STEPS.md`.
- Stop for visual review before Task 2.

## Task 2 — Refine the visual system

### Work

- Reduce yellow to status/focus/one-action accents; remove large yellow surfaces.
- Use whitespace and section rules before adding frames.
- Establish a measured 12-column desktop grid and clean single-column mobile flow.
- Tune hero and section typography so the mobile headline is large but not viewport-dominating.
- Keep square geometry and near-black structure; avoid adding shadows, rounded SaaS cards, gradients, or decorative motion.
- Evaluate a self-hosted OFL grotesk plus existing mono labels only if the current font is clearly holding the result back; measure the added weight before keeping it.

### Acceptance

- Screenshots, not yellow panels or borders, are the strongest visual objects after the hero text.
- The page has obvious rhythm without every item becoming a card.
- Focus styles remain more visible, not less.
- The page remains complete with reduced motion and JavaScript disabled where applicable.

### Verification

- Compare 360/390/768/1280/1440 widths.
- Check focus, contrast, text wrapping, image crops, and touch targets.
- Run `npm run verify`.

## Task 3 — Complete flagship visual evidence

### Work

- Capture the real Scrap Finance Partners site using local Chrome/OS capture, a safe screenshot utility, or an asset approved by Manazir; do not retry the failed in-app CDP path unchanged.
- Crop away browser chrome and private data, optimize the asset, write factual alt text/caption, and store it under `public/`.
- Confirm JobFilter's chosen screenshot shows the product rather than decorative framing.
- Keep captions factual; do not imply revenue, lead, conversion, or testimonial outcomes.

### Acceptance

- Both flagships have crisp real visuals at their rendered sizes.
- Scrap's asset visibly supports its verified services/enquiry/client-work story.
- Assets are responsive, appropriately sized, and ideally under 250 KB each where quality permits.

### Verification

- Compare each asset with the live source.
- Run build/tests and inspect mobile/tablet/laptop crops.

## Task 4 — Add two deep case studies

### Work

- Add a reusable static case-study template and routes only for JobFilter and Scrap Finance Partners.
- Drive shared content from typed data rather than duplicating facts.
- Use Problem → Insight → What I built → How it works → Proof → Status → Limitation.
- Include meaningful live/repository links, a clear return to selected work, and a relevant contact route.
- Add project-specific title, description, canonical, and social data; use a project social card only if it can be generated truthfully and cleanly.

### Acceptance

- Each route adds depth beyond the homepage rather than repeating it verbatim.
- Every claim has a real evidence source or is clearly framed as a limitation/current status.
- Routes work in the existing static export and provide stable LinkedIn destinations.
- No CMS, database, or new routing abstraction is introduced.

### Likely files

- `app/work/[slug]/page.tsx` or explicit static route equivalents
- `app/projects.ts`
- `app/globals.css`
- `tests/static-export.test.mjs`

### Verification

- `npm run verify`
- Check generated routes and metadata in `out/`.
- Keyboard/mobile review of both case studies.

## Task 5 — Audit selected work and human voice

### Work

- Review only plausible current repository candidates against problem, shipped proof, technical depth, originality, commercial relevance, evidence quality, and current relevance.
- Promote nothing solely because it exists on GitHub.
- Keep Agent Nudge/OpenFlowKit unless another project clearly strengthens the story.
- Add a concise About/current-interests paragraph that sounds like one person, avoids biography inflation, and gives collaborators a reason to engage.

### Acceptance

- Flagship remains 1–2 projects, selected work remains roughly 2–4, and experiments do not dilute the page.
- Every visible project has a status, evidence route, and limitation.
- Manazir remains clearly identifiable; Maz Works never sounds like a team or agency.

## Task 6 — Make the client path confident and bounded

### Work

- Keep the free-demo offer after client proof.
- Present £150 total / £75 + £75 as founding implementation terms in restrained typography.
- Keep the bounded-demo definition and separately quoted out-of-scope examples adjacent enough to be understood on mobile.
- Preserve distinct Hire, Client, and Collaborate email intents while consolidating their visual presentation.
- Confirm mailto subjects/bodies are useful and truthful.

### Acceptance

- A client sees the actual commissioned project before pricing.
- No reasonable reading implies unlimited custom software for £150.
- Employers and collaborators can reach their path without passing through a sales funnel.

## Task 7 — Accessibility, performance, SEO, and truth gate

### Accessibility

- Verify skip link, Tab order, visible focus, landmarks, heading order, meaningful link names, alt text, contrast, 44px targets, and reduced motion in a real browser.
- Fix observed problems without hiding content from assistive technology.

### Performance

- Keep runtime JavaScript and dependencies minimal.
- Optimize screenshots and any added fonts; prevent avoidable layout shift.
- Preserve static rendering/export and security headers.

### SEO and identity

- Keep titles/descriptions/JSON-LD truthful and aligned with Maz Works and Manazir.
- Apply a confirmed domain across canonical, sitemap, robots, JSON-LD, OpenGraph, and tests in one change, or explicitly retain the Vercel domain.
- Add LinkedIn only when the exact public profile is verified.
- Add case-study sitemap entries and project metadata if Task 4 ships.

### Truth

- Recheck every project status, limitation, link, and client claim against live evidence.
- Remove or qualify anything that cannot be supported.

### Verification

- `npm ci`
- `npm run verify`
- `npm audit --omit=dev`
- External-link status check
- Generated HTML/robots/sitemap/metadata inspection
- Real-browser accessibility and console pass

## Task 8 — Independent refinement review and launch

### Work

- Have Claude review the final diff, refreshed captures, preview, and case studies.
- Accept only reproducible P0/P1 findings before launch; record lower-priority ideas separately.
- Reconcile PR #8 with `main` and dependency automation without losing useful local work.
- Update PR description and all persistent memory.
- Merge through GitHub only after review and green checks; never push directly to `main`.
- Verify production independently of preview.

### Launch gate

- No unresolved P0/P1 findings.
- Full local verification and audit pass.
- GitHub and Vercel checks pass.
- 360/390/768/1280/1440 browser review passes with no overflow or console errors.
- Production homepage, both case studies, `/mazos`, robots, sitemap, social assets, project assets, and contact links behave as expected.

## Task 9 — Distribution and maintenance

- After production stabilizes, draft one proof-led flagship LinkedIn post; Manazir must approve before publishing.
- Link post → case study → live product/code → contact.
- Document how to add a project, client, proof asset, status, limitation, and case study through the typed data/template.
- Run a lightweight periodic audit of links, project status, screenshots, pricing wording, and dependency security.

## Dependency order

```text
Task 1 homepage checkpoint
  → Task 2 visual refinement
  → Task 3 real proof assets
  → Task 4 flagship case studies
  → Tasks 5–6 content/commercial refinement
  → Task 7 quality gate
  → Task 8 review + launch
  → Task 9 distribution
```

Task 3 may begin alongside Task 2 only if it does not delay the Task 1 visual checkpoint. Domain and LinkedIn inputs are human gates for Task 7/8, not reasons to block Tasks 1–6.

## Risks and controls

| Risk | Control |
|---|---|
| Refinement becomes a disconnected redesign | Preserve typed data, truth, hierarchy, static architecture, and existing useful components |
| Minimalism removes necessary proof | Cut repetition, not evidence; every flagship keeps status, limitation, and destinations |
| Site reads as a cheap agency | Put work before pricing, reduce yellow, and keep Manazir explicit |
| Case studies duplicate homepage | Homepage summarizes; routes explain decisions/how/proof in depth |
| Screenshot capture loops | Change capture method after the two recorded failures or request an approved source asset |
| New font/assets harm performance | Self-host only OFL assets, measure weight, optimize, and revert if the benefit is marginal |
| Reviewer reopens settled truths | Require reproducible findings and preserve commercial/truth rules |
| Context interruption | Update the four memory files at every visual/quality/launch checkpoint |

## Non-goals

- No new brand detached from Maz Works.
- No invented clients, results, testimonials, CV history, or team scale.
- No CMS, database, contact backend, animation library, technology badge wall, or generic AI visual layer.
- No major LinkedIn effort before the site and case-study story are stable.
- No direct push to `main`.
