import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ProgressContext from '../../../contexts/progress';
import AdminContext from '../../../contexts/admin';
import MatchingContext from '../../../contexts/matching';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import BBForm from './form'

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

export default function AdminRequirementPage() {
  const classes = useStyles();
  const { setShowBar } = useContext(ProgressContext);
  const { selectedBlocks, selectBlocks } = useContext(MatchingContext);
  const [ selectedBB, selectBB] = useState('');


  const [ bbs, setBBs ] = useState([]);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message } = snack;

  setShowBar(false);


  useEffect(() => {
    getBBs();
  }, [])

  async function getBBs() {
    const res = await api.get('/building-blocks');
    setBBs(res.data)
  }

  function handleClick(bb) {

    selectBB(bb)
  }

  async function handleDelete(req) {
    await api.delete('/building-blocks/' + req.id);
    getBBs();
    setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Block deleted!' });
  }

  const handleOpenSnack = (message)  => {
    setSnack({ open: true, vertical: 'bottom', horizontal: 'right', ...message });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const handleSelectBB = (bb) => {
    selectBB(bb);
  }

  return (
    <div className={classes.root}>

      <BBForm bb={selectedBB} getBBs={getBBs} handleOpenSnack={handleOpenSnack} />

      <div className={classes.bbs}>
      {
        bbs.map((bb, i) => 
          <Paper className={classes.bb} key={i}>
            <Typography component="div" variant="body1">
              {bb.id}
            </Typography>

            <Typography component="div" variant="body2" className={classes.description}>
              {bb.name}
            </Typography>

            <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleSelectBB(bb)}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="add to favorites" onClick={() => handleDelete(bb)}>
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