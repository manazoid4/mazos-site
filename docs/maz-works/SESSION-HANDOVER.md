# Maz Works: latest session handover (public copy)

> Start here: the private handoff index (`unified-memory-database/handoffs/LATEST.md`) holds research, plans and build prompts. This public file keeps only the last 3 entries; older ones are in `docs/archive/SESSION-HANDOVER-history.md`.

## 2 Oct: PR tidy (Claude)
- #103 friction pass rebased onto Offer v10. Brand Kit, FAQ and FAQ-page edits dropped in favour of v10/#108 copy; homepage, contact, leak-check and what-we-do shortening kept. 114 tests, typecheck and build pass.
- #104 outreach pack closed: it named real prospects in this public repo and used v9 prices. Full text kept privately in `unified-memory-database` (`spine/projects/mazworks-site/OUTREACH-COPY-PASTE-v9-PRIVATE.md`). Next: a templates-only pack that reads prices from `app/offers.ts`.
- #105 Social Cat creator-growth research merged (`docs/maz-works/SOCIAL-CAT-CREATOR-GROWTH-BUILD-HANDOFF-2026-10-01.md`); the build itself is still open. #106 closed as superseded.

## 2 Oct: Offer v10, commercial rebuild (Claude, branch `agents/offer-v10-commercial`)

Prices, packages and scope were rebuilt in `app/offers.ts`. **Read `OFFER-V10.md` before touching any price.** Four separate kinds of work: brand (Brand & Content Kit £595), sales pages and websites (Sales Page £895, Brand + Sales Page £1,295, Website from £1,950), automation (Starter £195, Business System from £795) and custom software (from £2,950). Add-ons start at £95. Care is £49 or £195 a month. "2 months of unlimited changes" is now 30 days of tweaks plus a 90-day fix promise. Every package shows who it's for, what's included and excluded, when it's ready, how changes work and the next step. The `/brand-kit` page is now the creators page (content → trust → offer → pay → email list). Typecheck, build, 112 tests and smoke pass; checked at 390px with no overflow. Open PRs #103 and #104 were written against v9 copy: rebase them and keep the v10 prices. Maz: the LinkedIn headline and banner in `LINKEDIN-FUNNEL.md` now say "30 days of tweaks"; update the live profile if you pasted the old line.

## LinkedIn four-goal update (Codex, 30 Sep)

Branch `agents/linkedin-four-goals` adds real-work links, the creator route, changes-scope disclosure and preservation of LinkedIn campaign tags. Prices and scope copy use `app/offers.ts`; the existing design is reused. Details and evidence: `LINKEDIN-FOUR-GOALS.md` and `docs/evidence/linkedin-four-goals/`. Maz: review the PR preview before merging; share the LinkedIn screenshots and personal profile URL when ready. Nothing was posted, sent or merged by this task.

This repo is public. The full handover, open to-dos and research source names live in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md` and `ARCHITECTS-CONTEXT-PACK-2026-09-27.md`.
