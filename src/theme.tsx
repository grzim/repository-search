import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
});

export const themeVariables = {
  spacingBig: `${theme.spacing(2.5)}`,
  background: '#faf9fd',
};

export default theme;
