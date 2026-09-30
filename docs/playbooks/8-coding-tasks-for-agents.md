# 8. Coding tasks for agents

Goal: turn any idea into a brief another agent (Codex, OpenCode, Gemini) can build right the first time, and a PR Maz can check in 2 minutes.

## Brief template (fill in and paste)
```
Repo: manazoid4/mazos-site. Read AGENTS.md, then docs/playbooks/1-ship-a-site-change.md and any playbook named below.

Goal (one sentence, the customer outcome): <e.g. trainers can see a Brand Kit example on their phone>
Page(s): <route(s)>
Change: <exactly what to add, remove or reword>
Must not change: prices outside app/offers.ts, colours, animations, other pages
Playbooks: <2 offer/voice | 3 design | 4 forms>
Done when:
- npm run typecheck, npm run build, npm test all pass (paste the pass/fail lines)
- the page checked at 390px and 1440px (attach screenshots)
- PR opened with a 3-line summary and the Vercel preview link
Do not merge.
```

## Good tasks for other agents
- Copy trims on one page (cut words, one idea per line)
- A new trade guide in `app/for/niches.ts` (real, anonymised examples only) plus its icon in `app/brand-kit/kit-icon.tsx`
- A new add-on in `app/offers.ts` and its display
- Fixing a failing test or a layout bug with a screenshot

## Keep for Claude (or Maz)
- Price or offer changes (touch many rules at once)
- Anything that sends email or touches `api/enquiry.js`
- Big layout redesigns

## How Maz checks a PR (2 minutes)
1. Open the Vercel preview link on the phone.
2. Look at the changed page only. Does it read clearly? Anything broken?
3. Checks green on the PR? Merge. Otherwise reply with what's wrong in one line.
