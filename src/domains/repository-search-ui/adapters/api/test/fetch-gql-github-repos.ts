import { client } from '@api/apollo-client';
import { fetchGqlGithubRepos } from '@ui-adapters/api/fetch-gql-github-repos';
import { REPOSITORIES_DETAILS_QUERY } from '@api/queries/repositories-details-query';
import { Spy } from '@test/types';
import { constructQueryString } from '@ui-adapters/api/utils';
import { anything } from '@test/anything';
import * as apiErrorModule from '@errors-api/api-error-module';
import { searchOptionsMock } from '@test/mocks';
import { ApolloClient } from '@apollo/client';

jest.mock(`@api/apollo-client`, () => ({
  client: { query: jest.fn() },
}));

describe(fetchGqlGithubRepos.name + ` with pagination`, () => {
  let spy: Spy;

  beforeEach(() => {
    spy = jest.spyOn(client, `query`).mockResolvedValue(anything);
  });

  afterEach(() => {
    spy.mockReset();
  });

  it(`calls ${ApolloClient.name} with pagination parameters for the next page`, async () => {
    const paginationOptions = {
      first: 5,
      after: `cursor123`,
    };

    await fetchGqlGithubRepos({ ...searchOptionsMock, ...paginationOptions });

    expect(spy).toHaveBeenCalledWith({
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: constructQueryString(searchOptionsMock),
        first: paginationOptions.first,
        after: paginationOptions.after,
      },
    });
  });

  it(`calls ${ApolloClient.name} with pagination parameters for the previous page`, async () => {
    const paginationOptions = {
      last: 5,
      before: `cursor123`,
    };

    await fetchGqlGithubRepos({ ...searchOptionsMock, ...paginationOptions });

    expect(spy).toHaveBeenCalledWith({
      query: REPOSITORIES_DETAILS_QUERY,
      variables: {
        searchTerm: constructQueryString(searchOptionsMock),
        last: paginationOptions.last,
        before: paginationOptions.before,
      },
    });
  });

  it(`if error occurs it is passed to error module and propagated down`, async () => {
    jest.spyOn(client, `query`).mockRejectedValue(new Error());
    const spy = jest.spyOn(apiErrorModule, `logAPIError`);
    await expect(
      fetchGqlGithubRepos({ ...searchOptionsMock }),
    ).rejects.toThrowError();
    expect(spy).toHaveBeenCalled();
  });
});
