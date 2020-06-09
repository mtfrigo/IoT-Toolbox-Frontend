import React, { createContext, useState, useEffect } from 'react';

//import some service
import api from '../services/api';

const MatchingContext = createContext();

export const MatchingProvider = ({children}) => {
  const [selectedRequirements, selectRequirements] = useState([]);
  const [selectedBlock, selectBlock] = useState({});
  const [selectedBlocks, selectBlocks] = useState([]);
  const [selectedBBIs, selectBBIs] = useState([]);
  const [recommendedBlocks, recommendBlocks] = useState([]);

  async function getRecommendedBlocks() {

    const res = await api.get('/matching', {
      params: {
        requirements: selectedRequirements
      }
    });
    recommendBlocks(res.data.map(function(x) { return x.id; }))
  }

  return (
    <MatchingContext.Provider value={{ getRecommendedBlocks, selectedBBIs, selectBBIs, selectedRequirements, selectRequirements, selectedBlock, selectBlock, selectedBlocks, selectBlocks, recommendedBlocks, recommendBlocks}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;