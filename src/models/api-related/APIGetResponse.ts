import { GitHubResponseWrapper } from '../transformations/type-transfomrations';
import { PaginationResponse } from './pagination';

export type APIGetResponse<T> = {
  edges: GitHubResponseWrapper<T>[];
  pageInfo?: PaginationResponse;
  totalCount: number;
};
