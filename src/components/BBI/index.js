import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';


import { FiCodesandbox } from 'react-icons/fi';

import Checkbox from '@material-ui/core/Checkbox';
import MatchingContext from '../../contexts/matching';
import BBiPanelContext from '../../contexts/bbi-panel';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    height: 150,
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column', 
    // border: '2px solid rgba(0, 0, 0, 0) '
  },
  header: {

    paddingBottom: 2 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  select: {
    marginLeft: 'auto',
  },
  content: {
    paddingTop: 5,
    paddingBottom: 0,
    flexGrow: 2,
    overflowY: 'hidden',
    overflowX: 'hidden',
    marginTop: 0,
    "&:last-child": {
      paddingBottom: 5
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    paddingTop: 2,
    paddingBottom: 0,
  },
  expandOpen: {
  },
  avatar: {
    backgroundColor: red[500],
    height: 30,
    width: 30,
  },
  justified: {
    justifyContent: 'center',
  },
  item: {
    background: '#f1f1f1',
    color: 'rgba(0, 0, 0, 0.70);',
    margin: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    position: 'relative',
    fontSize: 12,
    width: '110%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 16,
    paddingLeft: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  selected: {
    border: '2px solid rgb(245, 16, 97) !important'
  },
  recommended: {
    border: '2px solid rgb(93, 26, 255)'
  },
  btnSelected: {
    background: '#f1f1f1',
  },
  matched: {
    border: '2px solid rgb(63, 81, 181)'
  },
  bbiName: {
    fontSize: 20,
    textAlign: 'center',
  },
  details: {
    marginLeft: 'auto',
  }
}));

export default function BBICard(props) {
  const classes = useStyles();

  const [selected] = useState(false);
  const [counter, setCounter] = useState(0);

  const { selectedBBIs, selectBBIs, selectedBlocks, selectBBI, trigger } = useContext(MatchingContext);
  const { setBBI } = useContext(BBiPanelContext);

  const { bbi, bb } = props;

  const handleCheckClick = () => {
    selectBBI(bb, bbi);
  };

  
  const isSelected =  selectedBlocks.filter(item => item.id === bb.id).length ?  //selectedBlocks.filter(item => item.id === bb.id)[0].selectedBBIs.findIndex(item => item.id === bbi.id) >= 0
                        selectedBlocks.filter(item => item.id === bb.id)[0].selectedBBIs.length ? 
                          selectedBlocks.filter(item => item.id === bb.id)[0].selectedBBIs.findIndex(item => item.id === bbi.id) >= 0  :  
                          false :
                      false


  return (
    <Card className={clsx(classes.root, {[classes.selected]: isSelected})}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <FiCodesandbox />
          </Avatar>
        }
        action={
          <Checkbox
            className={classes.select}
            onClick={handleCheckClick}
            aria-expanded={selected}
            aria-label="show more"
            checked={isSelected}
          />
        }
        className={classes.header}
      />
      <CardContent className={clsx(classes.content)} >
        <div className={classes.bbiName}>{bbi.name}</div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" className={classes.details} onClick={() => setBBI(bbi)}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}