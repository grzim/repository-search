import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui/models/constants';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import {
  HandleInputChange,
  SelectType,
} from '@ui-components/Search/utils/types';
import { SearchOptions } from '@ui/models/entities';

const getSelectsData = (state: SearchOptions) => [
  {
    name: `orderBy.field`,
    label: `Order By Field`,
    value: state.orderBy.field,
    options: orderFields,
  },
  {
    name: `orderBy.direction`,
    label: `Order By Direction`,
    value: state.orderBy.direction,
    options: orderDirections,
  },
  {
    name: `searchIn`,
    label: `Search In (multiple)`,
    value: state.searchIn,
    options: searchInOptions,
    selectType: `multiple` as SelectType,
  },
];

const SingleSelect = ({
  value,
  label,
  name,
  selectType = `single`,
  options,
  handleInputChange,
}: {
  value: string | string[];
  options: Readonly<string[]>;
  label: string;
  name: string;
  selectType?: SelectType;
  handleInputChange: HandleInputChange;
}) => {
  const additionalProps =
    selectType === `multiple`
      ? {
          multiple: true,
          renderValue: (selected: string | string[]) =>
            Array.isArray(selected) ? selected.join(`, `) : ``,
        }
      : {};

  return (
    <FormControl variant="outlined" fullWidth key={name}>
      <InputLabel>{label}</InputLabel>
      <Select
        sx={{
          width: {
            md: `150px`,
            xs: `100%`,
          },
        }}
        autoWidth={true}
        name={name}
        value={value}
        onChange={handleInputChange}
        label={label}
        {...additionalProps}
      >
        {options.map((field) => (
          <MenuItem key={field} value={field}>
            {field.replaceAll(`_`, ` `)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const Selects = ({
  searchOptions,
  handleInputChange,
}: {
  searchOptions: SearchOptions;
  handleInputChange: HandleInputChange;
}) => (
  <>
    {getSelectsData(searchOptions).map((selectData) => (
      <SingleSelect
        key={selectData.name}
        {...selectData}
        handleInputChange={handleInputChange}
      />
    ))}
  </>
);
