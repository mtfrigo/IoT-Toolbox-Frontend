import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const RequirementsContext = createContext();

export const RequirementsProvider = ({children}) => {
  const [ requirements, setRequirements ] = useState([]);

  useEffect(() => {
    getRequirements();
  }, [])

  async function getRequirements() {
    const res = await api.get('/requirements');
    setRequirements(res.data)
  }

  return (
    <RequirementsContext.Provider value={{ requirements, setRequirements }}>
      {children}
    </RequirementsContext.Provider>
  );
};

export default RequirementsContext;