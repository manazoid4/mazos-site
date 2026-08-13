import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectImage, ProjectLinks } from '../../project-elements';
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
    description: `${project.summary} Read the problem, decisions, implementation, proof, and current limitation.`,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${project.name} case study — Maz Works`,
      description: project.caseStudy.lede,
      url: `/work/${project.id}`,
      images: project.image ? [{ url: project.image.src, width: project.image.width, height: project.image.height, alt: project.image.alt }] : undefined,
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
            <div><h2>My role</h2><p>{project.caseStudy.role}</p></div>
            <div><h2>Scope</h2><ul>{project.caseStudy.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </header>

        <ProjectImage project={project} eager />

        <section className="case-section" aria-labelledby="problem-title">
          <header><p className="eyebrow">01 / Problem and insight</p><h2 id="problem-title">Start with the constraint, not the stack.</h2></header>
          <div className="case-pair">
            <div><h3>Problem</h3><p>{project.problem}</p></div>
            <div><h3>Insight</h3><p>{project.insight}</p></div>
          </div>
        </section>

        <section className="case-section" aria-labelledby="working-title">
          <header><p className="eyebrow">02 / How it works</p><h2 id="working-title">A traceable path through the system.</h2></header>
          <ol className="case-steps">
            {project.caseStudy.howItWorks.map((step) => <li key={step.number}><span>{step.number}</span><strong>{step.title}</strong><p>{step.body}</p></li>)}
          </ol>
        </section>

        <section className="case-section" aria-labelledby="built-title">
          <header><p className="eyebrow">03 / What I built</p><h2 id="built-title">The implementation in plain terms.</h2></header>
          <div className="case-pair">{project.built.map((item, index) => <div key={item}><h3>0{index + 1}</h3><p>{item}</p></div>)}</div>
        </section>

        <section className="case-section" aria-labelledby="decisions-title">
          <header><p className="eyebrow">04 / Key decisions</p><h2 id="decisions-title">Judgment is part of the build.</h2></header>
          <div className="case-decisions">{project.caseStudy.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</div>
        </section>

        <section className="case-section" aria-labelledby="proof-title">
          <header><p className="eyebrow">05 / Proof and limit</p><h2 id="proof-title">Evidence without inflated outcomes.</h2></header>
          <div className="case-proof">
            <div><h3>Proof</h3><p>{project.proof}</p><ProjectLinks project={project} /></div>
            <div className="limitation-panel"><h3>Current limitation</h3><p>{project.limitation}</p></div>
          </div>
        </section>

        <footer className="case-cta">
          <h2>Have a real workflow that needs a clearer system?</h2>
          <a className="button button-dark" href={CONTACT_LINKS.client}>Show me the problem</a>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}