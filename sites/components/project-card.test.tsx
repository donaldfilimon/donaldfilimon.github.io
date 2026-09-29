import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectCard } from '@/components/project-card';
import { projects } from '@/content/site';

describe('ProjectCard destinations', () => {
  it('keeps featured work linked to its complete case study', () => {
    render(
      <ProjectCard
        project={projects.find((project) => project.slug === 'abi')!}
      />,
    );
    expect(
      screen.getByRole('link', { name: 'Read the ABI case study' }),
    ).toHaveAttribute('href', '/work/abi');
    expect(screen.getByText('Read case study')).toBeInTheDocument();
  });

  it('makes an existing public repository reachable from a reference card', () => {
    render(
      <ProjectCard
        project={projects.find((project) => project.slug === 'mlai')!}
        compact
      />,
    );
    const link = screen.getByRole('link', {
      name: 'Open MLAI: Repository (opens in a new tab)',
    });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/donaldfilimon/MLAI-CORPORATION-WWW',
    );
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('View repository')).toBeInTheDocument();
  });

  it('never exposes an external destination on private work, even with a stray link', () => {
    const project = projects.find((item) => item.slug === 'coreai-assistant')!;
    render(
      <ProjectCard
        project={{
          ...project,
          links: [
            {
              label: 'Repository',
              href: 'https://example.com/private',
              kind: 'repository',
            },
          ],
        }}
      />,
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Private work')).toBeInTheDocument();
  });
});
