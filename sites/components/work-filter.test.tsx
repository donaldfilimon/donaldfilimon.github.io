import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  filterProjects,
  parseWorkFilter,
  WorkFilter,
} from '@/components/work-filter';

describe('WorkFilter', () => {
  it('filters the complete register by project kind', () => {
    expect(filterProjects('all')).toHaveLength(13);
    expect(
      filterProjects('native-systems').map((project) => project.slug),
    ).toEqual(['gama', 'string', 'mixed', 'coreai-assistant']);
    expect(parseWorkFilter('native-systems')).toBe('native-systems');
    expect(parseWorkFilter('unknown')).toBe('all');
    expect(parseWorkFilter(['native-systems', 'lab'])).toBe('native-systems');
    expect(parseWorkFilter([])).toBe('all');
    expect(parseWorkFilter('__proto__')).toBe('all');
  });

  it('renders a deep-linkable filtered register and announces the result count', () => {
    render(<WorkFilter filter="native-systems" />);
    expect(
      screen.getByText('Showing 4 of 13 projects · Native Systems'),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Gama' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'ABI' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Native Systems' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Research Labs' })).toHaveAttribute(
      'href',
      '/work?filter=lab#work-register',
    );
    expect(
      within(screen.getByRole('link', { name: 'Native Systems' })).getByText(
        '4',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All Work' })).toHaveAttribute(
      'href',
      '/work#work-register',
    );
  });
});
