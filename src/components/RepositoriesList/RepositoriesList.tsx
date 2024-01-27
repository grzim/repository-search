import { Repository } from '../../models/Repository';
import React, { useEffect, useState } from 'react';
import { fetchReactRepos } from '../../api/facade/fetch-react-repos';
import { transformGQLRepositoriesResponse } from '../../models/transformations';
import { loader, table } from '../../test-utils/data-test-ids';

export const getStargazers = (repo: Repository) => '🌟 ' + repo.stargazers;
export const getForks = (repo: Repository) => '🍴 ' + repo.forks;
export const RepositoriesList: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRepos = await fetchReactRepos();
        setRepos(transformGQLRepositoriesResponse(fetchedRepos));
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div data-testid={loader}>Loading...</div>;

  return (
    <ul data-testid={table}>
      {repos.map((repo) => (
        <li key={repo.name}>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>{' '}
          -{getStargazers(repo)} -{getForks(repo)}
        </li>
      ))}
    </ul>
  );
};
