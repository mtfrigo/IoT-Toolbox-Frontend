import React, { useContext, useEffect, useState } from 'react';

import './styles.css';



import api from '../../services/api';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';

import BuildingBlockCard from '../../components/BuildingBlock'
import BuildingBlockDetails from '../../components/BuildingBlockDetails'

export default function BuildingBlocksPage() {

  const { setActiveStep, setShowBar } = useContext(ProgressContext);
  const { selectedRequirements, selectRequirements, selectedBlock, selectBlock } = useContext(MatchingContext);

  const [ buildingBlocks, setBuildingBlocks ] = useState([]);

  useEffect(() => {
    getBuildingBlocks();
    setActiveStep(1);
    setShowBar(true)
  }, [])

  async function getBuildingBlocks() {
    const res = await api.get('/building-blocks');
    setBuildingBlocks(res.data)
  }

  function handleClickBlock() {
    selectBlock({});
  }


  return (
    <div className='bb-page'>
      <div className="bb-container">
      {
        buildingBlocks.map((bb) => {
        return (
          <BuildingBlockCard key={bb.id} bb={bb}/>
        )})
      }

        
     </div>
     {
       selectedBlock.id ? 
        <div className="block-details" >
          <BuildingBlockDetails bb={selectedBlock} />
        </div> : null

     }
  </div>
  )
}