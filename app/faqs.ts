import { CARE_PLAN, EXTRAS, OFFERS, REFERRAL_THANK_YOU } from './offers';

// Prices in answers are read from offers.ts so an answer can never disagree with the price list.
const [STARTER, SYSTEM, CUSTOM] = OFFERS;
const P = (name: string) => EXTRAS.find((extra) => extra.name === name)!.price;
const from = (price: string) => price.replace(/^From /, '');
const MONTHLY = CARE_PLAN.price.replace('/month', ' a month');

export type MazWorksFaq = {
  question: string;
  answer: string;
};

export const MAZ_WORKS_FAQS: MazWorksFaq[] = [
  {
    question: 'Is the plan really free? What’s the catch?',
    answer: 'Free, no call, no obligation. I email your plan and price within 3 working days. If it isn’t worth doing, I say so.',
  },
  {
    question: 'What do you actually build?',
    answer: 'Automation, connected tools and custom software for small businesses: enquiries gathered and answered, quotes and invoices that follow themselves up, reminders, shared customer records, internal tools, customer portals and websites with the system built in.',
  },
  {
    question: 'How much does it cost?',
    answer: `${STARTER.name} is ${STARTER.price} for one job set up to run itself. A ${SYSTEM.name}, where several jobs are joined up, starts from ${from(SYSTEM.price)}. ${CUSTOM.name} start from ${from(CUSTOM.price)}. Add-ons like appointment reminders (${P('Appointment reminders')}) or missed-call text-back (${P('Missed-call text-back')}) are priced up front and go on the same invoice. ${CARE_PLAN.name} is ${MONTHLY}. No VAT added.`,
  },
  {
    question: `What can the ${STARTER.price} Starter do?`,
    answer: 'One job you currently do by hand, set up to run itself on the tools you already use. For example: every enquiry logged in one list with an instant reply, or booking confirmations and reminders sent automatically. Working within 7 working days of access.',
  },
  {
    question: 'How do the optional extras work?',
    answer: `They are add-ons with a fixed, one-off price, like appointment reminders (${P('Appointment reminders')}), review requests (${P('Review requests')}) or missed-call text-back (${P('Missed-call text-back')}). Add them when you order, or later. They go on the same invoice, so there are no surprise costs.`,
  },
  {
    question: 'Can I buy an add-on on its own?',
    answer: `Yes. Standard add-ons, like appointment reminders (${P('Appointment reminders')}) or Google Business Profile setup (${P('Google Business Profile setup')}), can be bought on their own or added to any package. The one exception is Extra automation, which adds a second job to a package; a first job of your own is ${STARTER.name} (${STARTER.price}).`,
  },
  {
    question: 'What isn’t included?',
    answer: `Paid apps or text-message costs, which you pay those companies directly (I tell you the cost up front). Changes after handover, unless you have ${CARE_PLAN.name} at ${MONTHLY}. And new features beyond the agreed plan, which get their own fixed price first.`,
  },
  {
    question: "What's the guarantee?",
    answer: 'Starter Automation is working within 7 working days of me getting access, or I waive the final payment and still finish. Larger jobs get a dated plan in the quote. If I cannot deliver what we agreed, I refund your deposit.',
  },
  {
    question: 'How does payment work?',
    answer: 'A fixed quote first. Then half to start and the rest when it is live, all on one invoice. Software subscriptions or text-message costs, if any, are paid by you directly at cost. No VAT added.',
  },
  {
    question: 'Do I own what you build?',
    answer: 'Yes. Every account stays yours. I never need your passwords; add me as a user, then remove me after.',
  },
  {
    question: 'Is this only for certain trades?',
    answer: 'No. Any UK business with customers, enquiries or admin can ask.',
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
    answer: `Yes. ${REFERRAL_THANK_YOU} by bank transfer when a business you introduce becomes a new paying client. One per new client, and only if they were not already talking to me.`,
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
