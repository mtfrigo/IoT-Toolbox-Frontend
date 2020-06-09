import React, { useContext, useEffect, useState } from 'react';

import './styles.css';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';
import BlocksContext from '../../contexts/blocks';

import BuildingBlockCard from '../../components/BuildingBlock'
import BuildingBlockDetails from '../../components/BuildingBlockDetails'
import ProgressBar from '../../components/ProgressBar'

import api from '../../services/api';

export default function BuildingBlocksPage() {

  const { setActiveStep } = useContext(ProgressContext);
  const { getRecommendedBlocks, recommendedBlocks, selectedBlock } = useContext(MatchingContext);
  // const { buildingBlocks } = useContext(BlocksContext);
  const [ buildingBlocks, setBBs ] = useState([]);

  

  useEffect(() => {
    setActiveStep(1);
    getRecommendedBlocks();
    getBuildingBlocks();
  }, [])


  async function getBuildingBlocks() {
    const res = await api.get('/building-blocks');
    setBBs(res.data)
  }



  return (
    <div className="bb-page-parent">
      <ProgressBar />

      <div className='bb-page'>
        <div className="bb-container">
        {
          buildingBlocks.map((bb) => {
          return (
            <BuildingBlockCard key={bb.id} bb={bb} recommended={recommendedBlocks.includes(bb.id)}/>
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
  </div>

  )
}