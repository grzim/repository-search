import { APIGetResponse } from './APIGetResponse';

export type GraphQLQueryResult<
  T,
  U extends Record<string, unknown> = NonNullable<unknown>,
> = {
  search: APIGetResponse<T> & U;
};
