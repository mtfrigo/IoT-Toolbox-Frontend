import React, { createContext, useState } from 'react';

//import some service

const MatchingContext = createContext();

export const MatchingProvider = ({children}) => {
  const [selectedRequirements, selectRequirements] = useState([]);

  return (
    <MatchingContext.Provider value={{selectedRequirements, selectRequirements}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;