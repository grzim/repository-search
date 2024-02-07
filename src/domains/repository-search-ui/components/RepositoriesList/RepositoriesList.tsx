import { Repository } from '@ui/models/entities/Repository';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  TableContainer,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { loaderId, tableId } from '@src/test-utils';
import { useTheme } from 'styled-components';
import { TableView } from '@ui-components/RepositoriesList/utils/TableView';
import { ListView } from '@ui-components/RepositoriesList/utils/ListView';
import { RepoWithJsx } from '@ui-components/RepositoriesList/utils/types';

export type RepositoriesListProps = {
  repos: RepoWithJsx[];
  isLoading: boolean;
  nameTransform?: (repo: Repository) => ReactNode;
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
    if (isLoading) setNoDataText(`No repos found`);
  }, [isLoading]);

  const theme = useTheme() as Theme;
  const isUpMd = useMediaQuery(theme.breakpoints.up(`md`));
  const RepoView = isUpMd ? TableView : ListView;

  if (isLoading)
    return (
      <Typography data-testid={loaderId}>
        <CircularProgress />
      </Typography>
    );

  if (repos.length === 0) return <Typography>{noDataText}</Typography>;

  return (
    <TableContainer data-testid={tableId} component={Paper}>
      <RepoView repos={repos} />
    </TableContainer>
  );
};
