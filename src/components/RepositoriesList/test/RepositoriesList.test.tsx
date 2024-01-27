import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fetchReactRepos } from '../../../api/facade/fetch-react-repos';
import { getForks, getStargazers, RepositoriesList } from '../RepositoriesList';
import { act } from 'react-dom/test-utils';
import { getGraphQLRepoResponseMocks } from '../../../models/test/mocks';
import { loader, table } from '../../../test-utils/data-test-ids';
import { GraphQLRepoResponse } from '../../../models/Repository';
import { transformGQLRepositoriesResponse } from '../../../models/transformations';

jest.mock('../../../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: jest.fn(),
}));

describe('RepositoriesList', () => {
  let graphQLRepoMocks: GraphQLRepoResponse[];
  beforeEach(() => {
    graphQLRepoMocks = getGraphQLRepoResponseMocks(10);
    (fetchReactRepos as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(graphQLRepoMocks), 100);
        }),
    );
  });

  it('displays a loading state initially', async () => {
    render(<RepositoriesList />);
    expect(screen.queryByTestId(loader)).toBeInTheDocument();
  });

  it('hides a loading message when data is displayed', async () => {
    render(<RepositoriesList />);
    expect(screen.queryByTestId(table)).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId(table)).toBeInTheDocument(),
    );

    expect(screen.queryByTestId(loader)).not.toBeInTheDocument();
  });

  it('fetches repositories and displays them', async () => {
    const repos = transformGQLRepositoriesResponse(graphQLRepoMocks);
    await act(async () => {
      render(<RepositoriesList />);
    });

    await waitFor(() => {
      repos
        .map((repo) => [repo.name, getStargazers(repo), getForks(repo)])
        .forEach(([name, stargazers, forks]: string[]) => {
          for (const item of [name, stargazers, forks])
            expect(
              screen.getByText(item as string, { exact: false }),
            ).toBeInTheDocument();
        });
    });
  });
});
