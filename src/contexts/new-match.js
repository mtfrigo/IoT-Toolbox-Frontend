import React, { createContext, useState } from 'react';

const NewMatchContext = createContext();

export const NewMatchProvider = ({children}) => {
  const [ tab, setTab ] = useState(0);
  const [ selectedCap, selectCap ] = useState('');
  const [ reqsCounter, setReqsCounter ] = useState('');
  const [ selectedReqs, selectReqs ] = useState([]);

  return (
    < NewMatchContext.Provider value={{ selectedCap, selectCap, selectedReqs, selectReqs, tab, setTab, reqsCounter, setReqsCounter  }}>
      {children}
    </NewMatchContext.Provider>
  );
};

export default NewMatchContext;