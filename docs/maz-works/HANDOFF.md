# Maz Works Handoff

## Mission

Maintain Maz Works as Manazir Hussain's independent web, automation and AI/software studio. The site should make it easy for a non-technical business owner, sales lead or team leader to understand what Maz can improve, see real work, request a live demo and contact him without unnecessary friction.

## Current product direction

- Production branch: `main`
- Production site: `https://mazos-site.vercel.app`
- Primary CTA: **Request a free live demo**
- Demo delivery: shareable demo link or Microsoft Teams screen-share walkthrough
- Founding offers: Quick Win £150 fixed; Website Launch from £299; Growth System from £499; optional support from £49/month
- Flagship project proof: JobFilter and Scrap Finance Partners
- Additional selected work: Agent Nudge and MAZ Pocket
- Canonical cross-project knowledge system: **Maz Works Knowledge Vault**; JobFilter is one project inside it

## Positioning

Lead with business outcomes, not technology.

Maz Works helps businesses:

- reduce repetitive admin
- shorten customer and lead wait times
- improve sales follow-up consistency
- reduce dropped tasks and missed handoffs
- give employees more time for useful work
- increase operational capacity without simply asking staff to work longer
- improve websites, lead journeys and customer workflows
- add AI where useful with validation, approval and fallback controls

Do not promise invented percentages, guaranteed sales, guaranteed contracts, guaranteed revenue or ROI without evidence.

## Measurable outcome model

When possible, scope each build against one or two practical measures:

- lead/customer response time
- admin hours per week
- time-to-quote or next action
- follow-up coverage
- overdue tasks / missed handoffs
- workload handled per person
- pipeline movement
- recurring operational bottlenecks

The goal is to show whether a workflow genuinely improved rather than publishing generic AI transformation claims.

## Live-demo funnel

1. Prospect describes the problem in the short form.
2. For a suitable problem, Maz creates a near-working demonstration around the real use case.
3. Prospect can receive the demo link or request a Microsoft Teams walkthrough.
4. Scope, price and important requirements are agreed before paid work begins.
5. Maz completes, tests, deploys and hands over the agreed implementation.

The free demo is not an unlimited free production build.

## Contact implementation

`app/demo-request-form.tsx` submits directly in-page through the FormSubmit AJAX endpoint instead of depending on the visitor's local email application.

Preserve:

- name + email required
- business optional
- one plain-language problem field
- demo preference: link / Teams / either
- visible sending, success and error states
- direct email fallback
- honeypot spam field
- no credentials committed to source

`vercel.json` must continue to permit the FormSubmit endpoint in `connect-src` while keeping the rest of the current security headers intact.

FormSubmit requires a one-time receiving-email activation on first use. If the form ever stops delivering, verify activation and spam folders before changing the UI.

## Project positioning

### JobFilter

Construction-focused growth and automation product for trades and maintenance teams. It supports finding, qualifying, following and organising relevant contract opportunities with less manual admin. It must not be described as guaranteeing contract awards.

### Scrap Finance Partners

Real contract client build for a specialist finance practice serving UK scrap and recycling firms. Maz Works' contribution spans positioning, marketing implementation, web development, launch, lead capture, secure client workspace and guarded acquisition automation. Do not invent revenue, conversion or lead-volume results.

### Agent Nudge

Desktop product for coordinating multiple AI coding agents and reducing stale or overlapping work.

### MAZ Pocket

Hardware + software project focused on a pocket AI assistant, voice interaction, reminders and remote AI access.

## Professional-background story

Keep ManyPets and Glide concise and relevant. The point is not to turn the homepage into a CV; it is to show the operating experience behind Maz Works:

- complex problem investigation
- complaints and escalations
- regulated customer environments
- process improvement
- stakeholder communication
- operational ownership

Narrative: **investigate the real failure point → understand the workflow → build the simplest useful fix.**

## Design rules

Preserve the current restrained Maz Works visual language:

- warm ivory canvas
- near-black structure
- small signal-yellow accents
- strong typography and whitespace
- text-first project presentation
- no large project screenshot galleries on the homepage
- no stock imagery, fake browser mockups or generic AI graphics
- mobile-first scanning

Do not add sections unless they materially improve trust, comprehension or conversion.

## Client-acquisition rules

See `docs/maz-works/CLIENT-ACQUISITION.md`.

Core approach:

**target → research → identify measurable pain → personalised outreach → live demo → Teams walkthrough if useful → scoped paid build → delivery → feedback/testimonial/referral**

## Technical guardrails

- Next.js App Router + TypeScript
- static export remains intentional
- Vercel deployment
- Vercel Analytics
- no secrets in GitHub
- security headers stay explicit
- tests must cover public positioning, internal links, contact delivery source, CSP and static export
- `/mazos` remains no-index legacy handoff

## Before merging future changes

Run the repository verification workflow and check:

- typecheck
- production/static build
- deterministic tests
- internal links
- contact form rendering
- security headers
- mobile layout
- truthful project claims
- production deployment after merge

If a proposed change adds more complexity without making Maz Works easier to understand, trust or hire, reject it.
