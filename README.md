# mazos-site

Public one-pager for **MAZos — the loop cockpit**: the control plane for supervised AI agent loops with machine-verified receipts.

Built as its own three-iteration loop (scaffold → evidence → ship quality), each iteration verified with `npm run build` and committed with the result — the site practices what it pitches.

## Stack

Next.js (App Router, static export) · TypeScript · plain CSS. No other dependencies.

## Run

```bash
npm install
npm run dev     # local
npm run build   # static export to out/
npm run lint    # tsc --noEmit
```

Deployed on Vercel.
