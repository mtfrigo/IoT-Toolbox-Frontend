import React, { useContext, useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';
import RequirementsContext from '../../contexts/requirements';
import BlocksContext from '../../contexts/blocks';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import { FiBox, FiCodesandbox } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -6,
    top: 7,
    padding: '0 5px',
  },
}))(Badge);

export default function ProcessCreationPage() {

  const { setActiveStep, setShowBar } = useContext(ProgressContext);

  const { requirements } = useContext(RequirementsContext);

  const { selectedBlocks, selectedRequirements } = useContext(MatchingContext);
    
  setActiveStep(2);
  setShowBar(true);

  async function getRequirementById(id) {
    const res = await api.get('/requirements/' + id)
    return res.data;
  }

  useEffect(() => {
    console.log(selectedBlocks)
  }, [selectedBlocks])

  return (
    <div className="progress-creation-page">

      <div className="counters">
        <Tooltip title="Requirements">
          <IconButton aria-label="requirements" >
            <StyledBadge badgeContent={selectedRequirements.length} color="primary" showZero anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}> 
              <BuildIcon />
            </StyledBadge>
          </IconButton>
        </Tooltip>


        <Tooltip title="BB">
          <IconButton aria-label="building blocks" >
            <StyledBadge badgeContent={selectedBlocks.length} color="primary" showZero anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}> 
              <FiBox />
            </StyledBadge>
          </IconButton>
        </Tooltip>

      </div>

      <div className="description">Before request the process creation, please review carefully your components selection.</div>
      <div className="title">Selection checkout:</div>
      
      <div className="requirements-section">
        <div className="section-header">  
          <BuildIcon />
          <div className="subtitle">Requirements</div>
        </div>

        <div className="requirements-list">
          {
            selectedRequirements.length > 0 ? 
            selectedRequirements.map((req) => {
              return (<div key={req.id} className="requirements-list-item">{req.description}</div>);
            }) : <div className="requirements-list-item">No requirements selected.</div>
          }
        </div>
      </div>
     
    </div>
  )
}