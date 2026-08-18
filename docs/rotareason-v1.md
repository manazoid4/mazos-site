# RotaReason v1

RotaReason is an explainable staff-scheduling decision-support product. The manager interacts with the rota in plain English, while a deterministic constraint engine checks whether the requested change is feasible before it is applied.

## Product wedge

Existing workforce-management products already cover auto-scheduling, availability, leave, shift swaps, compliance and forecasting. RotaReason therefore does not position "AI makes rotas" as the differentiator.

The v1 wedge is conversational constraint management:

1. A manager states the operational change in ordinary language.
2. RotaReason simulates the change against hard staffing rules.
3. It returns a concise yes/no answer.
4. If the answer is no, it explains the exact failed constraint and date.
5. If the answer is yes, it previews the regenerated rota before the manager applies it.
6. Every accepted change should eventually become auditable.

## Example manager interactions

- "Generate next week's rota."
- "Julie wants 17th to 19th off."
- "Jimmy can only work Thursday and Friday."
- "Sam has left — remove future shifts."
- "Who is working Wednesday?"
- "Show me any risky days."

## v1 hard constraints

The live prototype uses a fictional clinic and enforces:

- minimum three staff per day;
- at least one clinical lead per day;
- at least one first-aid-qualified staff member per day;
- individual weekly assignment limits;
- recurring weekday availability;
- date-specific leave / training;
- inactive / leaver exclusion.

The demo intentionally seeds Wednesday 19 August 2026 as a fragile day: Priya is on training leave, Amira and Noah are unavailable, so Julie is the only available clinical lead. This makes "Julie wants 17th to 19th off" fail with a concrete explanation rather than silently producing an unsafe rota.

## Competitor observations

### Deputy

Strengths to emulate:
- natural-language scheduling actions;
- auto-scheduling based on availability, training, budget and working rules;
- leave, availability and compliance guardrails;
- mobile-first workflow.

RotaReason opportunity:
- make simulation and explanation the primary manager workflow rather than an assistant layered onto a broad workforce suite;
- make "can I approve this?" a first-class interaction.

### Rotageek

Strengths to emulate:
- auto-scheduling;
- demand forecasting;
- business-rule and legal-compliance analysis;
- fairness analysis;
- audit trail and leave integration.

RotaReason opportunity:
- make hard-rule reasoning visible in plain language at the point of decision;
- reduce manager navigation by allowing constraints and changes to be expressed conversationally.

### RotaCloud

Strengths to emulate:
- clear schedule UI;
- availability visible during planning;
- holiday and absence management;
- straightforward access controls and staff communication.

RotaReason opportunity:
- combine the visual rota with a command layer that performs what-if checks before the manager edits the calendar manually.

### NHS / healthcare requirements

NHS England guidance emphasises the right staff and skills in the right place at the right time, transparent e-rostering, staff flexibility, safe staffing, governance and effective use of workforce data. Any real healthcare deployment would therefore need organisation-specific policy configuration, identity and access controls, audit trails, integrations, security assurance, equality considerations, workforce-rule validation and clinical governance.

## Architecture direction

### v1 prototype

- Next.js client interface.
- Deterministic in-browser parser for a narrow set of commands.
- Greedy constraint-aware scheduling engine.
- Preview-before-apply state transition.
- No external AI model and no personal data upload.

### v1.5

- persistent organisations, teams, staff and contracts;
- typed constraint schema;
- structured command parser with an LLM used only to convert natural language into validated operations;
- deterministic solver remains authoritative;
- audit event log;
- manager permissions;
- holiday-request inbox;
- alternative rota suggestions when a request fails.

### v2 / enterprise

- proper constraint solver / optimisation layer;
- multi-site scheduling;
- demand and acuity inputs;
- payroll / HR / workforce-system integration;
- Working Time Regulations and organisation policy packs;
- fairness objectives and preference weighting;
- approval workflows;
- change history and rollback;
- staff self-service;
- scenario comparison;
- explainability API;
- security, tenancy and compliance suitable for enterprise procurement.

## Product principles

- The solver, not the language model, decides whether a rota is valid.
- Never silently break a hard constraint.
- Show the failed date and rule in one sentence first; deeper reasoning is optional.
- Preview destructive or wide-reaching changes before applying them.
- Treat staff preferences separately from hard safety/compliance constraints.
- Make uncertainty explicit.
- Preserve a complete audit trail in production.

## Current scope

This route is a working product prototype and decision-support demo. It is not certified or configured for NHS production use and should not be presented as such.
