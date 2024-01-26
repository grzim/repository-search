import { jest } from '@jest/globals';
import { client } from '../../apollo-client';
import { fetchReactRepos } from '../fetch-react-repos';
import { REPOSITORIES_DETAILS_QUERY } from '../../queries/repositories-details-query';

jest.mock('../../apollo-client');
describe('fetchReactRepos', () => {
  it('calls client.query with the correct parameters', async () => {
    const spy = jest.spyOn(client, 'query');
    const expectedParameters = { query: REPOSITORIES_DETAILS_QUERY };
    await fetchReactRepos(client);
    expect(spy).toHaveBeenCalledWith(expectedParameters);
    spy.mockRestore();
  });
});
