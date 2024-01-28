import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '../../../api/facade/search-options';
import { searchInput, searchInSelect } from '../../../test-utils/data-test-ids';
import { Search } from '../Search';
import { SearchInOptions } from '../../../api/facade/types';

const newSearchTerm = 'React';

const initialOrderBy = orderFields[0];
const newOrderBy = orderFields[1];

const initialOrderDirection = orderDirections[0];
const newOrderDirection = orderDirections[1];

const newSearchIn: SearchInOptions[] = [searchInOptions[1], searchInOptions[2]];

describe('SearchComponent', () => {
  it('updates searchTerm on input change', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByTestId } = render(
      <Search onSearchTermChange={mockOnSearchTermChange} />,
    );

    fireEvent.change(getByTestId(searchInput), {
      target: { value: newSearchTerm },
    });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        searchTerm: newSearchTerm,
      }),
    );
  });

  it('updates orderBy on select change', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByDisplayValue } = render(
      <Search onSearchTermChange={mockOnSearchTermChange} />,
    );

    fireEvent.change(getByDisplayValue(initialOrderBy), {
      target: { value: newOrderBy },
    });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: newOrderBy,
      }),
    );
  });

  it('updates orderDirection on select change', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByDisplayValue } = render(
      <Search onSearchTermChange={mockOnSearchTermChange} />,
    );

    fireEvent.change(getByDisplayValue(initialOrderDirection), {
      target: { value: newOrderDirection },
    });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderDirection: newOrderDirection,
      }),
    );
  });

  it('updates searchIn on multiple select change', async () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByTestId } = render(
      <Search onSearchTermChange={mockOnSearchTermChange} />,
    );

    // Access the multiple select element

    const searchInSelectElement = getByTestId(searchInSelect);

    // Simulate selecting multiple options by manually setting the 'selected' property
    const options = searchInSelectElement.querySelectorAll('option');
    options.forEach((option) => {
      option.selected = newSearchIn.includes(option.value as SearchInOptions);
    });

    // Fire the change event on the select element after updating the options
    fireEvent.change(searchInSelectElement);

    // Use setTimeout to wait for the state update and the callback invocation
    await new Promise(process.nextTick);

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        searchIn: expect.arrayContaining(newSearchIn),
      }),
    );
  });
});
