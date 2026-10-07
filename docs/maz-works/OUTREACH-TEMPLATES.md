# Outreach templates (copy and paste)

One pack for every route: LinkedIn, email, a call script and one follow-up. Public file, so **no real names and no prices**: refer to a package by its name and let the linked page show the price (prices live only in `app/offers.ts`). A test fails if a pound sign appears in this file. Filled-in examples with real names stay in the private leads repo.

## Before you write anything
1. **Qualify.** You have evidence of a repeated business problem (Lead Quality v2): a missed-call pattern, a broken booking link, quotes with no follow-up, no reply to an enquiry. Note the exact URL or screenshot as `[Evidence]`.
2. **Find the owner by name.** Companies House officers, the LinkedIn company page, the About or Team page, review replies. Record their name, profile URL and one hook in their own words in HubSpot.
3. **Pick the package by name.** One problem is a **Starter Automation** (one job only; a second job is quoted as an extra). Several joined up is a **Business System**. A creator is **Creator Starter** or **Creator Launch**.
4. **Pick the page.** The link always goes to the matching page, tagged so the enquiry shows where it came from:
   - Trades: `https://www.mazworks.uk/for/trades?src=<route>-trades`
   - Appointments (salons, clinics, trainers): `https://www.mazworks.uk/for/appointments?src=<route>-appointments`
   - Creators: `https://www.mazworks.uk/for/creators?src=<route>-creators`
   - Small offices: `https://www.mazworks.uk/for/offices?src=<route>-offices`

   `<route>` is `li` (LinkedIn), `em` (email), `call` (call) or `fu` (follow-up). Example: `?src=em-trades`.

**Route order:** LinkedIn message to the named owner → email (confirmed Ltd only) → a checked phone call. Instagram first only for genuine creator leads. **Exactly one follow-up**, 3 days later, by the next route.

Slots: `[Owner]` first name · `[Business]` · `[Evidence]` what you saw, in plain words · `[Package]` package name · `[Link]` the tagged page above.

---

## 1. LinkedIn message (300 characters or fewer)

Subject (InMail or connection note):

```
Before you hire anyone for [Business]
```

Message:

```
Hi [Owner], I noticed [Evidence].

It's an easy one to lose customers on without knowing.

I build the system that stops it, at a fixed price agreed first.

Want the free plan? [Link]
```

---

## 2. Email (confirmed Ltd only)

**Check first:** Companies House shows `[Business]` as a limited company, and the address is the business's own (public inbox addressed to the owner, or their business email). If it isn't a Ltd, skip to the call.

Subject:

```
[Business]: one thing I spotted
```

Body:

```
Hi [Owner],

I was looking at [Business] and noticed [Evidence].

Customers who hit that usually don't complain. They just go to the next business.

I'm Manazir, and I build the systems small businesses run on. For this, it would be a [Package]: set up once, runs on its own, and you own it.

You'd get a written plan and a fixed price first, free, usually within one working day: [Link]

Would that be useful?

Manazir Hussain
Maz Works · info@mazworks.uk
```

---

## 3. Call script (after a CTPS/TPS check)

```
1. "Hi, could I speak to [Owner], please?"
   If not there: "When's a good time to catch them?" Log it, call back then.

2. "Hi [Owner], I'm Manazir from Maz Works. I'll be quick.
   I noticed [Evidence] and thought you'd want to know."

3. "Is that something that's cost you customers, do you think?"
   Listen. Note their words.

4. "I build the system that fixes that. It's a fixed price agreed first,
   and you own it. Can I send you a free written plan? No obligation."

5. "What's the best email for it?"
   Then send the link, tagged: [Link] with ?src=call-<type>.
   Thank them, log the call in HubSpot, set the follow-up task.
```

If they say no: thank them, mark it in HubSpot, and don't contact them again.

---

## 4. One follow-up (3 days later, next route)

LinkedIn or email:

```
Hi [Owner], just checking you saw my note about [Evidence].

No pressure. If it's useful, the free plan is here: [Link]

If not, no worries, I won't chase again.
```

Call (if the first contact was written): use the call script, starting at step 2 with "I sent you a note a few days ago about…".

---

## Personal preview link (any route)
Send the lead their trade page with their business name on it. The page then shows a "Preview for <Name>" section with the missed-call example and their name in the text, labelled "an example preview, not built yet", and a "Get my free plan" button.

`https://www.mazworks.uk/for/<trade>?biz=<Business+Name>&src=<tag>`

- `<trade>`: one of the `/for` pages (for example `heating-and-plumbing`, `garages`, `salons-and-beauty`, `trades`).
- `<Business+Name>`: spaces become `+`, and `&` becomes `%26`. Letters, numbers, spaces, `&`, apostrophes and hyphens only, 40 characters at most, fewer than 5 digits; anything else becomes a space.
- `<tag>`: the usual campaign tag (`call-x`, `em-x`, `dm-x`, `fu-x`), so the free plan request shows where it came from.
- Example: `https://www.mazworks.uk/for/heating-and-plumbing?biz=Smith+%26+Sons+Plumbing&src=call-heat`

## Tracking (every contact)
HubSpot is the only list: tiered company name (GOLD / SILVER / BENCH), the owner as the contact, a Task for each step, the evidence URL in the task, lead status `Attempted to contact` after the first message, and the `📞 PITCH + SCRIPT` note. The `?src=` tag on the link shows up in the enquiry email, so you can see which route worked.
