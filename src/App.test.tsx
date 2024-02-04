import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mainId } from '@src/test-utils';

test(`renders page`, () => {
  render(<App />);
  const linkElement = screen.getByTestId(mainId);
  expect(linkElement).toBeInTheDocument();
});
