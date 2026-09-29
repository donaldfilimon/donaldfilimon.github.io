import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import ContactPage from '@/app/contact/page';
import { profile } from '@/content/site';

it('opens a correctly addressed project email with editable prompts', () => {
  render(<ContactPage />);
  const link = screen.getByRole('link', {
    name: /Start a project conversation/,
  });
  const target = new URL(link.getAttribute('href')!);
  expect(target.protocol).toBe('mailto:');
  expect(target.pathname).toBe(profile.email);
  expect(target.searchParams.get('subject')).toBe('Project conversation');
  const body = target.searchParams.get('body')!;
  expect(body).toContain('What are you trying to make possible?');
  expect(body).toContain('Who needs the system');
  expect(body).toContain('What already exists');
  expect(body).toContain('Which technical or organizational constraint');
});
