import { CHECK_REPLY_TIME } from './site';
import { OFFERS, CARE_PLANS, CHANGES_WINDOW, DELIVERY_PROMISE, PAYMENT_TERMS, getExtra, getOffer, REFERRAL_REWARD } from './offers';
export type MazWorksFaq = {
  question: string;
  answer: string;
};

export const MAZ_WORKS_FAQS: MazWorksFaq[] = [
  {
    question: 'Is the plan really free? What’s the catch?',
    answer: `It’s free. Tell me the job you want off your plate and I reply within ${CHECK_REPLY_TIME} with a plan and a fixed price. If it isn’t worth automating, I say so. No call, no automated sales emails, no obligation.`,
  },
  {
    question: 'What do you actually build?',
    answer: 'Automation, connected tools and custom software for small businesses: enquiries gathered and answered, quotes and invoices that follow themselves up, reminders, shared customer records, internal tools, customer portals and websites with the system built in.',
  },
  {
    question: 'How much does it cost?',
    answer: `Starter Automation is ${OFFERS[0].price} for one job set up to run itself. A Business System, where up to three jobs are joined up, starts from ${OFFERS[1].price.replace('From ', '')}. Custom Software starts from ${OFFERS[2].price.replace('From ', '')}. A Sales Page is ${getOffer('sales-page').price} and a full Website starts from ${getOffer('website').price.replace('From ', '')}. Add-ons like appointment reminders (${getExtra('Appointment reminders').price}) or missed-call text-back (${getExtra('Missed-call text-back').price}) are priced up front. Care plans are ${CARE_PLANS[0].price} or ${CARE_PLANS[1].price}. No VAT added.`,
  },
  {
    question: `What can the ${OFFERS[0].price} Starter do?`,
    answer: 'One job you currently do by hand, set up to run itself on the tools you already use. For example: every enquiry logged in one list with an instant reply, or booking confirmations and reminders sent automatically. Working within 7 working days of access.',
  },
  {
    question: 'How do the optional extras work?',
    answer: `They are add-ons with a fixed, one-off price, like appointment reminders (${getExtra('Appointment reminders').price}), review requests (${getExtra('Review requests').price}) or missed-call text-back (${getExtra('Missed-call text-back').price}). Add them when you order, or later. They go on the same invoice, so there are no surprise costs.`,
  },
  {
    question: 'Can I buy an add-on on its own?',
    answer: `Yes. Standard add-ons, like appointment reminders (${getExtra('Appointment reminders').price}) or Google Business Profile setup (${getExtra('Google Business Profile setup').price}), can be bought on their own or added to any package. The one exception is Extra automation, which adds a second job to a package; a first job of your own is Starter Automation (${OFFERS[0].price}).`,
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
    answer: `Yes. ${REFERRAL_REWARD} by bank transfer when a business you introduce becomes a new paying client. One per new client, and only if they were not already talking to me.`,
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
