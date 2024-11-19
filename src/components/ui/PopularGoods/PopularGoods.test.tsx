import React from 'react';
import { render } from '@testing-library/react';
import { PopularGoods } from './index';
import { PopularGoodCardProps } from '../PopularGoodCard';

vi.mock('../PopularGoodCard', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,

    default: ({
      key,
      image,
      name,
      rating,
      price,
      isFavorite,
      onFavoriteToggle,
    }: PopularGoodCardProps) => (
      <div data-testid="popular-good-card">
        <span>{key}</span>
        <img src={image} alt={name} />
        <span>{name}</span>
        <span>{rating}</span>
        <span>{price}</span>
        <button onClick={onFavoriteToggle}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
      </div>
    ),
  };
});

describe('PopularGoods', () => {
  it('should render the title of popular goods', () => {
    const { getByText } = render(<PopularGoods />);

    expect(getByText('Популярні товари')).toBeInTheDocument();
  });

  it('should render all product cards with correct amount', () => {
    const { getAllByAltText } = render(<PopularGoods />);
    const images = getAllByAltText('Назва товарів');

    expect(images.length).toBe(8);
  });

  it('renders the correct title', () => {
    const { getByText } = render(<PopularGoods />);

    expect(getByText('Популярні товари')).toBeInTheDocument();
  });
});
