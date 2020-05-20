import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const AdminContext = createContext();

export const AdminProvider = ({children}) => {
  const [ selectedReq, selectReq ] = useState('');
  const [ selectedBB, selectBB ] = useState('');
  const [ selectedBBI, selectBBI ] = useState('');

  return (
    <AdminContext.Provider value={{ selectedReq, selectReq, selectedBB, selectBB, selectedBBI, selectBBI }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;