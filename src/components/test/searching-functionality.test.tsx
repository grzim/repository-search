import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiModule from '../../../api/facade/fetch-react-repos';
import { RepositoriesContainer } from '../RepositoriesContainer';
import { transformGQLRepositoriesResponse } from '../../../models/transformations';
import React from 'react';
import { expectRepositoriesToBePresent } from '../../RepositoriesList/test/RepositoriesList.test';
import { getGraphQLRepoResponseMocks } from '../../../models/test/mocks';
import {
  loader,
  searchButton,
  searchInput,
} from '../../../test-utils/data-test-ids';

jest.mock('../../../api/facade/fetch-react-repos', () => ({
  fetchReactRepos: jest.fn(),
}));

jest.mock('../../../api/facade/fetch-react-repos');

describe('Integration between Search and RepositoriesList within RepositoriesContainer', () => {
  it('updates RepositoriesList after performing a search', async () => {
    const mockedReposResponse = getGraphQLRepoResponseMocks(10);
    (apiModule.fetchReactRepos as jest.Mock).mockResolvedValue(
      Promise.resolve(mockedReposResponse),
    );

    render(<RepositoriesContainer />);

    // Fill out the search form
    fireEvent.change(screen.getByTestId(searchInput), {
      target: { value: 'React' },
    });
    // Assuming there's a button for triggering the search
    fireEvent.click(screen.getByTestId(searchButton));

    // Verify loading state is displayed initially
    expect(screen.getByTestId(loader)).toBeInTheDocument();

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      // Verify loading state is no longer present
      expect(screen.queryByTestId(loader)).not.toBeInTheDocument();
      // Check if the data is displayed in the list
      expectRepositoriesToBePresent(
        transformGQLRepositoriesResponse(mockedReposResponse),
      );
    });
  });
});
