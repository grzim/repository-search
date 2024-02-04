import { fetchGqlGithubRepos } from './fetch-gql-github-repos';
import { transformGQLRepositoriesResponse } from './transform-gql-repositories-response';

export const getGithubReposAdapter = {
  fetchFn: fetchGqlGithubRepos,
  transformFn: transformGQLRepositoriesResponse,
};
