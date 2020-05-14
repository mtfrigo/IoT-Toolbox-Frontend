import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BBiPanelContext from '../../contexts/bbi-panel';

const useStyles = makeStyles({
  root: {
   
  },
});

export default function BBiTab() {
  const classes = useStyles();
  const { tab, setTab } = useContext(BBiPanelContext)

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper square className={classes.root}>
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