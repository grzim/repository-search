import styled from 'styled-components';
import { Theme } from '@mui/material';

export const CenteredContainer = styled.div<{ theme: Theme }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
  maxWidth: '800px',
  width: '100%',
}));
