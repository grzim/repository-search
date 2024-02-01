import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { ToVoid } from '../../utils/transform-fns';
import {
  paginationNextId,
  paginationPrevId,
} from '../../test-utils/data-test-ids';

export type PaginationProps = {
  totalPages: number;
  onNext: ToVoid;
  onPrev: ToVoid;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onNext,
  onPrev,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onNextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
    onNext();
  };
  const onPrevPage = () => {
    setCurrentPage((prevState) => prevState - 1);
    onPrev();
  };
  return totalPages > 1 ? (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingTop={2}
    >
      <Button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        data-testid={paginationPrevId}
      >
        Prev
      </Button>
      <Button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        data-testid={paginationNextId}
      >
        Next
      </Button>
    </Box>
  ) : (
    <></>
  );
};
