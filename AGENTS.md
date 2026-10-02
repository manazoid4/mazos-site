<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions — Maz Works site

This repo is the Maz Works marketing site. Before any sales, lead, offer or copy work, read the shared context:

- **Lead rules: Lead Quality v2** (28 Sep 2026). Brief: `docs/maz-works/LEAD-QUALITY.md`. Canonical: vault `prompts/maz-works-niche-needs.md`. Gold does not need a limited company.

- Focus (3 projects only): `NOW.md` in the vault → https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/NOW.md
- Lead rules, niche needs, gift rule (paying clients only), lead hand-off format: https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/prompts/maz-works-niche-needs.md
- Prompt library + `/mw-*` commands: https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/prompts/maz-works-prompt-library.md
- Leads, call list, pitches: PRIVATE repo https://github.com/manazoid4/maz-works-leads. Never copy lead data into this public repo.

Local vault path: see the private memory repo.
**Positioning (Maz, 27 Sep 2026, non-negotiable):** Maz Works builds the systems small businesses run on: automation, connected tools and custom software that win customers and take admin off the owner. It is **not** a website-fix shop or a small-time web agency. Never describe the work as "website repairs", "small fixes", "quick fixes" or "fix your broken link" in site copy, posts, outreach or quotes. Lead with outcomes (more enquiries become customers, less chasing, hours back). Audience is every UK small business and team, any trade; don't narrow it to one niche. **Pricing model (Offer v11, approved and merged by Maz 2 Oct): read `docs/maz-works/OFFER-V11.md` before touching any price.** One fix ladder for every customer: Free plan £0, One-day set-up £49, Starter Automation £149 (one job from the 16-job automation menu, 30-day money-back), Business System from £595 (three jobs + weekly report), Custom Software from £2,450. Creators: Creator Starter £149, Creator Launch £595. Website from £1,495. One-day set-ups are £49 and sit on tools the client already has, never something that runs on its own; add-ons (Extra automation £145, Weekly report £145, Extra website page £295, Team training £95) only add to a package. Care is £39/month or £149/month. Changes are 30 days of tweaks (two rounds) plus a 90-day fix promise, never "unlimited". Do not lower prices further, re-bundle brand with website work, or bring back unlimited changes without Maz saying so. Keep these rules consistent so no two prices clash. If a request needs real building, quote it as a Starter or a package, not a set-up. Free first step = Free Plan & Fixed Quote (/free-plan). Offers and prices live only in `app/offers.ts`; change them there, never hard-code prices elsewhere. **One main action (2 Oct):** every primary button says "Get my free plan" (`MAIN_CTA` in `app/site.ts`); the free demo is always a secondary link. **No AI in the offer (Maz, 27 Sep):** AI may be used behind the scenes to build or run things, but is never advertised or sold; no "AI assistant" or "AI agent" copy on the site, in posts or in quotes. Sell the outcome instead: customers connecting and booking easily, appointments confirmed, reviews collected, as priced optional extras.
Rules: branch + PR, never push to main. Never invent testimonials, clients or results. **Never publish Maz's location (town, county, address), personal email or phone number** in this public repo or on the site; the public contact is info@mazworks.uk only.

**Playbooks:** `PLAYBOOKS.md` (repo root) links every playbook: site changes, offer and voice, design, forms, leads, Instagram, LinkedIn, coding briefs, weekly review. Read the one for your job.

## Handoffs (all agents, 2 Oct 2026)
Start: read the private `manazoid4/unified-memory-database` → `handoffs/LATEST.md`, then this file. Finish: save research, plan and a copy-paste **build prompt** (or `result.md` with PR links and proof) in a dated `handoffs/YYYY-MM-DD-slug/` folder, update `handoffs/INDEX.md` and `LATEST.md`, push via PR, add one line to `docs/maz-works/SESSION-HANDOVER.md` (public, no names). Report to Maz in at most 5 short bullets. Old handoffs live in `docs/archive/`.

## Working with Maz (read every session)

- **Start and end with the handover.** Read `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` first (public summary: `docs/maz-works/SESSION-HANDOVER.md`). Before a session ends with work open, overwrite the private `HANDOVER.md` (4 sentence summary, Maz's open to-dos, next work), then update the public copy with no lead names or contact details.
- **Every PR has a "Test it yourself" checklist** (Maz, 2 Oct): what works now, then plain tick-box steps he can do on his phone or browser, each with the result he should see, then what's not done. Template: `.github/pull_request_template.md`.
- **Always link the changed pages** (Maz, 2 Oct): every report and PR lists direct links to each page that changed (live `https://www.mazworks.uk/<path>` and the preview), so he can open and check each one.
- **Site feedback (Maz, 2 Oct): no tools, no logins.** Maz gives feedback in chat: a screen recording with his voice (preferred; process it with `tools/video-feedback.py` in the private memory repo), a phone screenshot (scribbled on or not) and/or a voice note like "prices page, the green box, make it shorter". The agent finds the page itself, takes its own 390px screenshot, makes the change on a branch + PR, and sends back before/after screenshots plus the direct page links. Never ask him to install or log into anything to give feedback. Vercel toolbar comments are optional; if any exist, read them too (Vercel MCP `list_toolbar_threads`, team `team_Kwz4G5onOQHAofY0x8SzgHxO`).
- **Always end every reply with a one-paragraph summary** in plain words (Maz, 28 Sep, repeated several times). Keep replies short: what he must do, and what changed. Details belong in PRs.
- **Remind him of his open to-dos** at the start and end of each session. He asks for this; he forgets things like posting. The list lives in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/STATUS.md` → "Maz's open to-dos". If a session ends with one still open, schedule a reminder with `send_later`.
- Prefer free tiers and say plainly when something costs money.
- **Email (all outreach):** every lead email, cold or warm, is sent by Maz from Gmail using the `info@mazworks.uk` From address (Gmail "Send mail as", live since 26 Sep 2026), and every reply to any `@mazworks.uk` address lands in Maz's Gmail via ImprovMX. Never send outreach through Resend or any other tool; Resend is only for the site's opt-in mail. Details: `docs/maz-works/EMAIL-SETUP.md`.
- **Posts:** every LinkedIn/public post follows his posting rules in `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/POSTING-RULES.md`. Hand over final text in a plain code block, no dashes, link in the first comment, and audit claims before handing over.
- **HubSpot (standard, always):** company names start with the tier, `🥇 GOLD · `, `🥈 SILVER · ` or `BENCH · ` (Maz reads HubSpot on his phone, where custom properties don't show), and the `Lead tier`, `Contact route` and `Website problem` properties stay in sync. Every call is a HubSpot **Task** (type Call, due time, number + one-line script in the body). Emailed leads get lead status `Attempted to contact`. Inbox-only contacts are named `<Business> (team)`.
- **To-dos + URLs (standard, Maz 28 Sep):** every lead is a HubSpot Task assigned to Maz (Gold first, then Silver, Bench as Re-check), and every task, pitch note and `Website problem` includes the business website and the exact evidence URL so he can see the problem himself. Verify a claim before stating it.
- **YouTube URL from Maz (standard, 29 Sep):** treat it as project intelligence: follow the vault `prompts/youtube-video-intelligence.md` and save the note in vault `wiki/sources/video-intelligence/`. Search that index before new research or a strategic decision.
- **Pitch + script (standard):** every lead in HubSpot gets a `📞 PITCH + SCRIPT` note: pitch, result, route and a 5-step call script for Gold/Silver; a one-line solution for Bench. Format in the vault `prompts/maz-works-niche-needs.md`.
- **Leads (standard):** tier Gold 8–10 / Silver 6–7 / Bench, recorded in the private `maz-works-leads` repo and HubSpot together. Cold email only to confirmed limited companies; everyone else is phone or walk-in.
- **Contact the owner directly (standard, Maz 30 Sep):** every outreach goes to the owner or decision-maker by name, never a generic "the team" pitch.
  - **Before drafting,** find the owner using Companies House officers, the LinkedIn company page, the About/Team page and review sites. Note their name and profile URL, plus one personal hook from their own words (for example a LinkedIn About line), in HubSpot.
  - **Route order:**
    1. LinkedIn message to the owner (short "Before you hire…" style, 300 characters or fewer, one message plus a subject line);
    2. email to the owner's own business address, or the public inbox addressed to them, only when the company is a confirmed Ltd;
    3. a phone call asking for the owner by name, after a CTPS/TPS check.
  - **Follow-up:** one follow-up after 3 days by the next route, logged as a HubSpot task.
  - Never guess or scrape private email addresses or personal mobiles.
- **Easy to read (standard, Maz 30 Sep):** break up every email, LinkedIn message, DM and note we send.
  - Keep sentences short, one idea per line or short paragraph, with a blank line between them.
  - Put the ask on its own line at the end.
  - No walls of text: a LinkedIn note is 2 to 4 short lines, and an email is 4 to 6 short blocks.
