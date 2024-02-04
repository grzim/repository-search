import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiModule from '@ui-adapters/api/fetch-gql-github-repos';
import { RepositoriesContainer } from '@ui-components/RepositoriesContainer';
import React from 'react';
import { expectRepositoriesToBePresent } from '../RepositoriesList/test/RepositoriesList.test';
import { getGraphQLRepoResponseMocks } from '@test/mocks';
import { loaderId, searchButtonId, searchInputId } from '@src/test-utils';
import { Search } from '@ui-components/Search/Search';
import { GlobalProvider } from '@src/GlobalProvider';
import * as RepositoriesListModule from '@ui-components/RepositoriesList/RepositoriesList';
import { RepositoriesList } from '@ui-components/RepositoriesList/RepositoriesList';
import { transformGQLRepositoriesResponse } from '@ui-adapters/api/transform-gql-repositories-response';

jest.mock(`@ui-adapters/api/fetch-gql-github-repos`, () => ({
  fetchGqlGithubRepos: jest.fn(),
}));

jest.mock(`../../factories`);

describe(`Integration between ${Search.name} and ${RepositoriesList.name}`, () => {
  it(`does not rerender ${RepositoriesList.name} when inputs in ${Search.name} component are modified`, () => {
    const RepoListComponent = jest.spyOn(
      RepositoriesListModule,
      `RepositoriesList`,
    );

    const { getByTestId } = render(
      <GlobalProvider>
        <RepositoriesContainer />
      </GlobalProvider>,
    );

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
    const searchInputElement = getByTestId(searchInputId);

    fireEvent.change(searchInputElement, { target: { value: `React` } });
    fireEvent.change(searchInputElement, { target: { value: `Vue` } });

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
    RepoListComponent.mockRestore();
  });
  it(`updates ${RepositoriesList.name} after performing a search`, async () => {
    const mockedReposResponse = getGraphQLRepoResponseMocks(10);
    (apiModule.fetchGqlGithubRepos as jest.Mock).mockResolvedValue(
      mockedReposResponse,
    );

    render(
      <GlobalProvider>
        <RepositoriesContainer />
      </GlobalProvider>,
    );
    act(() => {
      fireEvent.change(screen.getByTestId(searchInputId), {
        target: { value: `React` },
      });
      fireEvent.click(screen.getByTestId(searchButtonId));
    });
    expect(screen.getByTestId(loaderId)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId(loaderId)).not.toBeInTheDocument();
      expectRepositoriesToBePresent(
        transformGQLRepositoriesResponse(mockedReposResponse.edges),
      );
    });
  });
});
