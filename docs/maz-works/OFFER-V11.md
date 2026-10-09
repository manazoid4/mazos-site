> **Superseded in parts by Offer v12 (2 Oct) and PRICE-AUDIT-2026-10.md; current prices live in app/offers.ts.**

# Offer v11 (2 Oct 2026): pick your business, see your fix, see the price

**Status: proposed. Prices need Maz's go before this merges.** Source of truth for every number: `app/offers.ts`. This page explains the why.

## 30-second summary

| | Offer v10 | Offer v11 |
|---|---|---|
| Starter Automation | £195 | **£149** (one job from a 16-job menu, 30-day money-back) |
| Business System | from £795 | **from £595** (three jobs + weekly report) |
| Custom Software | from £2,950 | **from £2,450** |
| Website | from £1,950 | **from £1,495** (copy written for you, 3 check-ups) |
| Sales Page £895 · Brand & Content Kit £595 · Brand + Sales Page £1,295 | three overlapping products | **Creator Starter £149** + **Creator Launch £595** |
| Add-ons £95 to £295 | 11 items | **One-day set-ups £49** (8 of them) + 4 package add-ons |
| Care | £49 / £195 a month | **£39 / £149 a month** |

Six headline prices. One fix ladder for everyone: Free plan £0 → One-day set-up £49 → Starter £149 → Business System from £595 → Custom from £2,450.

## Why

- Maz, 2 Oct: "We say automation, but automation for what?" The automation menu answers it in plain English: missed-call text-back, online booking, reminders, rebooking, waitlist fill, review requests, quote follow-up, payment reminders, job update texts, Instagram auto-replies, keyword DM → free resource, email list + welcome email, enquiries into one list, onboarding form, milestone updates, weekly report.
- Competitors (teardown, 2 Oct): UK trades agencies sell missed-call text-back at ~£197 a month with a 30-day guarantee; web designers print "copy written for you" and support days on every tier. We win on **own it once**, visible inclusions and risk reversal, not on being dear.
- Every customer gets the most value Maz can deliver alone, so value that was always given is now shown on every card: scope sheet first, tested before go-live, accounts in your name, walkthrough video, written guide, 30-day tweaks + 90-day fix, 30-day check, no contracts.

## What is new (templates made once, ≤30 min per client)

1. Written scope sheet before payment.
2. 2-minute walkthrough video.
3. Review QR card (also a £49 one-day set-up on its own).
4. 30-day "still working?" check.
5. Starter guarantee: if the job hasn't run on a real customer within 30 days of going live, full refund.
6. Own-it vs rent-it table (one-off vs ~£197/month agency plans).

## Margin check (one person)

| Step | Price | Time budget | Effective rate |
|---|---|---|---|
| One-day set-up | £49 | ≤1 h with template | £49/h |
| Starter | £149 | ≤3 h with recipe | ~£50/h |
| Business System | £595 | ≤10 h | ~£60/h |
| Creator Launch | £595 | ≤10 h | ~£60/h |
| Website | £1,495 | ≤24 h | ~£62/h |

Holds only if every menu job has a delivery recipe (tools, steps, test, minutes, monthly cost) **before** its price ships. Recipes are GPT task 1 in the private handoff; none exist yet, so that is the gate before merge.

## Fences that keep it honest

- A Starter is one job: one thing starts it, then up to three things happen automatically, on up to two apps the client already has.
- One-day set-ups are templates and settings, never something that runs on its own. The words "quick fix" stay off the site (positioning rule).
- Demos (clickable preview of one screen) only for Business System, Creator Launch, Website and Custom; smaller jobs get the written plan.
- Changes: 30 days of tweaks in two rounds, 90-day fix promise on Maz's build only, never "unlimited".
- Anything outside the menu is quoted first or referred to a partner.

## Decision for Maz

Approve the lower prices (yes / no / change these). One sub-point: Extra automation stayed at £145 because the offer map did not price it; say if it should match the £149 Starter.

## Where things live

- Prices and packages: `app/offers.ts` (`OFFERS`, `CREATOR_OFFERS`, `WEB_OFFERS`, `LADDER`, `AUTOMATION_MENU`, `EXTRA_GROUPS`, `ALWAYS_INCLUDED`, `OWN_VS_RENT`, `STARTER_GUARANTEE`, `NEXT_STEPS`, `BUY_LINKS`).
- Price page: `app/price-list.tsx`. Creators page: `app/brand-kit/page.tsx`.
- Tests: `tests/builder-pricing.test.mjs`, `tests/static-export.test.mjs`, `tests/enquiry.test.mjs`, `tests/niche-guides.test.mjs`.
