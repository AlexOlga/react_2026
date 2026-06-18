import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router';

import Nav from './Nav';
import { navTexts } from '../../shared/text';
import { navStyles } from '../../shared/styles/nav';
import userEvent from '@testing-library/user-event';

describe('Nav', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: navTexts.home })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: navTexts.about })
    ).toBeInTheDocument();
  });

  test('applies active class', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', {
      name: navTexts.home,
    });

    const aboutLink = screen.getByRole('link', {
      name: navTexts.about,
    });

    expect(homeLink).toHaveClass(navStyles.active);
    expect(aboutLink).toHaveClass(navStyles.inactive);
  });

  test('change active class', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Nav />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', {
      name: navTexts.home,
    });
    const aboutLink = screen.getByRole('link', {
      name: navTexts.about,
    });
    await user.click(aboutLink);
    expect(homeLink).toHaveClass(navStyles.inactive);
    expect(aboutLink).toHaveClass(navStyles.active);
  });
});
