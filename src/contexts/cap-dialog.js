import React, { createContext, useState, useEffect } from 'react';

const CapDialogContext = createContext();

export const CapDialogProvider = ({children}) => {
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ selectedCaps, selectCaps ] = useState([]);


  return (
    <CapDialogContext.Provider value={{ openDialog, setOpenDialog, selectedCaps, selectCaps }}>
      {children}
    </CapDialogContext.Provider>
  );
};

export default CapDialogContext;