import Link from 'next/link';
import { ArrowRight, ArrowUpRight, LockKeyhole } from 'lucide-react';

import type { ProjectSummary } from '@/content/site';

export function ProjectCard({
  project,
  index,
  compact = false,
}: {
  project: ProjectSummary;
  index?: number;
  compact?: boolean;
}) {
  const hasCaseStudy = project.featured;
  const publicLink =
    project.visibility === 'public'
      ? (project.links.find((link) => link.kind === 'repository') ??
        project.links.find(
          (link) => link.kind === 'product' || link.kind === 'documentation',
        ))
      : undefined;
  const content = (
    <>
      <div className="project-card-topline">
        <span>
          {index === undefined
            ? project.kindLabel
            : String(index + 1).padStart(2, '0')}
        </span>
        {project.visibility === 'private' ? (
          <span className="privacy-mark">
            <LockKeyhole aria-hidden="true" size={14} /> Private work
          </span>
        ) : (
          <span>Public work</span>
        )}
      </div>
      <div className="project-card-copy">
        <p className="project-card-kicker">
          {project.shortName ?? project.kindLabel}
        </p>
        <h3 translate="no">{project.name}</h3>
        <p>{compact ? project.thesis : project.summary}</p>
      </div>
      <div className="project-card-footer">
        <ul aria-label={`${project.name} technologies`}>
          {project.stack.slice(0, compact ? 2 : 4).map((item) => (
            <li key={item} translate="no">
              {item}
            </li>
          ))}
        </ul>
        {hasCaseStudy ? (
          <span className="project-card-action">
            Read case study <ArrowRight aria-hidden="true" size={18} />
          </span>
        ) : publicLink ? (
          <span className="project-card-action">
            {publicLink.kind === 'repository'
              ? 'View repository'
              : publicLink.label}
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        ) : null}
      </div>
    </>
  );

  if (!hasCaseStudy) {
    if (publicLink) {
      return (
        <a
          className={`project-card tone-${project.accent} is-reference ${compact ? 'is-compact' : ''}`}
          href={publicLink.href}
          aria-label={`Open ${project.name}: ${publicLink.label} (opens in a new tab)`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <article
        className={`project-card tone-${project.accent} is-static ${compact ? 'is-compact' : ''}`}
      >
        {content}
      </article>
    );
  }

  return (
    <Link
      className={`project-card tone-${project.accent} ${compact ? 'is-compact' : ''}`}
      href={`/work/${project.slug}`}
      aria-label={`Read the ${project.name} case study`}
    >
      {content}
    </Link>
  );
}
