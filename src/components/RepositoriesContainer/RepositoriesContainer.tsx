import React, { useState } from 'react';
import { RepositoriesList } from '../RepositoriesList/RepositoriesList';
import { Search } from '../Search/Search';
import { useRepositories } from '../../hooks/useRepositories';
import { FetchReposOptions } from '../../api/facade/types';
import { initialSearchState } from '../Search/utils/initial-search-state';
import { CenteredContainer } from './styles';

export const RepositoriesContainer = () => {
  const [searchParams, setSearchParams] =
    useState<FetchReposOptions>(initialSearchState);
  const { isLoading, repos } = useRepositories(searchParams);

  return (
    <CenteredContainer>
      <Search
        initialState={initialSearchState}
        onSearchTermChange={setSearchParams}
      />
      <RepositoriesList repos={repos} isLoading={isLoading} />
    </CenteredContainer>
  );
};
