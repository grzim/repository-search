import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';
import { constructQueryString } from './utils';
import { removeEmpty } from '../../utils/transform-fns';
import { FetchSearchOptions } from '../../models/ui-related/search';
import { FetchPaginationOptions } from '../../models/api-related/pagination';
import { RepositoryGetResponse } from '../../models/api-related/RepositoryGetResponse';
import { GraphQLQueryResult } from '../../models/api-related/GraphQLQueryResult';
import { logAPIError } from '../../error-modules/api-error-module/api-error-module';

export const fetchRepos = async <DataType>(
  options: FetchSearchOptions & FetchPaginationOptions,
): Promise<RepositoryGetResponse<DataType>> => {
  const queryString = constructQueryString(options);
  try {
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
  } catch (e) {
    logAPIError({ fnName: fetchRepos.name, error: e });
    // propagate error to handle it on UI
    const message = e instanceof Error ? String(e) : 'unknown error occurred';
    throw new Error(message);
  }
};
