import React from 'react';
import './App.css';
import { mainId } from './test-utils/data-test-ids';
import { RepositoriesContainer } from './components/RepositoriesContainer/RepositoriesContainer';
import theme from './theme';
import styled, { ThemeProvider } from 'styled-components';
import { Theme, Typography } from '@mui/material';

const HeaderContainer = styled.header<{ theme: Theme }>(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div data-testid={mainId}>
        <HeaderContainer>
          <Typography variant="h4" component="h1" color="primary">
            Repository search
          </Typography>
        </HeaderContainer>
        <RepositoriesContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
