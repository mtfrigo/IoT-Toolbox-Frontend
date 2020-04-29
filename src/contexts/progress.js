import React, { createContext, useState } from 'react';

//import some service

const ProgressContext = createContext();

export const ProgressProvider = ({children}) => {
  const [step, setStep] = useState(0);

  return (
    <ProgressContext.Provider value={{step, setStep}}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;