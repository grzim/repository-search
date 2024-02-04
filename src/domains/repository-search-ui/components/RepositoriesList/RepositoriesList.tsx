import { Repository } from '@ui/models/entities/Repository';
import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { loaderId, tableId } from '@src/test-utils';

export type RepositoriesListProps = {
  repos: Repository[];
  isLoading: boolean;
};
export const getStargazers = (repo: Repository) => `🌟 ` + repo.stargazers;
export const getForks = (repo: Repository) => `🍴 ` + repo.forks;
export const RepositoriesList: React.FC<RepositoriesListProps> = ({
  repos,
  isLoading,
}) => {
  const [noDataText, setNoDataText] = useState(`Use search to fetch repos`);
  useEffect(() => {
    // after first search change the text
    isLoading && setNoDataText(`No repos found`);
  }, [isLoading]);

  if (isLoading)
    return (
      <Typography data-testid={loaderId}>
        <CircularProgress />
      </Typography>
    );

  if (repos.length === 0) return <Typography>{noDataText}</Typography>;

  return (
    <TableContainer data-testid={tableId} component={Paper}>
      <Table>
        <TableBody>
          {repos.map((repo) => (
            <TableRow key={repo.url}>
              <TableCell
                component="th"
                scope="row"
                style={{
                  overflow: `hidden`,
                  textOverflow: `ellipsis`,
                  whiteSpace: `nowrap`,
                  width: 415,
                  maxWidth: 415,
                }}
              >
                <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </Link>
              </TableCell>
              <TableCell align="right"> {getStargazers(repo)} </TableCell>
              <TableCell align="right"> {getForks(repo)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
