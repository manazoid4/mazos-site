# Codex task briefs

Claude Code plans and reviews; Codex does the bulk work. Maz runs one brief at a time in Codex, on its own branch, and opens a PR. Claude reviews the PR before merge.

Rules for every brief (from `AGENTS.md`, non-negotiable):

- Prices and offers come only from `app/offers.ts`. Never type a price anywhere else.
- No invented testimonials, clients, results, stats, logos or reviews. Use `TODO(Maz):` placeholders instead.
- Keep "Example", "fictional" and "concept" labels exactly as honest as they are now.
- No AI in the offer: never say "AI assistant" or "AI agent" in site copy.
- Never describe the work as "website repairs", "small fixes" or "quick fixes".
- Never publish Maz's town, county, address, personal email or phone. The public contact is info@mazworks.uk.
- `npm run verify` must pass before the PR. Stay within the homepage word budget in `tests/static-export.test.mjs`.
- Respect `prefers-reduced-motion`. No layout shift (CLS stays 0).

| # | Brief | Size |
| --- | --- | --- |
| 01 | [Architects template to the other five trades](01-trade-guides-template.md) | Large |
| 02 | [Trade illustrations and mock UI images](02-illustrations-mock-ui.md) | Medium |
| 03 | [Structured data and social cards](03-schema-meta.md) | Small |
| 04 | [Alt text and accessibility pass](04-a11y-alt-text.md) | Small |
| 05 | [Scroll reveal component](05-scroll-reveal.md) | Small |
| 06 | [/whats-new rewritten for buyers (optional)](06-whats-new-buyers.md) | Small |
