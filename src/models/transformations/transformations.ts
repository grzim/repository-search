import { Repository } from '../ui-related/Repository';
import {
  APIModelToUIModelTransform,
  GitHubResponseTransformation,
} from './type-transfomrations';
import { GraphQLRepoResponse } from '../api-related/RepositoryApiResponse';

export const transformSingleRepo: GitHubResponseTransformation<Repository> = (
  data,
) => ({
  name: data.node.name,
  url: data.node.url,
  stargazers: data.node.stargazers.totalCount,
  forks: data.node.forks.totalCount,
});

export const transformGQLRepositoriesResponse: APIModelToUIModelTransform<
  Repository
> = (graphQLRepositoriesResponse: GraphQLRepoResponse[]) =>
  graphQLRepositoriesResponse.map(transformSingleRepo);
