import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui/models/constants';
import { FetchSearchOptions } from '@ui-value-objects/search';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

type SelectType = `multiple` | `single`;
export const getSelectsData = (state: FetchSearchOptions) => [
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

export const renderSelect =
  ({
    handleInputChange,
  }: {
    handleInputChange: (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<unknown>,
    ) => void;
  }) =>
  // eslint-disable-next-line react/display-name
  ({
    value,
    label,
    name,
    selectType = `single`,
    options,
  }: {
    value: string | string[];
    options: Readonly<string[]>;
    label: string;
    name: string;
    selectType?: SelectType;
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
          style={{ width: `150px` }}
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
