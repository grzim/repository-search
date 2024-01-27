import { jest } from '@jest/globals';
import { client } from '../../apollo-client';
import { fetchReactRepos } from '../fetch-react-repos';
import { REPOSITORIES_DETAILS_QUERY } from '../../queries/repositories-details-query';
import { Spy } from '../../../test-utils/types';
import { GraphQLRepoResponse } from '../../../models/Repository';
import { getGraphQLRepoResponseMocks } from '../../../models/test/mocks';

const mockClientResponseWith = (responseMock: GraphQLRepoResponse[]) =>
  (client.query as jest.Mock).mockImplementation(() =>
    Promise.resolve(responseMock),
  );

describe('fetchReactRepos', () => {
  let spy: Spy;
  let singleRepoMock: GraphQLRepoResponse[];

  beforeEach(() => {
    spy = jest.spyOn(client, 'query');
    singleRepoMock = getGraphQLRepoResponseMocks(1);
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('calls client.query only once', async () => {
    mockClientResponseWith(singleRepoMock);
    await fetchReactRepos();
    expect(client.query).toHaveBeenCalledTimes(1);
  });

  it('calls client.query with the correct parameters', async () => {
    mockClientResponseWith(singleRepoMock);
    const expectedParameters = { query: REPOSITORIES_DETAILS_QUERY };
    await fetchReactRepos();
    expect(spy).toHaveBeenCalledWith(expectedParameters);
  });
});
