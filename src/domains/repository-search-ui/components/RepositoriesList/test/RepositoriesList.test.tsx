import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getForks, getStargazers, RepositoriesList } from '../RepositoriesList';
import { act } from 'react-dom/test-utils';
import { getRepositoriesMock } from '@test/mocks';
import { Repository } from '@ui/models/entities/Repository';
import { loaderId } from '@src/test-utils';
import { GlobalProvider } from '@src/GlobalProvider';

jest.mock(`@ui-adapters/api/`, () => ({
  fetchGqlGithubRepos: jest.fn(),
}));

export const expectRepositoriesToBePresent = (repos: Repository[]): void => {
  repos
    .flatMap((repo) => [repo.name, getStargazers(repo), getForks(repo)])
    .forEach((item: string) => {
      expect(screen.getByText(item, { exact: false })).toBeInTheDocument();
    });
};

describe(`${RepositoriesList.name} component`, () => {
  describe(`when isLoading=true`, () => {
    it(`displays a loading state`, async () => {
      render(
        <GlobalProvider>
          <RepositoriesList repos={[]} isLoading={true} />
        </GlobalProvider>,
      );
      expect(screen.queryByTestId(loaderId)).toBeInTheDocument();
    });
  });

  describe(`when isLoading=false`, () => {
    it(`hides a loading message`, async () => {
      render(
        <GlobalProvider>
          <RepositoriesList repos={[]} isLoading={false} />
        </GlobalProvider>,
      );
      expect(screen.queryByTestId(loaderId)).not.toBeInTheDocument();
    });

    it(`displays repositories`, async () => {
      const repos = getRepositoriesMock(10);
      await act(async () => {
        render(
          <GlobalProvider>
            <RepositoriesList repos={repos} isLoading={false} />
          </GlobalProvider>,
        );
      });

      await waitFor(() => expectRepositoriesToBePresent(repos));
    });
  });
});
