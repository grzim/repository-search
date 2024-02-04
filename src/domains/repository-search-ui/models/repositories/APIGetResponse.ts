import { PaginationResponse } from '@ui-value-objects/pagination';
import { GitHubResponseWrapper } from '@ui/models/repositories/GitHubResponseWrapper';

export type APIGetResponse<T> = {
  edges: GitHubResponseWrapper<T>[];
  pageInfo?: PaginationResponse;
  totalCount?: number;
};
