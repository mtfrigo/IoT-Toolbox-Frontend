import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

//import some service
import api from '../services/api';

import { useAuth } from './auth';

const MatchingContext = createContext();

export const MatchingProvider = ({children}) => {
  const [selectedRequirements, selectRequirements] = useState([]);
  const [selectedBlockDetails, selectBlockDetails] = useState({});
  const [selectedBlocks, selectBlocks] = useState([]);
  const [selectedBBIs, selectBBIs] = useState([]);
  const [ trigger, setTrigger ] = useState(false);
  const [recommendedBlocks, recommendBlocks] = useState([]);
  const { updateProjectRequirements, project } = useAuth();

  async function projectRequirements() {
    const res = await api.get(`projects/${project.id}`);
    return res.data.Requirements
  }

  async function projectBlocks() {
    const res = await api.get(`projects/${project.id}`);
    return res.data.bbs
  }

  async function updateProjectBlocks() {

    
    let serializedBlocks = selectedBlocks.map(item => {


      let serializedBBI = item.selectedBBIs?.map(bbi => {
        return {
          id: bbi.id,
          instanceId: bbi.instanceId,
          selectionType: bbi.selectionType
        }
      }) || [];

      return {
        id: item.id,
        instanceId: item.instanceId,
        selectionType: item.selectionType,
        bbis: serializedBBI
      }
    })


    const res = await api.post('projects/blocks', {
      blocks: serializedBlocks,
      id_project: project.id
    })

  }


  async function getRecommendedBlocks() {
    const res = await api.get('/matching', {
      params: {
        requirements: selectedRequirements.map(item => item.id)
      }
    });
    recommendBlocks(res.data.map(function(x) { return x.id; }))
  }

  async function selectRequirement(requirement) {
    const alreadySelected = selectedRequirements.findIndex(item => item.id === requirement.id);

    if(alreadySelected >= 0) {
      const filteredItems = selectedRequirements.filter(item => item.id !== requirement.id);
      selectRequirements(filteredItems);
      updateProjectRequirements(filteredItems);
    } else {
      const requirements = [...selectedRequirements, requirement];
      selectRequirements(requirements);
      updateProjectRequirements(requirements);
    }
  }

  async function getBlockTree(bbs, bb, history) {

    if(!bb.BlockDependencies) {
      let {selectionType, parentBlockId} = bb
      const res = await api.get(`/building-blocks/${bb.id}`)
      bb = res.data;
      bb.selectionType = selectionType;
      bb.parentBlockId = parentBlockId;
      bb.instanceId = uuidv4();
    }

    const alreadySelected = bbs.findIndex(item => item.id === bb.id);

    if((alreadySelected === -1 && bb.selectionType === 'manual') ||  bb.selectionType === 'dependency') {
      bbs = [...bbs, bb];
    } 

    for(const dep of bb.BlockDependencies) {
      history.push(bb.id)
      const depAlreadySelected = selectedBlocks.findIndex(item => item.id === dep.id);
      if(!history.includes(dep.id) && !(depAlreadySelected >= 0 && selectedBlocks[depAlreadySelected].selectionType === 'manual')) {
        dep.selectionType = 'dependency';
        dep.parentBlockId = bb.instanceId;
        bbs = await getBlockTree(bbs, dep, history);
      }
    }

    return bbs;
  }

  async function selectBlock(block) {
    const alreadySelected = selectedBlocks.findIndex(item => item.id === block.id);

    if(alreadySelected >= 0) {
      block = selectedBlocks[alreadySelected];
    } else {
      block.selectionType = "manual";
      block.instanceId = uuidv4();
    }

    if(block.selectionType === 'dependency') return;

    let bbs = await getBlockTree([], block, []);

    let newSelectedBlocks = selectedBlocks;

    for(const bb of bbs) {
      const bbIndex = newSelectedBlocks.findIndex(item => item.id === bb.id);

      if(bbIndex >= 0) {
          const filteredItems = newSelectedBlocks.filter(item => item.id !== bb.id);
          newSelectedBlocks = filteredItems;
      
      } else {
        bb.selectedBBIs = [];
        const newBBs = [...newSelectedBlocks, bb];
        newSelectedBlocks = newBBs;
      }
    }

    selectBlocks(newSelectedBlocks);
  }

  async function selectBBI(block, bbi) {
    const alreadySelected = selectedBlocks.findIndex(item => item.id === block.id);

    if(alreadySelected >= 0) {
      block = selectedBlocks[alreadySelected];

      const bbiAlreadySelected = block.selectedBBIs.findIndex(item => item.id === bbi.id);
        if(bbiAlreadySelected >= 0) {
          bbi = block.selectedBBIs[bbiAlreadySelected];
        } else {
          bbi.selectionType = "manual";
          bbi.instanceId = uuidv4();
        }

    } else {
      block.selectionType = "manual";
      block.instanceId = uuidv4();

      bbi.selectionType = "manual";
      bbi.instanceId = uuidv4();
    }

    let bbs = await getBlockTree([], block, []);

    let newSelectedBlocks = selectedBlocks;

    for(const bb of bbs) {
      const bbIndex = newSelectedBlocks.findIndex(item => item.id === bb.id);

      if(bbIndex >= 0) {
        if(bb.id === block.id ) {
          const bbiAlreadySelected = newSelectedBlocks[bbIndex].selectedBBIs.findIndex(item => item.id === bbi.id);

          if(bbiAlreadySelected >= 0) { 
            const filteredBBIs = newSelectedBlocks[bbIndex].selectedBBIs.filter(item => item.id !== bbi.id);
            newSelectedBlocks[bbIndex].selectedBBIs = filteredBBIs;
          } else {
            const bbis = [...newSelectedBlocks[bbIndex].selectedBBIs, bbi];
  
            newSelectedBlocks[bbIndex].selectedBBIs = bbis;
          }
        } 
      } else {

        if(bb.id === block.id )
          bb.selectedBBIs = [bbi];
        else
          bb.selectedBBIs = [];

        const bbs = [...newSelectedBlocks, bb];
        newSelectedBlocks = bbs;
      }
    }

    selectBlocks(newSelectedBlocks);
    setTrigger(!trigger)
    
  }

  return (
    <MatchingContext.Provider value={{ updateProjectBlocks, projectBlocks, projectRequirements, getRecommendedBlocks, selectedBBIs, selectBBIs, selectedRequirements, selectRequirements, trigger, selectBlock, selectRequirement, selectBBI, selectedBlockDetails, selectBlockDetails, selectedBlocks, selectBlocks, recommendedBlocks, recommendBlocks}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;