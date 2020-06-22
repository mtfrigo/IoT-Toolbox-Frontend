import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import DeleteIcon from '@material-ui/icons/Delete';

import NewMatchContext from '../../../contexts/new-match';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  matchingContainer: {
    flexGrow: '1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row'
  },
  paper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  item: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    cursor: 'pointer'
  },
  itemDesc: {
    flexGrow: 2
  },
  panel: {
    overflow: 'hidden',
    height: '100%',
  },
  trash: {
    color: 'red'
  },

  tabs: {
    height: '48px',
  },

  itemsContainer: {
    flexGrow: 2,
    overflow: 'auto'
  },

  items: {
    height: '100%',
    overflow: 'auto'
  },

  selection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: "65%"
  },

  selected: {
    flexGrow: 2
  },

  selectedHeader: {
    height: 48,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    color: 'rgba(0,0,0,0.54)',
    fontSize: '14px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 500

  },

  

}));

const CapabilitiesPanel = (props) => {
  const classes = useStyles()
  const { items } = props;
  const { selectedCap, selectCap } = useContext(NewMatchContext);
  const { selectedReqs, selectReqs } = useContext(NewMatchContext);

  function handleClick(item) {
    
    selectReqs(item.Solves)
    selectCap(item);
  }

  return (
    <div className={classes.items}>
    {
      items.map((item) => 
        <Paper elevation={3} className={classes.item} key={item.id} onClick={() => handleClick(item)}>{item.name ? item.name : item.description}</Paper>
      )
    }
    </div>
  )
}

const RequirementsPanel = (props) => {
  const classes = useStyles()
  const { items } = props;
  const { selectedReqs, selectReqs } = useContext(NewMatchContext);
  const { reqsCounter, setReqsCounter } = useContext(NewMatchContext);

  function handleSelectReq(req) {
    let selectedIndex = selectedReqs.map(function(x) {return x.id;}).indexOf(req.id);
    let newSelectReqs = selectedReqs;

    if(selectedIndex === -1) {
      newSelectReqs.push(req)
    } 

    selectReqs(newSelectReqs)
    setReqsCounter(newSelectReqs.length)

  }

  return (
    <div className={classes.items}>
    {
      items.map((item) => 
        <Paper elevation={3} className={classes.item} key={item.id} onClick={() => handleSelectReq(item)}>{item.name ? item.name : item.description}</Paper>
      )
    }
    </div>
  )
}

export default function MatchingPanel() {
  const classes = useStyles();
  const [ capabilities, setCapabilities ] = useState([]);
  const [ requirements, setRequirements ] = useState([]);

  const { tab, setTab } = useContext(NewMatchContext);
  const { selectedCap, selectCap } = useContext(NewMatchContext);
  const { selectedReqs, selectReqs } = useContext(NewMatchContext);
  const { reqsCounter, setReqsCounter } = useContext(NewMatchContext);

  useEffect(() =>  {
    getRequirements();
    getCapabilities();
  }, [selectedReqs, reqsCounter])

  async function getRequirements() {
    const res = await api.get('/requirements')
    setRequirements(res.data)
  }

  async function getCapabilities() {
    const res = await api.get('/capability')
    setCapabilities(res.data)
  }

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  function handleDeleteReq(req) {
    let selectedIndex = selectedReqs.map(function(x) {return x.id;}).indexOf(req.id);
    let newSelectedReqs = selectedReqs;

    if(newSelectedReqs.length > 1){
      newSelectedReqs.splice(selectedIndex, 1)
    } else {
      newSelectedReqs = []
    }

    selectReqs(newSelectedReqs)
    setReqsCounter(newSelectedReqs.length)
  }
 
  async function save() {
    let requirements = selectedReqs.map(function(x) {return x.id;})
    const res = await api.post('/capability/' + selectedCap.id, {requirements})
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ViewComfyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Matching
        </Typography>
        <Typography component="h1" variant="h5" color="textSecondary">
          { selectedCap ? selectedCap.name : 'No capability selected'}
        </Typography>
        

      </div>

      <div className={classes.matchingContainer}>
        <div className={classes.selection}>
          <div className={classes.tabs}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab label="CAPABILITIES" />
              <Tab label="REQUIREMENTS" />
            </Tabs>          
          </div>
          <div className={classes.itemsContainer}>
            { tab == 0 ?  <CapabilitiesPanel items={capabilities} /> :  <RequirementsPanel items={requirements} />} 
          </div>
        </div>
        
        <div className={classes.selected}>
          <div className={classes.selectedHeader}>
            <div>selected</div>
          </div>
          <div className={classes.items}>
          {
            selectedReqs.map((req) => 
            <Paper className={classes.item} key={req.id} >
              <div className={classes.itemDesc}>{req.description}</div>
              <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() =>  handleDeleteReq(req)}>
                <DeleteIcon />
              </IconButton>
            </Paper>)
          }
          </div>
        </div>
      </div>

      <div>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => save()}
          >
            Save
        </Button>
      </div>
    </div>
  )
}