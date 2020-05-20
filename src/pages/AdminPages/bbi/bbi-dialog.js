import React, {useEffect, useState, useContext} from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import NewBBIContext from '../../../contexts/new-bbi';

import api from '../../../services/api';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function BBIDepDialog(props) {
  const classes = useStyles();
  const [ bbis, setBBIs ] = useState([]);
  const { selectedBBIDeps, selectBBIDeps } = useContext(NewBBIContext);
  const { openBBIDepDialog, setOpenBBIDepDialog } = useContext(NewBBIContext);

  useEffect(() => {
    getBBIs()
  }, [])

  async function getBBIs() {

    const res = await api.get('/bbis');
    setBBIs(res.data);
  }

  const handleClose = () => {
    setOpenBBIDepDialog(false)
  };

  const handleCancel = () => {
    setOpenBBIDepDialog(false)
  };

  const handleListItemClick = (value) => {

    let selectedIndex = selectedBBIDeps.map(function(x) {return x.id;}).indexOf(value.id);
    let newSelectBBIDeps = selectedBBIDeps;

    if(selectedIndex === -1) {
      newSelectBBIDeps.push(value)
    } else if(selectedBBIDeps.length > 1){
      newSelectBBIDeps.splice(selectedIndex, 1)
    } else {
      newSelectBBIDeps = []
    }

    selectBBIDeps(newSelectBBIDeps)
    setOpenBBIDepDialog(false)

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openBBIDepDialog}>
      <DialogTitle id="simple-dialog-title">Select BBI dependency</DialogTitle>
      <List>
        {
        bbis.map((bbi) => {
          return (
            <ListItem button onClick={() => handleListItemClick(bbi)} key={bbi.id}>
              <ListItemText primary={bbi.name} />
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