import React, { createContext, useState, useEffect } from 'react';

const NewBBIContext = createContext();

export const NewBBIProvider = ({children}) => {
  const [ openBBIDepDialog, setOpenBBIDepDialog ] = useState(false);
  const [ selectedBBIDeps, selectBBIDeps ] = useState([]);

  const [ openDepDialog, setOpenDepDialog ] = useState(false);
  const [ selectedDeps, selectDeps ] = useState([]);

  const [ openBBDialog, setOpenBBDialog ] = useState(false);
  const [ selectedBBs, selectBBs ] = useState([]);

  return (
    < NewBBIContext.Provider value={{ openBBDialog, setOpenBBDialog, selectedBBs, selectBBs, openBBIDepDialog, setOpenBBIDepDialog, selectedBBIDeps, selectBBIDeps, openDepDialog, setOpenDepDialog, selectedDeps, selectDeps }}>
      {children}
    </NewBBIContext.Provider>
  );
};

export default NewBBIContext;