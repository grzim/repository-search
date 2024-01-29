import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as apiModule from '../../api/facade/fetch-react-repos';
import { RepositoriesContainer } from '../RepositoriesContainer/RepositoriesContainer';
import { transformGQLRepositoriesResponse } from '../../models/transformations';
import React from 'react';
import { expectRepositoriesToBePresent } from '../RepositoriesList/test/RepositoriesList.test';
import { getGraphQLRepoResponseMocks } from '../../models/test/mocks';
import {
  loaderId,
  searchButtonId,
  searchInputId,
} from '../../test-utils/data-test-ids';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

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

    const theme = createTheme();
    render(
      <ThemeProvider theme={theme}>
        <RepositoriesContainer />
      </ThemeProvider>,
    );

    fireEvent.change(screen.getByTestId(searchInputId), {
      target: { value: 'React' },
    });
    fireEvent.click(screen.getByTestId(searchButtonId));

    expect(screen.getByTestId(loaderId)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId(loaderId)).not.toBeInTheDocument();
      expectRepositoriesToBePresent(
        transformGQLRepositoriesResponse(mockedReposResponse),
      );
    });
  });
});
