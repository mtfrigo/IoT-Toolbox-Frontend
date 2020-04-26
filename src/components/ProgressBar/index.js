import React from 'react';

import './styles.css';

import Paper from '@material-ui/core/Paper';

export default function ProgressBar() {
  

  return (
    <div className="progressbar-container">
    
    
      <Paper className="step-box">Requirements Specification</Paper>
      <Paper className="step-box">Building Block Selection</Paper>
      <Paper className="step-box">Process Creation</Paper>
      <Paper className="step-box">Process Execution</Paper>
      <Paper className="step-box">IoT Environment Adaptation</Paper>
      <Paper className="step-box">IoT Environment Retirement</Paper>
    </div>
  )
}