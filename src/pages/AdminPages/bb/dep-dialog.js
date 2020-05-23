import React, {useEffect, useState, useContext} from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import NewBBContext from '../../../contexts/new-bb';

import api from '../../../services/api';

export default function DependencyDialog(props) {
  const [ bbs, setBBs ] = useState([]);
  const { selectedBBs, selectBBs } = useContext(NewBBContext);
  const { openDepDialog, setOpenDepDialog } = useContext(NewBBContext);

  useEffect(() => {
    getBBs()
  }, [])

  async function getBBs() {

    const res = await api.get('/building-blocks');
    setBBs(res.data);
  }

  const handleClose = () => {
    setOpenDepDialog(false)
  };

  const handleCancel = () => {
    setOpenDepDialog(false)
  };

  const handleListItemClick = (value) => {

    let selectedIndex = selectedBBs.map(function(x) {return x.id;}).indexOf(value.id);
    let newSelectedBBs = selectedBBs;

    if(selectedIndex === -1) {
      newSelectedBBs.push(value)
    } else if(selectedBBs.length > 1){
      newSelectedBBs.splice(selectedIndex, 1)
    } else {
      newSelectedBBs = []
    }

    selectBBs(newSelectedBBs)
    setOpenDepDialog(false)

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDepDialog}>
      <DialogTitle id="simple-dialog-title">Select block dependency</DialogTitle>
      <List>
        {
        bbs.map((bb) => {
          return (
            <ListItem button onClick={() => handleListItemClick(bb)} key={bb.id}>
              <ListItemText primary={bb.name} />
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