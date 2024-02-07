import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui/models/constants';

export type OrderBy = {
  field: OrderField;
  direction: OrderDirection;
};
export type SearchInOptions = (typeof searchInOptions)[number];
export type OrderField = (typeof orderFields)[number];
export type OrderDirection = (typeof orderDirections)[number];
