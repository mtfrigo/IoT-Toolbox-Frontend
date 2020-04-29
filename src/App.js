import React from 'react';
import './global.css';
import Routes from './routes';

import { ProgressProvider } from './contexts/progress'

function App() {

  return (
    <ProgressProvider>
      <Routes />
    </ProgressProvider>
  );

}

export default App;
