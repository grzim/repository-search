import { render, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';
import { useRepositories } from '../useRepositories';
import { FetchReposOptions } from '../../api/facade/types';
import { getGraphQLRepoResponseMocks } from '../../models/test/mocks';
import { act } from 'react-dom/test-utils';

const mockRepos = getGraphQLRepoResponseMocks(10);
jest.mock('../../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: () => Promise.resolve(mockRepos),
}));

let TestComponent: React.FC<{ searchTerm: string }>;

describe('useRepositories hook', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    TestComponent = ({ searchTerm }: { searchTerm: string }) => {
      const options = useRef<FetchReposOptions>({ searchTerm });
      const { isLoading, repos } = useRepositories(options.current);
      return (
        <div data-testid="test-component">
          <div data-testid="loading-state">{isLoading.toString()}</div>
          <div data-testid="repos-count">{repos.length}</div>
        </div>
      );
    };
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
        mockRepos.length.toString(),
      );
    });

    await waitFor(() => {
      expect(getByTestId('loading-state').textContent).toBe('false');
    });
  });
});
