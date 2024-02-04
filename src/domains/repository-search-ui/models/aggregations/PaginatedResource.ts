import { PaginationCursor } from '@ui/models/value-objects';
import { AsyncResource } from '@ui/models/aggregations/AsyncResource';
import { ToVoid } from '@src/utils';

export type PaginatedResource<DataType> = AsyncResource<DataType> & {
  endCursor?: PaginationCursor;
  totalCount: number;
  startCursor?: PaginationCursor;
  goToNextPage: ToVoid;
  goToPreviousPage: ToVoid;
};
