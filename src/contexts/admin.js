import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const AdminContext = createContext();

export const AdminProvider = ({children}) => {
  const [ selectedReq, selectReq ] = useState('');

  return (
    <AdminContext.Provider value={{ selectedReq, selectReq }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;