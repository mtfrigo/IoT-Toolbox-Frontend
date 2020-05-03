import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


import ProgressContext from '../../contexts/progress';

import './styles.css';




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
  const active = true;
  const completed = true;
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


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
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
  description: {
    paddingLeft: 60,
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    position: 'relative',
    marginLeft: 12,
    borderColor: '#bdbdbd'

  }
}));

export default function VerticalStepper() {
  const classes = useStyles();
  const { steps } = useContext(ProgressContext);
  
  return (
    <div className={classes.root}>
      <Stepper orientation='vertical'>
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel StepIconComponent={ColorlibStepIcon} alternativeLabel={false}>{step.name}</StepLabel>
            <StepLabel icon={null} ><Typography variant="body2" color="textPrimary" className={classes.description}>{step.description}</Typography></StepLabel>
              
          </Step>
        ))}
      </Stepper>

    </div>
  );
}