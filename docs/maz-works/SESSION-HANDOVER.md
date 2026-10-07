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

## 2 Oct: Offer v11 + site by customer type (Claude, PRs on `agents/offer-v11` and `agents/site-v11`, merged 2 Oct on Maz's go)

Offer v11 proposes lower prices and one fix ladder (free plan, £49 one-day set-up, Starter £149, Business System from £595, Custom from £2,450), a 16-job automation menu, Creator Starter £149 and Creator Launch £595, and "always included" on every card: see `OFFER-V11.md`. The site now asks "What do you run?" and sends trades, appointments, creators and offices to their own page with a pain table, named recipes, prices, a calculator preset, own-it vs rent-it and day-numbered next steps; `/brand-kit` moved to `/for/creators`. Sales engine pieces in `SALES-ENGINE.md`: the free-plan form sends a drafted reply, `/scope-sheet` prints a scope sheet from `app/offers.ts`, `/start` is the after-payment intake, and the enquiry function syncs HubSpot and schedules follow-ups once the env vars exist. 122 tests, smoke, 390px screenshots (`screenshots-v11/`) and mobile Lighthouse 94–96 pass. Maz approved and merged both; still to add: Stripe links and the two env vars.

- 2 Oct (late): `GOALS.md` added at the repo top; every PR now carries a "Test it yourself" checklist (`.github/pull_request_template.md`). Open PRs and Maz's to-dos are in the private memory repo handover.

- 2 Oct (polish, PR #115): type pages cut to 5 screens or fewer, /prices folded under 8,000px, homepage under 600 words, one main button "Get my free plan" everywhere, labelled demo businesses, 44px taps, /quick-win redirected, outreach templates added. Lighthouse 95+ on 7 pages.
- 2 Oct (later): Offer v12 draft: same prices, one ladder for every business and creator (Launch Page £595, Website = Launch Page + 4 pages), free set-ups in every package, parts-value on price cards, competitor price audit (docs/maz-works/PRICE-AUDIT-2026-10.md).
- 2 Oct (evening): PR #117 conversion fixes: free plan first everywhere, honest demo links, trade guides without website-fix examples, second task £99, 'task' wording, prices chooser, straight answers, research handbook + Playbook 10.
- 6 Oct: Ponytail coding plugin (YAGNI, smallest diff) enabled for all Claude sessions via `.claude/settings.json` in every repo; PC install steps live in the private memory repo `topics/ponytail.md`.
