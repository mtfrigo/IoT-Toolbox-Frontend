import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const BlocksContext = createContext();

export const BlocksProvider = ({children}) => {
  const [ buildingBlocks, setBuildingBlocks ] = useState([]);
  const [ bbis, setBBIs ] = useState([]);

  useEffect(() => {
    getBBs();
    getBBIs();
  }, [])

  async function getBBs() {
    const res = await api.get('/building-blocks');
    setBuildingBlocks(res.data)
  }

  async function getBBIs() {
    const res = await api.get('/bbis');
    setBBIs(res.data)
  }

  return (
    <BlocksContext.Provider value={{ bbis, setBBIs, buildingBlocks, setBuildingBlocks }}>
      {children}
    </BlocksContext.Provider>
  );
};

export default BlocksContext;