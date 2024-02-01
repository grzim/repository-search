import { RepositoryGetResponse } from './RepositoryGetResponse';

export type GraphQLQueryResult<T> = {
  search: RepositoryGetResponse<T>;
};
