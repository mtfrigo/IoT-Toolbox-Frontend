import React, { useContext, useEffect, useState } from 'react';

import './styles.css';

import Paper from '@material-ui/core/Paper';

import api from '../../services/api';


import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';

export default function BuildingBlocksPage() {

  const { activeStep, setActiveStep } = useContext(ProgressContext);
  const { selectedRequirements, selectRequirements } = useContext(MatchingContext);

  const [ buildingBlocks, setBuildingBlocks ] = useState('');

  useEffect(() => {
    getBuildingBlocks();
    setActiveStep(1)
  }, [])

  async function getBuildingBlocks() {
    const res = await api.get('/building-blocks');
    setBuildingBlocks(res.data)
    console.log(res.data)
  }


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