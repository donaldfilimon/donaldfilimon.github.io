import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SiteHeader } from '@/components/site-header';

vi.mock('next/navigation', () => ({ usePathname: () => '/work/abi' }));

describe('SiteHeader', () => {
  it('marks the active route and exposes an accessible mobile navigation', async () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole('link', { name: 'Work' })[0]).toHaveAttribute('aria-current', 'page');

    const trigger = screen.getByRole('button', { name: 'Open navigation' });
    trigger.focus();
    fireEvent.click(trigger);

    const mobileNavigation = await screen.findByRole('navigation', { name: 'Mobile navigation' });
    expect(mobileNavigation).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    fireEvent.click(within(mobileNavigation).getByRole('link', { name: /About/ }));
    await waitFor(() => {
      expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
    });
  });
});
