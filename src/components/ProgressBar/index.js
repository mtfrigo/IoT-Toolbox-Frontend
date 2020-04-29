import React, { useContext } from 'react';

import './styles.css';

import Paper from '@material-ui/core/Paper';

import ProgressContext from '../../contexts/progress';


export default function ProgressBar() {

  const { step, setStep } = useContext(ProgressContext);

  const steps = [
    {id: 0, step: 'Requirements Specification'},
    {id: 1, step: 'Building Block Selection'},
    {id: 2, step: 'Process Creation'},
    {id: 3, step: 'Process Execution'},
    {id: 4, step: 'IoT Environment Adaptation'},
    {id: 5, step: 'IoT Environment Retirement'}
  ]

  return (
    <div className="progressbar-container">
    {
      steps.map((s) => (
        <Paper key={s.id} className={step === s.id ? "step-box-selected" : "step-box"} onClick={() => setStep(s.id)}>{s.step}</Paper>
      ))
    }
    </div>
    )
};