import React, { ChangeEvent, useState } from 'react';
import { Button, SelectChangeEvent, TextField } from '@mui/material';
import { SearchButtonContainer, SearchContainer } from './styles';
import { FetchSearchOptions } from '@ui/models/value-objects/search';
import { areObjectsEqual, handleChange } from '@src/utils';
import { searchButtonId, searchInputId } from '@src/test-utils';
import { getSelectsData, renderSelect } from '@ui-components/Search/utils';

type SearchProps = {
  onSearchTermChange: (params: FetchSearchOptions) => void;
  initialState: FetchSearchOptions;
};

export const Search = ({ onSearchTermChange, initialState }: SearchProps) => {
  const [state, setState] = useState<FetchSearchOptions>(initialState);
  const [lastSearchState, setLastSearchState] =
    useState<FetchSearchOptions>(initialState);
  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    const newState = handleChange(event, state);
    setState(newState);
  };

  const selects = getSelectsData(state).map(
    renderSelect({ handleInputChange }),
  );
  const handleSearch = () => {
    onSearchTermChange(state);
    setLastSearchState(state);
  };

  const isSearchDisabled =
    areObjectsEqual({ obj1: state, obj2: lastSearchState }) ||
    !state.searchTerm ||
    !state.searchIn.length;

  return (
    <SearchContainer>
      <TextField
        inputProps={{ 'data-testid': searchInputId }}
        label="Search Term"
        variant="outlined"
        name="searchTerm"
        value={state.searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          e.key === `Enter` && !isSearchDisabled && handleSearch();
        }}
        fullWidth
      />
      <>{selects}</>

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
