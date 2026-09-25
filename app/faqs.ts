export type MazWorksFaq = {
  question: string;
  answer: string;
};

export const MAZ_WORKS_FAQS: MazWorksFaq[] = [
  {
    question: 'What does Maz Works build?',
    answer: 'Websites, automation, small tools and physical Objects. I pick what actually solves your problem.',
  },
  {
    question: 'Do I need to know the tech?',
    answer: "No. Tell me the problem and I'll sort the tech.",
  },
  {
    question: 'How much does it cost?',
    answer: 'Quick Win £150 fixed. Website from £299. Growth System from £499. Support from £49/month.',
  },
  {
    question: 'What is the free first step?',
    answer: "Tell me the problem for free. You don't need to book a call first.",
  },
  {
    question: 'Can you work with systems we already use?',
    answer: 'Yes — Wix, Squarespace, WordPress, Square, Fresha, Booksy and similar. I check yours first.',
  },
  {
    question: 'What happens after launch?',
    answer: 'I hand everything over clearly. Support after that costs from £49/month.',
  },
];

export const HOMEPAGE_FAQS = [
  MAZ_WORKS_FAQS[2],
  MAZ_WORKS_FAQS[3],
  MAZ_WORKS_FAQS[4],
  MAZ_WORKS_FAQS[5],
];
