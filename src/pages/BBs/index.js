import React, { useContext, useEffect, useState } from 'react';

import './styles.css';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';

import BuildingBlockCard from '../../components/BuildingBlock'
import BuildingBlockDetails from '../../components/BuildingBlockDetails'
import ProgressBar from '../../components/ProgressBar'

import Button from '@material-ui/core/Button';

import api from '../../services/api';

export default function BuildingBlocksPage() {

  const { setActiveStep } = useContext(ProgressContext);
  const { updateProjectBlocks, getRecommendedBlocks, recommendedBlocks, selectedBlockDetails, projectBlocks, selectBlocks } = useContext(MatchingContext);
  const [ buildingBlocks, setBBs ] = useState([]);

  useEffect(() => {
    setActiveStep(1);
    getRecommendedBlocks();
    getBuildingBlocks();
  }, [])

  useEffect(() => {
    
  }, [])


  async function getBuildingBlocks() {
    const res = await api.get('/building-blocks');
    setBBs(res.data)
  }



  const handleLoad = () => {
    projectBlocks().then(data => {
      let serializedBBs = data.map(bb => {

        let serializedBBIs = bb.bbis.map(bbi => {
          return {
            id: bbi.bbi.id,
            name: bbi.bbi.name,
            description: bbi.bbi.description,
            selectionType: bbi.selectionType,
            parentId: bbi.parentId,
            instanceId: bbi.instanceId,
          }
        })

        return {
          id: bb.bb.id,
          icon: bb.bb.icon,
          description: bb.bb.description,
          name: bb.bb.name,
          type: bb.bb.type,
          selectionType: bb.selectionType,
          parentId: bb.parentId,
          instanceId: bb.instanceId,
          selectedBBIs: serializedBBIs
        }
      })

      selectBlocks(serializedBBs);
    })
  }

  const handleSave = () => {
    updateProjectBlocks();
  }

  return (
    <div className="bb-page-parent">
      <ProgressBar />
      <div className="bb-page-buttons">
        <Button variant="contained" color="primary"  onClick={handleLoad}>
          Load project selection
        </Button> 
        
        <Button variant="contained" color="secondary"  onClick={handleSave}>
          Save current selection
        </Button> 
      </div>

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
          selectedBlockDetails.id ? 
          <div className="block-details" >
            <BuildingBlockDetails bb={selectedBlockDetails} />
          </div> : null
       }
    </div>
  </div>

  )
}