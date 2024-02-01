import React, { useState } from 'react';
import { RepositoriesList } from '../RepositoriesList/RepositoriesList';
import { Search } from '../Search/Search';
import { useRepositories } from '../../hooks/useRepositories';
import { initialSearchState } from '../../models/constants/initial-search-state';
import { CenteredContainer, RepositoriesListContainer } from './styles';
import { Pagination } from '../Pagination/Pagination';
import { usePaginationData } from '../../hooks/usePaginationData';
import { defaultNumberOfItemsPerPage } from '../../models/constants/pagination';
import { FetchSearchOptions } from '../../models/ui-related/search';
import { useErrorHandling } from '../../hooks';

export const RepositoriesContainer = () => {
  const [searchParams, setSearchParams] =
    useState<FetchSearchOptions>(initialSearchState);

  const { goToNextPage, goToPreviousPage, paginationOptions } =
    usePaginationData(defaultNumberOfItemsPerPage);

  const { isLoading, repos, repositoryCount, endCursor, error } =
    useRepositories({
      ...searchParams,
      ...paginationOptions,
    });

  useErrorHandling(error);

  return (
    <CenteredContainer>
      <Search
        initialState={initialSearchState}
        onSearchTermChange={setSearchParams}
      />
      <RepositoriesListContainer>
        <RepositoriesList repos={repos} isLoading={isLoading} />
      </RepositoriesListContainer>
      <Pagination
        onPrev={goToPreviousPage}
        onNext={() => endCursor && goToNextPage(endCursor)}
        totalPages={Math.ceil(
          repositoryCount ? repositoryCount / defaultNumberOfItemsPerPage : 0,
        )}
      />
    </CenteredContainer>
  );
};
