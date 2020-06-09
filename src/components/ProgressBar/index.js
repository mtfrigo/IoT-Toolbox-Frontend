import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';


import Check from '@material-ui/icons/Check';
//import GroupAddIcon from '@material-ui/icons/GroupAdd';
//import MemoryIcon from '@material-ui/icons/Memory';
//import NetworkWifiIcon from '@material-ui/icons/NetworkWifi';
//import PowerIcon from '@material-ui/icons/Power';
//import StorageIcon from '@material-ui/icons/Storage';
//import UsbIcon from '@material-ui/icons/Usb';

import ProgressContext from '../../contexts/progress';

import { useHistory } from "react-router-dom";

import './styles.css';


const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const { steps } = useContext(ProgressContext);

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {steps[String(props.icon - 1)].icon}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: '#fff',
  },
  bar: {
    padding: '24px 24px 0px 24px' ,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#ccc',
  },
}));

export default function CustomizedSteppers() {
  const classes = useStyles();
  const { activeStep, setActiveStep, steps, show } = useContext(ProgressContext);
  
  let history = useHistory();

  function redirect(step) {
    switch (step) {
      case 0:
        history.push('/requirements'); break;
      case 1:
        history.push('/bbs'); break;
      case 2:
        history.push('/process-creation'); break;
      default:
        history.push('/');
    }
  }
 
  function handleNext()  {
    var newStep = activeStep + 1;
    setActiveStep(newStep);
    redirect(newStep);
  };

  function handleBack()  {
    var newStep = activeStep - 1;
    setActiveStep(newStep);
    redirect(newStep);
  };

  function handleReset()  {
    var newStep = 0;
    setActiveStep(newStep);
    redirect(newStep);
  };

  return (

    <div>
    {
      true ? (
        <div className={classes.root}>
          <Stepper className={classes.bar} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((step) => (
              <Step key={step.id}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{step.name}</StepLabel>
              </Step>
            ))}
          </Stepper>

          
          <div className="bar-footer">
            {activeStep === steps.length ? (
              <div>
                <div className='buttons-container'>
                  <Button onClick={() => handleReset()} className={classes.button}>
                    Reset
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className='buttons-container'>
                  <Button disabled={activeStep === 0} onClick={() => handleBack()} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext()}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null
    }
    </div>

    
  );
}