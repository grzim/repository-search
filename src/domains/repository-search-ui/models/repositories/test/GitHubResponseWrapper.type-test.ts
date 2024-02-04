import { assertType } from '@test/index';
import { GitHubResponseWrapper } from '@ui/models/repositories';

type SimpleRepoData = { starCount: number; forkCount: number };

type ComplexRepoData = {
  starCount: number;
  forkCount: number;
  owner: {
    name: string;
    followerCount: number;
  };
};

assertType<GitHubResponseWrapper<SimpleRepoData>>({
  node: {
    star_count: { totalCount: 100 },
    fork_count: { totalCount: 50 },
  },
});
// Expected to handle nested objects and apply conversions recursively.
assertType<GitHubResponseWrapper<ComplexRepoData>>({
  node: {
    star_count: { totalCount: 100 },
    fork_count: { totalCount: 50 },
    owner: {
      name: `NAME`,
      follower_count: { totalCount: 1000 },
    },
  },
});
