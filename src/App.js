import React from 'react';
import './global.css';
import Routes from './routes/index';

import { ProgressProvider } from './contexts/progress';
import { AuthProvider } from './contexts/auth';

function App() {

  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes />
      </ProgressProvider>
    </AuthProvider>
  );

}

export default App;
