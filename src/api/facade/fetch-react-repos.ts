import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';
import {
  FetchReactRepos,
  OrderBy,
  QueryResult,
  SearchInOptions,
} from './types';
import { constructQueryString } from './utils';

export const fetchReactRepos: FetchReactRepos = async <DataType>({
  searchTerm = 'react',
  searchIn = ['name', 'description'] as SearchInOptions[],
  orderBy = { field: 'stars', direction: 'desc' } as OrderBy,
} = {}) => {
  const queryString = constructQueryString(searchTerm, searchIn, orderBy);

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
