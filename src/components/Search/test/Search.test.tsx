import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '../../../api/facade/search-options';
import {
  searchButton,
  searchInput,
  searchInSelect,
} from '../../../test-utils/data-test-ids';
import { Search } from '../Search';
import { SearchInOptions } from '../../../api/facade/types';
import { initialSearchState } from '../initial-search-state';

const newSearchTerm = 'React';

const initialOrderBy = orderFields[0];
const newOrderBy = orderFields[1];

const initialOrderDirection = orderDirections[0];
const newOrderDirection = orderDirections[1];

const newSearchIn: SearchInOptions[] = [searchInOptions[1], searchInOptions[2]];

describe('SearchComponent', () => {
  it('updates searchTerm on button click', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByTestId } = render(
      <Search
        onSearchTermChange={mockOnSearchTermChange}
        initialState={initialSearchState}
      />,
    );

    fireEvent.change(getByTestId(searchInput), {
      target: { value: newSearchTerm },
    });

    fireEvent.click(getByTestId(searchButton));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        searchTerm: newSearchTerm,
      }),
    );
  });

  it('updates orderBy ', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByDisplayValue, getByTestId } = render(
      <Search
        onSearchTermChange={mockOnSearchTermChange}
        initialState={initialSearchState}
      />,
    );

    fireEvent.change(getByDisplayValue(initialOrderBy), {
      target: { value: newOrderBy },
    });

    fireEvent.click(getByTestId(searchButton));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: expect.objectContaining({
          field: newOrderBy,
        }),
      }),
    );
  });

  it('updates orderDirection', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByDisplayValue, getByTestId } = render(
      <Search
        onSearchTermChange={mockOnSearchTermChange}
        initialState={initialSearchState}
      />,
    );

    fireEvent.change(getByDisplayValue(initialOrderDirection), {
      target: { value: newOrderDirection },
    });

    fireEvent.click(getByTestId(searchButton));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: expect.objectContaining({
          direction: newOrderDirection,
        }),
      }),
    );
  });

  it('updates searchIn on multiple select change', async () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByTestId } = render(
      <Search
        onSearchTermChange={mockOnSearchTermChange}
        initialState={initialSearchState}
      />,
    );

    const searchInSelectElement = getByTestId(searchInSelect);

    // Simulate selecting multiple options by manually setting the 'selected' property
    const options = searchInSelectElement.querySelectorAll('option');
    options.forEach((option) => {
      option.selected = newSearchIn.includes(option.value as SearchInOptions);
    });

    fireEvent.change(searchInSelectElement);

    await new Promise(process.nextTick);

    fireEvent.click(getByTestId(searchButton));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        searchIn: expect.arrayContaining(newSearchIn),
      }),
    );
  });
});
