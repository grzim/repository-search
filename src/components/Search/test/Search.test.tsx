import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  orderDirections,
  orderFields,
} from '../../../models/constants/search-options';
import {
  searchButtonId,
  searchInputId,
} from '../../../test-utils/data-test-ids';
import { Search } from '../Search';
import { initialSearchState } from '../../../models/constants/initial-search-state';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import { searchOptionsMock } from '../../../models/mocks';
import { setOnPath } from '../../../utils/transform-fns';

const newSearchTerm = 'React';

const initialOrderBy = initialSearchState.orderBy.field;
const newOrderBy = orderFields.filter((field) => field !== initialOrderBy)[0];

const initialOrderDirection = orderDirections[0];
const newOrderDirection = orderDirections.filter(
  (field) => field !== initialOrderDirection,
)[0];

describe('SearchComponent', () => {
  it('updates searchTerm on button click', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Search
          onSearchTermChange={mockOnSearchTermChange}
          initialState={initialSearchState}
        />
        ,
      </ThemeProvider>,
    );

    fireEvent.change(getByTestId(searchInputId), {
      target: { value: newSearchTerm },
    });

    fireEvent.click(getByTestId(searchButtonId));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        searchTerm: newSearchTerm,
      }),
    );
  });

  it('updates orderBy ', () => {
    const mockOnSearchTermChange = jest.fn();
    const { getByDisplayValue, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Search
          onSearchTermChange={mockOnSearchTermChange}
          initialState={setOnPath({
            obj: searchOptionsMock,
            path: ['orderBy', 'field'],
            value: initialOrderBy,
          })}
        />
      </ThemeProvider>,
    );

    fireEvent.change(getByDisplayValue(initialOrderBy), {
      target: { value: newOrderBy },
    });

    fireEvent.click(getByTestId(searchButtonId));

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
      <ThemeProvider theme={theme}>
        <Search
          onSearchTermChange={mockOnSearchTermChange}
          initialState={setOnPath({
            obj: searchOptionsMock,
            path: ['orderBy', 'direction'],
            value: initialOrderDirection,
          })}
        />
      </ThemeProvider>,
    );

    fireEvent.change(getByDisplayValue(initialOrderDirection), {
      target: { value: newOrderDirection },
    });

    fireEvent.click(getByTestId(searchButtonId));

    expect(mockOnSearchTermChange).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: expect.objectContaining({
          direction: newOrderDirection,
        }),
      }),
    );
  });
});
