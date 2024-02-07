import { OrderBy, SearchInOptions } from '@ui/models/value-objects/search';
import { SearchOptions } from '@ui/models/entities';

export const constructQueryString = ({
  searchTerm,
  searchIn = [`name`, `description`] as SearchInOptions[],
  orderBy = { field: `stars`, direction: `desc` } as OrderBy,
}: SearchOptions): string => {
  const searchInQuery = `"${searchTerm}" in:${searchIn.join(`,`)}`;
  return `${searchInQuery} sort:${orderBy.field}-${orderBy.direction}`;
};
