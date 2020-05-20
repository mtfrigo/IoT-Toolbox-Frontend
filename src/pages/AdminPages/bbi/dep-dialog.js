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

export default function DepDialog(props) {
  const classes = useStyles();
  const [ deps, setDeps ] = useState([]);
  const { selectedDeps, selectDeps } = useContext(NewBBIContext);
  const { openDepDialog, setOpenDepDialog } = useContext(NewBBIContext);

  useEffect(() => {
    getDeps()
  }, [])

  async function getDeps() {

    const res = await api.get('/bbis-dependencies');
    setDeps(res.data);
  }

  const handleClose = () => {
    setOpenDepDialog(false)
  };

  const handleCancel = () => {
    setOpenDepDialog(false)
  };

  const handleListItemClick = (value) => {

    let selectedIndex = selectedDeps.map(function(x) {return x.id;}).indexOf(value.id);
    let newSelectedDeps = selectedDeps;

    if(selectedIndex === -1) {
      newSelectedDeps.push(value)
    } else if(selectedDeps.length > 1){
      newSelectedDeps.splice(selectedIndex, 1)
    } else {
      newSelectedDeps = []
    }

    selectDeps(newSelectedDeps)
    setOpenDepDialog(false)

  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDepDialog}>
      <DialogTitle id="simple-dialog-title">Select dependency</DialogTitle>
      <List>
        {
        deps.map((dep) => {
          return (
            <ListItem button onClick={() => handleListItemClick(dep)} key={dep.id}>
              <ListItemText primary={dep.name} />
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