import Link from 'next/link';

import { ProjectCard } from '@/components/project-card';
import { kindLabels, projects, type ProjectKind } from '@/content/site';

export type WorkFilterValue = 'all' | ProjectKind;

export function filterProjects(filter: WorkFilterValue) {
  return filter === 'all'
    ? projects
    : projects.filter((project) => project.kind === filter);
}

export function parseWorkFilter(
  value: string | string[] | undefined,
): WorkFilterValue {
  const selected = Array.isArray(value) ? value[0] : value;
  return selected && Object.hasOwn(kindLabels, selected)
    ? (selected as ProjectKind)
    : 'all';
}

const filters: { label: string; value: WorkFilterValue }[] = [
  { label: 'All Work', value: 'all' },
  ...Object.entries(kindLabels).map(([value, label]) => ({
    label,
    value: value as ProjectKind,
  })),
];

export function WorkFilter({ filter = 'all' }: { filter?: WorkFilterValue }) {
  const filtered = filterProjects(filter);

  return (
    <div className="work-explorer">
      <nav className="work-filter" aria-label="Filter projects">
        {filters.map((item) => (
          <Link
            aria-current={filter === item.value ? 'page' : undefined}
            className="filter-button"
            href={
              item.value === 'all'
                ? '/work#work-register'
                : `/work?filter=${item.value}#work-register`
            }
            key={item.value}
          >
            {item.label}
            <span className="filter-count" aria-hidden="true">
              {filterProjects(item.value).length}
            </span>
          </Link>
        ))}
      </nav>
      <p className="filter-result" aria-live="polite">
        Showing {filtered.length} of {projects.length} projects
        {filter !== 'all' ? ` · ${kindLabels[filter]}` : ''}
      </p>
      <div className="work-index-grid">
        {filtered.map((project) => (
          <ProjectCard compact key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
