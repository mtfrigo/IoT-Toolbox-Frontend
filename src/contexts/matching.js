import React, { createContext, useState } from 'react';

//import some service

const MatchingContext = createContext();

export const MatchingProvider = ({children}) => {
  const [selectedRequirements, selectRequirements] = useState([]);
  const [selectedBlock, selectBlock] = useState({});

  return (
    <MatchingContext.Provider value={{selectedRequirements, selectRequirements, selectedBlock, selectBlock}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;