import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { HeroSection } from './index';

describe('HeroSection', () => {
  it('should include all elements in the Hero section', () => {
    const { getByText, getByPlaceholderText } = render(<HeroSection />);

    expect(getByText('ТВОЯ ПЛАТФОРМА ДЛЯ ШЕРІНГУ')).toBeInTheDocument();
    expect(
      getByText('Шерінг речей без зайвого клопоту, коли завгодно, де завгодно')
    ).toBeInTheDocument();

    const input = getByPlaceholderText('Пошук товару');

    expect(input).toBeInTheDocument();
  });

  it('should have input field and allows text entry in Hero section', async () => {
    const { getByPlaceholderText } = render(<HeroSection />);

    const input = getByPlaceholderText('Пошук товару');

    expect(input).toHaveValue('');

    await userEvent.type(input, 'Книга');
    expect(input).toHaveValue('Книга');
  });
});
