<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions — Maz Works site

This repo is the Maz Works marketing site. Before any sales, lead, offer or copy work, read the shared context:

- Focus (3 projects only): `NOW.md` in the vault → https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/NOW.md
- Lead rules, niche needs, gift rule (paying clients only), lead hand-off format: https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/prompts/maz-works-niche-needs.md
- Prompt library + `/mw-*` commands: https://github.com/manazoid4/maz-works-knowledge-vault/blob/main/prompts/maz-works-prompt-library.md
- Leads, call list, pitches: PRIVATE repo https://github.com/manazoid4/maz-works-leads. Never copy lead data into this public repo.

Local vault path: `C:\Users\manaz\Desktop\Maz Works Knowledge Vault`.
Rules: branch + PR, never push to main. Never invent testimonials, clients or results.

## Working with Maz (read every session)

- **Start and end with the handover.** Read `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` first (public summary: `docs/maz-works/SESSION-HANDOVER.md`). Before a session ends with work open, overwrite the private `HANDOVER.md` (4 sentence summary, Maz's open to-dos, next work), then update the public copy with no lead names or contact details.
- Reply in **two short, plain paragraphs**: what he must do, and what changed. Details belong in PRs.
- **Remind him of his open to-dos** at the start and end of each session. He asks for this; he forgets things like posting. The list lives in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/STATUS.md` → "Maz's open to-dos". If a session ends with one still open, schedule a reminder with `send_later`.
- Prefer free tiers and say plainly when something costs money.
- **Email (all outreach):** every lead email, cold or warm, is sent by Maz from Gmail using the `info@mazworks.uk` From address (Gmail "Send mail as", live since 26 Sep 2026), and every reply to any `@mazworks.uk` address lands in manazoid4@gmail.com via ImprovMX. Never send outreach through Resend or any other tool; Resend is only for the site's opt-in mail. Details: `docs/maz-works/EMAIL-SETUP.md`.
- **Posts:** every LinkedIn/public post follows his posting rules in `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/POSTING-RULES.md`. Hand over final text in a plain code block, no dashes, link in the first comment, and audit claims before handing over.
- **HubSpot (standard, always):** company names start with the tier, `🥇 GOLD · `, `🥈 SILVER · ` or `BENCH · ` (Maz reads HubSpot on his phone, where custom properties don't show), and the `Lead tier`, `Contact route` and `Website problem` properties stay in sync. Every call is a HubSpot **Task** (type Call, due time, number + one-line script in the body). Emailed leads get lead status `Attempted to contact`. Inbox-only contacts are named `<Business> (team)`.
- **Leads (standard):** tier Gold 8–10 / Silver 6–7 / Bench, recorded in the private `maz-works-leads` repo and HubSpot together. Cold email only to confirmed limited companies; everyone else is phone or walk-in.
