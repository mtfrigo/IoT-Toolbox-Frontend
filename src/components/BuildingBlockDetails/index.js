import React from 'react';

import { makeStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CallSplitIcon from '@material-ui/icons/CallSplit';


import MatchingContext from '../../contexts/matching';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    padding: 0
  },
  media: {
    height: 100,
  },
  panelHeader: {
    display: 'flex',
  },
  infoButton: {
    background: '#f1f1f1',
    padding: 16,
    paddingLeft: 26,
    left: -20
  },
  infoTitle: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    background: '#f1f1f1',
    margin: '15px 0',
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 15,
    left: -30,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15 
  },
  infoItem: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    background: '#f1f1f1',
    margin: '2px 0',
    position: 'relative',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    paddingRight: 15,
    right: -30,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15 

  }
}));




export default function BuildingBlockDetails(props) {
  const classes = useStyles();

  const { selectBlock } = React.useContext(MatchingContext);

  const bb = props.bb;

  const infos = [
    { title: 'Capabilities', icon: <BuildIcon />, items: bb.BlockCapabilities, zero: 'This  BB has no capabilities'},
    { title: 'Dependencies', icon: <MergeTypeIcon />, items: bb.BlockDependencies, zero: 'This  BB has no dependencies'},
    { title: 'Dependents', icon: <CallSplitIcon />, items: bb.DependentBlocks, zero: 'No blocks depents on this'}
  ]

  function handleClose() {
    selectBlock({})
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <IconButton aria-label="settings" style={{marginRight: 'auto'}} onClick={handleClose}>
            <CloseIcon  />
          </IconButton>
        }
        title={bb.type}
        className={classes.header}
      />
      <CardMedia
        className={classes.media}
        image="https://images-na.ssl-images-amazon.com/images/I/71pq6a20wfL._AC_SY450_.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {bb.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            {bb.description}
        </Typography>
      </CardContent>
      <div className={classes.panel}>
        {
          infos.map((info, i) => 
          <div key={i}>
            <div className={classes.panelHeader}>
              <IconButton aria-label="previous" className={classes.infoButton}>
                {info.icon}
              </IconButton>
              <div className={classes.infoTitle}>
                {info.title}
              </div>
            </div>
            <div className={classes.panelContent}>
              {
                info.items.length ?  
                  info.items.map((item, j) => <div key={j} className={classes.infoItem}>{item.name}</div>) : 
                  <div className={classes.infoItem} style={{background: 'rgb(255, 226, 236)', color: 'red'}}>{info.zero}</div>
              }
            </div>
          </div>
          )
        }
        
      </div>
    </Card>
  );

}