import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { useAsyncResource } from '../useAsyncResource';
import {
  getGraphQLRepoResponseMocks,
  searchOptionsMock,
} from '../../models/mocks';
import * as fetchModule from '../../api/facade/fetch-repos';
import { transformGQLRepositoriesResponse } from '../../models/transformations/transformations';

jest.mock('../../api/facade/fetch-repos', () => ({
  fetchRepos: jest.fn(),
}));

const mockedResponse = getGraphQLRepoResponseMocks(10);
describe('useAsyncResource hook', () => {
  beforeEach(() => {
    (fetchModule.fetchRepos as jest.Mock).mockResolvedValue(mockedResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = ({ searchTerm }: { searchTerm: string }) => {
    const { isLoading, data, error, totalCount } = useAsyncResource({
      fetchFn: fetchModule.fetchRepos,
      transformFn: transformGQLRepositoriesResponse,
      options: { ...searchOptionsMock, searchTerm },
    });

    return (
      <div data-testid="test-component">
        <div data-testid="loading-state">{isLoading.toString()}</div>
        <div data-testid="data-count">{data.length}</div>
        <div data-testid="total-count">{totalCount}</div>
        <div data-testid="error-state">{error}</div>
      </div>
    );
  };

  it('starts with isLoading true and empty data', async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    expect(getByTestId('loading-state').textContent).toBe('true');
    expect(getByTestId('data-count').textContent).toBe('0');
  });

  it('sets isLoading to false and updates data after fetch', async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await waitFor(() => {
      expect(getByTestId('data-count').textContent).toBe(
        mockedResponse.edges.length.toString(),
      );
      expect(getByTestId('loading-state').textContent).toBe('false');
    });
  });

  it('updates totalCount after fetch', async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await waitFor(() => {
      expect(getByTestId('total-count').textContent).toBe(
        String(mockedResponse.edges.length),
      );
    });
  });

  it('handles errors and sets the error state', async () => {
    const errorMessage = 'Failed to fetch repositories.';
    (fetchModule.fetchRepos as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );

    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await waitFor(() => {
      expect(getByTestId('error-state').textContent).toBe(errorMessage);
    });
  });
});
