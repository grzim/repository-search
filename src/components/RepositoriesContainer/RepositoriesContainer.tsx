import React, { useState } from 'react';
import { RepositoriesList } from '../RepositoriesList/RepositoriesList';
import { Search } from '../Search/Search';
import { useRepositories } from '../../hooks/useRepositories';
import { initialSearchState } from '../../models/constants/initial-search-state';
import { CenteredContainer } from './styles';
import { Pagination } from '../Pagination/Pagination';
import { usePaginationData } from '../../hooks/usePaginationData';
import { defaultNumberOfItemsPerPage } from '../../models/constants/pagination';
import { FetchSearchOptions } from '../../models/ui-related/search';

export const RepositoriesContainer = () => {
  const [searchParams, setSearchParams] =
    useState<FetchSearchOptions>(initialSearchState);

  const { goToNextPage, goToPreviousPage, paginationOptions } =
    usePaginationData(defaultNumberOfItemsPerPage);

  const { isLoading, repos, repositoryCount, endCursor } = useRepositories({
    ...searchParams,
    ...paginationOptions,
  });

  return (
    <CenteredContainer>
      <Search
        initialState={initialSearchState}
        onSearchTermChange={setSearchParams}
      />
      <RepositoriesList repos={repos} isLoading={isLoading} />
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
