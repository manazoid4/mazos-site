# HyperFrames evaluation for site demos (9 Oct 2026)

Source: ILM research note `ilm-20261009-223836-research-on-mattpocock-s` (private maz-agents repo).

## Verdict

**Use it for short demo clips. Do not add it to the site build.**
It renders a plain HTML page to MP4 locally, free, on this Windows PC with no Docker. Keep compositions in `docs/maz-works/hyperframes-demo/` and drop the rendered MP4 into `public/` only when a page actually needs it.

## What was tested

- `npx hyperframes@0.8.143 init demo-video --example blank --non-interactive`
- Wrote a 6 second, three-step clip: enquiry at 9:47pm → instant reply → booked. Source: [hyperframes-demo/index.html](hyperframes-demo/index.html).
- `npx hyperframes render` → 1920x1080, H.264, 30fps, 6.0s, 378 KB, rendered in 18.6s (9.2s of that is one-off browser start-up). Checked with `ffprobe` and a frame grab.

## Fit for Maz Works

- Good: outcome demos for posts and offer pages (missed enquiry → booked, review request → review), PR-to-video changelogs, social clips. Plain HTML/CSS + GSAP, so any agent can edit them.
- Not needed: Remotion or React video tooling. Nothing new goes in `package.json`; `npx` pulls it on demand.
- Copy rules still apply: outcomes only, no AI wording, no invented clients or numbers, prices only from `app/offers.ts`.

## Watch-outs

- Anonymous telemetry is **on by default**. Run with `DO_NOT_TRACK=1` (or `npx hyperframes telemetry disable` once).
- `init` checks skills against GitHub; set `HYPERFRAMES_SKIP_SKILLS=1` to skip.
- Paid paths exist (`hyperframes cloud` on HeyGen, AWS Lambda, Cloud Run). Local render is free; never use the cloud ones without Maz saying yes.
- Needs Node 22+ (repo pins 24) and FFmpeg on PATH (installed: 5.0.1).
- GSAP loads from a CDN, so rendering needs internet.

## Re-render

```bash
mkdir -p /tmp/hf && cp docs/maz-works/hyperframes-demo/* /tmp/hf/ && cd /tmp/hf
DO_NOT_TRACK=1 npx -y hyperframes@0.8.143 render
```

Agent skills (optional, not installed here): `claude plugin marketplace add heygen-com/hyperframes && claude plugin install hyperframes@hyperframes --scope project`.

## mattpocock/skills

Installed in this repo at project scope: `claude plugin install mattpocock-skills@claude-plugins-official --scope project` (adds one line to `.claude/settings.json`). Useful here: `/grill-with-docs` before copy or offer changes, `/tdd` for logic, `/code-review`, `/to-spec`. Run `/setup-matt-pocock-skills` once in a session to pick the issue tracker and docs folder.

## AIReceptionist

Not evaluated for install: it needs a paid OpenAI API key and a paid SIP trunk. See [AFTER-HOURS-RECEPTIONIST.md](AFTER-HOURS-RECEPTIONIST.md) for the existing plan. Decision for Maz.
