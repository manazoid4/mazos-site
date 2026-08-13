# Maz Works Handoff

## Mission

Transform the existing Manazir Hussain portfolio into Maz Works: an evidence-led umbrella identity for useful software, AI tools, automation, products, experiments, and client work.

## Current state

The main coherent redesign milestone is complete on `agents/maz-works-framework`. The site is statically rendered, tests cleanly, has a zero-vulnerability production audit, and has been visually checked at mobile, tablet, and laptop widths.

## Preserve

- The FRAMEWORK ivory/charcoal/yellow visual system and crisp structural geometry.
- Honest limitations and real evidence links.
- JobFilter + Scrap Finance Partners as flagships; Agent Nudge + OpenFlowKit as featured work.
- Static Next.js architecture, typed project data, and minimal dependencies.
- Accessibility basics, static-export tests, security headers, analytics, and the no-index `/mazos` legacy handoff.
- Clear identification of Manazir Hussain and one-person Maz Works positioning.

## What changed

- Replaced the blue personal-portfolio treatment with the Maz Works FRAMEWORK system.
- Added a proof-led hero, architectural project bays, project hierarchy, structured data, four-stage process, commercial offer, about section, and three contact pathways.
- Updated metadata, structured data, sitemap date, favicon, social card, tests, README, and persistent docs.
- Cleared dependency audit findings via a lockfile update to secure compatible releases.

## Remaining priorities

## P0

- Claude review/refinement of this branch without undoing the evidence hierarchy or commercial rules.
- Obtain and embed a real Scrap Finance Partners screenshot using a different capture method.

## P1

- Confirm the final Maz Works domain, then update metadata base, canonical, sitemap, robots, JSON-LD IDs, and social URLs together.
- Add a verified LinkedIn profile link once supplied.

## P2

- Consider a dedicated case-study route only when a project needs deeper LinkedIn-to-proof storytelling than the current anchors provide.

## P3

- Add future lab work only when it has enough technical or visual evidence to improve the story.

## Important files

- `DESIGN.md`
- `app/page.tsx`
- `app/projects.ts`
- `app/globals.css`
- `app/layout.tsx`
- `tests/static-export.test.mjs`
- `docs/maz-works/`

## Design rules

- Warm ivory canvas, near-black structural frames, crisp dividers, vertical project bays, selected charcoal grounding, restrained signal yellow.
- Architectural and editorial, not generic AI/SaaS styling.
- Real screenshots and proof carry more weight than technology lists.
- The first viewport must show identity, value, action, and shipped proof together.

## Commercial rules

- Lead with a bounded free tailored demo.
- Founding implementation is £150 total: £75 after demo/scope agreement and £75 when agreed implementation is complete and presented.
- Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds are separate scope.

## Truth boundaries

- Scrap Finance Partners is verified client work and shipped.
- Do not claim revenue, leads, conversion uplift, testimonials, or financial outcomes.
- Do not portray Maz Works as a large agency or £150 as unlimited permanent custom-software pricing.
- Do not describe unbuilt OpenFlowKit native injection or hosted AI routing as shipped.

## Verification state

- `npm run verify` passes in full.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- Eight external evidence URLs return HTTP 200.
- Browser audit passed at 390px, 768px, and available 1280px widths with no overflow or console errors.
- Public Scrap screenshot capture is the only visual-evidence blocker; the live DOM itself was verified.

## Exact next action

Review `docs/maz-works/review-desktop.png`, `review-mobile.png`, and `review-mobile-client.png`, then review the diff. If the design and copy hold, obtain the missing Scrap Finance Partners screenshot through a different capture method and wire it into the existing optional `image` field in `app/projects.ts`.

## Needs Manazir

- Final preferred public domain.
- Valid LinkedIn profile URL.
- Permission/approved visual if automated Scrap Finance Partners screenshot capture remains unreliable.