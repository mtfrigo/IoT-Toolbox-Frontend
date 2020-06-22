import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default function ItemListDialog(props) {
  const { open, setOpen, items, selectedItems, setFormData, formData, feature } = props;

  const handleClose = () => {
    setOpen(false)
  };

  const handleListItemClick = (value) => {
    const alreadySelected = selectedItems.findIndex(item => item === value.id);

    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== value.id);
      setFormData({...formData, [feature]: filteredItems});
    } else {
      const items = [...formData[feature], value.id];
      setFormData({...formData, [feature]: items})
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Select block capabilities</DialogTitle>
      <List>
        {
          items.filter(item => !selectedItems.includes(item.id)).map((item) => {
            return (
              <ListItem button onClick={() => handleListItemClick(item)} key={item.id}>
                <ListItemText primary={item.name} />
              </ListItem>
            )
          })
        }
      </List>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}