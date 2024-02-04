import { constructQueryString } from '@ui-adapters/api/utils';

describe(constructQueryString.name, () => {
  it(`constructs a query string for single search field and default sort order`, () => {
    const queryString = constructQueryString({
      searchTerm: `react`,
      searchIn: [`name`],
      orderBy: {
        field: `stars`,
        direction: `desc`,
      },
    });
    expect(queryString).toBe(`name:react sort:stars-desc`);
  });

  it(`constructs a query string for multiple search fields and custom sort order`, () => {
    const queryString = constructQueryString({
      searchTerm: `vue`,
      searchIn: [`name`, `description`],
      orderBy: {
        field: `updated_at`,
        direction: `asc`,
      },
    });
    expect(queryString).toBe(`name:vue description:vue sort:updated_at-asc`);
  });
});
