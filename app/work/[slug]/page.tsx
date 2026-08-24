import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectLinks } from '../../project-elements';
import { CASE_STUDY_PROJECTS, getCaseStudyProject } from '../../projects';
import { CONTACT_LINKS } from '../../site';
import { SiteFooter, SiteHeader } from '../../site-chrome';

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: `${project.summary} See what I built, how it works and the current status.`,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.name} case study — Maz Works`,
      description: project.caseStudy.lede,
      url: `/work/${project.id}`,
      images: project.image ? [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.image.alt }] : [{ url: '/social-card.png', width: 1200, height: 630, alt: `${project.name} — Maz Works` }],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudyProject(slug);
  if (!project) notFound();

  return (
    <main>
      <SiteHeader />
      <article className="case-study" id="main-content" tabIndex={-1}>
        <header className="case-hero">
          <a className="case-back" href="/#work"><span aria-hidden="true">←</span>&nbsp; Selected work</a>
          <p className="eyebrow">{project.relationship} / {project.status}</p>
          <h1>{project.name}</h1>
          <p className="case-lede">{project.caseStudy.lede}</p>
          <ProjectLinks project={project} />
          <div className="case-meta">
            <div><h2>What I handled</h2><p>{project.caseStudy.role}</p></div>
            <div><h2>Included</h2><ul>{project.caseStudy.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </header>

        <section className="case-section" aria-labelledby="problem-title">
          <header><p className="eyebrow">01 / The problem</p><h2 id="problem-title">What needed fixing.</h2></header>
          <div className="case-pair">
            <div><h3>Problem</h3><p>{project.problem}</p></div>
            <div><h3>Approach</h3><p>{project.insight}</p></div>
          </div>
        </section>

        <section className="case-section" aria-labelledby="built-title">
          <header><p className="eyebrow">02 / What I built</p><h2 id="built-title">The work delivered.</h2></header>
          <div className="case-pair">{project.built.map((item, index) => <div key={item}><h3>0{index + 1}</h3><p>{item}</p></div>)}</div>
        </section>

        <section className="case-section" aria-labelledby="working-title">
          <header><p className="eyebrow">03 / How it works</p><h2 id="working-title">A simple view of the flow.</h2></header>
          <ol className="case-steps">
            {project.caseStudy.howItWorks.map((step) => <li key={step.number}><span>{step.number}</span><strong>{step.title}</strong><p>{step.body}</p></li>)}
          </ol>
        </section>

        <section className="case-section" aria-labelledby="status-title">
          <header><p className="eyebrow">04 / Current status</p><h2 id="status-title">What is live and what is still being proved.</h2></header>
          <div className="case-proof">
            <div><h3>Working now</h3><p>{project.proof}</p><ProjectLinks project={project} /></div>
            <div className="limitation-panel"><h3>Still to prove</h3><p>{project.limitation}</p></div>
          </div>
        </section>

        <footer className="case-cta">
          <h2>Have a similar problem?</h2>
          <a className="button button-signal" href={CONTACT_LINKS.client}>Get a free demo</a>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
