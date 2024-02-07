import { OrderBy, SearchInOptions } from '@ui-value-objects/search';

export type SearchOptions = {
  searchTerm: string;
  searchIn: SearchInOptions[];
  orderBy: OrderBy;
};
