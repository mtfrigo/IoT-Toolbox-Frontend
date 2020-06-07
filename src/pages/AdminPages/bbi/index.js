import React, { useState, useEffect, useContext } from 'react';

// Material Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Material Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//Material Style
import { makeStyles } from '@material-ui/core/styles';

// Contexts
import ProgressContext from '../../../contexts/progress';

import api from '../../../services/api';

import BBIForm from './form'

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
  bbis: {
    borderTop: '2px solid rgba(0, 0, 0, 0.12)',
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

}));

export default function AdminBBIPage() {
  const classes = useStyles();
  const { setShowBar } = useContext(ProgressContext);
  const [ selectedBBI, selectBBI ] = useState('');
  const [ bbis, setBBIs ] = useState([]);

  setShowBar(false);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    getBBIs();
  }, [])

  async function getBBIs() {
    const res = await api.get('/bbis');
    setBBIs(res.data)
  }

  async function handleDelete(bbi) {
    await api.delete('/bbis/' + bbi.id);
    getBBIs();
    setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Block deleted!' });
  }

  const handleOpenSnack = (message)  => {
    setSnack({ open: true, vertical: 'bottom', horizontal: 'right', ...message });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const handleSelectBBI = (bbi) => {
    console.log(bbi)
    selectBBI(bbi);
  }

  return (
    <div className={classes.root}>

      <BBIForm bbi={selectedBBI} bbis={bbis} getBBIs={getBBIs} handleOpenSnack={handleOpenSnack} />


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

            <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleSelectBBI(bbi)}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="add to favorites" onClick={() => handleDelete(bbi)}>
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