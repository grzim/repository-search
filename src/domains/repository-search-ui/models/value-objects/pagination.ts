export type PaginationCursor = string | null;
export type PaginationResponse = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: PaginationCursor;
  endCursor?: PaginationCursor;
};
