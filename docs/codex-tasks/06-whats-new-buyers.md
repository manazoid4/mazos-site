# 06 · /whats-new rewritten for buyers (optional)

## Goal
`/whats-new` currently reads like a changelog for the site. It's off the main nav (29 Sep) and linked only from the site map. Either rewrite it for buyers, or leave it as it is.

## If rewriting
- Retitle it "What I've shipped lately". Each entry says what a small business owner can now get, in one line, with a link to the page.
- Only list things that are live on the site. No client names or results unless they're already on a case study page.
- Keep the phrase "Easier to find your way around" somewhere on the page (a test checks for it), or update that test in the same PR with a comment explaining why.

## Acceptance criteria
- No entry mentions internal tooling, tests or refactors.
- `npm run verify` passes.

## Don't touch
The nav. Adding the page back to the nav is Maz's call after he reads the rewrite.
