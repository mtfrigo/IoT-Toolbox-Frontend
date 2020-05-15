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

import CapDialogContext from '../../../contexts/cap-dialog';

import api from '../../../services/api';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function CapabilityDialog(props) {
  const classes = useStyles();
  const [ capabilities, setCapabilities ] = useState([]);
  const { selectedCaps, selectCaps } = useContext(CapDialogContext);
  const [ selectedCapIds, selectCapIds ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const { openDialog, setOpenDialog } = useContext(CapDialogContext);
  //const { onClose, selectedValue, open } = props;
  useEffect(() => {
    getCapabilities()
  }, [selectedCapIds])

  async function getCapabilities() {

    const res = await api.get('/capability');
    setCapabilities(res.data);
  }

  const handleClose = () => {
    setOpenDialog(false)
  };

  const handleCancel = () => {
    setOpenDialog(false)
    //onClose(selectedValue);
  };

  const handleOk = () => {
    setOpenDialog(false)
    //onClose(selectedValue);
  };

  const handleListItemClick = (value) => {

    let selectedIndex = selectedCapIds.indexOf(value.id);

    let newSelectedCaps = selectedCaps;
    let newSelectedCapIds = selectedCapIds;

    if(selectedIndex === -1) {
      newSelectedCaps.push(value)
      newSelectedCapIds.push(value.id)
    } else if(selectedCaps.length > 1){
      newSelectedCaps.splice(selectedIndex, 1)
      newSelectedCapIds.splice(selectedIndex, 1)
    }

    selectCaps(newSelectedCaps)
    selectCapIds(newSelectedCapIds)

  };

  const isSelected = (cap) => selectedCapIds.indexOf(cap.id) !== -1;

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialog}>
      <DialogTitle id="simple-dialog-title">Select block capabilities</DialogTitle>
      <List>
        {capabilities.map((capability) => {
          // const isItemSelected = isSelected(capability);
          return (
            <ListItem button onClick={() => handleListItemClick(capability)} key={capability.id}>
              {/* <Checkbox checked={isItemSelected} /> */}
              <ListItemText primary={capability.name} />
            </ListItem>
          )
        }
        
        )}

        {/* <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}