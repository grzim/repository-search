import { Repository } from '@ui-entities/Repository';
import {
  APIModelToUIModelTransform,
  GitHubResponseTransformation,
} from '@ui/models/services';
import { GitHubResponseWrapper } from '@ui/models/repositories';

export const transformSingleRepo: GitHubResponseTransformation<Repository> = (
  data,
) => ({
  owner: data.node.owner,
  name: data.node.name,
  url: data.node.url,
  stargazers: data.node.stargazers.totalCount,
  forks: data.node.forks.totalCount,
});

export const transformGQLRepositoriesResponse: APIModelToUIModelTransform<
  Repository
> = (graphQLRepositoriesResponse: GitHubResponseWrapper<Repository>[]) =>
  graphQLRepositoriesResponse.map(transformSingleRepo);
