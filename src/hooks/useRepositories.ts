import { useEffect, useState } from 'react';
import { fetchRepos } from '../api/facade/fetch-repos';
import { Repository } from '../models/ui-related/Repository';
import { transformGQLRepositoriesResponse } from '../models/transformations/transformations';
import { initialPaginationData } from '../models/constants/pagination';
import { FetchSearchOptions } from '../models/ui-related/search';
import {
  FetchPaginationOptions,
  PaginationResponse,
} from '../models/api-related/pagination';

type UseRepositoriesOptions = FetchSearchOptions & FetchPaginationOptions;

export const useRepositories = (options: UseRepositoriesOptions) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<
    PaginationResponse & { repositoryCount: number }
  >(initialPaginationData);
  const [error, setError] = useState<string | null>(null);

  const prepareFetching = () => {
    setIsLoading(true);
    setError(null);
  };

  const fetching = async () => {
    const { edges, pageInfo, repositoryCount } =
      await fetchRepos<Repository>(options);
    setRepos(transformGQLRepositoriesResponse(edges));
    setPaginationData({ ...pageInfo, repositoryCount });
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

  return { isLoading, repos, ...paginationData, error };
};
