import React from 'react';
import { RepositoriesList } from '../RepositoriesList/RepositoriesList';
import { Search } from '../Search/Search';
import { initialSearchState } from '../../models/constants/initial-search-state';
import { CenteredContainer, RepositoriesListContainer } from './styles';
import { Pagination } from '../Pagination/Pagination';
import { useErrorHandling } from '../../factories';
import { defaultNumberOfItemsPerPage } from '../../models/constants/pagination';
import { Repository } from '../../models/ui-related/Repository';
import { usePaginatedResource } from '../../factories/usePaginatedResource';
import { fetchRepos } from '../../api/facade/fetch-repos';
import { transformGQLRepositoriesResponse } from '../../models/transformations/transformations';

export const RepositoriesContainer = () => {
  const {
    setSearchOptions,
    goToNextPage,
    goToPreviousPage,
    isLoading,
    data: repos,
    totalCount,
    error,
  } = usePaginatedResource<Repository>({
    fetchFn: fetchRepos,
    transformFn: transformGQLRepositoriesResponse,
  });
  useErrorHandling(error);

  return (
    <CenteredContainer>
      <Search
        initialState={initialSearchState}
        onSearchTermChange={setSearchOptions}
      />
      <RepositoriesListContainer>
        <RepositoriesList repos={repos} isLoading={isLoading} />
      </RepositoriesListContainer>
      <Pagination
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
        totalPages={Math.ceil(
          totalCount ? totalCount / defaultNumberOfItemsPerPage : 0,
        )}
      />
    </CenteredContainer>
  );
};
