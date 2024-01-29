import { transformGQLRepositoriesResponse } from '../models/transformations';
import { useEffect, useState } from 'react';
import { fetchReactRepos } from '../api/facade/fetch-react-repos';
import { FetchReposOptions } from '../api/facade/types';
import { Repository } from '../models/Repository';

export const useRepositories = (options: FetchReposOptions) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (options: FetchReposOptions) => {
    setIsLoading(true);
    const response = await fetchReactRepos<Repository>(options);
    const transformedRepos = transformGQLRepositoriesResponse(response);
    setRepos(transformedRepos);
    setIsLoading(false);
  };

  useEffect(() => {
    if (options.searchTerm) fetchData(options);
  }, [options]);

  return { isLoading, repos };
};
