import React, { createContext, useState } from 'react';

//import some service
import api from '../services/api';

const MatchingContext = createContext();

export const MatchingProvider = ({children}) => {
  const [selectedRequirements, selectRequirements] = useState([]);
  const [selectedBlockDetails, selectBlockDetails] = useState({});
  const [selectedBlocks, selectBlocks] = useState([]);
  const [selectedBBIs, selectBBIs] = useState([]);
  const [ trigger, setTrigger ] = useState(false);
  const [recommendedBlocks, recommendBlocks] = useState([]);

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
    } else {
      const requirements = [...selectedRequirements, requirement];
      selectRequirements(requirements);
    }
  }

  async function getBlockTree(bbs, bb, history) {

    if(!bb.BlockDependencies) {
      const res = await api.get(`/building-blocks/${bb.id}`)
      bb = res.data;
    }

    const alreadySelected = bbs.findIndex(item => item.id === bb.id);

    if(!(alreadySelected >= 0)) {
      bbs = [...bbs, bb];
    } 

    for(const dep of bb.BlockDependencies) {
      history.push(bb.id)
      if(!history.includes(dep.id))
        bbs = await getBlockTree(bbs, dep, history);
    }

    return bbs;
  }

  async function selectBlock(block) {
    const alreadySelected = selectedBlocks.findIndex(item => item.id === block.id);

    let bbs = [];

    if(alreadySelected >= 0) {
      bbs = [block];
    } else {
      bbs = await getBlockTree([], block, []);
    }

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

    let bbs = [block]; 

    if(alreadySelected >= 0) {
      bbs = [block];
    } else {
      bbs = await getBlockTree([], block, []);
    }

    console.log(bbs)

    let newSelectedBlocks = [];

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

    console.log(newSelectedBlocks)

    selectBlocks(newSelectedBlocks);
    
  }

  return (
    <MatchingContext.Provider value={{ getRecommendedBlocks, selectedBBIs, selectBBIs, selectedRequirements, selectRequirements, trigger, selectBlock, selectRequirement, selectBBI, selectedBlockDetails, selectBlockDetails, selectedBlocks, selectBlocks, recommendedBlocks, recommendBlocks}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;