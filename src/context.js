import React, { Component, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const { Provider, Consumer } = createContext();


const progressInitialState = { progress: 0, setProgress: undefined };
const reqInitialState = { req: [], setReq: undefined };

const ProgressStateContext = createContext(progressInitialState);
const ReqStateContext = createContext(reqInitialState);

/**
 * Global State provider & hooks
 */
const GlobalStateProvider = ({ children }) => {
  const [progress, setProgress] = React.useState(progressInitialState.progress);
  const [req, setReq] = React.useState(reqInitialState.req);

  function selectReq(reqs) {
    setReq(reqs)

  }



  const progressContextValue = React.useMemo(() => ({progress, setProgress}), [progress]);
  const reqContextValue = React.useMemo(() => ({req, setReq, selectReq}), [req]);

  return (
    <ProgressStateContext.Provider value={progressContextValue}>
      <ReqStateContext.Provider value={reqContextValue}>
          {children}
      </ReqStateContext.Provider>
    </ProgressStateContext.Provider>
  );
};





export { GlobalStateProvider, ProgressStateContext, ReqStateContext };

// I make this default since it will probably be exported most often.
export default Consumer;
