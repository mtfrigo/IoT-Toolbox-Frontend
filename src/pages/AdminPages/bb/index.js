import React, { useContext, useEffect, useState } from 'react';

// Material Components
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

// Material Style
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

//Material Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Contexts
import ProgressContext from '../../../contexts/progress';

import api from '../../../services/api';

import BBForm from './form'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useCardStyles = makeStyles((theme) => ({
  root: {
    wdith: 300,
    maxWidth: 300,
    margin: '10px 0'
  },
  avatar: {
    backgroundColor: red[500],
  },
  edit: {
    color: 'green'
  },
  trash: {
    color: 'red'
  }
}));

const BBCard = (props) => {
  const { bb, handleDelete, handleSelectBB } = props;
  const classes = useCardStyles();
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {bb.name.charAt(0)}
          </Avatar>
        }
        title={bb.id + ': ' +bb.name}
        subheader={bb.type}
      />
      <CardActions >
        <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleSelectBB(bb)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="share" className={classes.trash} style={{marginLeft: 'auto'}} onClick={() => handleDelete(bb)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyConten: 'center',
    height: '100vh',
  },
  form: {
    width: "100%",
  },
  bbs: {
    flexGrow: 2,
    width: 330,
    height: '100%',
    background: '#f1f1f1',
    padding: 20,
    overflow: 'auto',
    minWidth: 330,
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

export default function AdminBBPage() {
  const classes = useStyles();
  const { setShowBar } = useContext(ProgressContext);
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
          <BBCard bb={bb} handleSelectBB={handleSelectBB} handleDelete={handleDelete}/>
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