import { SearchComponentProps } from './types';
import React, { useState } from 'react';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '../../api/facade/search-options';
import { handleChange } from '../../utils/ui-fns';
import {
  searchButton,
  searchInput,
  searchInSelect,
} from '../../test-utils/data-test-ids';
import { FetchReposOptions } from '../../api/facade/types';

export const Search = ({
  onSearchTermChange,
  initialState,
}: SearchComponentProps) => {
  const [state, setState] = useState<FetchReposOptions>(initialState);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newState = handleChange(event, state);
    setState(newState);
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

      <select
        name="orderBy.field"
        value={state.orderBy?.field}
        onChange={handleInputChange}
      >
        {orderFields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <select
        name="orderBy.direction"
        value={state.orderBy?.direction}
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
      <div>
        <button
          data-testid={searchButton}
          onClick={() => onSearchTermChange(state)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
