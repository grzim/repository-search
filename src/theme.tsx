import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export const themeVariables = {
  spacingBig: `${theme.spacing(2.5)}`,
};

export default theme;
