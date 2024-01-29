import { render, act } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useRepositories } from '../../../hooks/useRepositories';

// Mock the fetchReactRepos function
jest.mock('../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: jest.fn(),
}));

// Optional: Mock the transformGQLRepositoriesResponse function if it's a separate import
jest.mock('../path/to/transformGQLRepositoriesResponse', () => ({
  transformGQLRepositoriesResponse: jest
    .fn()
    .mockImplementation((data) => data),
}));

const TestComponent = (props: ) => {
  const { isLoading, repos } = useRepositories(props.options);

  return (
    <div data-testid="test-component">
    <div data-testid="loading-state">{isLoading.toString()}</div>
      <div data-testid="repos-count">{repos.length}</div>
    </div>
);
};

