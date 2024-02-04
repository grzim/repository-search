import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mainId } from '@src/test-utils';

test(`renders page`, () => {
  jest.spyOn(console, `error`);
  render(<App />);
  const linkElement = screen.getByTestId(mainId);
  expect(linkElement).toBeInTheDocument();
});
