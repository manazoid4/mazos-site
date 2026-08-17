# Maz Works

Public portfolio and client-acquisition site for [Maz Works](https://mazos-site.vercel.app), Manazir Hussain's independent web, automation and AI/software studio.

Maz Works is positioned around a simple idea: start with the real business problem, then build the smallest useful system that solves it. The site combines practical project proof with Manazir's earlier background in complaints, escalations and operations.

## Homepage structure

- Hero — websites, automation and AI tools around real business problems
- Services — Websites, Automation, AI & software
- Useful starting points — enquiries, admin, customer operations, opportunities and controlled AI
- Selected work — JobFilter, Scrap Finance Partners, Agent Nudge and MAZ Pocket
- How it works — problem → live demo → Teams/demo walkthrough → agreed scope → finish/test/handover
- Founding offers — transparent entry pricing
- About — operations and investigations background behind the build
- Professional background — ManyPets and Glide experience kept compact and relevant
- Practical AI — guardrails and human control where decisions matter
- FAQ — removes common first-contact objections
- Contact — short live-demo request form with demo-link or Microsoft Teams walkthrough preference

Large project screenshots are deliberately omitted from the homepage so the work stays easy to scan. Deeper detail remains available through case-study and project links.

## Current founding offers

- **Free live demo — £0** for a suitable first problem. The aim is a near-working demonstration around the real use case, not an abstract problem map.
- **Microsoft Teams walkthrough — available** for screen-sharing the demo, explaining the workflow and answering questions before a paid build is agreed.
- **Quick Win — £150 fixed** for one tightly scoped website, workflow or automation improvement; £75 to start and £75 on completion
- **Website Launch — from £299** for a focused small-business website or landing experience with a clear enquiry route and deployment
- **Growth System — from £499** for a website/customer journey plus one useful automation or AI-assisted workflow with sensible controls
- **Optional support — from £49/month** for agreed maintenance or small ongoing improvements; third-party usage costs are separate

Larger, unusual or ongoing builds are quoted separately after scope is understood. Pricing is intentionally transparent and should never be presented as covering unlimited work.

## Live-demo contact flow

The public site stays a static export with no contact database or required account.

The contact section asks only for:

- name
- email
- optional business name
- what the visitor wants to improve
- whether they prefer a demo link, Microsoft Teams walkthrough or either

Submitting the form opens a ready-to-send email addressed to Maz Works with those details already structured. This deliberately avoids adding a booking platform, CRM or Resend/API dependency before one is needed. A hosted form or Resend endpoint can be added later if enquiry volume justifies the extra infrastructure.

## Flagship positioning

### JobFilter

Construction-focused growth and automation tooling for small trades and maintenance firms. The product goes beyond showing public opportunities: it supports trade-fit qualification, alerts, calendar export, response templates and workflow around pursuing relevant work. It does not guarantee contract awards.

### Scrap Finance Partners

A **contract client build** for a specialist finance practice serving UK scrap and recycling firms. Work spans positioning, marketing implementation, web development, launch, lead capture, a secure client workspace and guarded acquisition automation with approval, dry-run, suppression and recipient-safety controls. No revenue or conversion outcomes are invented.

## Professional background

The homepage connects Manazir's earlier work in complaints and escalations to Maz Works without becoming a CV. Relevant transferable strengths include:

- problem investigation
- process improvement
- client communication
- operational ownership
- cross-team coordination
- regulated customer environments

## Client-acquisition principles

The operating playbook lives in [`docs/maz-works/CLIENT-ACQUISITION.md`](docs/maz-works/CLIENT-ACQUISITION.md).

Core rules:

- sell the outcome before the technology
- research the prospect before outreach
- use a tailored live demo as the low-friction first step where suitable
- offer a Microsoft Teams screen-share walkthrough when seeing the workflow live will help
- show only the most relevant proof
- agree scope and price before implementation
- use AI with validation, approval or fallback controls where risk requires it
- ask for feedback, an approved testimonial and referrals only after successful delivery
- do not manufacture retainers, urgency, testimonials or performance claims

## Routes

- `/` — client-first portfolio and acquisition page
- `/work/jobfilter` — JobFilter case study
- `/work/scrap-finance-partners` — Scrap Finance Partners case study
- `/mazos` — no-index legacy handoff; omitted from navigation and sitemap
- `app/demo-request-form.tsx` — low-friction live-demo request form that prepares a structured email without a backend
- `app/projects.ts` — typed project truth and detailed case-study content
- `app/project-elements.tsx` — shared project evidence links and optional media helper
- `app/site-chrome.tsx` — shared header/footer
- `app/site.ts` — canonical identity and contact constants
- `app/simplified.css` — client-first layout
- `app/credibility.css` — pricing, outcomes, background, FAQ and live-demo form refinements
- `docs/maz-works/` — persistent project state and acquisition playbook

## Content rules

Use plain language on the homepage. Technical detail belongs in case studies, GitHub or product documentation when it helps the reader.

Do not add private client data, credentials, invented outcomes, unapproved testimonials/logos, revenue claims, performance claims or team members that do not exist.

## Stack

Next.js App Router · TypeScript · plain CSS · static export · Vercel Analytics

## Run

```bash
npm ci
npm run dev
npm run verify
npm start
```

`npm run verify` runs typecheck, production build, deterministic static HTML/link tests and a local-server smoke check. Security headers are defined in `vercel.json`. The current contact form intentionally uses a structured `mailto:` handoff rather than storing visitor data or requiring a server-side email secret.

## Project memory

The canonical cross-project knowledge system is **Maz Works Knowledge Vault**. It covers every Maz Works product, client, experiment and operating decision; JobFilter is one project inside it. Legacy `JobFilter-Obsidian-Vault` naming may remain as repository/archive provenance but must not be used as the vault's active identity. Repository-local continuation state lives in `docs/maz-works/`.
