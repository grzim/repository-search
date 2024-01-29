import { FetchReposOptions, OrderBy, SearchInOptions } from './types';

export const constructQueryString = ({
  searchTerm,
  searchIn = ['name', 'description'] as SearchInOptions[],
  orderBy = { field: 'stars', direction: 'desc' } as OrderBy,
}: FetchReposOptions): string => {
  const searchInQuery = searchIn
    .map((field) => `${field}:${searchTerm}`)
    .join(' ');
  return `${searchInQuery} sort:${orderBy.field}-${orderBy.direction}`;
};
