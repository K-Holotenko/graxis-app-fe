import { render } from '@testing-library/react';

import { Menu } from './index';

describe('Menu', () => {
  it('should display the menu', () => {
    const { getByRole } = render(<Menu />);

    expect(getByRole('menu')).toBeInTheDocument();
  });

  it('should display the menu item "My publications"', () => {
    const { getByText } = render(<Menu />);

    expect(getByText('Мої оголошення')).toBeInTheDocument();
  });

  it('should display the menu item "Settings"', () => {
    const { getByText } = render(<Menu />);

    expect(getByText('Налаштування')).toBeInTheDocument();
  });

  it('should display the menu item "Logout"', () => {
    const { getByText } = render(<Menu />);

    expect(getByText('Вийти')).toBeInTheDocument();
  });

  it('should display 3 menu item', () => {
    const { getAllByRole } = render(<Menu />);
    const menuItems = getAllByRole('menuitem');

    expect(menuItems.length).toBe(3);
  });
});
