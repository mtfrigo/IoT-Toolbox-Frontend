import React, { createContext, useState, useEffect } from 'react';

const NewBBContext = createContext();

export const NewBBProvider = ({children}) => {
  const [ openDepDialog, setOpenDepDialog ] = useState(false);
  const [ openCapDialog, setOpenCapDialog ] = useState(false);

  const [ selectedBBs, selectBBs ] = useState([]);
  const [ selectedCaps, selectCaps ] = useState([]);

  return (
    < NewBBContext.Provider value={{ openDepDialog, setOpenDepDialog, openCapDialog, setOpenCapDialog, selectedBBs, selectBBs, selectedCaps, selectCaps }}>
      {children}
    </NewBBContext.Provider>
  );
};

export default NewBBContext;