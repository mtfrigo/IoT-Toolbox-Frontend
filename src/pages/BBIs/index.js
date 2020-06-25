import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import './styles.css';


import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import BBICard from '../../components/BBI'
import TextFileReader from  '../../components/TextFilePreview'

import ProgressContext from '../../contexts/progress';
import BBiPanelContext from '../../contexts/bbi-panel';
import { useAuth } from '../../contexts/auth';


import { FiFile, FiCode, FiDownload} from 'react-icons/fi';

import api from '../../services/api'


const useBlockHeaderStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTop: '2px solid rgba(0, 0, 0, 0.35)',
    borderRight: '2px solid rgba(0, 0, 0, 0.35)',
    borderLeft: '2px solid rgba(0, 0, 0, 0.35)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  imageContainer: {
    width: 260,
    height: 150,
    background: '#fff',
    borderTopLeftRadius: 5,
  },
  image: {
    width: 260,
    height: 150,
  },
  details: {
    flexGrow: 2,
    height: 150,
    padding: 20,
    
  },
  closeIconContainer: {
    height: '100%'
  },
  closeIcon: {
    position: 'relative',
    top: 0,
    right: 0,
  }
}));

const BuildingBlockHeader = (props) => {
  const classes = useBlockHeaderStyles();

  let history = useHistory();

  const bb = props.bb;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src="https://partner.microsoft.com/-/media/mssc/mpn/partner/solutions/images/iot-opportunity-fwf1-500x281.ashx?h=281&la=pt&w=500&hash=4DE11A5C41F17F3ECF7D0F4D1D4EFE77" className={classes.image} alt=""/>
      </div>

      <div className={classes.details}>
        <Typography variant="h3" color="textSecondary">
          {bb.name}
        </Typography>

        <Typography variant="body1" color="textSecondary">
          Type: {bb.type}
        </Typography>
      </div>

      <div className={classes.closeIconContainer}>
        <IconButton aria-label="add to favorites"  className={classes.closeIcon} onClick={() => history.push('/bbs/')}>
          <CloseIcon />
        </IconButton>
      </div>

    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  image: {
    width: 260,
    height: 150,
  },
  details: {
    flexGrow: 2,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    backgroundColor: red[500],
    marginRight: '15px'
  },

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
    overflow: 'auto',
    borderRadius: 5,

    flex: '1 1  auto',
    height: "100%",
    width: '50vw',

    color: '#fff',
    backgroundColor: '#272c34',
    lineHeight: '1.5',
    padding: 10,
  },

  bbiFilePreviewContentEmpty: {
    margin: '10px 5px',
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
}));

const BBiPanel = (props) => {
  const classes = useStyles();
  const { bbi } = useContext(BBiPanelContext)
  const { selectedFile, selectFile } = useContext(BBiPanelContext)
  const { tab } = useContext(BBiPanelContext)
  const [ artifacts, setArtifacts ] = useState([])
  const [ interfaces, setInterfaces ] = useState([])

  useEffect(() => {
    getBBI();
  }, [bbi]);


  async function getBBI() {
    const res = await api.get(`/bbis/${bbi.id}`);

    res.data.Artifacts.map(async artifact  => {
      await api.get(artifact.fileUrl, {
        responseType: 'blob'
      }).then((response) => {
        const file = new Blob([response.data], { type: "text/plain" });
        artifact.blob = URL.createObjectURL(file);
      })
    })

    res.data.Interfaces.map(async i  => {
      await api.get(i.fileUrl, {
        responseType: 'blob'
      }).then((response) => {
        const file = new Blob([response.data], { type: "text/plain" });
        i.blob = URL.createObjectURL(file);
      })
    })

    setArtifacts(res.data.Artifacts);
    setInterfaces(res.data.Interfaces);
  }

  return (
    <div className={classes.bbiPanelContent}>
      <div className={classes.bbiPanelFiles}>
      {
        tab === 0 ?
        artifacts.map((artifact, i) => 
          <Paper key={i} elevation={3} className={classes.bbiPanelFile} onClick={() => selectFile(artifact.blob)}> 
            <FiFile size={36}/>
            <Typography className={classes.filename} variant="body2" color="textPrimary">
              {artifact.filename.split('-')[1]}
            </Typography>
          </Paper> ) :
        interfaces.map((interfaceFile, i) => 
        <Paper key={i} elevation={3} className={classes.bbiPanelFile} onClick={() => selectFile(interfaceFile.blob)}> 
          <FiFile size={36}/>
          <Typography className={classes.filename} variant="body2" color="textPrimary">
            {interfaceFile.filename.split('-')[1]}
          </Typography>
        </Paper> )
        
      }
      </div>

      <div className={classes.bbiFilePreview}>
        <div className={classes.bbiFilePreviewBox}>
        {
          !!selectedFile ? 
          <div className={classes.bbiFilePreviewContent}>
            <TextFileReader txt={selectedFile}
            />
          </div> : 
          <div className={classes.bbiFilePreviewContentEmpty}>
            'No file selected...'
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

const BBiHeader = (props) => {
  const classes = useStyles();

  const bbi = props.bbi;

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <div className={classes.title}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {!!bbi ? bbi.name.charAt(0) : 'X'}
          </Avatar>
          <Typography variant="h4" color="textPrimary">
            {!!bbi ? bbi.name : 'xesq'}
          </Typography>
        </div>

        <Typography variant="body2" color="textSecondary">
          {!!bbi ? bbi.description : 'xesq'}
        </Typography>
        
        
      </div>

    </div>
  );
}

const BBiTab = (props) => {
  const { tab, setTab } = useContext(BBiPanelContext)

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="ARTIFACTS" />
        <Tab label="INTERFACES" />
      </Tabs>
    </Paper>
  );
}


export default function BBIsPage() {
  const { setActiveStep, setShowBar } = useContext(ProgressContext);
  const { bb, setBB } = useContext(BBiPanelContext)
  const { bbi, setBBI } = useContext(BBiPanelContext)
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
        <div className='bbi-page-header'>
        {
          bb ? <BuildingBlockHeader bb={bb} /> : null
        }
        </div>

        <div className='bbi-content'>
          <div className='bbi-list'>
            <div className="bbi-list-header">
              <Typography variant="body1" color="textSecondary">
                Implemented By:
              </Typography>
            </div>
            <div className="bbi-list-content">
            {
              bbis.length > 0 ?
              bbis.map((bbi) => <BBICard bbi={bbi} bb={bb} key={bbi.id} className="bbi-list-item"/>) :
              <Paper className="bbi-list-item" ><div>No BBis for this BB.</div></Paper>
            }
            </div>
          </div>

          {
            bbi ? 
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