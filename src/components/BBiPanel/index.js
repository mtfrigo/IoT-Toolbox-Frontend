import React, { useEffect, useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextFileReader from  '../../services/file'

import { FiFile, FiCode, FiDownload} from 'react-icons/fi';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Artifacts from '../../assets/artifacts/artifacts.js';

import BBiPanelContext from '../../contexts/bbi-panel';

const useStyles = makeStyles({
  bbiPanelContent: {
    flex: '1 1 auto',
    overflow: 'hidden',
    marginTop: 5,

    display: 'flex',
    flexDirection: 'row',
  },

  bbiPanelFiles: {
    overflow: 'auto',
    width: 120,
    minWidth: 120,

    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bbiPanelFile: {
    width: '80%',
    height: 80,
    minHeight: 80,
    minWidth: 80,
    margin: '10px 0',

    fontSize: 20,
    fontWeight: 500,
    textAlign: 'center',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    cursor: 'pointer',
  },

  filename: {

  },

  bbiFilePreview: {
    flex: '2 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },

  bbiFilePreviewBox: {
    flex: '1 1 auto',

    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#fafafa',

    overflow: 'hidden',
  },

  bbiFilePreviewContent: {
    margin: '10px 5px',
    backgroundColor: 'antiquewhite',
    overflow: 'auto',
    borderRadius: 5,

    flex: '1 1  auto',
    height: "100%",

    color: '#fff',
    backgroundColor: '#272c34',
    lineHeight: '1.5',
    padding: 10,
  },

  bbiFilePreviewContentEmpty: {
    margin: '10px 5px',
    backgroundColor: 'antiquewhite',
    overflow: 'auto',
    borderRadius: 5,

    flex: '1 1  auto',
    height: "100%",

    color: '#fff',
    backgroundColor: '#272c34',
    lineHeight: '1.5',
    padding: 10,
    fontSize: 32,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  bbiFilePreviewButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',

    backgroundColor: '#fafafa',
  }

  
});

export default function BBiPanel(props) {
  const classes = useStyles();
  const { selectedBBI } = useContext(BBiPanelContext)
  const { selectedFile, selectFile } = useContext(BBiPanelContext)
  const { tab } = useContext(BBiPanelContext)
  const [ artifacts, setArtifacts ] = useState([])
  const [ interfaces, setInterfaces ] = useState([])

  useEffect(() => {
    setArtifacts(Artifacts[selectedBBI.id])
  })


  return (
    <div className={classes.bbiPanelContent}>
      <div className={classes.bbiPanelFiles}>
      {
        tab == 0 ?
        artifacts.map((artifact, i) => 
          <Paper key={i} elevation={3} className={classes.bbiPanelFile} onClick={() => selectFile(artifact)}> 
            <FiFile size={36}/>
            <Typography className={classes.filename} variant="body2" color="textPrimary">
              {artifact.name}
            </Typography>
          </Paper> ) :
        <Paper elevation={3} className={classes.bbiPanelFile} > 
          <FiFile size={36}/>
          <Typography className={classes.filename} variant="body2" color="textPrimary">
            interface.wsld
          </Typography>
        </Paper>
        
      }
      </div>

      <div className={classes.bbiFilePreview}>

        <div className={classes.bbiFilePreviewBox}>
        {
          !!selectedFile ?
          <div className={classes.bbiFilePreviewContent}>
            <TextFileReader
              txt={selectedFile.file}
            />
          </div> :
          <div className={classes.bbiFilePreviewContentEmpty}>
            No file selected...
          </div>
        }
          
        </div>

        <div className={classes.bbiFilePreviewButtons}>
          <IconButton aria-label="add to favorites" >
            <FiDownload />
          </IconButton>
          <IconButton aria-label="add to favorites" >
            <FiCode />
          </IconButton>
        </div>

      </div>
    </div>
  );
}