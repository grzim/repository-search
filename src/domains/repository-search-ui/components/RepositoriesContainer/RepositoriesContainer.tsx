import React, { useState } from 'react';
import { RepositoriesList } from '@ui-components/RepositoriesList';
import { Search } from '../Search/Search';
import { CenteredContainer, RepositoriesListContainer } from './styles';
import { Pagination } from '../Pagination/Pagination';
import {
  defaultNumberOfItemsPerPage,
  initialSearchState,
} from '@ui/models/constants';
import { Repository } from '@ui/models/entities/Repository';
import { usePaginatedResource } from '@ui-factories/usePaginatedResource';
import { getGithubReposAdapter } from '@ui-adapters/api/get-github-repos';
import { useWithErrorHandling } from '@errors-ui/useWithErrorHandling';
import { FetchSearchOptions } from '@ui-value-objects/search';
import { errors } from '@ui/errors';

export const RepositoriesContainer = () => {
  const [searchOptions, setSearchOptions] =
    useState<FetchSearchOptions>(initialSearchState);

  const {
    goToNextPage,
    goToPreviousPage,
    isLoading,
    data: repos,
    totalCount,
    error,
  } = useWithErrorHandling(
    usePaginatedResource<Repository>({
      ...getGithubReposAdapter,
      searchOptions,
    }),
  );
  console.log({ error });
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
        isNextButtonDisabled={error === errors.maximumRequests || isLoading}
        onPrev={goToPreviousPage}
        onNext={goToNextPage}
        totalPages={Math.ceil(
          totalCount ? totalCount / defaultNumberOfItemsPerPage : 0,
        )}
      />
    </CenteredContainer>
  );
};
