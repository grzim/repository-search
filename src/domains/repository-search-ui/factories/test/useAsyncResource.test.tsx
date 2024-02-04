import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { useAsyncResource } from '@ui/factories';
import { getGraphQLRepoResponseMocks, searchOptionsMock } from '@test/mocks';
import { Spy } from '@test/types';
import { FetchData } from '@ui/models/services';
import { transformGQLRepositoriesResponse } from '@ui-adapters/api';

jest.mock(`@ui-adapters/api/fetch-gql-github-repos`, () => ({
  fetchGqlGithubRepos: jest.fn(),
}));

const mockedResponse = getGraphQLRepoResponseMocks(10);
describe(`${useAsyncResource.name} hook`, () => {
  let fetchRepos: Spy;
  beforeEach(() => {
    fetchRepos = jest.fn();
    (fetchRepos as jest.Mock).mockResolvedValue(mockedResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = ({
    searchTerm,
    fetchFn = fetchRepos,
  }: {
    searchTerm: string;
    fetchFn?: FetchData;
  }) => {
    const { isLoading, data, error } = useAsyncResource({
      fetchFn,
      transformFn: transformGQLRepositoriesResponse,
      searchOptions: { ...searchOptionsMock, searchTerm },
    });

    return (
      <div data-testid="test-component">
        <div data-testid="loading-state">{isLoading.toString()}</div>
        <div data-testid="data-count">{data.length}</div>
        <div data-testid="error-state">{error}</div>
      </div>
    );
  };

  it(`starts with isLoading true and empty data`, async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    expect(getByTestId(`loading-state`).textContent).toBe(`true`);
    expect(getByTestId(`data-count`).textContent).toBe(`0`);
  });

  it(`sets isLoading to false and updates data after fetch`, async () => {
    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await waitFor(() => {
      expect(getByTestId(`data-count`).textContent).toBe(
        mockedResponse.edges.length.toString(),
      );
      expect(getByTestId(`loading-state`).textContent).toBe(`false`);
    });
  });

  it(`handles errors and sets the error state`, async () => {
    const errorMessage = `Failed to fetch repositories.`;
    fetchRepos.mockRejectedValueOnce(new Error(errorMessage));

    const { getByTestId } = render(<TestComponent searchTerm="test" />);

    await waitFor(() => {
      expect(getByTestId(`error-state`).textContent).toBe(errorMessage);
    });
  });
});
