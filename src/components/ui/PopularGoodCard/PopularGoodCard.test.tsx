import { render, fireEvent } from '@testing-library/react';

import { PopularGoodCard } from './index';

const mockedPopularGoodCardProps = {
  key: 1,
  image: 'test-image.jpg',
  name: 'Test Product',
  rating: 4.8,
  price: 400,
  isFavorite: false,
  onFavoriteToggle: vi.fn(),
};

describe('PopularGoodCard', () => {
  it('should display product details correctly', () => {
    const { getByText, getByAltText } = render(
      <PopularGoodCard {...mockedPopularGoodCardProps} />
    );

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('4.8')).toBeInTheDocument();
    expect(getByText('400 грн / год')).toBeInTheDocument();

    const img = getByAltText('Test Product');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });
});
