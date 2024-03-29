import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { paginationNextId, paginationPrevId } from '@src/test-utils';

describe(Pagination.name + ` Component`, () => {
  const mockOnNext = jest.fn();
  const mockOnPrev = jest.fn();

  beforeEach(() => {
    mockOnNext.mockClear();
    mockOnPrev.mockClear();
  });

  it(`does not render anything when totalPages is 1 or less`, () => {
    render(
      <Pagination totalPages={1} onNext={jest.fn()} onPrevious={jest.fn()} />,
    );

    const prevButton = screen.queryByText(`Prev`);
    const nextButton = screen.queryByText(`Next`);

    expect(prevButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it(`renders pagination with prev, and next buttons when totalPages is greater than 1`, () => {
    render(
      <Pagination totalPages={3} onNext={mockOnNext} onPrevious={mockOnPrev} />,
    );

    expect(screen.getByTestId(paginationPrevId)).toBeInTheDocument();
    expect(screen.getByTestId(paginationNextId)).toBeInTheDocument();
  });

  it(`calls onNext when Next button is clicked`, () => {
    render(
      <Pagination totalPages={3} onNext={mockOnNext} onPrevious={mockOnPrev} />,
    );

    fireEvent.click(screen.getByTestId(paginationNextId));
    expect(mockOnNext).toHaveBeenCalled();
    expect(mockOnPrev).not.toHaveBeenCalled();
  });

  it(`calls onPrev when Prev button is clicked`, () => {
    render(
      <Pagination totalPages={3} onNext={mockOnNext} onPrevious={mockOnPrev} />,
    );

    fireEvent.click(screen.getByTestId(paginationNextId));
    fireEvent.click(screen.getByTestId(paginationPrevId));
    expect(mockOnPrev).toHaveBeenCalled();
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it(`disables Prev button on the first page`, () => {
    render(
      <Pagination totalPages={3} onNext={mockOnNext} onPrevious={mockOnPrev} />,
    );
    expect(screen.getByTestId(paginationPrevId)).toBeDisabled();
    fireEvent.click(screen.getByTestId(paginationNextId));
    fireEvent.click(screen.getByTestId(paginationPrevId));
    expect(screen.getByTestId(paginationPrevId)).toBeDisabled();
  });

  it(`disables Next button on the last page`, () => {
    render(
      <Pagination totalPages={2} onNext={mockOnNext} onPrevious={mockOnPrev} />,
    );
    fireEvent.click(screen.getByTestId(paginationNextId));

    expect(screen.getByTestId(paginationNextId)).toBeDisabled();
  });
});
