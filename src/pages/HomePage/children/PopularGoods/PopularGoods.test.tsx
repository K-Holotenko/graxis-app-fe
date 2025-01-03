import React from 'react';
import { render } from '@testing-library/react';

import { TEXT } from 'src/config/constants';

import { PopularGoods } from './index';

describe('PopularGoods', () => {
  it('should display the title of popular goods', () => {
    const { getByText } = render(<PopularGoods />);

    expect(getByText('Популярні товари')).toBeInTheDocument();
  });

  it('should display all product cards with the correct amount', () => {
    const { getAllByAltText } = render(<PopularGoods />);
    const images = getAllByAltText('Назва товарів');

    expect(images.length).toBe(8);
  });

  it('should display the correct title', () => {
    const { getByText } = render(<PopularGoods />);

    expect(getByText(TEXT.POPULAR_GOODS)).toBeInTheDocument();
  });
});
