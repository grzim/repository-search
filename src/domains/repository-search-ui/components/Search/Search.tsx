import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { SearchButtonContainer, SearchContainer } from './styles';
import { areObjectsEqual, handleChange } from '@src/utils';
import { searchButtonId, searchInputId } from '@src/test-utils';
import { HandleInputChange, Selects } from '@ui-components/Search/utils';
import { SearchOptions } from '@ui-entities/SearchOptions';

type SearchProps = {
  onSearchTermChange: (params: SearchOptions) => void;
  initialState: SearchOptions;
};

export const Search = ({ onSearchTermChange, initialState }: SearchProps) => {
  const [searchState, setSearchState] = useState<SearchOptions>(initialState);
  const [lastSearchState, setLastSearchState] =
    useState<SearchOptions>(initialState);
  const handleInputChange: HandleInputChange = (event) => {
    const newState = handleChange(event, searchState);
    setSearchState(newState);
  };

  const handleSearch = () => {
    onSearchTermChange(searchState);
    setLastSearchState(searchState);
  };

  const isSearchDisabled =
    areObjectsEqual({ obj1: searchState, obj2: lastSearchState }) ||
    !searchState.searchTerm ||
    !searchState.searchIn.length;

  return (
    <SearchContainer>
      <TextField
        inputProps={{ 'data-testid': searchInputId }}
        label="Search Term"
        variant="outlined"
        name="searchTerm"
        value={searchState.searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          e.key === `Enter` && !isSearchDisabled && handleSearch();
        }}
        fullWidth
      />
      <Selects
        searchOptions={searchState}
        handleInputChange={handleInputChange}
      />
      <SearchButtonContainer>
        <Button
          disabled={isSearchDisabled}
          data-testid={searchButtonId}
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </SearchButtonContainer>
    </SearchContainer>
  );
};
