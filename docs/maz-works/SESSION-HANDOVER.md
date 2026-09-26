# Maz Works: latest session handover (public copy)

This repo is public, so this copy carries no lead names, contact details or lead actions. The full handover, with Maz's open to-dos and the lead work, is in the private memory repo: `manazoid4/unified-memory-database` → `spine/projects/mazworks-site/HANDOVER.md`. Read that first.

Standard practice: before a session ends with work open, overwrite the private `HANDOVER.md` (4 sentence summary, Maz's open to-dos, next work), then update this public copy with only what is safe to publish.

## 26 Sep 2026 — pass 4 acquisition handover

### Summary
Pass 4 focused the next site change on first-client acquisition rather than another general redesign. PR #63 adds a dedicated `/leak-check` page with a three-field form, makes the free Leak Check the primary homepage/header route, preserves the broad Maz Works offer and confirmed pricing, and reuses the existing resilient enquiry delivery rather than adding another service. Research covered mobile owners, trust, CRO, local SEO, design, accessibility, pricing, current Nottingham/East Midlands competitors and CSS maintainability; the full findings and Claude review brief are in `docs/maz-works/HANDBACK-TO-CLAUDE.md`. Automated typecheck/build/tests/smoke passed on the code change; the remaining pre-merge checks are a real-browser 390px/1440px visual pass and one end-to-end Leak Check delivery test.

### Open goals
- **PR #63 remains open.** Claude should complete the real-browser visual check, verify one Leak Check submission reaches the inbox, review the two-working-day promise with Maz, then fix or merge as appropriate.
- **Goal A remains the first paying client.** The new `/leak-check` route is designed to be a simple URL for calls, cold email, DMs and LinkedIn without copying private lead data into this repo.
- **Do not build thin niche pages yet.** Let real outreach show which niche/problem repeats, then make one useful page backed by evidence.
- **Measure before redesigning again.** Existing Vercel Analytics can show page visits; add conversion events only if they are supported on the current plan without an unwanted cost.

### Guardrails
Never invent clients, results or testimonials. Scrap Finance Partners remains an unpaid client website and JobFilter has no paying customers. Physical Objects remain unvalidated concepts. Never put lead data here. Keep Maz Works broader than a website agency. Branch + PR, never push to main. Outreach only from Gmail as info@mazworks.uk, never Resend. Read `AGENTS.md`, the private `spine/projects/mazworks-site/STATUS.md` and `docs/maz-works/HANDBACK-TO-CLAUDE.md` before the next pass.
