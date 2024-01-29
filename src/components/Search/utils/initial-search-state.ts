import { FetchReposOptions } from '../../../api/facade/types';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '../../../api/facade/search-options';

export const initialSearchState: Required<FetchReposOptions> = {
  searchTerm: '',
  orderBy: {
    field: orderFields[0],
    direction: orderDirections[0],
  },
  searchIn: searchInOptions.slice(0, 1),
};
