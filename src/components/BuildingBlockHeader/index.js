import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 260,
    height: 150,
    background: '#fafafa'
  },
  image: {
    width: 260,
    height: 150,
  },
  details: {
    flexGrow: 2,
    height: 150,
    padding: 20
  }
}));

export default function BuildingBlockHeader(props) {
  const classes = useStyles();

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

    </div>
  );

}