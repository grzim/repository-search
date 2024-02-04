import { PaginationCursor } from '@ui/models/value-objects';

export type PaginationOptions = {
  after?: PaginationCursor;
  before?: PaginationCursor;
  first?: number | null;
  last?: number | null;
  endCursor?: PaginationCursor;
};
