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
  const [show, setShowBar] = useState(false);

  const steps = [
    { 
      id: 1, 
      name: 'Requirements Specification', 
      icon: <SettingsIcon />, 
      content: 'Select suitable requirements for your application...',
      description: 'The  domain experts,  and  their  stakeholders  need  to  define  a  set  of  requirements  for  their application. The toolbox provides a set of predefined requirements that can be select to later show the building blocks that matches the requirements.'
    },
    { 
      id: 2, 
      name: 'Building Blocks Selection', 
      icon: <FiBox size={24}/>, 
      content: 'Select suitable requirements for your application...',
      description: 'Domain  experts  and  involved  stakeholders browse the toolbox and select the building blocks they need to fulfill their requirements.'
    },
    { 
      id: 3, 
      name: 'Process Creation', 
      icon: <AccountTreeIcon />, 
      content: 'Select suitable requirements for your application...',
      description: 'The third step deals with the business process modeling to guide domain experts and involved stakeholders through the process of setting up their IoT environment.'
    },
    {
      id: 4, 
      name: 'Process Execution', 
      icon: <PlayCircleOutlineIcon />, 
      content: 'Select suitable requirements for your application...',
      description: 'The process is then executed in order to realize the setup of the IoT environment.'
    },
    { 
      id: 5, name: 'IoT Environment Adaptation', 
      icon: <TransformIcon />, 
      content: 'Select suitable requirements for your application...',
      description: 'If adaptations are necessary, the feedback loop in our method allows to return to the first step, redefining the requirements of the application, adding or removing requirements.'
    },
    { 
      id: 6, 
      name: 'IoT Environment Retirement', 
      icon: <WeekendIcon />, 
      content: 'Select suitable requirements for your application...',
      description: 'The final step is the retirement of the IoT environment, which is executed oncean IoT application reaches its lifetime.'
    },
  ];


  return (
    <ProgressContext.Provider value={{activeStep, setActiveStep, steps, show, setShowBar}}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;