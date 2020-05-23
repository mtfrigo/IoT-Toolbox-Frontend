import React, {useEffect, useState, useContext} from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import NewBBIContext from '../../../contexts/new-bbi';

import api from '../../../services/api';


export default function BBImplementedDialog(props) {
  const [ bbs, setBBs ] = useState([]);
  const { selectedBBs, selectBBs } = useContext(NewBBIContext);
  const { openBBDialog, setOpenBBDialog } = useContext(NewBBIContext);

  useEffect(() => {
    getBBs()
  }, [])

  async function getBBs() {

    const res = await api.get('/building-blocks');
    setBBs(res.data);
  }

  const handleClose = () => {
    setOpenBBDialog(false)
  };

  const handleCancel = () => {
    setOpenBBDialog(false)
  };

  const handleListItemClick = (value) => {

    let selectedIndex = selectedBBs.map(function(x) {return x.id;}).indexOf(value.id);
    let newSelectBBs = selectedBBs;

    if(selectedIndex === -1) {
      newSelectBBs.push(value)
    } else if(selectedBBs.length > 1){
      newSelectBBs.splice(selectedIndex, 1)
    } else {
      newSelectBBs = []
    }

    selectBBs(newSelectBBs)
    setOpenBBDialog(false)

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openBBDialog}>
      <DialogTitle id="simple-dialog-title">Select BB</DialogTitle>
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