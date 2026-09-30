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
**Positioning (Maz, 27 Sep 2026, non-negotiable):** Maz Works builds the systems small businesses run on: automation, connected tools and custom software that win customers and take admin off the owner. It is **not** a website-fix shop or a small-time web agency. Never describe the work as "website repairs", "small fixes", "quick fixes" or "fix your broken link" in site copy, posts, outreach or quotes. Lead with outcomes (more enquiries become customers, less chasing, hours back). Audience is every UK small business and team, any trade; don't narrow it to one niche. **Pricing model (Offer v9, 27 Sep):** a low-cost Starter Automation (£195) so anyone can begin, bigger tiers (Business System from £795, Custom Software & Websites from £1,950), twelve add-ons from £39 to £145 in four groups (Google Business Profile £49, single website page £145, team training £39), each with a plain line saying what the customer gets, a ManyPets-style comparison table and "what's not included" list, and Keep It Running at £19/month. Standard add-ons can be bought alone; Extra automation only adds a second job to a package; the weekly report is included in a Business System. Keep these rules consistent so no two prices clash. Every add-on must stay a quick set-up on tools the client already has; if a request needs real building, quote it as Business System or Custom instead. Free first step = Free Plan & Fixed Quote (the /leak-check form). Offers and prices live only in `app/offers.ts`; change them there, never hard-code prices elsewhere. **No AI in the offer (Maz, 27 Sep):** AI may be used behind the scenes to build or run things, but is never advertised or sold; no "AI assistant" or "AI agent" copy on the site, in posts or in quotes. Sell the outcome instead: customers connecting and booking easily, appointments confirmed, reviews collected, as priced optional extras.
Rules: branch + PR, never push to main. Never invent testimonials, clients or results. **Never publish Maz's location (town, county, address), personal email or phone number** in this public repo or on the site; the public contact is info@mazworks.uk only.

**Playbooks:** `docs/playbooks/README.md` has five short guides (ship a change, offer and voice, design, forms and conversion, leads). Read the one for your job.

## Working with Maz (read every session)

- **Start and end with the handover.** Read `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` first (public summary: `docs/maz-works/SESSION-HANDOVER.md`). Before a session ends with work open, overwrite the private `HANDOVER.md` (4 sentence summary, Maz's open to-dos, next work), then update the public copy with no lead names or contact details.
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
