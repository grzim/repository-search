import { GitHubResponseWrapper } from '../transformations/type-transfomrations';
import { PaginationResponse } from './pagination';

export type RepositoryGetResponse<T> = {
  edges: GitHubResponseWrapper<T>[];
  pageInfo: PaginationResponse;
  repositoryCount: number;
};
