import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesSectionCard } from '.';
import { CATEGORIES_SECTION_CARD } from './utils/config';

describe('CategoriesSectionCard', () => {
  it('should render the correct titles for each category card', () => {
    const { getByText } = render(
      <BrowserRouter>
        {CATEGORIES_SECTION_CARD.map((category) => (
          <CategoriesSectionCard key={category.id} categories={category} />
        ))}
      </BrowserRouter>
    );

    CATEGORIES_SECTION_CARD.forEach((category) => {
      const title = getByText(category.title);

      expect(title).toBeInTheDocument();
    });
  });

  it('should render the correct image for each category card', () => {
    const { getAllByAltText } = render(
      <BrowserRouter>
        {CATEGORIES_SECTION_CARD.map((category) => (
          <CategoriesSectionCard key={category.id} categories={category} />
        ))}
      </BrowserRouter>
    );

    CATEGORIES_SECTION_CARD.forEach((category) => {
      const image = getAllByAltText(category.title);

      expect(image[0]).toBeInTheDocument();
    });
  });

  it('should navigate to the correct link when clicked', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        {CATEGORIES_SECTION_CARD.map((category) => (
          <CategoriesSectionCard key={category.id} categories={category} />
        ))}
      </BrowserRouter>
    );

    const cards = getAllByTestId('categories-link');

    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument();

      expect(card).toHaveAttribute('href', CATEGORIES_SECTION_CARD[index].link);
      fireEvent.click(card);

      expect(card.getAttribute('href')).toBe(
        CATEGORIES_SECTION_CARD[index].link
      );
    });
  });

  it('should render the correct icon for the last category card', () => {
    const { getAllByAltText } = render(
      <BrowserRouter>
        {CATEGORIES_SECTION_CARD.map((category) => (
          <CategoriesSectionCard key={category.id} categories={category} />
        ))}
      </BrowserRouter>
    );

    const lastCategory =
      CATEGORIES_SECTION_CARD[CATEGORIES_SECTION_CARD.length - 1];
    const icons = getAllByAltText(lastCategory.title);

    expect(icons[0]).toBeInTheDocument();
  });
});
