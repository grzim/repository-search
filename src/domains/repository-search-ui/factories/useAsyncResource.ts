import { useEffect, useState } from 'react';
import { FetchSearchOptions } from '@ui/models/value-objects/search';
import { FetchData } from '@ui/models/services/FetchData';
import { APIModelToUIModelTransform } from 'src/domains/repository-search-ui/models/services';
import { PaginationOptions } from '@ui/models/entities';
import { AsyncResource, Metadata } from '@ui/models/aggregations/AsyncResource';

type UseAsyncResource = <DataType>(props: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  searchOptions: FetchSearchOptions;
  paginationOptions?: PaginationOptions;
}) => AsyncResource<DataType>;
export const useAsyncResource: UseAsyncResource = <DataType>({
  transformFn,
  fetchFn,
  searchOptions,
  paginationOptions,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  searchOptions: FetchSearchOptions;
  paginationOptions?: PaginationOptions;
}) => {
  const [data, setData] = useState<DataType[]>([]);
  const [metadata, setMetadata] = useState<Metadata>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const options = {
    ...searchOptions,
    ...paginationOptions,
  };
  const prepareFetching = () => {
    setIsLoading(true);
    setError(null);
  };

  const fetching = async () => {
    const { edges, pageInfo, totalCount } = await fetchFn<DataType>(options);
    setData(transformFn(edges));
    if (pageInfo && totalCount) setMetadata({ ...pageInfo, totalCount });
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
    ...metadata,
    error,
  };
};
