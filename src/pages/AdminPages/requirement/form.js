import React, {useEffect, useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import SettingsIcon from '@material-ui/icons/Settings';

import AdminContext from '../../../contexts/admin';


import api from '../../../services/api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyConten: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(1, 0, 0),
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const [ description, setDescription ] = useState('');
  const [ reference, setReference ] = useState('');
  const { selectedReq, selectReq } = useContext(AdminContext);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    if(!!selectedReq) {
      setDescription(selectedReq.description)
      setReference(selectedReq.reference)
    }
  }, [selectedReq])

  async function handleSubmit(event) {
    event.preventDefault();

    let req = {
      id: !!selectedReq ? selectedReq.id : null,
      reference: reference,
      description: description,
    }

    if(!!selectedReq) {
      const res = await api.put('requirements/' + req.id , req);
      if(res.statusText === "OK") {
        setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Requeriment updated!' });
        clear()
      };
    } else {
      const res = await api.post('/requirements', req);
      if(res.statusText === "OK") {
        setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'Requeriment created!' });
        clear();
      }
    }
  }

 

  function clear() {
    selectReq('');
    setDescription('');
    setReference('');
  }

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Requirement {selectedReq ? '#' + selectedReq.id : ''}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Reference"
                name="email"
                autoComplete="email"
                value={reference} onChange={e => setReference(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Description"
                id="password"
                autoComplete="current-password"
                value={description} onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => clear()}
          >
            Clear
          </Button>
        </form>
      </div>

    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`}>
      <Alert onClose={handleCloseSnack} severity="success">
        {message}
      </Alert>
    </Snackbar>
    </Container>
  );
}