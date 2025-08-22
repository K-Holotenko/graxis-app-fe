import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { CATEGORIES_SECTION_CARD } from 'src/pages/HomePage/children/CategoriesSectionCard/utils/config';

import { CategoriesSection } from '.';

describe('CategoriesSection', () => {
  it('should render the section correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <CategoriesSection />
      </BrowserRouter>
    );
    const categoriesSection = getByTestId('categories-section');

    expect(categoriesSection).toBeInTheDocument();
  });

  it('should render the section title correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CategoriesSection />
      </BrowserRouter>
    );

    const categoriesSectionTitle = getByText('Категорії товарів');

    expect(categoriesSectionTitle).toBeInTheDocument();
  });

  it('should render amount of categories cards correctly', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <CategoriesSection />
      </BrowserRouter>
    );
    const categoriesCards = getAllByTestId('categories-card');

    expect(categoriesCards).toHaveLength(CATEGORIES_SECTION_CARD.length);
  });
});
