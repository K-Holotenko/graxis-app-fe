import React from 'react';
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

test('renders greeting with provided name', () => {
  render(<Greeting name="team" />);
  const greetingElement = screen.getByText(/Hello, team!/i);
  expect(greetingElement).toBeInTheDocument();
});
