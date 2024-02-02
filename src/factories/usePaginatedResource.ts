import { useState } from 'react';
import { FetchSearchOptions } from '../models/ui-related/search';
import { initialSearchState } from '../models/constants/initial-search-state';
import { useResourcePagination } from './useResourcePagination';
import { defaultNumberOfItemsPerPage } from '../models/constants/pagination';
import { useAsyncResource } from './useAsyncResource';
import { FetchData } from '../models/api-related/FetchData';
import { APIModelToUIModelTransform } from '../models/transformations/type-transfomrations';

export const usePaginatedResource = <DataType>({
  transformFn,
  fetchFn,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
}) => {
  const [searchOptions, setSearchOptions] =
    useState<FetchSearchOptions>(initialSearchState);

  const { goToNextPage, goToPreviousPage, paginationOptions } =
    useResourcePagination(defaultNumberOfItemsPerPage);

  const { isLoading, data, totalCount, endCursor, error } =
    useAsyncResource<DataType>({
      transformFn,
      fetchFn,
      options: {
        ...searchOptions,
        ...paginationOptions,
      },
    });

  return {
    setSearchOptions,
    goToNextPage: () => endCursor && goToNextPage(endCursor),
    goToPreviousPage,
    isLoading,
    data,
    totalCount,
    error,
  };
};
