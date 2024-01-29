import styled from 'styled-components';
import { Box } from '@mui/material';
import { themeVariables } from '../../theme';

export const SearchContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${themeVariables.spacingBig};
  padding: ${themeVariables.spacingBig};
`;

export const SearchButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
