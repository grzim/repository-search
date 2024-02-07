import { Link, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { getForks, getStargazers } from '@ui-components/RepositoriesList';
import { RepoWithJsx } from '@ui-components/RepositoriesList/utils/types';

export const TableView = ({ repos }: { repos: RepoWithJsx[] }) => (
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
);
