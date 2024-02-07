import { client } from '@api/apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '@api/queries/repositories-details-query';
import { constructQueryString } from './utils';
import { removeEmpty } from '@src/utils';
import { APIGetResponse } from '@ui/models/repositories/APIGetResponse';
import { GraphQLQueryResult } from '@ui/models/repositories/GraphQLQueryResult';
import { FetchData } from '@ui/models/services/FetchData';
import { PaginationOptions, SearchOptions } from '@ui/models/entities';
import { errors } from '@ui/errors';

export const fetchGqlGithubRepos: FetchData = async <DataType>(
  options: SearchOptions & PaginationOptions,
): Promise<APIGetResponse<DataType>> => {
  const queryString = constructQueryString(options);
  const response = await client.query<
    GraphQLQueryResult<DataType, { repositoryCount: number }>
  >({
    query: REPOSITORIES_DETAILS_QUERY,
    variables: removeEmpty({
      searchTerm: queryString,
      first: options.first,
      after: options.after,
      before: options.before,
      last: options.last,
    }),
  });
  const { edges, pageInfo, repositoryCount: totalCount } = response.data.search;
  if (totalCount > 0 && edges.length === 0)
    throw new Error(errors.maximumRequests);
  return { edges, pageInfo, totalCount };
};
