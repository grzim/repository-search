import { Link, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { getForks, getStargazers } from '@ui-components/RepositoriesList';
import { RepoWithJsx } from '@ui-components/RepositoriesList/utils/types';

export const ListView = ({ repos }: { repos: RepoWithJsx[] }) => (
  <List>
    {repos.map((repo) => (
      <ListItem key={repo.url} alignItems="flex-start">
        <ListItemText
          primary={
            <Link href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </Link>
          }
          secondary={
            <React.Fragment>
              {getStargazers(repo)} {getForks(repo)}
            </React.Fragment>
          }
        />
      </ListItem>
    ))}
  </List>
);
