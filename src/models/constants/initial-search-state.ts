import {
  orderDirections,
  orderFields,
  searchInOptions,
} from './search-options';
import { FetchSearchOptions } from '../ui-related/search';

export const initialSearchState: FetchSearchOptions = {
  searchTerm: '',
  orderBy: {
    field: orderFields[0],
    direction: orderDirections[0],
  },
  searchIn: searchInOptions.slice(0, 1),
};
