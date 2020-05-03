import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const BlocksContext = createContext();

export const BlocksProvider = ({children}) => {
  const [ buildingBlocks, setBuildingBlocks ] = useState([]);

  useEffect(() => {
    getBBs();
  }, [])

  async function getBBs() {
    const res = await api.get('/building-blocks');
    setBuildingBlocks(res.data)
  }

  return (
    <BlocksContext.Provider value={{ buildingBlocks, setBuildingBlocks }}>
      {children}
    </BlocksContext.Provider>
  );
};

export default BlocksContext;