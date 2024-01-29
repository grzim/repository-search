import { fireEvent, render } from '@testing-library/react';
import { RepositoriesContainer } from '../RepositoriesContainer';
import * as RepositoriesListModule from '../../RepositoriesList/RepositoriesList';
import React from 'react';
import { searchInput } from '../../../test-utils/data-test-ids';

jest.mock('../../RepositoriesList/RepositoriesList', () => ({
  ...jest.requireActual('../../RepositoriesList/RepositoriesList'),
  RepositoriesList: jest.fn(() => <div data-testid="repositories-list" />),
}));

const RepoListComponent = RepositoriesListModule.RepositoriesList;

describe('RepositoriesContainer', () => {
  it('does not rerender RepositoriesList when inputs in Search are modified', () => {
    const { getByTestId } = render(<RepositoriesContainer />);

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
    const searchInputElement = getByTestId(searchInput);

    fireEvent.change(searchInputElement, { target: { value: 'React' } });
    fireEvent.change(searchInputElement, { target: { value: 'Vue' } });

    expect(RepoListComponent).toHaveBeenCalledTimes(1);
  });
});
