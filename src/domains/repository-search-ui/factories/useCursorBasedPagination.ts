import { useState } from 'react';
import { PaginationCursor } from '@ui-value-objects/pagination';

export const useCursorBasedPagination = (itemsPerPage: number) => {
  const [endCursor, setEndCursor] = useState<PaginationCursor>(null);
  const [startCursor, setStartCursor] = useState<PaginationCursor>(null);
  const [cursorStack, setCursorStack] = useState<PaginationCursor[]>([]);

  const goToNextPage = (newEndCursor: PaginationCursor) => {
    if (endCursor) {
      setCursorStack((prevStack) => [...prevStack, endCursor]);
    }
    setEndCursor(newEndCursor);
    setStartCursor(null);
  };

  const goToPreviousPage = () => {
    const prevCursor = cursorStack.at(-1);
    setCursorStack(cursorStack.slice(0, -1));
    setEndCursor(prevCursor || null);
    setStartCursor(null);
  };

  return {
    first: itemsPerPage,
    after: endCursor,
    before: startCursor,
    goToNextPage,
    goToPreviousPage,
  };
};
