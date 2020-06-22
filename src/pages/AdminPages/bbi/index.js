import React, { useState, useEffect, useContext } from 'react';

// Material Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

//Material Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//Material Style
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Contexts
import ProgressContext from '../../../contexts/progress';

import api from '../../../services/api';

import BBIForm from './form'

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
  },
  header: {
    padding: '10px 20px',
    fontSize: 14
  }
}));

const BBCard = (props) => {
  const { bbi, handleDelete, handleSelectBBI } = props;
  const classes = useCardStyles();
  
  return (
    <Card className={classes.root}>
      <Typography variant="caption" component="h2" gutterBottom className={classes.header}>
      {bbi.id + ': ' +bbi.name}
      </Typography>
      
      <CardActions >
        <IconButton aria-label="add to favorites" className={classes.edit} onClick={() => handleSelectBBI(bbi)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="share" className={classes.trash} style={{marginLeft: 'auto'}} onClick={() => handleDelete(bbi)}>
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
    height: '50%'
  },
  bbis: {
    flexGrow: 2,
    width: 330,
    height: '100%',
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
  },
  formContainer: {
    height: '100vh',
    overflow: 'auto',
    width: '100%',
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

      <div className={classes.formContainer}>
        <BBIForm bbi={selectedBBI} bbis={bbis} getBBIs={getBBIs} handleOpenSnack={handleOpenSnack} />
      </div>


      <div className={classes.bbis}>
      {
        bbis.map((bbi, i) => 
          <BBCard bbi={bbi} handleSelectBBI={handleSelectBBI} handleDelete={handleDelete}/>
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