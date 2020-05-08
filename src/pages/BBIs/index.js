import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import './styles.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import BlocksContext from '../../contexts/blocks';
import ProgressContext from '../../contexts/progress';
import BBiPanelContext from '../../contexts/bbi-panel';


import BuildingBlockHeader from '../../components/BuildingBlockHeader'
import BBiHeader from '../../components/BBiHeader'
import BBiTab from '../../components/BBiTab'
import BBiPanel from '../../components/BBiPanel'


import BuildIcon from '@material-ui/icons/Build';

import api from '../../services/api'

import { FiFile, FiCode, FiDownload} from 'react-icons/fi';

export default function BBIsPage() {
  const { setActiveStep, setShowBar } = useContext(ProgressContext);
  const { bb, setBB } = useContext(BBiPanelContext)
  const { selectedBBI, selectBBI } = useContext(BBiPanelContext)
  const [ bbis, setBBIs ] = useState([])

  let { id } = useParams();

  useEffect(() => {
    setActiveStep(1);
    setShowBar(true);
    getBB();
  }, [id])

  async function getBB() {
    api.get('/building-blocks/' + id).then(data => {
      setBB(data.data)
      setBBIs(data.data.ImplementedBy)

    })
  }

  return (
    <div className='bbi-page'>

      <div className='header'>
      {
        bb ? <BuildingBlockHeader bb={bb} /> : null
      }
      </div>

      <div className='bbi-content'>
        <div className='bbi-list'>
          <div className="bbi-list-header">
            <Typography variant="body1" color="textPrimary">
              Implemented By:
            </Typography>
          </div>
          <div className="bbi-list-content">
          {
            bbis.length > 0 ?
            bbis.map((bbi) => <Paper key={bbi.id} className="bbi-list-item" onClick={() => selectBBI(bbi)}><div>{bbi.name}</div></Paper>) :
            <Paper className="bbi-list-item" ><div>No BBis for this BB.</div></Paper>
          }
          </div>
        </div>

        {
          selectedBBI ? 
          <div className='bbi-panel'>
            <div className='bbi-panel-header'>
            {
              bbis ? <BBiHeader bbi={bbis[0]} /> : null
            }
            </div>
            <BBiTab />
            <BBiPanel bbis={bbis} />
          </div> :

          <div className='bbi-empty-panel'>
            <Typography variant="body1" color="textPrimary">
              Please select a BBI...
            </Typography>
          </div> 
        }
        
      </div>



    </div>
  )
}