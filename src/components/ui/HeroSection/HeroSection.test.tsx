import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroSection } from './index';

describe('HeroSection Component', () => {
  it('Renders the Hero section with all elements', () => {
    const { getByText, getByPlaceholderText } = render(<HeroSection />);

    expect(getByText('ТВОЯ ПЛАТФОРМА ДЛЯ ШЕРІНГУ')).toBeInTheDocument();
    expect(
      getByText('Шерінг речей без зайвого клопоту коли завгодно, де завгодно')
    ).toBeInTheDocument();

    const input = getByPlaceholderText('Пошук товару');

    expect(input).toBeInTheDocument();
  });

  it('Renders input field and allows text entry in Hero section', async () => {
    const { getByPlaceholderText } = render(<HeroSection />);

    const input = getByPlaceholderText('Пошук товару');

    expect(input).toHaveValue('');

    await userEvent.type(input, 'Книга');
    expect(input).toHaveValue('Книга');
  });

  it('Hero section should have a background image', () => {
    const { container } = render(<HeroSection />);

    const heroSectionContainer = container.querySelector(
      '.hero-section-container'
    );

    if (heroSectionContainer) {
      const backgroundImage =
        getComputedStyle(heroSectionContainer).backgroundImage;

      expect(backgroundImage).toMatch(/url\(/);
    }
  });
});
