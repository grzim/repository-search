import { useEffect, useState } from 'react';
import { FetchData } from '@ui/models/services/FetchData';
import { APIModelToUIModelTransform } from 'src/domains/repository-search-ui/models/services';
import { PaginationOptions, SearchOptions } from '@ui/models/entities';
import { AsyncResource, Metadata } from '@ui/models/aggregations/AsyncResource';
import { errors } from '@ui/errors';

type UseAsyncResource = <DataType>(props: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  searchOptions: SearchOptions;
  paginationOptions?: PaginationOptions;
}) => AsyncResource<DataType>;

const getErrorMessage = (error: unknown) => {
  const errorParsed = String(error);
  const message =
    error instanceof Error ? errorParsed.replace(`Error: `, ``) : String(error);
  return Object.values(errors).includes(message)
    ? message
    : errors.defaultWhenRequestFail;
};

export const useAsyncResource: UseAsyncResource = <DataType>({
  transformFn,
  fetchFn,
  searchOptions,
  paginationOptions,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  searchOptions: SearchOptions;
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
  const prepareFetch = () => {
    setIsLoading(true);
    setError(null);
  };

  const performFetch = async (isMounted: boolean) => {
    const { edges, pageInfo, totalCount } = await fetchFn<DataType>(options);
    if (isMounted) {
      setData(transformFn(edges));
      if (pageInfo && totalCount) setMetadata({ ...pageInfo, totalCount });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const { searchTerm } = options;
    if (!searchTerm) return;

    const fetchData = async () => {
      prepareFetch();
      try {
        await performFetch(isMounted);
      } catch (error: unknown) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(options)]);

  return {
    isLoading,
    data,
    ...metadata,
    error,
  };
};
