import React, { useContext, useEffect } from 'react';

import './styles.css';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';
import BlocksContext from '../../contexts/blocks';

import BuildingBlockCard from '../../components/BuildingBlock'
import BuildingBlockDetails from '../../components/BuildingBlockDetails'



export default function BuildingBlocksPage() {

  const { setActiveStep, setShowBar } = useContext(ProgressContext);
  const { selectedBlock } = useContext(MatchingContext);
  const { buildingBlocks } = useContext(BlocksContext);

  useEffect(() => {
    setActiveStep(1);
    setShowBar(true);
  })

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