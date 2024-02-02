import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';
import { constructQueryString } from './utils';
import { removeEmpty } from '../../utils/transform-fns';
import { FetchSearchOptions } from '../../models/ui-related/search';
import { FetchPaginationOptions } from '../../models/api-related/pagination';
import { APIGetResponse } from '../../models/api-related/APIGetResponse';
import { GraphQLQueryResult } from '../../models/api-related/GraphQLQueryResult';
import { logAPIError } from '../../error-modules/api-error-module/api-error-module';
import { FetchData } from '../../models/api-related/FetchData';

export const fetchRepos: FetchData = async <DataType>(
  options: FetchSearchOptions & FetchPaginationOptions,
): Promise<APIGetResponse<DataType>> => {
  const queryString = constructQueryString(options);
  try {
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
    const {
      edges,
      pageInfo,
      repositoryCount: totalCount,
    } = response.data.search;
    return { edges, pageInfo, totalCount };
  } catch (e) {
    logAPIError({ fnName: fetchRepos.name, error: e });
    // propagate error to handle it on UI
    const message = e instanceof Error ? String(e) : 'unknown error occurred';
    throw new Error(message);
  }
};
