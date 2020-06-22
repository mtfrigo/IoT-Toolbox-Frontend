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

  async function selectBlock(bb) {
    const alreadySelected = selectedBlocks.findIndex(item => item.id === bb.id);

    if(alreadySelected >= 0) {
      const filteredItems = selectedBlocks.filter(item => item.id !== bb.id);
      selectBlocks(filteredItems);
    } else {
      bb.selectedBBIs = [];
      const bbs = [...selectedBlocks, bb];
      selectBlocks(bbs);
    }
  }

  async function selectBBI(bb, bbi) {
    const bbAlreadySelected = selectedBlocks.findIndex(item => item.id === bb.id);

    

    if(bbAlreadySelected >= 0) {
      const bbiAlreadySelected = selectedBlocks[bbAlreadySelected].selectedBBIs.findIndex(item => item.id === bbi.id);
      
      
      if(bbiAlreadySelected >= 0) { 
        const filteredItems = selectedBlocks[bbAlreadySelected].selectedBBIs.filter(item => item.id !== bbi.id);
        
        let newBlocks = selectedBlocks;
        newBlocks[bbAlreadySelected].selectedBBIs = filteredItems;

        selectBlocks(newBlocks);
        setTrigger(!trigger);
      } else {
        const bbis = [...selectedBlocks[bbAlreadySelected].selectedBBIs, bbi];

        let newBlocks = selectedBlocks;
        newBlocks[bbAlreadySelected].selectedBBIs = bbis;

        selectBlocks(newBlocks);
        setTrigger(!trigger);
      }
    } else {
      bb.selectedBBIs = [bbi];
      const bbs = [...selectedBlocks, bb];
      selectBlocks(bbs);
    }
  }

  return (
    <MatchingContext.Provider value={{ getRecommendedBlocks, selectedBBIs, selectBBIs, selectedRequirements, selectRequirements, trigger, selectBlock, selectRequirement, selectBBI, selectedBlockDetails, selectBlockDetails, selectedBlocks, selectBlocks, recommendedBlocks, recommendBlocks}}>
      {children}
    </MatchingContext.Provider>
  );
};

export default MatchingContext;