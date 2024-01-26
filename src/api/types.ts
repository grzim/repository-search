import { jest } from '@jest/globals';

export type FetchReactReposResponse = {
  data: {
    search: {
      edges: Array<{
        node: {
          name: string;
          id: string;
          url: string;
        };
      }>;
    };
  };
};

export type Spy = ReturnType<typeof jest.spyOn>;
