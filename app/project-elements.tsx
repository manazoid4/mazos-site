import type { Project } from './projects';

export function ProjectLinks({ project, includeCaseStudy = false }: { project: Project; includeCaseStudy?: boolean }) {
  return (
    <nav className="project-links" aria-label={`${project.name} evidence links`}>
      {includeCaseStudy && project.caseStudy ? <a className="case-link" href={`/work/${project.id}`}>Read case study <span aria-hidden="true">→</span></a> : null}
      {project.links.map((link) => (
        <a href={link.href} key={link.href}>{link.label}<span aria-hidden="true"> ↗</span></a>
      ))}
    </nav>
  );
}

export function ProjectImage({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (!project.image) return null;
  return (
    <figure className="project-frame">
      <picture>
        {project.image.mobileSrc ? <source media="(max-width: 680px)" srcSet={project.image.mobileSrc} /> : null}
        <img src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
      </picture>
      <figcaption>{project.image.caption}</figcaption>
    </figure>
  );
}
