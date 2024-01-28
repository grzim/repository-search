import { Repository } from './Repository';
import { GitHubResponseWrapper } from '../api/facade/types';

type GitHubResponseTransformation<DataType> = (
  data: GitHubResponseWrapper<DataType>,
) => DataType;

export type GraphQLRepoResponse = GitHubResponseWrapper<Repository>;

export const transformSingleRepo: GitHubResponseTransformation<Repository> = (
  data,
) => ({
  name: data.node.name,
  url: data.node.url,
  stargazers: data.node.stargazers.totalCount,
  forks: data.node.forks.totalCount,
});

export const transformGQLRepositoriesResponse = (
  graphQLRepositoriesResponse: GraphQLRepoResponse[],
) => graphQLRepositoriesResponse.map(transformSingleRepo);
