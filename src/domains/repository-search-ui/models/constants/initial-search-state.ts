import {
  orderDirections,
  orderFields,
  searchInOptions,
} from './search-options';
import { SearchOptions } from '@ui/models/entities';

export const initialSearchState: SearchOptions = {
  searchTerm: ``,
  orderBy: {
    field: orderFields[0],
    direction: orderDirections[0],
  },
  searchIn: searchInOptions.slice(0, 1),
};
