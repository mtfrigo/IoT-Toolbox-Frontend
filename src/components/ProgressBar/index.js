import React from 'react';

import './styles.css';

import Paper from '@material-ui/core/Paper';

import { ProgressStateContext } from '../../context';


export default function ProgressBar() {

  const steps = [
    {id: 0, step: 'Requirements Specification'},
    {id: 1, step: 'Building Block Selection'},
    {id: 2, step: 'Process Creation'},
    {id: 3, step: 'Process Execution'},
    {id: 4, step: 'IoT Environment Adaptation'},
    {id: 5, step: 'IoT Environment Retirement<'}
  ]



  return (
    <ProgressStateContext.Consumer>
    {ctx => {
      return (
       <div className="progressbar-container">
       {
         steps.map((s) => (
          <Paper className={ctx.progress === s.id ? "step-box-selected" : "step-box"} onClick={() => ctx.setProgress(s.id)}>{s.step}</Paper>
         ))
       }
      </div>)
    }}
    </ProgressStateContext.Consumer>
  )
}