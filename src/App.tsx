import React from 'react';
import './App.css';
import { main } from './test-utils/data-test-ids';

function App() {
  return (
    <div data-testid={main}>
      <header>Repository search</header>
    </div>
  );
}

export default App;
