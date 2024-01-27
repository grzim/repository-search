import { client } from '../apollo-client';
import { REPOSITORIES_DETAILS_QUERY } from '../queries/repositories-details-query';

export const fetchReactRepos = async () => {
  try {
    const { data } = await client.query({
      query: REPOSITORIES_DETAILS_QUERY,
    });
    return data.search.edges;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
};
