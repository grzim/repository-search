import React from 'react';
import './App.css';
import { main } from './test-utils/data-test-ids';
import { RepositoriesContainer } from './components/RepositoriesContainer/RepositoriesContainer';

function App() {
  return (
    <div data-testid={main}>
      <header>Repository search</header>
      <RepositoriesContainer />
    </div>
  );
}

export default App;
