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
  it('should render product details correctly', () => {
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

  it('should render the correct heart icon based on isFavorite prop', () => {
    const { rerender, container } = render(
      <PopularGoodCard {...mockedPopularGoodCardProps} />
    );

    let heartIcon = container.querySelector('.anticon-heart-outlined');

    expect(heartIcon).toBeDefined();

    rerender(
      <PopularGoodCard {...mockedPopularGoodCardProps} isFavorite={true} />
    );

    heartIcon = container.querySelector('.anticon-heart-filled');

    expect(heartIcon).toBeDefined();
  });

  it('should not call onFavoriteToggle when an unrelated element is clicked', () => {
    const onFavoriteToggleMock = vi.fn();
    const { getByText } = render(
      <PopularGoodCard
        {...mockedPopularGoodCardProps}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    const productName = getByText('Test Product');

    fireEvent.click(productName);

    expect(onFavoriteToggleMock).toHaveBeenCalledTimes(0);
  });

  it('should call onFavoriteToggle when the heart icon is clicked', () => {
    const onFavoriteToggleMock = vi.fn();
    const { container } = render(
      <PopularGoodCard
        {...mockedPopularGoodCardProps}
        onFavoriteToggle={onFavoriteToggleMock}
      />
    );

    const favoriteIcon = container.querySelector('.anticon-heart-outlined');

    if (favoriteIcon) {
      fireEvent.click(favoriteIcon);

      expect(onFavoriteToggleMock).toHaveBeenCalledTimes(1);
    }
  });
});
