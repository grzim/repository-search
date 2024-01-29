import { Repository } from '../../models/Repository';
import React from 'react';
import { loaderId, tableId } from '../../test-utils/data-test-ids';

export type RepositoriesListProps = {
  repos: Repository[];
  isLoading: boolean;
};
export const getStargazers = (repo: Repository) => '🌟 ' + repo.stargazers;
export const getForks = (repo: Repository) => '🍴 ' + repo.forks;
export const RepositoriesList: React.FC<RepositoriesListProps> = ({
  repos,
  isLoading,
}) => {
  if (isLoading) return <div data-testid={loaderId}>Loading...</div>;

  return (
    <ul data-testid={tableId}>
      {repos.map((repo) => (
        <li key={repo.url}>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>{' '}
          - {getStargazers(repo)} - {getForks(repo)}
        </li>
      ))}
    </ul>
  );
};
