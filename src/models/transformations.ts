import { GraphQLRepoResponse, Repository } from './Repository';

export const transformSingleRepo = (data: GraphQLRepoResponse): Repository => ({
  name: data.node.name,
  url: data.node.url,
  stargazers: data.node.stargazers.totalCount,
  forks: data.node.forks.totalCount,
});

export const transformGQLRepositoriesResponse = (
  graphQLRepositoriesResponse: GraphQLRepoResponse[],
) => graphQLRepositoriesResponse.map(transformSingleRepo);
