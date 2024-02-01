import { transformSingleRepo } from '../transformations';
import { graphQLReactRepoResponseMock, reactRepoMock } from '../../mocks';

describe('transformRepoData', () => {
  it('transforms GraphQLRepoResponse to Repository', () => {
    const expectedOutput = reactRepoMock;
    const actualOutput = transformSingleRepo(graphQLReactRepoResponseMock);

    expect(actualOutput).toEqual(expectedOutput);
  });
});
