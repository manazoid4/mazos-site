export type ProjectLink = { label: string; href: string };
export type ProjectImage = {
  src: string;
  mobileSrc?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export type CaseStudyStep = { number: string; title: string; body: string };
export type ProjectCaseStudy = {
  lede: string;
  role: string;
  scope: string[];
  howItWorks: CaseStudyStep[];
  decisions: { title: string; body: string }[];
};

export type Project = {
  id: string;
  name: string;
  relationship: 'Product' | 'Client work' | 'Lab';
  eyebrow: string;
  status: string;
  summary: string;
  problem: string;
  insight: string;
  built: string[];
  proof: string;
  limitation: string;
  image?: ProjectImage;
  links: ProjectLink[];
  caseStudy?: ProjectCaseStudy;
};

export type CaseStudyProject = Project & { caseStudy: ProjectCaseStudy };

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'jobfilter', name: 'JobFilter', eyebrow: 'Flagship 01 / Product', status: 'Live product',
    relationship: 'Product',
    summary: 'A construction growth and automation product that helps small trades and maintenance firms find, qualify, track and act on relevant public-sector opportunities with less manual research.',
    problem: 'Small construction firms can lose hours checking opportunity sources, deciding whether work fits their trade, tracking deadlines, and keeping follow-up organised.',
    insight: 'The useful product is the workflow around an opportunity, not just a list of tenders: reject weak matches, explain why a job fits, surface the next action, and make follow-up easier.',
    built: [
      'Official public-tender retrieval with pagination, retries, notice reconciliation, and deduplication.',
      'Trade-specific fit signals and qualification using trade, CPV, location, deadline, and notice evidence.',
      'Free opportunity scanning plus alert capture so firms can keep watching their area when nothing suitable is live.',
      'Calendar export, response templates, scan tracking, and outcome signals that reduce admin around pursuing relevant work.',
    ],
    proof: 'The live product, public code, recent trade-fit work, alerts, calendar export, response templates, and qualification flow are inspectable now.',
    limitation: 'JobFilter helps firms find and pursue relevant opportunities; it does not guarantee that a contract will be awarded.',
    image: { src: '/jobfilter-scan-result.webp', mobileSrc: '/jobfilter-scan-result-mobile.webp', alt: 'JobFilter showing an honest zero-result scan after checking configured public tender sources', caption: 'Live scan result / verified matching can return zero', width: 1440, height: 900 },
    links: [
      { label: 'Try a free scan', href: 'https://jobfilter.uk/find-jobs' },
      { label: 'View code', href: 'https://github.com/manazoid4/JobFilterV1' },
    ],
    caseStudy: {
      lede: 'A construction-focused opportunity and workflow product built to help small firms spend less time searching and more time acting on work that genuinely fits.',
      role: 'Product direction, public-data pipeline, trade-fit qualification, workflow automation, interface, testing, and deployment.',
      scope: ['Opportunity discovery', 'Trade-fit qualification', 'Alerts and follow-up tools', 'Product interface and deployment'],
      howItWorks: [
        { number: '01', title: 'Find the work', body: 'Check official public opportunities and normalise the source data into a usable scan.' },
        { number: '02', title: 'Filter for the firm', body: 'Use trade, CPV, location, deadline, and notice evidence so weak or uncertain matches can be excluded.' },
        { number: '03', title: 'Make the next action obvious', body: 'Surface fit signals, buyer and deadline context where available, plus the official response route.' },
        { number: '04', title: 'Reduce follow-up admin', body: 'Support alerts, calendar export, response templates, and outcome tracking around the opportunity workflow.' },
      ],
      decisions: [
        { title: 'Do more than aggregate tenders', body: 'Construction teams need help deciding what is worth their time and what to do next, not another long list of notices.' },
        { title: 'Keep the promise realistic', body: 'JobFilter can improve discovery, qualification, and follow-up, but contract awards still depend on the buyer and the firm’s bid.' },
      ],
    },
  },
  {
    id: 'scrap-finance-partners', name: 'Scrap Finance Partners', eyebrow: 'Flagship 02 / Contract client build', status: 'Contract client work / Shipped',
    relationship: 'Client work',
    summary: 'A contract client build for a specialist finance practice serving UK scrap and recycling firms, covering positioning, web development, lead capture, a secure client workspace, and guarded acquisition automation.',
    problem: 'The client needed more than a brochure site: the specialist offer had to be positioned clearly, launched professionally, turn interest into enquiries, and give the business a controlled way to manage leads and follow-up.',
    insight: 'The strongest build connected marketing, website, enquiry capture, lead operations, and safety controls into one maintainable client journey instead of treating them as separate projects.',
    built: [
      'Specialist positioning, service and pricing architecture, responsive web development, and production launch.',
      'A lower-friction enquiry journey that saves valid website enquiries into an authenticated lead workspace with source and qualification context.',
      'Secure client login, organisation-scoped leads, reusable email templates, message history, and onboarding guidance.',
      'A guarded acquisition workflow with dry-run, approval, batching, suppression, recipient-safety controls, and follow-up handling.',
    ],
    proof: 'The deployed client site, public repository, secure lead workspace, enquiry-to-pipeline workflow, and guarded acquisition controls are inspectable now.',
    limitation: 'This case study describes delivered systems and launch work; it does not invent revenue, conversion, lead-volume, or financial-outcome claims.',
    image: { src: '/scrap-finance-partners.webp', mobileSrc: '/scrap-finance-partners-mobile.webp', alt: 'Scrap Finance Partners homepage explaining its Finance Health Check for UK scrap and recycling firms', caption: 'Live client site / specialist positioning and enquiry path', width: 1440, height: 1000 },
    links: [
      { label: 'View the live site', href: 'https://scrap-finance-partners.vercel.app' },
      { label: 'View code', href: 'https://github.com/manazoid4/scrap-finance-partners' },
    ],
    caseStudy: {
      lede: 'A contract client engagement spanning positioning, marketing implementation, web development, launch, lead capture, client operations, and controlled acquisition automation.',
      role: 'Positioning, marketing implementation, information architecture, web development, lead capture, secure workspace, acquisition automation, testing, deployment, and handoff.',
      scope: ['Positioning and web development', 'Lead capture and pipeline', 'Client workspace', 'Guarded acquisition automation', 'Production launch'],
      howItWorks: [
        { number: '01', title: 'Position the specialist offer', body: 'Structure the site around the real finance and operational pressures faced by scrap and recycling businesses rather than generic consultancy language.' },
        { number: '02', title: 'Turn interest into a usable lead', body: 'Keep first contact low-friction, then save valid enquiries into the lead workspace with source, qualification, and follow-up context.' },
        { number: '03', title: 'Give the client an operating workspace', body: 'Provide secure organisation-scoped leads, templates, message history, onboarding guidance, and follow-up actions.' },
        { number: '04', title: 'Automate with controls', body: 'Use dry runs, approval gates, suppression, batching, and recipient-safety rules so acquisition workflows do not blindly send or duplicate outreach.' },
        { number: '05', title: 'Launch and hand over', body: 'Test the web and account flows, deploy to production, and leave a maintainable system the client can continue using.' },
      ],
      decisions: [
        { title: 'Treat marketing and operations as one journey', body: 'A polished site is more useful when enquiries continue into a real lead workflow instead of disappearing into an inbox.' },
        { title: 'Automate without removing judgment', body: 'Approval, suppression, and dry-run controls keep the efficiency benefits of automation while preserving human responsibility for important outreach.' },
      ],
    },
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'agent-nudge', name: 'Agent Nudge', eyebrow: 'Featured / Agent coordination', status: 'Released Windows MVP',
    relationship: 'Product',
    summary: 'A local preflight layer that helps AI coding agents avoid stale context and file collisions.',
    problem: 'Parallel coding agents can act on information that has already changed or edit work another agent has claimed.',
    insight: 'Coordination needs a deterministic check before action, not another model guessing about hidden state.',
    built: ['Windows desktop app, background service, and provider hooks.', 'Project-scoped activity records and three explicit preflight outcomes.', 'Installer, portable release, checksums, and a public scenario demo.'],
    proof: 'A downloadable Windows release, checksums, public code, and a browser-based fixture demo.',
    limitation: 'Provider hooks can be bypassed when an agent skips preflight; the app does not call a model itself.',
    image: { src: '/agent-nudge-demo.webp', alt: 'Agent Nudge demo showing two coding agents and a conflict review outcome', caption: 'Public fixture demo / desktop runtime remains local', width: 1440, height: 900 },
    links: [{ label: 'Try the demo', href: 'https://agent-nudge-bay.vercel.app/#demo' }, { label: 'Windows release', href: 'https://github.com/manazoid4/agent-nudge/releases' }, { label: 'View code', href: 'https://github.com/manazoid4/agent-nudge' }],
  },
  {
    id: 'openflowkit', name: 'OpenFlowKit', eyebrow: 'Featured / Open source', status: 'Browser MVP',
    relationship: 'Lab',
    summary: 'A voice-to-text workbench with deterministic cleanup and a terminal bridge.',
    problem: 'Typing is slow for drafting, prompting, and other writing-heavy work.', insight: 'Browser speech capture plus explicit cleanup rules could prove the workflow without a vague AI layer.',
    built: ['Browser speech capture and typed transcription contracts.', 'Deterministic refinement rules and latency tracking.', 'WebSocket terminal bridge with test coverage.'],
    proof: 'A public web MVP and open repository with the refinement and bridge implementation.',
    limitation: 'Native desktop text injection and hosted AI-provider routing are future work, not shipped capabilities.',
    links: [{ label: 'Try the MVP', href: 'https://openflowkit-dusky.vercel.app' }, { label: 'View code', href: 'https://github.com/manazoid4/openflowkit' }],
  },
  {
    id: 'maz-pocket', name: 'MAZ Pocket', eyebrow: 'Featured / Hardware', status: 'v0.1 built, hardware test pending',
    relationship: 'Lab',
    summary: 'Firmware for a card-sized handheld that turns a held key into a captured thought.',
    problem: 'Ideas arrive away from a desk, and reaching for a phone to record one costs a lock screen, a feed, and often the thought itself.',
    insight: 'A physical push-to-talk button on a device with nothing else running is the only real advantage this hardware has over a phone, so the firmware is built around that gesture rather than around a menu.',
    built: [
      'A native TCA8418 keyboard driver for the Cardputer ADV, whose keyboard moved behind an I2C expander that older firmware cannot read.',
      'A voice pipeline behind a sink interface, streamed to storage because the board has no PSRAM.',
      'A modular shell with a command palette, one notification path, and a focus timer that survives navigation.',
      'Storage that degrades cleanly from SD card to internal flash to settings-only.',
    ],
    proof: 'Public firmware source with a clean build, a pin map cross-checked against vendor code, and a verification document that separates what is tested from what is not.',
    limitation: 'It compiles and the hardware facts came from vendor source, but no device was attached during the build, so no behaviour has been observed running. Network handoff to OpenFlowKit is designed for, not shipped.',
    links: [{ label: 'View code', href: 'https://github.com/manazoid4/maz-pocket' }],
  },
];

export const CASE_STUDY_PROJECTS = FLAGSHIP_PROJECTS.filter(
  (project): project is CaseStudyProject => Boolean(project.caseStudy),
);

export function getCaseStudyProject(id: string) {
  return CASE_STUDY_PROJECTS.find((project) => project.id === id);
}
