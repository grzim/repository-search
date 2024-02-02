import { fireEvent, render } from '@testing-library/react';
import { RepositoriesContainer } from '../RepositoriesContainer';
import * as RepositoriesListModule from '../../RepositoriesList/RepositoriesList';
import React from 'react';
import { searchInputId } from '../../../test-utils/data-test-ids';
import { GlobalProvider } from '../../../GlobalProvider';

jest.mock('../../../factories');

jest.mock('../../RepositoriesList/RepositoriesList', () => ({
  ...jest.requireActual('../../RepositoriesList/RepositoriesList'),
  RepositoriesList: jest.fn(() => <div data-testid="repositories-list" />),
}));

const RepoListComponent = RepositoriesListModule.RepositoriesList;

describe('RepositoriesContainer', () => {
  it('does not rerender RepositoriesList when inputs in Search are modified', () => {
    const { getByTestId } = render(
      <GlobalProvider>
        <RepositoriesContainer />
      </GlobalProvider>,
    );

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
    const searchInputElement = getByTestId(searchInputId);

    fireEvent.change(searchInputElement, { target: { value: 'React' } });
    fireEvent.change(searchInputElement, { target: { value: 'Vue' } });

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
  });
});
