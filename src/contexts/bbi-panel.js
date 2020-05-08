import React, { createContext, useState, useEffect } from 'react';

const BBiPanelContext = createContext();

export const BBiPanelProvider = ({children}) => {
  const [ bb, setBB ] = useState('');
  const [ selectedBBI, selectBBI ] = useState('');
  const [ tab, setTab ] = useState(0);
  const [ selectedFile, selectFile ] = useState('');

  return (
    <BBiPanelContext.Provider value={{ bb, setBB, selectedBBI, selectBBI, tab, setTab, selectedFile, selectFile }}>
      {children}
    </BBiPanelContext.Provider>
  );
};

export default BBiPanelContext;