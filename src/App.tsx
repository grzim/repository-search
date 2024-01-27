import React from 'react';
import './App.css';
import { main } from './test-utils/data-test-ids';
import { fetchReactRepos } from './api/facade/fetch-react-repos';

function App() {
  fetchReactRepos();
  return (
    <div data-testid={main}>
      <header>Repository search</header>
    </div>
  );
}

export default App;
