# 10. Research and CRO (one run, about 1–2 hours)

**Goal:** answer a decision with evidence, then change the site or offer only when the evidence earns it. The full method is in [RESEARCH-HANDBOOK.md](../maz-works/RESEARCH-HANDBOOK.md).

## Steps

1. **Search first.** Read memory `handoffs/INDEX.md`, `docs/maz-works/FRICTION-LEDGER.md` and any `*AUDIT*` docs. If the question was answered in the last 3 months, reuse the answer.
2. **Write the decision** and 3–5 questions. No decision, no research.
3. **Gather evidence by tier:** A (our enquiries, analytics, customers), then B (primary and official sources), then C (forums and reviews, for language only). D (blogs) is a pointer, never proof. Record the URL, the date accessed and a recheck date for every fact.
4. **Mystery-shop** at least 3 personas, each entering through a different page. Answer the 10 questions in the handbook (§7).
5. **Run the claims check:** every claim you'd ship is a FACT, a COMMITMENT (in `offers.ts` or `AGENTS.md`), or it gets removed.
6. **Apply the gate:** add each proposed change to the friction ledger with evidence, affected visitor, benefit, risk, effort, confidence and a test. Mark it SHIP NOW, TEST, LATER or REJECT.
7. **Build only the SHIP NOW items** (Playbook 1). Run `npm run verify`.
8. **Save the run** in memory `handoffs/<date>-<slug>/research.md` using the output template, including "What would change my mind".

## Don't

- No colour or style research, no vanity redesigns, no long competitor lists.
- No conversion percentages from blogs.
- Never invent quotes, clients or numbers.
- Never put prospect or private data in this public repo.

## Copy-paste starter

```
Research run for Maz Works (repos manazoid4/mazos-site + private manazoid4/unified-memory-database).
Read AGENTS.md, docs/maz-works/RESEARCH-HANDBOOK.md and docs/maz-works/FRICTION-LEDGER.md. Search memory handoffs/INDEX.md for existing answers first.

Decision this run must inform: <e.g. should trade guides lead with price?>
Questions (max 5):
1.
2.
3.

Rules: evidence tiers A>B>C>D; every external fact has URL + date accessed + recheck date; exact customer quotes kept verbatim and separate from copy; claims are FACT or COMMITMENT or removed; never invent; no prospect data in the public repo.
Output: for each question → Question / Finding / Evidence / Confidence / Commercial implication / Recommended action (SHIP NOW, TEST, LATER, REJECT) / What would change my mind. Add SHIP NOW items to FRICTION-LEDGER.md. Save the full run to memory handoffs/<date>-<slug>/research.md. Finish with ≤5 bullets for Maz.
```
