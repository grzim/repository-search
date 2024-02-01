export type PaginationCursor = string | null;
export type PaginationResponse = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: PaginationCursor;
  endCursor?: PaginationCursor;
};

export type FetchPaginationOptions = {
  after?: PaginationCursor;
  before?: PaginationCursor;
  first?: number | null;
  last?: number | null;
};
