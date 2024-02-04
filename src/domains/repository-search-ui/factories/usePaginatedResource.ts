import { PaginatedResource } from '@ui/models/aggregations/PaginatedResource';
import type { useAsyncResource } from './useAsyncResource';
import type { useCursorBasedPagination } from '@ui-factories/useCursorBasedPagination';

export const usePaginatedResource = <DataType>({
  asyncResource: { isLoading, data, totalCount = 0, endCursor, error },
  paginationOptions: { goToNextPage, goToPreviousPage },
}: {
  asyncResource: ReturnType<typeof useAsyncResource<DataType>>;
  paginationOptions: ReturnType<typeof useCursorBasedPagination>;
}): PaginatedResource<DataType> => ({
  goToNextPage: () => endCursor && goToNextPage(endCursor),
  goToPreviousPage,
  isLoading,
  data,
  totalCount,
  error,
});
