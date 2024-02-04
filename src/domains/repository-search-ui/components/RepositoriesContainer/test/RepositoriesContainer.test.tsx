import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepositoriesList } from '@ui-components/RepositoriesList';
import { RepositoriesContainer } from '@ui-components/RepositoriesContainer';
import { Search } from '@ui-components/Search';
import { GlobalProvider } from '@src/GlobalProvider';

jest.mock(`@ui-factories`, () => ({
  usePaginatedResource: jest.fn().mockReturnValue({
    goToNextPage: jest.fn(),
    goToPreviousPage: jest.fn(),
    isLoading: false,
    data: [],
    totalCount: 0,
  }),
}));

jest.mock(`@errors-ui/`, () => ({
  useWithErrorHandling: jest.fn((hook) => hook),
}));

jest.mock(`@ui-components/RepositoriesList/RepositoriesList`, () => ({
  RepositoriesList: jest.fn(() => null),
}));

jest.mock(`@ui-components/Search/Search`, () => ({
  Search: jest.fn(() => null),
}));

describe(RepositoriesContainer.name, () => {
  it(`renders the Search and RepositoriesList`, () => {
    render(
      <GlobalProvider>
        <RepositoriesContainer />
      </GlobalProvider>,
    );

    expect(Search).toHaveBeenCalled();
    expect(RepositoriesList).toHaveBeenCalled();
  });
});
