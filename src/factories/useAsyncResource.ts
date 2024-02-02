import { useEffect, useState } from 'react';
import { initialPaginationData } from '../models/constants/pagination';
import { FetchSearchOptions } from '../models/ui-related/search';
import {
  FetchPaginationOptions,
  PaginationResponse,
} from '../models/api-related/pagination';
import { FetchData } from '../models/api-related/FetchData';
import { APIModelToUIModelTransform } from '../models/transformations/type-transfomrations';

type UseAsyncResourceOptions = FetchSearchOptions & FetchPaginationOptions;

export const useAsyncResource = <DataType>({
  transformFn,
  fetchFn,
  options,
}: {
  fetchFn: FetchData;
  transformFn: APIModelToUIModelTransform<DataType>;
  options: UseAsyncResourceOptions;
}) => {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<
    PaginationResponse & { totalCount: number }
  >(initialPaginationData);
  const [error, setError] = useState<string | null>(null);

  const prepareFetching = () => {
    setIsLoading(true);
    setError(null);
  };

  const fetching = async () => {
    const { edges, pageInfo, totalCount } = await fetchFn<DataType>(options);
    setData(transformFn(edges));
    if (pageInfo) setPaginationData({ ...pageInfo, totalCount });
  };

  const fetchFail = () => {
    setError('Failed to fetch repositories.');
  };

  const afterFetchCleanup = () => setIsLoading(false);

  useEffect(() => {
    const { searchTerm } = options;
    if (!searchTerm) return;

    const fetchData = async () => {
      prepareFetching();
      try {
        await fetching();
      } catch (error) {
        fetchFail();
      } finally {
        afterFetchCleanup();
      }
    };

    fetchData();
  }, [JSON.stringify(options)]);

  return { isLoading, data, ...paginationData, error };
};
