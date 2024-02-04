import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui/models/constants';

export type OrderBy = {
  field: OrderField;
  direction: OrderDirection;
};
export type FetchSearchOptions = {
  searchTerm: string;
  searchIn: SearchInOptions[];
  orderBy: OrderBy;
};
export type SearchState = {
  searchTerm: string;
  orderBy: OrderField;
  orderDirection: OrderDirection;
  searchIn: SearchInOptions[];
};
export type SearchInOptions = (typeof searchInOptions)[number];
export type OrderField = (typeof orderFields)[number];
export type OrderDirection = (typeof orderDirections)[number];
