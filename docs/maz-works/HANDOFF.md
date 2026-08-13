# Maz Works Handoff

## Mission

Maintain Maz Works as Manazir Hussain's evidence-led umbrella for useful software, AI tools, automation, products, experiments, and client work. The site must turn claims into visible proof quickly, serve employers/clients/collaborators without pretending to be an agency, and remain truthful about what is shipped and what is limited.

## Current state

- Repository: `manazoid4/mazos-site`
- Current documentation branch: `agents/maz-works-production-handoff`
- Production branch: `main`
- Merged pull request: [#9 — Complete Maz Works Quiet Framework refinement](https://github.com/manazoid4/mazos-site/pull/9)
- Merge commit: `c10dc7b`
- Production: `https://mazos-site.vercel.app`
- Preview: `https://mazos-site-git-agents-maz-works-quie-fc7f31-manazir-s-projects1.vercel.app`
- Implementation: merged and live; no known P0/P1 engineering issue
- Remote state: PR, main-branch GitHub `verify`, Vercel production deployment, and production browser checks pass
- Preview access: deployment is Ready but anonymous requests are redirected to Vercel login; use an authenticated session or verified local export/captures
- Visual direction: Quiet Framework
- Flagships: JobFilter (Product); Scrap Finance Partners (Client work)
- Selected work: Agent Nudge (Product); OpenFlowKit (Lab)
- Deep routes: `/work/jobfilter`; `/work/scrap-finance-partners`
- Canonical knowledge system: **Maz Works Knowledge Vault**, covering all projects; JobFilter is one project inside it

## Preserve

- Maz Works and Manazir Hussain named in the first screen.
- Canonical promise: useful software, AI tools, and automation around real problems.
- Work-before-services hierarchy and explicit Product / Client work / Lab labels.
- JobFilter and Scrap Finance Partners as disproportionate flagships.
- Real project screenshots, evidence links, statuses, and limitations.
- Scrap Finance Partners as verified commissioned/shipped client work with no invented commercial outcomes.
- One bounded demo, £150 founding implementation, £75 + £75 split, separate scope, client ownership, and clear handoff.
- Hire / Client / Collaborate as distinct intents inside one contact block.
- Static Next.js architecture, typed project data, few dependencies, security headers, analytics, and no-index `/mazos` route.
- Canonical Maz Works Knowledge Vault identity. Never call the whole vault a JobFilter vault.

## What changed

- Replaced the crowded explanatory homepage with a shorter proof-first Quiet Framework composition.
- Removed the hero proof ledger, separate proof strip, repeated service cards, large yellow sales surface, and three oversized pathway cards.
- Made screenshots larger than supporting copy and moved the client offer after commissioned-work proof.
- Added reusable site chrome, project media/links, shared site constants, and typed case-study data.
- Added statically generated flagship case studies with unique metadata and sitemap entries.
- Captured the live Scrap Finance Partners homepage at desktop/mobile and shipped optimized WebP sources.
- Added client ownership/handoff language and retained every settled commercial boundary.
- Benchmarked ten current founder-led software/automation peers from their first-party sites and translated the strongest repeated patterns without copying identity or visual assets.
- Audited plausible repository candidates before retaining the current four-project hierarchy.
- Expanded tests and completed a visible multi-width browser/accessibility pass.
- Updated the shared Obsidian vault so Maz Works Knowledge Vault is the active cross-project identity.

## Peer patterns applied

The detailed source-backed comparison is in `PEER-BENCHMARK.md`. The build applies these useful patterns:

- lead with work, not a services catalogue;
- name the founder early;
- make one or two projects carry most of the proof;
- describe services through recognizable problems;
- show a bounded next step rather than a vague discovery funnel;
- state client ownership and handoff;
- use one obvious contact destination;
- keep editorial restraint and honest limitations.

It avoids agency-scale claims, invented metrics, generic AI language, logo walls, excessive motion, and vague “we transform businesses” copy.

## Project hierarchy audit

| Level | Project | Evidence judgment |
|---|---|---|
| Flagship | JobFilter | Real product, live workflow, public repository/release evidence, meaningful system depth, honest current source-coverage limitation |
| Flagship | Scrap Finance Partners | Verified commissioned client site, live deployment, real visual evidence, services/pricing structure, and working enquiry path |
| Selected | Agent Nudge | Shipped Windows release and practical multi-agent coordination problem; kept compact because adoption proof is early |
| Selected | OpenFlowKit | Working live/browser/repository proof; correctly labelled Lab because native integrations and hosted routing are not shipped |
| Hold back | FlowLens | Private-pilot foundation with mock/in-memory portions; insufficient public shipped proof for promotion |
| Hold back | VoxPane | Technically interesting but lacks a strong current public release/homepage proof chain |
| Hold back | Khutba.io | Prototype; production speech-to-text, auth, and durable backend remain incomplete |
| Hold back | Furby AI | Hardware plan/experiment without equivalent shipped physical proof |
| Hold back | Recall | Mock agents/demo data weaken portfolio trust at flagship level |
| Hold back | SecureShift | Public plan still identifies core agent endpoints as unbuilt |

## Multi-perspective acceptance

| Lens | Current result | Next reviewer should challenge only if reproducible |
|---|---|---|
| Employer | Manazir, shipped work, technical decisions, code/live proof, and limitations appear before commercial detail | Can a hiring visitor identify judgment and depth within one scroll? |
| Client | Commissioned work precedes the offer; demo, ownership, price split, and scope limits are explicit | Does any wording still imply unlimited work or agency scale? |
| Collaborator | Individual voice, Lab classification, current constraints, and collaboration contact remain visible | Does the site feel human without becoming biography-heavy? |
| LinkedIn | Both flagships have stable, shareable deep routes with unique titles/descriptions | Does a shared case-study route stand alone without homepage context? |
| Editorial | Real work, whitespace, thin rules, square geometry, and restrained yellow carry the system | Is any section visually louder than its evidence value warrants? |
| Conversion | One primary action per major section and a consolidated contact close | Is the free-demo route obvious after proof without dominating the brand? |
| Accessibility | Semantic landmarks/headings, skip link, visible focus, 44px links, alt text, reduced motion, and responsive images verified | Re-run keyboard and browser checks after any reviewer patch |
| Performance | Static output, optimized screenshots, no added framework/font/animation dependency | Keep new assets justified and prevent client-JS growth |
| Maintainability | Project/case-study truth lives in typed data; shared chrome/media are reusable | Add future work through `app/projects.ts`, not copied page markup |

## Remaining priorities

There is no known unfinished engineering item in the agreed build. The items below are delivery/review gates.

## P0

- Next agent independently reviews current `main`, production, the merged PR diff, and four final captures through the nine lenses above.
- Patch only a reproducible truth, accessibility, responsive, broken-link, or visual-hierarchy regression.
- If no P0/P1 finding reproduces, record a clean release review instead of inventing polish work.

## P1

- If a P0/P1 finding reproduces, fix it on a new `agents/` branch, run the relevant full checks, and merge only through a follow-up PR.
- Re-verify production after any follow-up merge.

## P2

- Apply a confirmed custom domain atomically across site constants/tests, or deliberately retain `mazos-site.vercel.app`.
- Add LinkedIn only when Manazir supplies the exact public profile URL.

## P3

- After production is stable, draft one proof-led LinkedIn post: post → case study → live product/code → contact.
- Periodically review public links, project status, screenshots, pricing language, and dependencies.
- Promote new Lab work only when its evidence improves the hierarchy.

## Important files

- `app/page.tsx` — proof-first homepage composition.
- `app/work/[slug]/page.tsx` — reusable deep-case template.
- `app/projects.ts` — canonical project status, proof, limitation, and case-study data.
- `app/site.ts` — canonical URL, identity, and contact routes.
- `app/site-chrome.tsx` — shared header/footer.
- `app/project-elements.tsx` — shared evidence media and links.
- `app/globals.css` — Quiet Framework and responsive/accessibility rules.
- `tests/static-export.test.mjs` — truth, links, metadata, routes, commercial, and static-host guardrails.
- `docs/maz-works/PEER-BENCHMARK.md` — peer research and emulate/adapt/avoid synthesis.
- `docs/maz-works/quiet-framework-*.png` — final reviewer captures.
- `public/scrap-finance-partners*.webp` — optimized real client evidence.
- `README.md` — maintenance workflow.

## Design rules

- Warm ivory canvas, near-black structure, crisp 1px dividers, square geometry, large real media, and very small areas of signal yellow.
- Whitespace and alignment should do more work than containers.
- Project media and decisions outrank technology badges and marketing prose.
- Keep type direct, human, and readable; do not add generic AI gradients, glass, glow, rounded SaaS cards, fake terminals, decorative 3D, or novelty motion.
- Do not imitate the identity, assets, or scale of peer references.

## Commercial rules

- Lead with: “Show me the problem. I'll build a small tailored demonstration first.”
- The free demo demonstrates one bounded problem; it is not full production delivery or days of unpaid bespoke work.
- Founding implementation is £150 total: £75 after demo/written scope agreement and £75 when the agreed implementation is complete and presented.
- Additional workflows, complex integrations, dashboards, migrations, ongoing support, maintenance, major features, and extra revision rounds are separately quoted.
- The client owns the agreed implementation and receives a clear handoff.

## Truth boundaries

- Scrap Finance Partners is real client work and shipped. Do not add revenue, lead, conversion, testimonial, or financial-outcome claims without evidence.
- Maz Works is one builder, not a large agency.
- £150 is a bounded founding offer, not unlimited permanent custom-software pricing.
- OpenFlowKit is a Lab; do not describe unbuilt native injection or hosted AI routing as shipped.
- Do not promote prototypes merely because a repository exists.
- Do not guess a domain, LinkedIn URL, employment history, client result, or private detail.
- The canonical shared vault is Maz Works Knowledge Vault. Legacy `JobFilter-Obsidian-Vault` naming may remain only as historical repository/archive provenance.

## Verification state

- `npm run verify` — pass: TypeScript, production build, 16/16 tests, static smoke.
- `npm audit --omit=dev` — 0 vulnerabilities.
- `git diff --check` — pass.
- 12/12 public evidence URLs — HTTP 200.
- PR #9 — both GitHub `verify` jobs, Vercel deployment, and Vercel preview-comment checks pass.
- Vercel preview — Ready, but anonymous access is protected by Vercel login; this is deployment policy, not an application failure.
- Main — GitHub `verify` and Vercel production deployment pass at merge commit `c10dc7b`.
- Production — homepage, JobFilter case study, Scrap case study, `/mazos`, robots, and sitemap return 200 at 390px/1440px; titles, headings, responsive images, canonical output, overflow, and console pass.
- Visible browser — 360×800, 390×844, 768×1024, 1280×720, 1440×1000; no overflow, console errors, or failed requests.
- Keyboard/focus — first Tab reaches visible skip link; outline visible; rendered links at least 44px.
- Structure/media — valid heading sequence; responsive images load at intended 390/780/1440 sources with meaningful alt text.

## Exact next action

Review current `main` and `https://mazos-site.vercel.app`, then read this file and `PEER-BENCHMARK.md` and execute the Multi-perspective acceptance table once. If a P0/P1 issue reproduces, create a new `agents/` branch, patch narrowly, and re-run `npm run verify` plus the affected browser width. If clean, update this handoff with a concise release-review result and stop.

## Needs Manazir

- Final custom domain or explicit approval to keep `mazos-site.vercel.app`.
- Exact public LinkedIn URL or deliberate omission.

No previous conversation transcript is required.
