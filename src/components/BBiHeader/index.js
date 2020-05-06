import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CallSplitIcon from '@material-ui/icons/CallSplit';


import { red } from '@material-ui/core/colors';


import Avatar from '@material-ui/core/Avatar';

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
}));

export default function BBiGeader(props) {
  const classes = useStyles();

  const bbi = props.bbi;
  console.log(bbi)

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