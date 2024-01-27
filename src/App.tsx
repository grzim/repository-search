import React from 'react';
import './App.css';
import { main } from './test-utils/data-test-ids';
import { fetchReactRepos } from './api/facade/fetch-react-repos';
import { RepositoriesList } from './components/RepositoriesList/RepositoriesList';

function App() {
  fetchReactRepos();
  return (
    <div data-testid={main}>
      <header>Repository search</header>
      <RepositoriesList />
    </div>
  );
}

export default App;
