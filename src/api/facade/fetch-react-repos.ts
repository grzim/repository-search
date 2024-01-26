import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';

export const fetchReactRepos = async (
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const data = await client.query({
    query: REPOSITORIES_DETAILS_QUERY,
  });
  return data;
};
