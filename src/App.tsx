import React from 'react';
import { mainId } from './test-utils/data-test-ids';
import { RepositoriesContainer } from './components/RepositoriesContainer/RepositoriesContainer';
import styled from 'styled-components';
import { Theme, Typography } from '@mui/material';
import { GlobalProvider } from './GlobalProvider';

const HeaderContainer = styled.header<{ theme: Theme }>(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

function App() {
  return (
    <GlobalProvider>
      <div data-testid={mainId}>
        <HeaderContainer>
          <Typography variant="h4" component="h1" color="primary">
            Repository search
          </Typography>
        </HeaderContainer>
        <RepositoriesContainer />
      </div>
    </GlobalProvider>
  );
}

export default App;
