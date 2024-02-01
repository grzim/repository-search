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
} from '../../models/constants/search-options';
import { handleChange } from '../../utils/ui-fns';
import {
  searchButtonId,
  searchInputId,
  searchInSelectId,
} from '../../test-utils/data-test-ids';
import { SearchButtonContainer, SearchContainer } from './styles';
import { FetchSearchOptions } from '../../models/ui-related/search';

type SearchProps = {
  onSearchTermChange: (params: FetchSearchOptions) => void;
  initialState: FetchSearchOptions;
};
export const Search = ({ onSearchTermChange, initialState }: SearchProps) => {
  const [state, setState] = useState<FetchSearchOptions>(initialState);

  const handleInputChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    const newState = handleChange(event, state);
    setState(newState);
  };

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
          value={state.orderBy?.field || ''}
          onChange={handleInputChange}
          label="Order By Field"
        >
          {orderFields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth>
        <InputLabel>Order Direction</InputLabel>
        <Select
          name="orderBy.direction"
          value={state.orderBy?.direction || ''}
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
          inputProps={{ 'data-testid': 'dasds' }}
          value={state.searchIn || []}
          onChange={handleInputChange}
          label="Search In (multiple)"
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(', ') : ''
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
          disabled={!state.searchTerm || !state.searchIn.length}
          data-testid={searchButtonId}
          variant="contained"
          color="primary"
          onClick={() => onSearchTermChange(state)}
        >
          Search
        </Button>
      </SearchButtonContainer>
    </SearchContainer>
  );
};
