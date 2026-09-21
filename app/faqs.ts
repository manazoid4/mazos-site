export type MazWorksFaq = {
  question: string;
  answer: string;
};

export const MAZ_WORKS_FAQS: MazWorksFaq[] = [
  {
    question: 'What does Maz Works actually build?',
    answer: 'Websites and landing pages, workflow automation, small internal or customer-facing tools, selected AI-assisted features, and physical Objects that link customers to reviews, bookings, menus or other useful digital actions.',
  },
  {
    question: 'Do I need to know what technology I need?',
    answer: 'No. Start with the business problem. I choose the simplest approach that solves it rather than forcing a particular tool or platform.',
  },
  {
    question: 'How much does work cost?',
    answer: 'Current starting points are £150 fixed for a tightly scoped Quick Win, from £299 for a focused Website Launch, and from £499 for a Growth System that combines a customer journey with one useful workflow. Scope and price are agreed before paid work starts.',
  },
  {
    question: 'What is the free first step?',
    answer: 'Tell me the problem. Depending on the job, the useful next step might be a short answer, a walkthrough, a written scope and quote, or a small demo. You do not need to book a call just to explain what is wrong.',
  },
  {
    question: 'What does a free demo include?',
    answer: 'For a suitable problem, it is a small near-working version of the intended workflow so you can understand the direction before paying for a full build. It is not the finished production system.',
  },
  {
    question: 'Can this help sales and team productivity?',
    answer: 'Where the workflow suits it. The useful question is what changes after launch, so I agree the signals worth measuring instead of promising an invented percentage.',
  },
  {
    question: 'Do you use AI in client systems?',
    answer: 'Where it genuinely helps. Important workflows should not be blindly autonomous, so I use limits, validation, approval steps, suppression rules or manual fallback routes when the risk calls for it.',
  },
  {
    question: 'Can you work with systems we already use?',
    answer: 'Often, yes. Existing software, APIs and workflows are checked during scoping so useful parts can be reused instead of rebuilt for the sake of it.',
  },
  {
    question: 'How do you measure whether a change helped?',
    answer: 'It depends on the job. Useful signals can include response time, admin hours, follow-up coverage, overdue handoffs, time-to-quote or workload. I prefer agreeing the signal first rather than inventing a percentage before seeing the problem.',
  },
  {
    question: 'What happens after launch?',
    answer: 'I hand over the agreed work clearly. Ongoing support, extra features or further automation can be quoted separately, currently from £49/month with no long contract.',
  },
  {
    question: 'Can an Object connect to a website or automation?',
    answer: 'Yes. The physical item can be only the first step: a tap can open a review page, booking journey, menu, lead form or another page, and the digital workflow behind it can be scoped separately.',
  },
];

export const HOMEPAGE_FAQS = [
  MAZ_WORKS_FAQS[1],
  MAZ_WORKS_FAQS[4],
  MAZ_WORKS_FAQS[5],
  MAZ_WORKS_FAQS[6],
  MAZ_WORKS_FAQS[7],
];
