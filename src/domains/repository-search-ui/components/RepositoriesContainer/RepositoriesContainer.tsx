import React, { useState } from 'react';
import { RepositoriesList } from '@ui-components/RepositoriesList';
import { CenteredContainer, RepositoriesListContainer } from './styles';
import { Pagination } from '../Pagination/Pagination';
import {
  defaultNumberOfItemsPerPage,
  initialSearchState,
} from '@ui/models/constants';
import { Repository } from '@ui/models/entities/Repository';
import { usePaginatedResource } from '@ui-factories/usePaginatedResource';
import { gqlGithubConnectorData } from '@ui-adapters/api/gql-github-connector-data';
import { useWithErrorHandling } from '@errors-ui/useWithErrorHandling';
import { errors } from '@ui/errors';
import { useAsyncResource, useCursorBasedPagination } from '@ui-factories';
import { Search } from '@ui-components/Search';
import { repositoriesNameTransformation } from '@ui-components/RepositoriesContainer/utils/repository-name-transformation';
import { SearchOptions } from '@ui/models/entities';

export const RepositoriesContainer = () => {
  const [searchOptions, setSearchOptions] =
    useState<SearchOptions>(initialSearchState);

  const paginationOptions = useCursorBasedPagination(
    defaultNumberOfItemsPerPage,
  );

  const asyncResource = useWithErrorHandling(
    useAsyncResource({
      ...gqlGithubConnectorData,
      searchOptions,
      paginationOptions,
    }),
  );

  const paginatedResource = usePaginatedResource<Repository>({
    paginationOptions,
    asyncResource,
  });
  const {
    goToNextPage,
    goToPreviousPage,
    isLoading,
    data: repos,
    totalCount,
    error,
  } = paginatedResource;

  return (
    <CenteredContainer>
      <Search
        initialState={initialSearchState}
        onSearchTermChange={setSearchOptions}
      />
      <RepositoriesListContainer>
        <RepositoriesList
          repos={repositoriesNameTransformation({ searchOptions, repos })}
          isLoading={isLoading}
        />
      </RepositoriesListContainer>
      <Pagination
        isNextButtonDisabled={error === errors.maximumRequests || isLoading}
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
        totalPages={Math.ceil(
          totalCount ? totalCount / defaultNumberOfItemsPerPage : 0,
        )}
      />
    </CenteredContainer>
  );
};
