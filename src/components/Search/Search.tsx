import { SearchComponentProps, SearchState } from './types';
import React, { useState } from 'react';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '../../api/facade/search-options';
import { handleChange } from '../../utils/ui-fns';
import { searchInput, searchInSelect } from '../../test-utils/data-test-ids';

export const Search = ({ onSearchTermChange }: SearchComponentProps) => {
  const [state, setState] = useState<SearchState>({
    searchTerm: '',
    orderBy: orderFields[0],
    orderDirection: orderDirections[0],
    searchIn: [searchInOptions[0]],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newState = handleChange<SearchState>(event, state);
    setState(newState);
    onSearchTermChange(newState);
  };

  return (
    <div>
      <input
        data-testid={searchInput}
        type="text"
        name="searchTerm"
        value={state.searchTerm}
        onChange={handleInputChange}
        placeholder="Search Term"
      />

      <select name="orderBy" value={state.orderBy} onChange={handleInputChange}>
        {orderFields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <select
        name="orderDirection"
        value={state.orderDirection}
        onChange={handleInputChange}
      >
        {orderDirections.map((direction) => (
          <option key={direction} value={direction}>
            {direction}
          </option>
        ))}
      </select>

      <select
        multiple={true}
        name="searchIn"
        data-testid={searchInSelect}
        value={state.searchIn}
        onChange={handleInputChange}
      >
        {searchInOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
