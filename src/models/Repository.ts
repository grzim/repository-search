export type GraphQLRepoResponse = {
  node: {
    name: string;
    url: string;
    stargazers: {
      totalCount: number;
    };
    forks: {
      totalCount: number;
    };
  };
};

export type Repository = {
  name: string;
  url: string;
  stargazers: number;
  forks: number;
};
