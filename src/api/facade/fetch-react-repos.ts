import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';
import { FetchReposOptions, GitHubResponseWrapper, QueryResult } from './types';
import { constructQueryString } from './utils';

export const fetchReactRepos = async <DataType>(
  options: FetchReposOptions,
): Promise<GitHubResponseWrapper<DataType>[]> => {
  const queryString = constructQueryString(options);

  try {
    const {
      data: {
        search: { edges },
      },
    } = await client.query<QueryResult<DataType>>({
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: queryString,
        first: 10,
      },
    });
    return edges;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};
