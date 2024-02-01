import { client } from '../../apollo-client';
import { fetchRepos } from '../fetch-repos';
import { REPOSITORIES_DETAILS_QUERY } from '../../queries/repositories-details-query';
import { Spy } from '../../../test-utils/types';
import { constructQueryString } from '../utils';
import { anything } from '../../../test-utils/anything';
import { searchOptionsMock } from '../../../models/mocks';
import * as apiErrorModule from '../../../error-modules/api-error-module/api-error-module';

jest.mock('../../apollo-client', () => ({
  client: { query: jest.fn() },
}));

describe('fetchRepos with pagination', () => {
  let spy: Spy;

  beforeEach(() => {
    spy = jest.spyOn(client, 'query').mockResolvedValue(anything);
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('calls client.query with pagination parameters for the next page', async () => {
    const paginationOptions = {
      first: 5,
      after: 'cursor123',
    };

    await fetchRepos({ ...searchOptionsMock, ...paginationOptions });

    expect(spy).toHaveBeenCalledWith({
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: constructQueryString(searchOptionsMock),
        first: paginationOptions.first,
        after: paginationOptions.after,
      },
    });
  });

  it('calls client.query with pagination parameters for the previous page', async () => {
    const paginationOptions = {
      last: 5,
      before: 'cursor123',
    };

    await fetchRepos({ ...searchOptionsMock, ...paginationOptions });

    expect(spy).toHaveBeenCalledWith({
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: constructQueryString(searchOptionsMock),
        last: paginationOptions.last,
        before: paginationOptions.before,
      },
    });
  });

  it('if error occurs it is passed to error module and propagated down', async () => {
    jest.spyOn(client, 'query').mockRejectedValue(new Error());
    const spy = jest.spyOn(apiErrorModule, 'logAPIError');
    await expect(fetchRepos({ ...searchOptionsMock })).rejects.toThrowError();
    expect(spy).toHaveBeenCalled();
  });
});
