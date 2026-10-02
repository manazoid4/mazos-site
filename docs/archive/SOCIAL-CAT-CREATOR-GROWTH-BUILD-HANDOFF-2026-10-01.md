# Maz Works — Social Cat / creator-growth build handoff

**Date:** 1 October 2026  
**Purpose:** give the next build agent a researched starting point for turning the strongest ideas from Social Cat and comparable creator-marketing platforms into a commercially useful Maz Works experiment without copying another product or diluting Maz Works positioning.

---

## 0. Read this first

This is a **research + build handoff**, not permission to blindly clone Social Cat.

Before editing anything:

1. Read `AGENTS.md` in this repo.
2. Read the current shared agent policy in `manazoid4/maz-works-knowledge-vault/wiki/meta/shared-agent-operating-policy.md`.
3. Read the latest Maz Works state in `manazoid4/unified-memory-database/spine/projects/mazworks-site/HANDOVER.md` and `STATUS.md`.
4. Inspect the current branch, current production site structure, offers, forms, analytics and existing lead funnel before proposing changes.
5. Treat older handoffs as historical when they conflict with `AGENTS.md`, the live repo, current offers or the latest shared policy.

### Non-negotiables

- Maz Works is **not** a website-fix shop. It sells systems that win customers and remove admin.
- Do not advertise AI. AI can be used behind the scenes only.
- Do not invent clients, testimonials, results, creator numbers, revenue or ROI.
- Do not publish Maz's town/county/address, personal email or phone number. Public contact remains `info@mazworks.uk`.
- Prices live in `app/offers.ts`; do not scatter or invent final pricing elsewhere.
- Preserve current design language unless evidence supports a specific change.
- Branch + PR. Never push changes straight to `main`.
- Research and plan before broad changes. Reuse current systems before adding new infrastructure.
- Treat this brief as the minimum objective: pursue useful adjacent improvements, especially revenue, leads, conversion, reusable systems and better handoffs, but avoid scope drift and destructive changes.

---

# 1. What Social Cat is actually doing

Social Cat is not merely an influencer directory. Its useful business pattern is a **two-sided workflow product**:

- creators join free;
- brands pay for access and workflow capacity;
- brands can publish campaigns or search creators directly;
- creators can apply or be invited;
- collaborations can be gifted, paid or affiliate;
- inbox, contracts, usage rights, content library and campaign tracking remove admin;
- the platform then upsells a higher-value managed service for companies that do not want to operate the workflow themselves.

Current public claims/features observed on 1 Oct 2026 include:

- self-service pricing around **$99 / $199 / $299 per month** with higher collaboration/invitation limits by tier;
- free creator participation;
- Instagram + TikTok campaigns;
- a creator database advertised at 500K+ on the main site;
- built-in contracts, licensed content and content library;
- gifted, paid and affiliate collaboration types;
- a creator-content gallery organised by niche;
- case-study pages built around concrete quantities and outcomes;
- comparison/SEO pages against competing platforms;
- free marketing/business tools used as acquisition content;
- a managed-service upsell positioned as "we do the work, not just give you the database";
- managed-service budgets commonly stated as roughly $3k–$15k/month total, with influencer fees separate.

### Source pages

- https://thesocialcat.com/
- https://thesocialcat.com/pricing
- https://thesocialcat.com/managed-services
- https://thesocialcat.com/comparison
- https://thesocialcat.com/stories
- https://thesocialcat.com/ugc-content
- https://thesocialcat.com/creators
- https://help.thesocialcat.com/en/articles/10609154
- https://help.thesocialcat.com/en/articles/3296066
- https://help.thesocialcat.com/en/articles/838786

Do not reuse their wording or proprietary UI. Extract the operating ideas.

---

# 2. Eight comparison targets

Use the same research template for each competitor: **audience → promise → acquisition → conversion → workflow → pricing → proof → retention → moat → lessons for Maz Works**.

## A. Collabstr

Source: https://collabstr.com/pricing

Useful patterns:

- searchable creator marketplace with visible services/rates;
- creators can be hired directly;
- campaigns can receive inbound applications;
- escrow/payment protection reduces trust friction;
- platform combines subscription revenue with hiring fees;
- strong marketplace proof through visible creator cards and rates.

Current public pricing observed: free tier, Pro around $249/mo billed annually, Premium around $333/mo billed annually, enterprise from about $1,000/mo; hiring fees vary by tier.

## B. Insense

Source: https://insense.pro/pricing

Useful patterns:

- UGC + influencer workflows in one product;
- campaign limits and creator limits are simple pricing levers;
- creator payments/transaction fees are separated from platform subscription;
- strong emphasis on paid-social usage and Meta partnership ads;
- makes "content production" as important as audience reach.

Current public entry points observed around $650 one-month trial and $500/mo equivalent on a quarterly brand plan, plus marketplace fees and creator costs.

## C. minisocial

Sources:

- https://minisocial.com/
- https://minisocial.com/page/getstarted/

Useful patterns:

- **managed-first** rather than SaaS-first;
- sells outcomes and handles the operational burden;
- fully licensed UGC is central to the offer;
- project-based pricing avoids forcing a long subscription;
- brand approves creators/content while the provider handles everything else.

Current public starting point observed: around $3,000 for 10 creators, inclusive of creator fees/payments.

## D. Shopify Collabs

Sources:

- https://www.shopify.com/uk/collabs/find-influencers
- https://help.shopify.com/en/manual/promoting-marketing/collabs/merchants/setup

Useful patterns:

- creators can be recruited through a branded application page;
- direct invitations and open-access affiliate offers coexist;
- products/gifts, affiliate links, discount codes and commission tracking are integrated;
- automatic payouts reduce admin;
- the real advantage is not "creator discovery" alone, but connection to the merchant's existing commerce system.

Current public model observed: free to install for eligible Shopify merchants; automatic commission payments can carry a 2.9% processing fee.

## E. Aspire

Sources:

- https://www.aspire.io/features/creator-marketplace
- https://www.aspire.io/platform-overview

Useful patterns:

- inbound marketplace: brands publish opportunities and creators self-select;
- eligibility criteria reduce screening work;
- campaign application pages are treated as conversion assets;
- combines creator discovery, relationship management, content, Shopify integration and ROI reporting;
- supports managed services as an additional revenue layer.

## F. Modash

Sources:

- https://www.modash.io/pricing
- https://www.modash.io/influencer-marketing-api

Useful patterns:

- deep creator discovery plus CRM, outreach, tracking and inbox integration;
- sells increasing usage rather than completely different products per tier;
- integrates with the user's real email inbox instead of forcing every interaction into a proprietary chat box;
- affiliate management and payments become higher-tier expansion features;
- API access is sold separately at enterprise-level pricing.

Current public platform pricing observed starting around $199/mo billed yearly for Essentials and around $499/mo for Performance, with enterprise annual pricing above that.

## G. Afluencer

Source: https://afluencer.com/pricing

Useful patterns:

- low-cost entry for small brands;
- creators can participate free while premium creator visibility is monetised separately;
- self-serve campaign publishing + creator applications;
- clear step-up from marketplace product to heavier influencer-management software.

Current public brand marketplace pricing observed around $49/mo, with higher management tiers around $649/mo and $1,049/mo; creators have free and paid visibility/application tiers.

## H. GRIN / Gia

Source: https://grin.co/pricing

Useful patterns:

- free entry removes sales-call friction;
- all capabilities can exist across tiers while **usage** is the paid lever;
- unlimited CRM/affiliate foundations encourage data lock-in and repeat usage;
- agentic/automated work is metered via credits while manual configuration is free;
- transparent usage accounting makes automation feel controllable.

Current public pricing observed: free, then roughly $200 / $500 / $1,000 / $1,500 per month based on included Gia credits.

---

# 3. The opportunity for Maz Works

Do **not** jump straight to building a full Social Cat competitor. That would create a two-sided marketplace cold-start problem, payment/compliance complexity and a large support burden before demand is proven.

The stronger wedge is:

## Hypothesis: Maz Works Creator Growth System

A managed / semi-managed system for small UK businesses that want creator content and local reach but do not want to spend hours finding people, briefing them, chasing deliverables and tracking what happened.

This fits Maz Works because the product is fundamentally about **removing admin and connecting a customer-acquisition workflow**, not "selling influencer marketing" as a vague agency service.

### Start manually; productise what repeats

V0 should be concierge-led and operationally simple:

1. business submits campaign goal, product/service, target customer, location/reach and preferred content type;
2. Maz Works turns it into a structured brief;
3. creators are sourced from public/opt-in channels and invited;
4. business sees a shortlist and approves;
5. agreements/deliverables/deadlines are tracked in one simple workflow;
6. content is delivered into a clean library with usage-rights status and campaign notes;
7. client gets a plain report: what was delivered, what got posted, what should happen next.

Do not build payment rails, escrow or a giant creator database in V0.

### The possible long-term loop

If manual demand is proven:

**business demand → creator applications → more creator supply → faster matching → stronger case studies → more business demand**

Only then consider a real portal/marketplace.

---

# 4. What to borrow structurally from Social Cat

These are the strongest reusable patterns:

### 1. Two routes into the same system

- **For businesses:** "I need creators/content/reach."
- **For creators:** "I want paid/gifted opportunities."

Both routes should converge into one operational dataset rather than two disconnected forms.

### 2. Inbound plus outbound matching

Do not rely only on Maz manually searching creators.

Support both:

- creator applications to public opportunities;
- direct invitations to creators who fit a brief.

### 3. A workflow, not a spreadsheet

Core states could eventually be:

`brief → sourcing → applied/invited → shortlisted → approved → agreed → product/service supplied → content due → submitted → revision → approved → posted → complete`

Keep V0 simpler if needed.

### 4. Content rights as a first-class field

Businesses care whether they can reuse a photo/video on their website, organic social or paid ads. Capture usage permission explicitly instead of leaving it in DMs.

### 5. Proof pages that sell the workflow

Social Cat's site is strong because proof is concrete: content counts, campaign examples, creator galleries and case-study outcomes.

Maz Works should eventually turn successful pilots into truthful case studies such as:

- number of creators sourced;
- time from brief to first accepted creator;
- number of deliverables received;
- pieces approved for reuse;
- tracked enquiry/sale data where genuinely available.

No invented figures.

### 6. Free tools as top-of-funnel acquisition

Social Cat creates calculators/generators/comparison pages that capture search demand before the buyer is ready.

Possible Maz Works equivalents to research, not automatically build:

- Creator Campaign Brief Builder
- UGC Usage-Rights Checklist
- Micro-Creator Campaign Cost Estimator
- Instagram/TikTok Collaboration Brief Template
- "What creator campaign fits my business?" diagnostic
- local-business creator campaign checklist

These should feed the existing Maz Works lead system rather than creating a second disconnected funnel.

### 7. Managed upsell

The best commercial lesson from Social Cat may be the managed-service layer:

- self-serve tool = lower price, client does more;
- managed service = higher price, Maz Works handles sourcing, briefs, chasing and reporting.

This aligns directly with Maz Works' promise of taking admin off the owner.

---

# 5. Eight-subagent execution plan

The parent/build agent should use parallel workers where the runtime genuinely supports them. Do not claim subagents were spawned if the runtime does not support it. Reuse existing capable agents/sessions if available.

Use **8 independent research workers**, one per comparison platform listed above. The parent handles the Social Cat deep dive and final synthesis.

Each worker returns only:

```yaml
company: <name>
source_urls:
  - <url>
positioning: <1-3 sentences>
target_customer: <short>
primary_cta: <short>
pricing_model: <short>
creator_side: <short>
brand_side: <short>
workflow: <short>
proof_mechanisms:
  - <item>
acquisition_loops:
  - <item>
retention_loops:
  - <item>
what_mazworks_can_adapt:
  - <item>
what_mazworks_should_not_copy:
  - <item>
open_questions:
  - <item>
confidence: high|medium|low
```

Then the parent synthesises overlaps and disagreements. Do not dump raw browsing logs into the repo.

### Suggested role split

1. Collabstr agent — marketplace economics, escrow/trust, public profiles/rates.
2. Insense agent — UGC operations, paid-social workflows, creator-payment structure.
3. minisocial agent — managed-service delivery model and licensing.
4. Shopify Collabs agent — affiliate attribution, application pages, commerce integration.
5. Aspire agent — inbound applications, eligibility filtering, relationship workflow.
6. Modash agent — discovery, CRM, email integration, tracking, usage-tier pricing.
7. Afluencer agent — low-cost SMB wedge and dual-sided pricing.
8. GRIN agent — free entry, usage-based automation and retention mechanics.

---

# 6. Build-agent mission

After research, improve the repo with the **smallest credible experiment** that can validate demand.

Do not begin by building a creator marketplace.

## Phase A — audit

Inspect:

- current homepage structure and CTA flow;
- `app/offers.ts`;
- `/leak-check` and form implementation;
- analytics/events and source tracking;
- current Supabase usage, if any;
- existing CRM/lead handoff pattern;
- current niche pages and service architecture;
- current design tokens/components that can be reused;
- current content/SEO structure;
- existing email/notification pipeline.

Report what can be reused.

## Phase B — commercial experiment design

Produce a one-page plan containing:

- target buyer;
- exact painful job;
- one-sentence offer;
- what Maz Works does vs what the client does;
- proposed pilot scope;
- what proof would validate demand;
- what should remain manual;
- what can be automated later;
- key legal/compliance questions;
- acquisition plan;
- conversion path;
- retention/upsell path;
- kill criteria if nobody wants it.

Do not finalise new prices without checking current `app/offers.ts` and Maz's existing offer strategy.

## Phase C — smallest build

Prefer one of these two routes after inspecting the repo:

### Route 1: landing-page validation

A dedicated page such as `/creator-growth` or a better name discovered during research, with:

- plain-English outcome-led hero;
- "for businesses" path;
- optional "for creators" interest path;
- simple 3-step process;
- no fake marketplace screenshots;
- no fake creator counts;
- no invented outcomes;
- FAQ covering gifted/paid collaboration, approval, usage rights and what happens next;
- existing form infrastructure reused;
- source/UTM/event tracking added;
- CTA routed into the existing Maz Works sales workflow.

### Route 2: private pilot tool

If the site already has enough public landing-page coverage, build a lightweight internal/private pilot workflow rather than another marketing page.

Possible minimum schema:

- brands/businesses;
- campaign briefs;
- creators;
- creator applications/invitations;
- status;
- deliverables;
- usage-rights flag;
- due date;
- notes;
- source/attribution;
- outcome/report fields.

Do not build creator payments or identity-verification infrastructure unless the pilot proves it is required.

---

# 7. Out-of-the-box adjacent opportunities

These are **hypotheses to investigate**, not mandatory features.

### A. Maz Works can sell the system before it owns the network

For early clients, creator sourcing can be manual. The sellable value is still:

- campaign setup;
- creator shortlist;
- structured outreach;
- brief and deliverable tracking;
- content library;
- usage-rights tracking;
- reporting.

This lets Maz earn before a two-sided network exists.

### B. Local creator campaigns could fit Maz Works' existing SMB audience

Potential early categories include cafes, salons, beauty, food, fitness, pet, events and product-led local businesses because visual content and local reach are easy to demonstrate.

Do not narrow overall Maz Works positioning to these categories; use them only for testing if evidence supports it.

### C. Creator recruitment itself can become lead generation

A creator-facing application page can create distribution:

- creators join for opportunities;
- creators share campaigns;
- businesses see their own products/services represented in creator content;
- successful creators become referral sources to other businesses.

### D. Every campaign can feed a reusable proof engine

Capture structured campaign metadata from day one so future case studies are cheap to produce.

### E. Physical Maz Works Touch products may later connect offline visitors to creator/affiliate campaigns

Example research direction only: QR/NFC stands at a cafe/salon/event that route visitors to a creator offer, referral code, review capture or campaign page. Do not force this into V0.

### F. Use Maz's existing agent stack behind the scenes

Agents can help with:

- campaign brief normalisation;
- creator shortlist research;
- public-profile summarisation;
- outreach draft preparation;
- deadline/status reminders;
- deliverable QA checklists;
- reporting summaries.

Do not market this as AI. Maintain human approval for outreach, creator selection, contracts, rights and client-facing claims.

---

# 8. Compliance and trust research gate

Before a production creator-collaboration product, verify current UK requirements and produce a short note covering at least:

- ASA/CAP influencer disclosure expectations;
- gifted vs paid disclosure;
- usage-rights wording;
- advertising/affiliate disclosures;
- GDPR/data handling for creator/business details;
- age/minor creator handling;
- contract and cancellation basics;
- payment/tax/VAT implications if Maz Works ever handles money on behalf of others;
- whether holding funds would create regulatory/payment-provider obligations.

Do not provide or market legal guarantees. Use appropriate professional review when required.

---

# 9. Success metrics for the pilot

Instrument before scaling.

Useful early metrics:

- page → form start;
- form start → qualified enquiry;
- qualified enquiry → pilot call;
- pilot call → paid pilot;
- time from brief → first usable creator shortlist;
- creators contacted → replies;
- replies → accepted collaboration;
- accepted → delivered content;
- delivered → approved content;
- approved content → published/reused;
- repeat campaign intent;
- client admin time avoided, only if measured rather than guessed.

The agent should define exact events using the site's existing analytics conventions.

---

# 10. What not to build yet

Unless real demand proves the need, avoid:

- a giant searchable creator database;
- automatic social-account scraping;
- internal payment/escrow rails;
- complex creator scoring models;
- mobile apps;
- live chat infrastructure;
- a separate CRM from Maz Works' current workflow;
- a custom contract engine;
- a second design system;
- arbitrary subscriptions just because competitors use them;
- claims such as "vetted creators" unless Maz Works has a real documented vetting process.

---

# 11. Deliverables expected from the next build agent

Return or commit these artifacts on the working branch:

1. `docs/maz-works/CREATOR-GROWTH-RESEARCH-SYNTHESIS.md`
   - Social Cat + all eight competitor findings;
   - source URLs;
   - what patterns repeat across the market;
   - what is actually distinctive;
   - what Maz Works should test first.

2. `docs/maz-works/CREATOR-GROWTH-PILOT-PLAN.md`
   - exact V0 scope;
   - architecture;
   - data model if applicable;
   - conversion flow;
   - analytics;
   - compliance questions;
   - success/kill metrics;
   - build batches.

3. Implementation only after the audit/plan is internally coherent and consistent with current repo truth.

4. Tests/build/typecheck/link checks appropriate to changed files.

5. PR summary written for Maz in plain English:
   - what changed;
   - why it can make money or generate leads;
   - what remains manual;
   - what Maz has to do next;
   - any decision needed from Maz.

6. Update the appropriate public/private handoff at session end, following `AGENTS.md`.

---

# 12. Decision framework

When choosing between ideas, prefer the option that:

1. can produce revenue or qualified leads soonest;
2. removes real admin for a small business;
3. reuses current Maz Works infrastructure;
4. creates reusable data/processes for a future product;
5. can be tested without a large creator network;
6. avoids high compliance/payment complexity;
7. produces real proof/case-study material;
8. does not make Maz Works look like a generic social-media agency.

A full marketplace is only justified after the manual/managed workflow shows repeated demand.

---

# 13. Final instruction to the build agent

Do not merely imitate Social Cat's appearance. Study the economic engine, workflow, acquisition loops, managed-service upsell, proof system and creator/brand incentives, then build the smallest Maz Works version that can test whether UK small businesses will pay Maz to make creator campaigns simpler.

Use the shared agent policy: search before assumptions, delegate independent research, protect context, reuse tools, separate research/build/review, verify before reporting success, preserve human control and leave a durable handoff for the next agent.

The objective is not "add an influencer page". The objective is to discover whether creator-campaign operations can become a **sellable Maz Works system** that wins leads, creates recurring work and compounds into a stronger product over time.
