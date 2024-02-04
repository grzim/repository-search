import { FetchSearchOptions } from '@ui/models/value-objects/search';
import { defaultNumberOfItemsPerPage } from '@ui/models/constants';
import { useResourcePagination } from '@ui-factories/utils';
import { useAsyncResource } from './useAsyncResource';
import { FetchData } from '@ui/models/services/FetchData';
import { APIModelToUIModelTransform } from 'src/domains/repository-search-ui/models/services';
import { PaginatedResource } from '@ui/models/aggregations/PaginatedResource';

export const usePaginatedResource = <DataType>({
  transformFn,
  fetchFn,
  searchOptions,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  searchOptions: FetchSearchOptions;
}): PaginatedResource<DataType> => {
  const { goToNextPage, goToPreviousPage, paginationOptions } =
    useResourcePagination(defaultNumberOfItemsPerPage);

  const { isLoading, data, totalCount, endCursor, error, clearError } =
    useAsyncResource<DataType>({
      transformFn,
      fetchFn,
      options: {
        ...searchOptions,
        ...paginationOptions,
      },
    }) as PaginatedResource<DataType>;

  return {
    goToNextPage: () => endCursor && goToNextPage(endCursor),
    goToPreviousPage,
    isLoading,
    data,
    totalCount,
    error,
    clearError,
  };
};
