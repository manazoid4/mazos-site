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
    summary: 'A clearer route into UK public-sector work for small construction and maintenance firms.',
    problem: 'Small firms miss winnable contracts because notices are scattered across procurement portals and written in inconsistent formats.',
    insight: 'A useful shortlist has to reject weak matches, not merely find keywords. Buyer addresses, stale notices, and adjacent trades cannot be treated as proof.',
    built: [
      'Official Find a Tender OCDS retrieval with pagination, retries, and cancellation.',
      'Notice normalisation, latest-amendment merging, and release deduplication.',
      'CPV-first trade matching with fail-closed location checks.',
      'A plain scan flow that can return an honest zero instead of inventing relevance.',
    ],
    proof: 'The live product, public code, and reviewed Find a Tender migration show the retrieval and matching system working end to end.',
    limitation: 'The official-feed migration works; repeat willingness to pay among small firms is still unproven.',
    image: { src: '/jobfilter-scan-result.webp', mobileSrc: '/jobfilter-scan-result-mobile.webp', alt: 'JobFilter showing an honest zero-result scan after checking configured public tender sources', caption: 'Live scan result / verified matching can return zero', width: 1440, height: 900 },
    links: [
      { label: 'Try a free scan', href: 'https://jobfilter.uk/find-jobs' },
      { label: 'Review the migration', href: 'https://github.com/manazoid4/JobFilterV1/pull/383' },
      { label: 'View code', href: 'https://github.com/manazoid4/JobFilterV1' },
    ],
    caseStudy: {
      lede: 'A procurement qualification product designed to prefer an honest zero over a noisy list of weak opportunities.',
      role: 'Product direction, public-data pipeline, qualification rules, interface, testing, and deployment.',
      scope: ['Public procurement data', 'Deterministic qualification', 'Product interface', 'Verification and deployment'],
      howItWorks: [
        { number: '01', title: 'Retrieve', body: 'Fetch official Find a Tender OCDS packages with pagination, retry handling, and a cancellable scan.' },
        { number: '02', title: 'Reconcile', body: 'Normalise notices, merge the latest amendments, and deduplicate releases before scoring.' },
        { number: '03', title: 'Qualify', body: 'Require trade, CPV, location, deadline, and notice evidence; uncertain inputs fail closed.' },
        { number: '04', title: 'Present', body: 'Return a short explainable result set—or an honest zero—with live sources available for inspection.' },
      ],
      decisions: [
        { title: 'Treat relevance as a rejection problem', body: 'The system earns trust by excluding attractive-looking false matches rather than maximising the number of cards on screen.' },
        { title: 'Keep the evidence close', body: 'Public source data, matching reasons, code, and the migration review make the product inspectable instead of asking visitors to accept a performance claim.' },
      ],
    },
  },
  {
    id: 'scrap-finance-partners', name: 'Scrap Finance Partners', eyebrow: 'Flagship 02 / Client work', status: 'Client work / Shipped',
    relationship: 'Client work',
    summary: 'A complete consultancy website and enquiry path built for a specialist finance practice.',
    problem: 'A specialist advisory offer needed to explain an unfamiliar service clearly, establish credibility, show pricing, and turn interest into an enquiry.',
    insight: 'The site needed to feel specific to the scrap trade rather than like a generic finance template. Its commercial path had to be understandable before contact.',
    built: [
      'Services, pricing, health-check, case-study, and founder page architecture.',
      'A working enquiry endpoint using Resend with honeypot spam protection.',
      'Responsive editorial design, deployment, and production handoff.',
      'A reusable pattern for service positioning and lead capture.',
    ],
    proof: 'The deployed site, public repository, working enquiry route, and client-specific services and pricing structure are inspectable now.',
    limitation: 'No revenue, lead-volume, conversion, testimonial, or financial-outcome claim is made here.',
    image: { src: '/scrap-finance-partners.webp', mobileSrc: '/scrap-finance-partners-mobile.webp', alt: 'Scrap Finance Partners homepage explaining its Finance Health Check for UK scrap and recycling firms', caption: 'Live client site / specialist positioning and enquiry path', width: 1440, height: 1000 },
    links: [
      { label: 'View the live site', href: 'https://scrap-finance-partners.vercel.app' },
      { label: 'View code', href: 'https://github.com/manazoid4/scrap-finance-partners' },
    ],
    caseStudy: {
      lede: 'Commissioned work that turned a specialist finance proposition into a clear, inspectable path from first question to enquiry.',
      role: 'Positioning, information architecture, interface design, enquiry integration, testing, deployment, and handoff.',
      scope: ['Service positioning', 'Editorial web design', 'Lead capture', 'Production deployment'],
      howItWorks: [
        { number: '01', title: 'Frame the real question', body: 'Lead with margin, yard work, and tied-up cash—the language of the client’s market—not generic finance promises.' },
        { number: '02', title: 'Make the offer legible', body: 'Connect the health check, services, pricing, case study, and founder context before asking for contact.' },
        { number: '03', title: 'Create a safe enquiry path', body: 'Send structured enquiries through Resend and reduce automated spam with a honeypot field.' },
        { number: '04', title: 'Ship and hand over', body: 'Test the responsive site, deploy it to production, and leave a maintainable public repository.' },
      ],
      decisions: [
        { title: 'Specificity builds credibility', body: 'Scrap-trade language, service structure, and a direct commercial question do more work than generic consultancy claims.' },
        { title: 'Show the path before contact', body: 'Visitors can understand what is reviewed, how the work is framed, and where pricing sits before they submit an enquiry.' },
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