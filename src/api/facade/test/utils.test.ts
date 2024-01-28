import { constructQueryString } from '../utils';

describe('constructQueryString', () => {
  it('constructs a query string for single search field and default sort order', () => {
    const queryString = constructQueryString('react', ['name'], {
      field: 'stars',
      direction: 'desc',
    });
    expect(queryString).toBe('name:react sort:stars-desc');
  });

  it('constructs a query string for multiple search fields and custom sort order', () => {
    const queryString = constructQueryString('vue', ['name', 'description'], {
      field: 'updated_at',
      direction: 'asc',
    });
    expect(queryString).toBe('name:vue description:vue sort:updated_at-asc');
  });
});
