import React from 'react';
import { mainId } from '@src/test-utils';
import styled from 'styled-components';
import { Theme, Typography } from '@mui/material';
import { GlobalProvider } from './GlobalProvider';
import { RepositoriesContainer } from '@ui-components/RepositoriesContainer/RepositoriesContainer';

const HeaderContainer = styled.header<{ theme: Theme }>(({ theme }) => ({
  textAlign: `center`,
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
          <RepositoriesContainer />
        </HeaderContainer>
      </div>
    </GlobalProvider>
  );
}

export default App;
