import React, { createContext, useState } from 'react';

import { FiBox} from 'react-icons/fi';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TransformIcon from '@material-ui/icons/Transform';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import WeekendIcon from '@material-ui/icons/Weekend';

//import some service

const ProgressContext = createContext();

export const ProgressProvider = ({children}) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { 
      id: 1, 
      name: 'Requirements Specification', 
      icon: <SettingsIcon />, 
      content: 'Select suitable requirements for your application...'
    },
    { 
      id: 2, 
      name: 'Building Blocks Selection', 
      icon: <FiBox size={24}/>, 
      content: 'Select suitable requirements for your application...'
    },
    { 
      id: 3, 
      name: 'Process Creation', 
      icon: <AccountTreeIcon />, 
      content: 'Select suitable requirements for your application...'
    },
    {
      id: 4, 
      name: 'Process Execution', 
      icon: <PlayCircleOutlineIcon />, 
      content: 'Select suitable requirements for your application...'
    },
    { 
      id: 5, name: 'IoT Environment Adaptation', 
      icon: <TransformIcon />, 
      content: 'Select suitable requirements for your application...'
    },
    { 
      id: 6, 
      name: 'IoT Environment Retirement', 
      icon: <WeekendIcon />, 
      content: 'Select suitable requirements for your application...'
    },
  ];

  return (
    <ProgressContext.Provider value={{activeStep, setActiveStep, steps}}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;