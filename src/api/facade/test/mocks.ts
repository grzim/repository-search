import { FetchReactReposResponse } from '../../types';

export const singleRepoMock: FetchReactReposResponse = {
  data: {
    search: {
      edges: [
        {
          node: {
            name: 'react-repo-1',
            id: '1',
            url: 'https://github.com/example/react-repo-1',
          },
        },
      ],
    },
  },
};
