import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';
import { constructQueryString } from './utils';
import { removeEmpty } from '../../utils/transform-fns';
import { FetchSearchOptions } from '../../models/ui-related/search';
import { FetchPaginationOptions } from '../../models/api-related/pagination';
import { RepositoryGetResponse } from '../../models/api-related/RepositoryGetResponse';
import { GraphQLQueryResult } from '../../models/api-related/GraphQLQueryResult';

export const fetchRepos = async <DataType>(
  options: FetchSearchOptions & FetchPaginationOptions,
): Promise<RepositoryGetResponse<DataType>> => {
  const queryString = constructQueryString(options);
  const response = await client.query<GraphQLQueryResult<DataType>>({
    query: REPOSITORIES_DETAILS_QUERY,
    variables: removeEmpty({
      searchTerm: queryString,
      first: options.first,
      after: options.after,
      before: options.before,
      last: options.last,
    }),
  });
  return response.data.search;
};
