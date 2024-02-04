import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui/models/constants';
import { SearchButtonContainer, SearchContainer } from './styles';
import { FetchSearchOptions } from '@ui/models/value-objects/search';
import { areObjectsEqual, handleChange } from '@src/utils';
import {
  searchButtonId,
  searchInputId,
  searchInSelectId,
} from '@src/test-utils';

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
        fullWidth
      />

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Order By Field</InputLabel>
        <Select
          name="orderBy.field"
          value={state.orderBy?.field || ``}
          onChange={handleInputChange}
          label="Order By Field"
        >
          {orderFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field.replaceAll(`_`, ` `)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Order Direction</InputLabel>
        <Select
          name="orderBy.direction"
          value={state.orderBy?.direction || ``}
          onChange={handleInputChange}
          label="Order Direction"
        >
          {orderDirections.map((direction) => (
            <MenuItem key={direction} value={direction}>
              {direction}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Search In</InputLabel>
        <Select
          multiple
          name="searchIn"
          data-testid={searchInSelectId}
          inputProps={{ 'data-testid': `dasds` }}
          value={state.searchIn || []}
          onChange={handleInputChange}
          label="Search In (multiple)"
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(`, `) : ``
          }
        >
          {searchInOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
