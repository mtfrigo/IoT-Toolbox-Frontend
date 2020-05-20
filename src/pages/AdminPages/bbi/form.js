import React, {useEffect, useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import AdminContext from '../../../contexts/admin';
import NewBBIContext from '../../../contexts/new-bbi';

import { TextareaAutosize } from '@material-ui/core';

// import CapabilityDialog from './cap-dialog'
import BBIDepDialog from './bbi-dialog'
import DepDialog from './dep-dialog'
import BBImplementedDialog from './bb-dialog'
import BBIListDialog from './list-dialog'

import api from '../../../services/api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
  description: {
    width: '100%',
    padding: theme.spacing(1, 1, 1),
    borderRadius: 4
  },
  formField: {
    background: 'white'
  },
  formGroup: {
    margin: theme.spacing(1, 0, 0),
    maxWidth: 400,
    height: '100%',

  },
  xesq: {
    margin: theme.spacing(1, 0, 0),
    maxWidth: 400,
  },
  formGroupLabel: {
    maxHeight: 18,
    margin: theme.spacing(0, 1, 0),
  },
  fullWidthItem: {
    width: '100%'
  },
  capability: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  capName: {
    flexGrow: 2
  },
  trash: {
    color: 'red'
  },
  formButtons: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    marginTop: 50
  }

}));

export default function BBIForm(props) {
  const classes = useStyles();
  const [ description, setDescription ] = useState('');
  const [ name, setName ] = useState('');

  const { selectedBBI, selectBBI } = useContext(AdminContext);

  const { openBBIDepDialog, setOpenBBIDepDialog } = useContext(NewBBIContext);
  const { selectedBBIDeps, selectBBIDeps } = useContext(NewBBIContext);
  const [ BBIsDepsCounter, setBBIsDepsCounter ] = useState(0);

  const { openDepDialog, setOpenDepDialog } = useContext(NewBBIContext);
  const { selectedDeps, selectDeps } = useContext(NewBBIContext);
  const [ depsCounter, setDepsCounter ] = useState(0);

  const { openBBDialog, setOpenBBDialog } = useContext(NewBBIContext);
  const { selectedBBs, selectBBs } = useContext(NewBBIContext);
  const [ BBsCounter, setBBsCounter ] = useState(0);

  const { openBBIListDialog, setOpenBBIListDialog } = useContext(NewBBIContext);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    if(!!selectedBBI) {
      setDescription(selectedBBI.description)
      setName(selectedBBI.name)
    }
  }, [selectedBBI])

  async function handleSubmit(event) {
    event.preventDefault();

    let bbi = {
      id: !!selectedBBI ? selectedBBI.id : null,
      name: name,
      description: description,
    }

    let res;

    if(!!selectedBBI) {
      res = await api.put('/bbis/'  + bbi.id , bbi);
      setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'BBI Updated!' });

    } else {
      res = await api.post('/bbis', bbi);
      setSnack({ open: true, vertical: 'bottom', horizontal: 'right', message: 'BBI created!' });
    }


    if(res.statusText === "OK") {
      let bbiDeps = selectedBBIDeps.length > 0 ? selectedBBIDeps.map(function(c) {return c.id;}) : [];
      await api.post('/bbi-dependents/' + res.data.id, {bbiDeps})

      let deps = selectedDeps.length > 0 ? selectedDeps.map(function(b) {return b.id;}) : []
      await api.post('/bbi-dependencies/' + res.data.id, {deps})

      let bbs = selectedBBs.length > 0 ? selectedBBs.map(function(b) {return b.id;}) : []
      await api.post('/bbi-implements/' + res.data.id, {bbs})

      clear();
    }

  }

  function clear() {
    selectBBI('');
    setDescription('');
    setName('');
    
    selectBBIDeps([])
    selectDeps([])
    selectBBs([])
  }

  function showList() {
    setOpenBBIListDialog(true);

  };

  const handleOpenSnack = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  //BBI Dependency
  const handleNewBBIDependency = () => {
    setOpenBBIDepDialog(true);
  };

  const handleCloseBBIDependency = () => {
    setOpenBBIDepDialog(false);
  };

  function handleDeleteBBIDependency(dep) {

    let selectedIndex = selectedBBIDeps.map(function(c) {return c.id; }).indexOf(dep.id);
    let newSelectedBBIsDeps = selectedBBIDeps;

    if(selectedBBIDeps.length === 1) {
      newSelectedBBIsDeps = [];
    } else if(selectedBBIDeps.length > 1) {
      newSelectedBBIsDeps.splice(selectedIndex, 1)
    }

    selectBBIDeps(newSelectedBBIsDeps)
    setBBIsDepsCounter(newSelectedBBIsDeps.length)
  }

  //Dependency
  const handleNewDependency = () => {
    setOpenDepDialog(true);
  };

  const handleCloseDependency = () => {
    setOpenDepDialog(false);
  };

  function handleDeleteDependency(dep) {

    let selectedIndex = selectedDeps.map(function(c) {return c.id; }).indexOf(dep.id);
    let newSelectedsDeps = selectedDeps;

    if(selectedDeps.length === 1) {
      newSelectedsDeps = [];
    } else if(selectedDeps.length > 1) {
      newSelectedsDeps.splice(selectedIndex, 1)
    }

    selectDeps(newSelectedsDeps)
    setDepsCounter(newSelectedsDeps.length)
  }

  //Implement
  const handleNewBB = () => {
    setOpenBBDialog(true);
  };

  const handleCloseBB = () => {
    setOpenBBDialog(false);
  };

  function handleDeleteBB(bb) {

    let selectedIndex = selectedBBs.map(function(c) {return c.id; }).indexOf(bb.id);
    let newSelectedBBs = selectedBBs;

    if(selectedBBs.length === 1) {
      newSelectedBBs = [];
    } else if(selectedBBs.length > 1) {
      newSelectedBBs.splice(selectedIndex, 1)
    }

    selectBBs(newSelectedBBs)
    setBBsCounter(newSelectedBBs.length)
  }


  //Artifacts
  function handleNewArtifact({ target }) {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
        console.log(e)
    };
  };


  return (
    <Container component="main" >
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          BBI {selectedBBI ? '#' + selectedBBI.id : ''}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container direction="row" justify="space-evenly">
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item xs={12} >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Block Details</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={name} onChange={e => setName(e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  variant="outlined"
                  required
                  rowsMin={3}
                  rowsMax={3}
                  aria-label="maximum height"
                  placeholder="Description"
                  name="description"
                  id="description"
                  value={description} onChange={e => setDescription(e.target.value)}
                  className={classes.description}
                />
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >BBI Dependencies</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewBBIDependency}>New BBI Dependency</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                selectedBBIDeps.map((dep) => 
                
                  <Paper  elevation={3} className={classes.capability} key={dep.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {dep.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteBBIDependency(dep)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                
                )
              }
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Dependencies</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewDependency}>New Dependency</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                selectedDeps.map((dep) => 
                
                  <Paper  elevation={3} className={classes.capability} key={dep.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {dep.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteDependency(dep)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                
                )
              }
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Implements</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewBB}>New Implemented BB</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                selectedBBs.map((bb) => 
                
                  <Paper  elevation={3} className={classes.capability} key={bb.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {bb.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteBB(bb)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                
                )
              }
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Artifacts</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button
                  size="large"
                  variant="outlined"
                  component="label"
                  fullWidth
                  color="primary"
                >
                  New Artifact
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleNewArtifact(e)}
                  />
                </Button>
              </Grid>

            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Interfaces</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" >New Interface</Button>
              </Grid>

            </Grid>
          </Grid>

          <div className={classes.formButtons}>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => showList()}
            >
              Show BBI List
            </Button>
          </div>

          
        </form>
      </div>

    <BBIDepDialog />
    <DepDialog />
    <BBImplementedDialog />
    <BBIListDialog />

    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`}>
      <Alert onClose={handleCloseSnack} severity="success">
        {message}
      </Alert>
    </Snackbar>
    
    </Container>
  );
}