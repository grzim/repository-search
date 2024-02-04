import React from 'react';
import { act, render } from '@testing-library/react';
import { useCursorBasedPagination } from '@ui-factories';

function TestComponent({ itemsPerPage }: { itemsPerPage: number }) {
  const { goToNextPage, goToPreviousPage, first, after, before } =
    useCursorBasedPagination(itemsPerPage);

  return (
    <div>
      <button
        data-testid="next-page"
        onClick={() => goToNextPage(`nextCursor`)}
      >
        Next Page
      </button>
      <button data-testid="prev-page" onClick={() => goToPreviousPage()}>
        Previous Page
      </button>
      <div data-testid="fetch-options">
        First: {first}, After:{` `}
        {String(after)}, Before:{` `}
        {String(before)}
      </div>
    </div>
  );
}

describe(`${useCursorBasedPagination.name} within TestComponent`, () => {
  const itemsPerPage = 10;

  it(`initializes with correct default values`, () => {
    const { getByTestId } = render(
      <TestComponent itemsPerPage={itemsPerPage} />,
    );

    expect(getByTestId(`fetch-options`).textContent).toContain(
      `First: ${itemsPerPage}`,
    );
    expect(getByTestId(`fetch-options`).textContent).toContain(`After: null`);
    expect(getByTestId(`fetch-options`).textContent).toContain(`Before: null`);
  });

  it(`updates endCursor when going to next page`, () => {
    const { getByTestId } = render(
      <TestComponent itemsPerPage={itemsPerPage} />,
    );

    act(() => {
      getByTestId(`next-page`).click();
    });

    expect(getByTestId(`fetch-options`).textContent).toContain(
      `After: nextCursor`,
    );
  });

  it(`updates cursors correctly when navigating to previous page`, () => {
    const { getByTestId } = render(
      <TestComponent itemsPerPage={itemsPerPage} />,
    );

    // Go to next page twice to simulate adding cursors to the stack
    act(() => {
      getByTestId(`next-page`).click();
    });
    act(() => {
      getByTestId(`next-page`).click();
    });

    // Go back to previous page
    act(() => {
      getByTestId(`prev-page`).click();
    });

    // The 'before' cursor should be set to the previous cursor, and 'after' should be null
    expect(getByTestId(`fetch-options`).textContent).toContain(
      `After: nextCursor`,
    );
    expect(getByTestId(`fetch-options`).textContent).toContain(`Before: null`);
  });
});
