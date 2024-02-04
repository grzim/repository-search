import { useEffect, useState } from 'react';
import { FetchSearchOptions } from '@ui/models/value-objects/search';
import { PaginationResponse } from '@ui-value-objects/pagination';
import { FetchData } from '@ui/models/services/FetchData';
import { APIModelToUIModelTransform } from 'src/domains/repository-search-ui/models/services';
import { PaginationOptions } from '@ui/models/entities';
import { AsyncResource } from '@ui/models/aggregations/AsyncResource';
import { PaginatedResource } from '@ui/models/aggregations/PaginatedResource';

type UseAsyncResourceOptions = FetchSearchOptions & PaginationOptions;

export const useAsyncResource = <DataType>({
  transformFn,
  fetchFn,
  options,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  options: UseAsyncResourceOptions;
}): AsyncResource<DataType> | PaginatedResource<DataType> => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<
    PaginationResponse & { totalCount: number }
  >();
  const [error, setError] = useState<string | null>(null);

  const prepareFetching = () => {
    setIsLoading(true);
    setError(null);
  };

  const fetching = async () => {
    const { edges, pageInfo, totalCount } = await fetchFn<DataType>(options);
    setData(transformFn(edges));
    if (pageInfo && typeof totalCount === `number`)
      setPaginationData({ ...pageInfo, totalCount });
  };

  useEffect(() => {
    const { searchTerm } = options;
    if (!searchTerm) return;

    const fetchData = async () => {
      prepareFetching();
      try {
        await fetching();
      } catch (error: unknown) {
        const message =
          error instanceof Error ? String(error).replace(`Error: `, ``) : error;
        setError(String(message) || `Cannot fetch data`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(options)]);

  return {
    isLoading,
    data,
    ...paginationData,
    error,
    clearError: () => setError(null),
  };
};
