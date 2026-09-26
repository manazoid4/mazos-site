# Maz Works — friction pass handoff (26 Sep 2026)

## Purpose

This pass implements Maz's confirmed commercial and homepage decisions with minimal extra complexity. The next agent should review the finished result critically, improve it where evidence supports a change, and avoid undoing settled commercial decisions without a clear reason.

## Confirmed decisions implemented

- Public contact address is `info@mazworks.uk`.
- Hero line is: **“I fix what’s costing your business time, customers, or money.”**
- Maz Works must stay broad. Do not reduce the company to three outcomes or make it look like a basic web-design service. Current routes include websites, full rebuilds, customer growth, automation, software and physical products.
- Website Launch starts at **£299** and clearly includes: up to 4 pages, mobile-ready design, contact form, basic SEO, analytics, domain connection, launch setup, one revision and client ownership of the finished site.
- Website Care pricing is deliberately simple and competitive: **£39/month, £210/6 months, £360/year**.
- JobFilter should carry more homepage proof than Scrap Finance Partners. Both use real existing screenshots; JobFilter is visually larger.
- FAQs should be plain, short and useful, especially around price, Website Launch scope, timescale, ownership and care.
- The Business Leak Check should remain lightweight. It is a zero-AI, zero-extra-form disclosure that routes common business problems into the existing enquiry flow.

## What changed

### Homepage

- Broader hero wording focused on time, customers and money.
- Existing six capability routes retained.
- Added a compact Business Leak Check with eight problem-led routes rather than reducing Maz Works to three categories.
- Added real JobFilter and Scrap Finance Partners screenshots, with JobFilter given stronger visual emphasis.
- Expanded the £299 Website Launch scope in plain language.
- Added Website Care with monthly, six-month and annual prices.
- Growth System now points to the growth enquiry route and allows customer-growth or automation workflows.
- Homepage FAQ selection now prioritises buying questions.

### Contact and enquiry

- Visible/public contact is `info@mazworks.uk`.
- The existing FormSubmit delivery destination remains separate internally so this pass does not silently break the already-working enquiry form.
- Added a Website Care enquiry service option.

### SEO / identity

- Homepage title and description now reflect the broader practical-business-fix positioning.
- LinkedIn was added to Person structured-data `sameAs` alongside GitHub.

### Styling

- New additions are isolated in `app/mazworks-friction-pass.css` so a later design agent can replace/refine the pass without untangling the older accumulated style sheets.

## Files changed

- `app/site.ts`
- `app/enquiry.ts`
- `app/faqs.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/mazworks-friction-pass.css`
- `tests/static-export.test.mjs`
- this handoff

## Next-agent review brief

Review the live/preview site rather than trusting this document. Prioritise conversion, clarity, mobile presentation, proof quality, accessibility, performance and maintainability.

Specific questions to answer:

1. Does the new hero remain immediately understandable without making Maz Works feel narrow?
2. Is the six-capability band useful or repetitive next to the Business Leak Check?
3. Is the Business Leak Check discoverable enough while staying low-friction and compact?
4. Does JobFilter clearly carry more proof weight than Scrap without making the work section too long?
5. Are the £299 Website Launch boundaries clear enough to prevent scope confusion?
6. Do the £39 / £210 / £360 Website Care options read instantly on mobile?
7. Can the FAQ copy be shortened further without removing useful reassurance?
8. Does any section repeat the same claim or CTA unnecessarily?
9. Are all screenshots crisp, correctly cropped and useful rather than decorative?
10. Is there a better presentation for any of this that reduces reading and clicks without reducing the breadth of Maz Works?

## Constraints

- Do not invent testimonials, customers, revenue, lead results or traction.
- Keep Scrap Finance Partners claims limited to the website work actually evidenced.
- Keep unfinished projects labelled honestly.
- Do not replace the lightweight Business Leak Check with an LLM/API feature unless there is a demonstrated conversion reason.
- Keep direct ownership/handoff language and fixed-scope-first positioning.
- Preserve `info@mazworks.uk` as the public contact address.
- Preserve the confirmed Website Care price points unless Maz explicitly changes them.

## Further opportunities not automatically implemented

- Genuine testimonials once real permission/quotes exist.
- Search Console/indexing work if not already completed.
- Real conversion data should eventually decide whether the Business Leak Check, capability band, booking CTA or enquiry form deserves more/less prominence.
- A later agent can consolidate the accumulated CSS layers once the design direction is settled; this pass intentionally avoids a risky full stylesheet rewrite.
