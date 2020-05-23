import React, {useEffect, useState, useContext} from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import NewBBContext from '../../../contexts/new-bb';

import api from '../../../services/api';

export default function CapabilityDialog(props) {
  const [ capabilities, setCapabilities ] = useState([]);
  const { selectedCaps, selectCaps } = useContext(NewBBContext);
  const { openCapDialog, setOpenCapDialog } = useContext(NewBBContext);

  useEffect(() => {
    getCapabilities()
  }, [])

  async function getCapabilities() {

    const res = await api.get('/capability');
    setCapabilities(res.data);
  }

  const handleClose = () => {
    setOpenCapDialog(false)
  };

  const handleCancel = () => {
    setOpenCapDialog(false)
  };

  const handleListItemClick = (value) => {

    // let selectedIndex = selectedCapIds.indexOf(value.id);
    let selectedIndex = selectedCaps.map(function(x) {return x.id;}).indexOf(value.id);
    let newSelectedCaps = selectedCaps;

    if(selectedIndex === -1) {
      newSelectedCaps.push(value)
    } else if(selectedCaps.length > 1){
      newSelectedCaps.splice(selectedIndex, 1)
    } else {
      newSelectedCaps = []
    }

    selectCaps(newSelectedCaps)
    setOpenCapDialog(false)

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openCapDialog}>
      <DialogTitle id="simple-dialog-title">Select block capabilities</DialogTitle>
      <List>
        {
        capabilities.map((capability) => {
          return (
            <ListItem button onClick={() => handleListItemClick(capability)} key={capability.id}>
              <ListItemText primary={capability.name} />
            </ListItem>
          )
        })
        }
       
      </List>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}