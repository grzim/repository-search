import styled from 'styled-components';
import { Box, Theme } from '@mui/material';
import { themeVariables } from '@src/theme';

export const SearchContainer = styled(Box)<{ theme: Theme }>`
  display: flex;
  gap: ${themeVariables.spacingBig};
  padding: ${themeVariables.spacingBig};
  ${({ theme }) => `
    ${theme.breakpoints.down(`md`)} {
      flex-direction: column;
    }
  `}
`;

export const SearchButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
