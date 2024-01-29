import { jest } from '@jest/globals';
import { client } from '../../apollo-client';
import { fetchReactRepos } from '../fetch-react-repos';
import { REPOSITORIES_DETAILS_QUERY } from '../../queries/repositories-details-query';
import { Spy } from '../../../test-utils/types';
import { getGraphQLRepoResponseMocks } from '../../../models/test/mocks';
import { OrderBy, SearchInOptions } from '../types';
import { GraphQLRepoResponse } from '../../../models/transformations';

const mockClientResponseWith = (responseMock: GraphQLRepoResponse[]) =>
  (client.query as jest.Mock).mockImplementation(() =>
    Promise.resolve({ data: { search: { edges: responseMock } } }),
  );

describe('fetchReactRepos', () => {
  let spy: Spy;
  let singleRepoMock: GraphQLRepoResponse[];

  beforeEach(() => {
    spy = jest.spyOn(client, 'query');
    singleRepoMock = getGraphQLRepoResponseMocks(1);
    mockClientResponseWith(singleRepoMock);
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('calls client.query only once', async () => {
    await fetchReactRepos({ searchTerm: '' });
    expect(client.query).toHaveBeenCalledTimes(1);
  });

  it('calls client.query with the correct parameters when searching in multiple fields', async () => {
    const baseSearchTerm = 'react';
    const searchIn: SearchInOptions[] = ['name', 'description'];
    const orderBy: OrderBy = { field: 'stars', direction: 'desc' };

    const expectedSearchTerm = 'name:react description:react sort:stars-desc';

    const expectedParameters = {
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: expectedSearchTerm,
        first: 10,
      },
    };

    await fetchReactRepos({ searchTerm: baseSearchTerm, searchIn, orderBy });

    expect(spy).toHaveBeenCalledWith(expectedParameters);
  });
});
