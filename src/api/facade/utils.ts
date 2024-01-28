import { OrderBy, SearchInOptions } from './types';

export const constructQueryString = (
  searchTerm: string,
  searchIn: SearchInOptions[],
  orderBy: OrderBy,
): string => {
  const searchInQuery = searchIn
    .map((field) => `${field}:${searchTerm}`)
    .join(' ');
  return `${searchInQuery} sort:${orderBy.field}-${orderBy.direction}`;
};
