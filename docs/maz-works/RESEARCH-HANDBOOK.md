# Maz Works research handbook

How research is done at Maz Works, by any agent (Claude, Codex, OpenCode, GPT) or by Maz. This is the method, not a dump of findings.
- Private findings live in the memory repo: `manazoid4/unified-memory-database` → `handoffs/<date>-<slug>/`.
- The short operational version is [Playbook 10](../playbooks/10-research-and-cro.md).

## 1. Purpose: research answers a decision

Never "research the industry". Every run states which decision it will change, using this chain:

**Decision → Unknown → Evidence needed → Method → Finding → Action**

Example:
- **Decision:** keep the strike-through "bought one by one" price?
- **Unknown:** is it a lawful reference price?
- **Evidence:** CMA and ASA guidance.
- **Method:** read the primary guidance.
- **Finding:** it is not a genuine former price.
- **Action:** remove it.

If no decision changes whatever you find, don't run the research.

## 2. Evidence hierarchy

| Tier | Sources | Use for |
|---|---|---|
| **A** (strongest) | Real Maz Works enquiries, customer conversations and objections, analytics and behaviour, usability tests, completed work | Decisions |
| **B** | First-party competitor sites and prices, official docs, government and regulator guidance (CMA, ASA/CAP, ICO, NCSC), reputable UX research | Decisions and compliance |
| **C** | Reddit, forums, public reviews, owner discussions, creator videos | Customer language, pains, hypotheses. Anecdotes are not market statistics |
| **D** | Generic blogs, SEO listicles, AI-generated claims, unsourced "best practice" | Pointers only. Verify in A or B before acting |

When tiers disagree, the higher tier wins. Tier A always beats an opinion, including an agent's.

## 3. Research questions

Start every run with **3 to 5 explicit questions**.

- **Bad:** "Research dog groomers."
- **Good:**
  - "What admin do groomers complain about again and again?"
  - "What software do they already pay for?"
  - "What stops them adopting another system?"
  - "What words do they use for missed appointments?"

## 4. Source freshness

Every external fact records:
- the URL
- the publisher
- the date accessed
- the date published or updated
- the country or market
- whether it was verified on the primary page

Prices and plans change, so recheck them before use and give each one a **recheck date** (default: 3 months). A price older than its recheck date is unverified.

## 5. Competitor research

No feature matrices. For each competitor capture:

| Field | |
|---|---|
| Visitor type, promise | |
| Entry price, **total unavoidable cost**, recurring cost | |
| Contract or minimum term, ownership | |
| Setup time, proof, guarantee | |
| CTA wording; clicks to enquire; form fields | |
| What happens next (stated) | |
| Main objection answered; main uncertainty left | |

Then: **Borrow principle / Avoid / Irrelevant to Maz Works.** Never copy wording or design.

## 6. Voice of customer

Keep exact customer phrases **separate from marketing copy**, verbatim, with their source.

Tag each phrase as one of: **pain · desired result · fear · objection · current workaround · buying trigger**.

Analyse before rewriting. A phrase can inform copy only after it appears in more than one independent source.

## 7. Mystery-shopper protocol

**Personas to cover:**
- a trades owner
- an appointment business
- a creator
- an office or service firm
- someone who only wants a website
- someone who only wants one small automation
- someone comparing DIY
- someone sceptical of a one-person business

Each persona enters through a **different page** (a trade guide, /prices, /linkedin?src=…, a type page), not always "/". For each test, answer:
1. What do I think Maz sells?
2. Is it for me?
3. What do I get?
4. What does it roughly cost?
5. What is the ongoing cost?
6. How long does it take?
7. What must I do?
8. What happens after I enquire?
9. Why trust Maz?
10. What would stop me continuing?

## 8. Form research

Before adding a form field, answer:
- Why do we need it?
- What decision depends on it?
- Can Maz get it later?
- Can we infer it?
- Does every visitor need to answer it?
- What happens if the answer is wrong?

**No clear answer, no field.**

## 9. Claims ledger

Every important claim on the site, in a post or in a quote is one of:

| Type | Meaning | May be shown as |
|---|---|---|
| **FACT** | Independently supportable | Fact, with its source kept |
| **COMMITMENT** | Maz explicitly promises it (in `app/offers.ts` or `AGENTS.md`) | A promise |
| **HYPOTHESIS** | Likely but unproven | Never as a fact |
| **ASPIRATION** | Desired outcome | Never as a result |

Never show a hypothesis as a fact or an aspiration as a result. Never invent clients, quotes, numbers or guarantees.

## 10. Research → build gate

No finding becomes a site change automatically. A proposed change needs:
- evidence
- the visitor it affects
- the expected benefit
- the risk or downside
- the effort
- a confidence level
- a test method

Then classify it as **SHIP NOW / TEST / LATER / REJECT**. Record it in `docs/maz-works/FRICTION-LEDGER.md`.

## 11. Contradictions

Precedence:
1. Maz's newest explicit decision
2. Current source-of-truth code (`app/offers.ts`, `app/site.ts`)
3. The latest verified handoff
4. Primary, current external evidence
5. Older docs

Never resolve a contradiction silently. Write it down, with both sides and which one you followed.

## 12. What not to research

- Colour or style preferences, and design trends with no commercial purpose
- Vanity redesigns, endless competitor lists, speculative features
- Conversion percentages from blogs. Without our own data they are noise
- Anything answered in the last 3 months. **Search existing research first:** memory `handoffs/INDEX.md`, `docs/maz-works/*AUDIT*`, `FRICTION-LEDGER.md`

## 13. Output template (every run ends with this)

```
Question:
Finding:
Evidence: (tier + URL + date)
Confidence: high / medium / low
Commercial implication:
Recommended action: SHIP NOW / TEST / LATER / REJECT
What would change my mind:   ← mandatory
```

## Where things live

| What | Where |
|---|---|
| Method (this file) and the build queue | `docs/maz-works/RESEARCH-HANDBOOK.md`, `docs/maz-works/FRICTION-LEDGER.md` |
| Public-safe findings | `docs/maz-works/PRICE-AUDIT-*.md`, `PEER-BENCHMARK.md` |
| Detailed and private research, prospect data, delivery recipes | memory repo `handoffs/<date>-<slug>/` (never in this public repo) |
