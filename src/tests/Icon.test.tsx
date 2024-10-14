import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

test('renders SVG icon', () => {
  render(<Icon />);
  const svgIcon = screen.getByTestId('svg-icon');
  expect(svgIcon).toBeInTheDocument();
});
