import { Repository } from '../models/Repository';
import React, { useEffect, useState } from 'react';
import { fetchReactRepos } from '../api/facade/fetch-react-repos';

export const RepositoriesList: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRepos = await fetchReactRepos(); // Your fetch function
        setRepos(fetchedRepos);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.name}>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
          {' - 🌟 '}
          {repo.stargazers}
          {' - 🍴 '}
          {repo.forks}
        </li>
      ))}
    </ul>
  );
};
