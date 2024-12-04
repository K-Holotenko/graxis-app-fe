import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AvatarMenu } from './index';

describe('AvatarMenu', () => {
  it('should display the menu', () => {
    const { getByRole } = render(<AvatarMenu />);

    expect(getByRole('menu')).toBeInTheDocument();
  });

  it('should display the menu item "My publications"', () => {
    const { getByText } = render(<AvatarMenu />);

    expect(getByText('Мої оголошення')).toBeInTheDocument();
  });

  it('should display the menu item "Settings"', () => {
    const { getByText } = render(<AvatarMenu />);

    expect(getByText('Налаштування')).toBeInTheDocument();
  });

  it('should display the menu item "Logout"', () => {
    const { getByText } = render(<AvatarMenu />);

    expect(getByText('Вийти')).toBeInTheDocument();
  });

  it('should display 3 menu item', () => {
    const { getAllByRole } = render(<AvatarMenu />);
    const menuItems = getAllByRole('menuitem');

    expect(menuItems.length).toBe(3);
  });
});
