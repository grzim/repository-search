import { Repository } from '@ui-entities/Repository';
import { APIGetResponse } from '@ui/models/repositories/APIGetResponse';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from '@ui-constants/index';
import { createRange } from '@src/utils';
import { GitHubResponseWrapper } from '@ui/models/repositories';
import { SearchOptions } from '@ui/models/entities';

export const getGraphQLRepoResponseMocks = (
  numberOfItems: number,
): APIGetResponse<Repository> => ({
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: `startCursor`,
    endCursor: `endCursor`,
  },
  totalCount: numberOfItems,
  edges: createRange(numberOfItems).map((_, i) => ({
    node: {
      name: `repo${i}`,
      stargazers: { totalCount: i },
      forks: { totalCount: i },
      url: `http://repos/${i}`,
    },
  })),
});
export const graphQLReactRepoResponseMock: GitHubResponseWrapper<Repository> = {
  node: {
    name: `react`,
    url: `https://github.com/facebook/react`,
    stargazers: {
      totalCount: 10,
    },
    forks: {
      totalCount: 1,
    },
  },
};
export const reactRepoMock: Repository = {
  name: `react`,
  url: `https://github.com/facebook/react`,
  stargazers: 10,
  forks: 1,
};

export const getRepositoriesMock = (numberOfItems: number): Repository[] =>
  createRange(numberOfItems).map((_, i) => ({
    name: `repo${i}`,
    stargazers: i,
    forks: i,
    url: `http://repos/${i}`,
  }));

export const searchOptionsMock: SearchOptions = {
  searchTerm: `react`,
  orderBy: {
    field: orderFields[0],
    direction: orderDirections[0],
  },
  searchIn: searchInOptions.slice(0, 1),
};
