import { CHECK_REPLY_TIME } from './site';
import { OFFERS, CARE_PLANS, CHANGES_WINDOW, DELIVERY_PROMISE, PAYMENT_TERMS, SETUP_PRICE, STARTER_GUARANTEE, getExtra, getOffer, REFERRAL_REWARD } from './offers';
export type MazWorksFaq = {
  question: string;
  answer: string;
};

export const MAZ_WORKS_FAQS: MazWorksFaq[] = [
  {
    question: 'Is the plan really free? What’s the catch?',
    answer: `It’s free. Tell me the job you want off your plate and I usually reply within ${CHECK_REPLY_TIME} with a plan and a fixed price. If it isn’t worth automating, I say so. No call, no automated sales emails, no obligation.`,
  },
  {
    question: 'What do you actually build?',
    answer: 'Automation, connected tools and custom software for small businesses: enquiries gathered and answered, quotes and invoices that follow themselves up, reminders, shared customer records, internal tools, customer portals and websites with the system built in.',
  },
  {
    question: 'How much does it cost?',
    answer: `A one-day set-up is ${SETUP_PRICE}. Starter Automation is ${OFFERS[0].price} for one job from the automation menu, set up to run itself. A Business System, where three jobs are joined up with a weekly report, starts from ${OFFERS[1].price.replace('From ', '')}. Custom Software starts from ${OFFERS[2].price.replace('From ', '')}. For creators, Creator Starter is ${getOffer('creator-starter').price} and Creator Launch is ${getOffer('creator-launch').price}. A full Website starts from ${getOffer('website').price.replace('From ', '')}. Care plans are ${CARE_PLANS[0].price} or ${CARE_PLANS[1].price}. No VAT added.`,
  },
  {
    question: `What can the ${OFFERS[0].price} Starter do?`,
    answer: `One job from the automation menu, set up to run itself on the tools you already use: missed-call text-back, appointment reminders, review requests, quote follow-up, payment reminders, online booking and more. Usually working within 7 working days of you adding me to your apps. ${STARTER_GUARANTEE}`,
  },
  {
    question: 'How do the optional extras work?',
    answer: `One-day set-ups are ${SETUP_PRICE} each: one small thing set up in a day, like a review QR card, a quote template or your booking link added everywhere. Add-ons like Extra automation (${getExtra('Extra automation').price}) add to a package. Everything goes on the same invoice, so there are no surprise costs.`,
  },
  {
    question: 'Can I buy an add-on on its own?',
    answer: `Yes. One-day set-ups (${SETUP_PRICE} each), like a Google listing tidy or a review QR card, can be bought on their own or added to any package. Anything that runs on its own is a job from the automation menu: the first is Starter Automation (${OFFERS[0].price}), and Extra automation (${getExtra('Extra automation').price}) adds another to a package.`,
  },
  {
    question: 'What isn’t included?',
    answer: `Paid apps or text-message costs, which you pay those companies directly (I tell you the cost up front). Changes after the 30-day tweaks window, unless you have a care plan (from ${CARE_PLANS[0].price}). And new features beyond the agreed plan, which get their own fixed price first.`,
  },
  {
    question: 'How long does it take?',
    answer: `${DELIVERY_PROMISE} After it goes live you get ${CHANGES_WINDOW.short}, and anything not working as agreed is fixed free for 90 days.`,
  },
  {
    question: 'How does payment work?',
    answer: `${PAYMENT_TERMS} Software subscriptions or text-message costs, if any, are paid by you directly at cost.`,
  },
  {
    question: 'Do I own what you build?',
    answer: 'Yes. Every account stays yours. I never need your passwords; add me as a user, then remove me after.',
  },
  {
    question: 'Is this only for certain trades?',
    answer: 'No. If your business has customers, enquiries and admin, it fits: trades, salons, clinics, cafés, shops, agencies, charities and professional services, anywhere in the UK.',
  },
  {
    question: 'Do I need a new website?',
    answer: "Often not. Most of this works with the website and tools you already have. I'll say plainly if a new site or a custom system would genuinely help.",
  },
  {
    question: 'Do I need to book a call?',
    answer: "No. Send one line about the job with the form and I reply by email. Book the 15-minute call only if you'd rather talk it through.",
  },
  {
    question: 'Can you work with what I already use?',
    answer: 'Yes. Google Workspace, Microsoft 365, spreadsheets, Wix, Squarespace, WordPress, Square, Fresha, Booksy, Xero, QuickBooks and most others. I build on what you have wherever practical.',
  },
  {
    question: 'Do you pay for referrals?',
    answer: `Yes, ${REFERRAL_REWARD} by bank transfer, no limit on how many. Introduce a business that isn't already talking to me and ask them to put your name in their first message. When they book any package and pay their first invoice, I send you ${REFERRAL_REWARD} within 7 days. Add-ons on their own and care plans don't count, and there's no reward if the job is cancelled or refunded. If you share this publicly, mention you're paid for referrals.`,
  },
];

const pick = (question: string) => {
  const faq = MAZ_WORKS_FAQS.find((item) => item.question === question);
  if (!faq) throw new Error(`Missing homepage FAQ: ${question}`);
  return faq;
};

export const HOMEPAGE_FAQS = [
  pick('Is the plan really free? What’s the catch?'),
  pick('Can I buy an add-on on its own?'),
  pick('What isn’t included?'),
  pick('Is this only for certain trades?'),
];
