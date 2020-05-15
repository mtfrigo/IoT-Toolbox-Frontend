import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const AdminContext = createContext();

export const AdminProvider = ({children}) => {
  const [ selectedReq, selectReq ] = useState('');
  const [ selectedBB, selectBB ] = useState('');

  return (
    <AdminContext.Provider value={{ selectedReq, selectReq, selectedBB, selectBB }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;