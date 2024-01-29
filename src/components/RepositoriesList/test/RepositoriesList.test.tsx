import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getForks, getStargazers, RepositoriesList } from '../RepositoriesList';
import { act } from 'react-dom/test-utils';
import { getGraphQLRepoResponseMocks } from '../../../models/test/mocks';
import { loader } from '../../../test-utils/data-test-ids';
import { transformGQLRepositoriesResponse } from '../../../models/transformations';
import { Repository } from '../../../models/Repository';

jest.mock('../../../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: jest.fn(),
}));

export const expectRepositoriesToBePresent = (repos: Repository[]): void => {
  repos
    .map((repo) => [repo.name, getStargazers(repo), getForks(repo)])
    .forEach(([name, stargazers, forks]: string[]) => {
      for (const item of [name, stargazers, forks])
        expect(
          screen.getByText(item as string, { exact: false }),
        ).toBeInTheDocument();
    });
};

const graphQLRepoMocks = getGraphQLRepoResponseMocks(10);
describe('RepositoriesList', () => {
  describe('when isLoading=true', () => {
    it('displays a loading state', async () => {
      render(<RepositoriesList repos={[]} isLoading={true} />);
      expect(screen.queryByTestId(loader)).toBeInTheDocument();
    });
  });

  describe('when isLoading=false', () => {
    it('hides a loading message', async () => {
      render(<RepositoriesList repos={[]} isLoading={false} />);
      expect(screen.queryByTestId(loader)).not.toBeInTheDocument();
    });

    it('displays repositories', async () => {
      const repos = transformGQLRepositoriesResponse(graphQLRepoMocks);
      await act(async () => {
        render(<RepositoriesList repos={repos} isLoading={false} />);
      });

      await waitFor(() => expectRepositoriesToBePresent(repos));
    });
  });
});
