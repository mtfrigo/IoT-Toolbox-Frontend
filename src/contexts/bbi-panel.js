import React, { createContext, useState } from 'react';

const BBiPanelContext = createContext();

export const BBiPanelProvider = ({children}) => {
  const [ bb, setBB ] = useState('');
  const [ bbi, setBBI ] = useState('');
  const [ tab, setTab ] = useState(0);
  const [ selectedFile, selectFile ] = useState('');

  return (
    <BBiPanelContext.Provider value={{ bb, setBB, bbi, setBBI, tab, setTab, selectedFile, selectFile }}>
      {children}
    </BBiPanelContext.Provider>
  );
};

export default BBiPanelContext;