import { createRange } from '../../utils/transform-fns';
import { Repository } from '../Repository';
import { GraphQLRepoResponse, transformSingleRepo } from '../transformations';

export const getGraphQLRepoResponseMocks = (
  numberOfItems: number,
): GraphQLRepoResponse[] =>
  createRange(numberOfItems).map((_, i) => ({
    node: {
      name: `repo${i}`,
      stargazers: { totalCount: i },
      forks: { totalCount: i },
      url: `http://repos/${i}`,
    },
  }));

export const getReposMocks = (numberOfItems: number) =>
  getGraphQLRepoResponseMocks(numberOfItems).map(transformSingleRepo);

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
