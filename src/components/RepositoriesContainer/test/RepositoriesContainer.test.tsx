describe('ParentComponent', () => {
  it('renders RepositoriesList only once when inputs are changed', () => {
    const { getByTestId, getByPlaceholderText } = render(<ParentComponent />);

    // Assume 'searchInput' is the data-testid for the search input field in the Search component
    const searchInput = getByPlaceholderText('Search Term');

    // Trigger input changes
    fireEvent.change(searchInput, { target: { value: 'React' } });
    fireEvent.change(searchInput, { target: { value: 'Vue' } });

    // RepositoriesListMock should still be rendered only once
    expect(RepositoriesListMock).toHaveBeenCalledTimes(1);

    // Optionally, check if the RepositoriesListMock is in the document
    expect(getByTestId('repositories-list')).toBeInTheDocument();
  });
});