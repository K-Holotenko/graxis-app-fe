import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { TEXT } from 'src/config/constants';
import { CATEGORIES_SECTION_CARD } from 'src/components/ui/CategoriesSectionCard/utils/config';

import { CategoriesSection } from '.';

describe('CategoriesSection', () => {
  it('render the section correctly', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CategoriesSection />
      </MemoryRouter>
    );
    const categoriesSection = getByTestId('categories-section');

    expect(categoriesSection).toBeInTheDocument();
  });

  it('renders the section title correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CategoriesSection />
      </MemoryRouter>
    );

    const categoriesSectionTitle = getByText(TEXT.CATEGORIES_SECTION_TITLE);

    expect(categoriesSectionTitle).toBeInTheDocument();
  });

  it('should render amount of categories cards correctly', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <CategoriesSection />
      </MemoryRouter>
    );
    const categoriesCards = getAllByTestId('categories-card');

    expect(categoriesCards).toHaveLength(CATEGORIES_SECTION_CARD.length);
  });
});
