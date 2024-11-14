import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopularGoods from './index';

interface PopularGoodCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

vi.mock('../PopularGoodCard', () => ({
  __esModule: true,
  default: ({
    image,
    name,
    rating,
    price,
    isFavorite,
    onFavoriteToggle,
  }: PopularGoodCardProps) => (
    <div>
      <img src={image} alt={name} />
      <span>{name}</span>
      <span>{rating}</span>
      <span>{price}</span>
      <span>{isFavorite ? 'Favorited' : 'Not Favorited'}</span>
      <button onClick={onFavoriteToggle}>Toggle Favorite</button>
    </div>
  ),
}));

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

  it('should trigger onFavoriteToggle for each product', () => {
    const { getAllByText } = render(<PopularGoods />);
    const buttons = getAllByText('Toggle Favorite');

    buttons.forEach((button) => fireEvent.click(button));
  });

  it('should update favorite status correctly when "Toggle Favorite" is clicked', () => {
    const { getAllByText, rerender } = render(<PopularGoods />);

    const buttons = getAllByText('Toggle Favorite');

    fireEvent.click(buttons[0]);
    rerender(<PopularGoods />);

    expect(getAllByText('Favorited').length).toBeGreaterThanOrEqual(1);
  });
});
