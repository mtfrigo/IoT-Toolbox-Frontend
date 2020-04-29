import React, { useContext, useEffect } from 'react';

import './styles.css';

import Paper from '@material-ui/core/Paper';


import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';

export default function BuildingBlocksPage() {

  const { step, setStep } = useContext(ProgressContext);
  const { selectedRequirements, selectRequirements } = useContext(MatchingContext);

  
  useEffect(() => {
    console.log(selectedRequirements)
    setStep(1)
  }, [])


  return (
    <div className="bb-container">
      <Paper className="bb-item">
        <div>
          <div></div>
          <div>Occupancy Sensor</div>
        </div>
      </Paper>
    </div>
  )
}