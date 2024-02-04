import { transformSingleRepo } from '@ui-adapters/api/transform-gql-repositories-response';
import { graphQLReactRepoResponseMock, reactRepoMock } from '@test/mocks';

describe(`transformRepoData`, () => {
  it(`transforms GraphQLRepoResponse to Repository`, () => {
    const expectedOutput = reactRepoMock;
    const actualOutput = transformSingleRepo(graphQLReactRepoResponseMock);

    expect(actualOutput).toEqual(expectedOutput);
  });
});
