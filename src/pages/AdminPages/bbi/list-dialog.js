import React, {useEffect, useState, useContext} from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import NewBBIContext from '../../../contexts/new-bbi';
import AdminContext from '../../../contexts/admin';

import api from '../../../services/api';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  bbis: {
    flexGrow: 2,
    width: "100%",
    height: '50%',
    background: '#f1f1f1',
    padding: 20,
    overflow: 'auto',
  },
  bbi: {
    padding: 15,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
  },
  description: {
    padding: 10,
    flexGrow: 2
  },
  edit: {
    color: 'green'
  },
  trash: {
    color: 'red'
  }
});

export default function BBIListDialog(props) {
  const classes = useStyles();
  const [ bbis, setBBIs ] = useState([]);
  const { selectedBBI, selectBBI } = useContext(AdminContext);
  const { openBBIListDialog, setOpenBBIListDialog, selectBBs, selectDeps, selectBBIDeps } = useContext(NewBBIContext);

  useEffect(() => {
    getBBIs()
  }, [selectedBBI])

  async function getBBIs() {
    const res = await api.get('/bbis');
    setBBIs(res.data);
  }

  const handleClose = () => {
    setOpenBBIListDialog(false)
  };

  const handleCancel = () => {
    setOpenBBIListDialog(false)
  };

  function handleClick(bb) {
    selectBBI(bb);
    selectBBs(bb.Implements);
    selectDeps(bb.BlockDependencies);
    selectBBIDeps(bb.BBIDependents);
    getBBIs();
    setOpenBBIListDialog(false);
  }

  async function handleDelete(bbi) {
    const res = await api.delete('/bbis/' + bbi.id);
    getBBIs()
    setOpenBBIListDialog(false);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openBBIListDialog}>
      <DialogTitle id="simple-dialog-title">Select BBI to update or delete</DialogTitle>
      <div className={classes.bbis}>
        {
        bbis.map((bbi, i) => 
          <Paper className={classes.bbi} key={i}>
            <Typography component="div" variant="body1">
              {bbi.id}
            </Typography>

            <Typography component="div" variant="body2" className={classes.description}>
              {bbi.name}
            </Typography>

            <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleClick(bbi)}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="add to favorites" onClick={() => handleDelete(bbi)}>
              <DeleteIcon className={classes.trash} />
            </IconButton>
          </Paper>
        )
      }
       
      </div>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}