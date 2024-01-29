import styled from 'styled-components';
import { Theme } from '@mui/material';
import { themeVariables } from '../../theme';

export const CenteredContainer = styled.div<{ theme: Theme }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: themeVariables.background,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
  maxWidth: '800px',
  width: '100%',
  '& .MuiSelect-select, & .MuiInputBase-input': {
    backgroundColor: 'white',
  },
}));
