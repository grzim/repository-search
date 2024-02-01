import {
  FetchSearchOptions,
  OrderBy,
  SearchInOptions,
} from '../../models/ui-related/search';

export const constructQueryString = ({
  searchTerm,
  searchIn = ['name', 'description'] as SearchInOptions[],
  orderBy = { field: 'stars', direction: 'desc' } as OrderBy,
}: FetchSearchOptions): string => {
  const searchInQuery = searchIn
    .map((field) => `${field}:${searchTerm}`)
    .join(' ');
  return `${searchInQuery} sort:${orderBy.field}-${orderBy.direction}`;
};
