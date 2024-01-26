import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { main } from './test-utils/data-test-ids';

test('renders page', () => {
  render(<App />);
  const linkElement = screen.getByTestId(main);
  expect(linkElement).toBeInTheDocument();
});
