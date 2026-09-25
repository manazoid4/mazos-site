# Paste into local Claude

You are Agent B, working with Codex as the implementation and integration lead for Maz Works. Complete three useful goals, A → B → C, autonomously. Codex will review your actual diff and evidence afterwards. Do not treat your own completion report as acceptance.

Maz Works is a practical business problem-solving studio spanning websites, software, automation and useful physical/3D-produced business products. It is one accountable builder, not a large web-design agency. Think as a sceptical small-business buyer, conversion strategist, designer, accessibility reviewer and commercial operator. Prefer two excellent improvements over ten decorative changes.

## Recover and isolate first

Repository: `C:/Users/manaz/mazos-site` (`manazoid4/mazos-site`). Do not edit that checkout: it contains existing, unrelated dirty Objects work. Do not reset, clean or stash it.

Codex works in `C:/Users/manaz/.codex/worktrees/maz-works-recovery`, branch `agents/maz-works-enquiry-resilience-20260921`, based on main `9e0ebc9` (merged PR #40). PR #40 already consolidated the old recovery/content work plus a shorter homepage enquiry and the FAQ/What's New pages. Do not resume the superseded PR #35/#37 stack. Fetch without resetting another agent's checkout. Create your own worktree at `C:/Users/manaz/.claude/worktrees/maz-works-review-20260921` on branch `agents/maz-works-claude-review-20260921`, based on the latest remote `agents/maz-works-enquiry-resilience-20260921`. Record the exact base SHA. If your worktree already exists, inspect and preserve it instead of recreating it.

Read applicable AGENTS.md, the Maz Works vault project context, `docs/maz-works/RECOVERY-CONTEXT-2026-09-20.md`, and the newer `docs/maz-works/WORK-BLOCK-2026-09-21.md` if present. Inspect git status and recent commits before editing. Yesterday's failed Codex run did not complete; later Claude/Agent B/Codex recovery work must be preserved.

## Ownership — avoid collisions

You may edit only:
- `app/page.tsx`
- `app/projects.ts`
- `app/work/[slug]/page.tsx`
- `app/demos/page.tsx`
- `docs/maz-works/CLAUDE-REVIEW-2026-09-21.md`
- A small supporting evidence folder under `docs/maz-works/`.

Codex owns forms and their helpers, `app/project-elements.tsx`, all `app/3d-printing/**`, all CSS, shared layout/site configuration, tests/scripts and infrastructure. Do not change those files. Report necessary changes outside your scope precisely. Preserve service IDs, route slugs, section anchors and the `ServiceEnquiryLink` / `DemoRequestForm` contracts. Do not duplicate the existing copy/typography work from PR #35.

## Goal A — independent buyer audit

Follow landing → understanding → credibility → services → evidence → enquiry on desktop and mobile. In the first few seconds, can a new visitor tell what Maz Works does, who it helps, why digital plus physical capability matters, what to ask for and how to start?

Rank only the three highest-impact remaining problems, with exact page/element evidence and likely buyer consequences. Distinguish observations from hypotheses. Challenge existing decisions if evidence supports it; do not redesign for activity. Record what is already good and should stay.

Codex is fixing enquiry resilience, keyboard focus, validation feedback and mobile navigation. These are not your implementation tasks. Two small findings within your files: `.mw-capabilities` on home and demos has an `aria-label` on a generic div; use suitable grouping semantics or remove an unnecessary label while reviewing those areas.

## Goal B — make the proof trustworthy and useful

Audit public claims in the homepage, project data, case studies and demos. Distinguish live products, client work, private demos, experiments and concepts. Verify important claims against primary evidence such as the actual live product, public repository or existing approved project notes. A feature in source code is not proof that it is deployed, used by customers or producing results. Pay particular attention to Scrap Finance Partners and JobFilter.

Implement only evidence-backed corrections in your owned files. Explain clearly what a buyer can inspect and what requires a private walkthrough. Do not invent customers, results, revenue, testimonials, logos, uptake or performance claims. Do not expose private repository/client material or change access controls. Preserve useful proof; avoid turning every sentence into a disclaimer.

## Goal C — improve one or two buying decisions

Choose the highest-value remaining copy/structure changes after A and B. Examples: clarify what a starting price covers, explain demo suitability without promising unlimited free bespoke work, or make a relevant service-to-enquiry transition clearer. Keep the existing prices and commercial commitments unless explicit evidence authorises a change. Do not add new sections, cards, promises or CTAs merely to make the page look busier. Fewer words and a clearer next step are often better.

## Verify and hand back

Run `npm run verify` and the repo's lint command. Inspect the changed pages at mobile and desktop widths, keyboard navigation, links, console and runtime behavior. If a literal copy assertion becomes obsolete, report the exact expected test update to Codex rather than weakening or editing tests you do not own. Do not send real test enquiries or other messages. FormSubmit custom-domain activation and real inbox receipt remain unverified; do not claim your copy work fixes delivery.

Commit only your files, push only your feature branch, and do not merge, push main or deploy production. Do not create a competing main-targeted PR over the stacked recovery work. Follow the standing vault/session-memory rules, staging only your own notes.

Your final handoff must include: exact worktree/branch/base SHA/commit SHAs; A/B/C findings and changes; changed files; before/after screenshots or equivalent evidence; tests and failures; sources supporting corrected claims; remaining concerns; and specific recommendations Codex should accept or reject. Keep `CLAUDE-REVIEW-2026-09-21.md` concise enough that another agent can resume without repeating reconnaissance. Do not claim Codex has reviewed or integrated anything until it actually has.
