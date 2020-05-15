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

import SignUp from './form.js'


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
  requirements: {
    borderTop: '2px solid rgba(0, 0, 0, 0.12)',
    flexGrow: 2,
    width: "100%",
    height: '50%',
    background: '#f1f1f1',
    padding: 20,
    overflow: 'auto',
  },
  req: {
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

export default function AdminRequirementPage() {
  const classes = useStyles();
  const [ requirements, setRequirements ] = useState([]);
  const { setShowBar } = useContext(ProgressContext);
  const { selectReq, selectedReq } = useContext(AdminContext);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });
  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    setShowBar(false);
    getRequirements();
  }, [selectedReq])

  async function getRequirements() {
    const res = await api.get('/requirements');
    setRequirements(res.data)
  }

  function handleClick(req) {
    selectReq(req)
  }

  async function handleDelete(req) {
    const res = await api.delete('/requirements/' + req.id);
    getRequirements();
    setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Requeriment deleted!' });
  }

  const handleOpenSnack = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  

  return (
    <div className={classes.root}>
      <SignUp className={classes.form} />

      <div className={classes.requirements}>
      {
        requirements.map((req, i) => 
          <Paper className={classes.req} key={i}>
            <Typography component="div" variant="body1">
              {req.reference}
            </Typography>

            <Typography component="div" variant="body2" className={classes.description}>
              {req.description}
            </Typography>

            <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleClick(req)}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="add to favorites" onClick={() => handleDelete(req)}>
              <DeleteIcon className={classes.trash} />
            </IconButton>
          </Paper>
        )
      }

      
        
      
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`}>
        <Alert onClose={handleCloseSnack} severity="success">
          {message}
        </Alert>
      </Snackbar>

      

    </div>
  )
}