import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiModule from '../../api/facade/fetch-react-repos';
import { RepositoriesContainer } from '../RepositoriesContainer/RepositoriesContainer';
import { transformGQLRepositoriesResponse } from '../../models/transformations';
import React from 'react';
import { expectRepositoriesToBePresent } from '../RepositoriesList/test/RepositoriesList.test';
import { getGraphQLRepoResponseMocks } from '../../models/test/mocks';
import {
  loader,
  searchButton,
  searchInput,
} from '../../test-utils/data-test-ids';

jest.mock('../../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: jest.fn(),
}));

jest.mock('../../api/facade/fetch-react-repos');

describe('Integration between Search and RepositoriesList within RepositoriesContainer', () => {
  it('updates RepositoriesList after performing a search', async () => {
    const mockedReposResponse = getGraphQLRepoResponseMocks(10);
    (apiModule.fetchReactRepos as jest.Mock).mockResolvedValue(
      Promise.resolve(mockedReposResponse),
    );

    render(<RepositoriesContainer />);

    fireEvent.change(screen.getByTestId(searchInput), {
      target: { value: 'React' },
    });
    fireEvent.click(screen.getByTestId(searchButton));

    expect(screen.getByTestId(loader)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId(loader)).not.toBeInTheDocument();
      expectRepositoriesToBePresent(
        transformGQLRepositoriesResponse(mockedReposResponse),
      );
    });
  });
});
