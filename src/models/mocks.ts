import { createRange } from '../utils/transform-fns';
import { Repository } from './ui-related/Repository';
import { transformSingleRepo } from './transformations/transformations';
import { APIGetResponse } from './api-related/APIGetResponse';
import { GraphQLRepoResponse } from './api-related/RepositoryApiResponse';
import { FetchSearchOptions } from './ui-related/search';
import {
  orderDirections,
  orderFields,
  searchInOptions,
} from './constants/search-options';

export const getGraphQLRepoResponseMocks = (
  numberOfItems: number,
): APIGetResponse<Repository> => ({
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: 'startCursor',
    endCursor: 'endCursor',
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
export const getReposMocks = (numberOfItems: number) =>
  getGraphQLRepoResponseMocks(numberOfItems).edges.map(transformSingleRepo);

export const graphQLReactRepoResponseMock: GraphQLRepoResponse = {
  node: {
    name: 'react',
    url: 'https://github.com/facebook/react',
    stargazers: {
      totalCount: 10,
    },
    forks: {
      totalCount: 1,
    },
  },
};
export const reactRepoMock: Repository = {
  name: 'react',
  url: 'https://github.com/facebook/react',
  stargazers: 10,
  forks: 1,
};

export const searchOptionsMock: FetchSearchOptions = {
  searchTerm: 'react',
  orderBy: {
    field: orderFields[0],
    direction: orderDirections[0],
  },
  searchIn: searchInOptions.slice(0, 1),
};
