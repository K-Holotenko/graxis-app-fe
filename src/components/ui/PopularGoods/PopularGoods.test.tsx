import React from 'react';
import { render } from '@testing-library/react';
import { PopularGoods } from './index';

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
