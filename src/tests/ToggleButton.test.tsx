import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from './ToggleButton';

test('toggles button text on click', () => {
  render(<ToggleButton />);
  const button = screen.getByText(/OFF/i);
  fireEvent.click(button);
  expect(screen.getByText(/ON/i)).toBeInTheDocument();
});
