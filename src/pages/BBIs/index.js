import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import './styles.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import BlocksContext from '../../contexts/blocks';
import ProgressContext from '../../contexts/progress';

import BuildingBlockHeader from '../../components/BuildingBlockHeader'
import BBiHeader from '../../components/BBiHeader'
import BBiTab from '../../components/BBiTab'

import dummy_code from  '../../services/file'


import BuildIcon from '@material-ui/icons/Build';

import api from '../../services/api'

import { FiFile, FiCode, FiDownload} from 'react-icons/fi';

export default function BBIsPage() {
  const { setActiveStep, setShowBar } = useContext(ProgressContext);
  const [ bb, setBB ] = useState('')
  const [ bbis, setBBIs ] = useState([])

  let { id } = useParams();

  useEffect(() => {
    setActiveStep(1);
    setShowBar(true);
    getBB();
    console.log(dummy_code)
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

      <div className='content'>
        <div className='bbi-list'>
          <div className="bbi-header">
            <Typography variant="body1" color="textPrimary">
              Implemented By:
            </Typography>
          </div>
          <div className="list-content">
          {
            bbis.map((bbi) => <Paper key={bbi.id} className="list-item">{bbi.name}</Paper>)
          }
          </div>
        </div>

        <div className='bbi-panel'>
          <div className='bbi-header'>
          {
            bbis ? <BBiHeader bbi={bbis[0]} /> : null
          }
          </div>
          <BBiTab />
          <div className="bbi-panel-content">
            <div className="bbi-panel-files">
              <Paper elevation={3} className="bbi-file"> 
                <FiFile size={36}/>
                <Typography className="filename" variant="body2" color="textScondary">
                  main.py
                </Typography>
              </Paper>
              <Paper elevation={3} className="bbi-file"> 
                <FiFile size={36}/>
                <Typography className="filename" variant="body2" color="textScondary">
                  main.py
                </Typography>
              </Paper>
              <Paper elevation={3} className="bbi-file"> 
                <FiFile size={36}/>
                <Typography className="filename" variant="body2" color="textScondary">
                  some_script.py
                </Typography>
              </Paper>
              <Paper elevation={3} className="bbi-file"> 
                <FiFile size={36}/>
                <Typography className="filename" variant="body2" color="textScondary">
                  Makefile
                </Typography>
              </Paper>
            </div>
            <div className="bbi-file-preview">
              <div className="bbi-file-preview-container">
                <div className='bbi-file-preview-content'>
                  {dummy_code}
                </div>
              </div>
              <div className="bbi-file-preview-buttons">
                <IconButton aria-label="add to favorites" >
                  <FiDownload />
                </IconButton>
                <IconButton aria-label="add to favorites" >
                  <FiCode />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      
      </div>

    </div>
  )
}