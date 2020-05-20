import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ProgressContext from '../../../contexts/progress';
import AdminContext from '../../../contexts/admin';

import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import BBIForm from './form'

import api from '../../../services/api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyConten: 'center',
    height: '100vh',
  },
  form: {
    width: "100%",
    height: '50%'
  },
  bbs: {
    borderTop: '2px solid rgba(0, 0, 0, 0.12)',
    flexGrow: 2,
    width: "100%",
    height: '50%',
    background: '#f1f1f1',
    padding: 20,
    overflow: 'auto',
  },
  bb: {
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

}));

export default function AdminBBIPage() {
  const classes = useStyles();
  const { setShowBar } = useContext(ProgressContext);
  const { selectedBBI, selectBBI } = useContext(AdminContext);
  const [ bbis, setBBIs ] = useState([]);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });
  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    setShowBar(false);
    getBBIs();
  }, [selectedBBI])

  async function getBBIs() {
    const res = await api.get('/bbis');
    setBBIs(res.data)
  }

  function handleClick(bbi) {
    selectBBI(bbi)
  }

  async function handleDelete(req) {
    // const res = await api.delete('/building-blocks/' + req.id);
    // getBBIs();
    // setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Block deleted!' });
  }

  const handleOpenSnack = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  

  return (
    <div className={classes.root}>

      <BBIForm />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`}>
        <Alert onClose={handleCloseSnack} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}