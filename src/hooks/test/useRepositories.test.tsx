import { render, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';
import { useRepositories } from '../useRepositories';
import {
  getGraphQLRepoResponseMocks,
  searchOptionsMock,
} from '../../models/mocks';
import { act } from 'react-dom/test-utils';
import * as fetchModule from '../../api/facade/fetch-repos';
import { FetchSearchOptions } from '../../models/ui-related/search';

const mockRepos = getGraphQLRepoResponseMocks(10);
jest.mock('../../api/facade/fetch-repos', () => ({
  fetchRepos: jest.fn(),
}));

let TestComponent: React.FC<{ searchTerm: string }>;

describe('useRepositories hook', () => {
  beforeEach(() => {
    (fetchModule.fetchRepos as jest.Mock).mockResolvedValue(mockRepos);
    // eslint-disable-next-line react/display-name
    TestComponent = ({ searchTerm }: { searchTerm: string }) => {
      const options = useRef<FetchSearchOptions>({
        ...searchOptionsMock,
        searchTerm,
      });
      const { isLoading, repos, error, ...paginationData } = useRepositories(
        options.current,
      );
      return (
        <div data-testid="test-component">
          <div data-testid="loading-state">{isLoading.toString()}</div>
          <div data-testid="repos-count">{repos.length}</div>
          <div data-testid="pagination-data">
            {JSON.stringify(paginationData)}
          </div>
          <div data-testid="error-state">{error}</div>
        </div>
      );
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });
  it('starts with isLoading true and empty repos', async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await act(async () => {
      expect(getByTestId('loading-state').textContent).toBe('true');
      expect(getByTestId('repos-count').textContent).toBe('0');
    });
  });

  it('sets isLoading to false and updates repos after fetch', async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);
    expect(getByTestId('loading-state').textContent).toBe('true');

    await waitFor(() => {
      expect(getByTestId('repos-count').textContent).toBe(
        mockRepos.edges.length.toString(),
      );
    });

    await waitFor(() => {
      expect(getByTestId('loading-state').textContent).toBe('false');
    });
  });

  it('updates pagination data after fetch', async () => {
    const { getByTestId } = render(<TestComponent searchTerm={'test'} />);

    await waitFor(() => {
      expect(
        JSON.parse(getByTestId('pagination-data').textContent as string),
      ).toEqual(expect.objectContaining(mockRepos.pageInfo));
    });
  });

  it('handles errors and sets the error state', async () => {
    const errorMessage = 'Failed to fetch repositories.';
    (fetchModule.fetchRepos as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage),
    );
    jest.spyOn(console, 'error');
    const { getByTestId } = render(<TestComponent searchTerm={'test'} />);

    await waitFor(() =>
      expect(getByTestId('error-state').textContent).toBe(errorMessage),
    );
  });
});
