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
import NewBBContext from '../../../contexts/new-bb';

import { TextareaAutosize } from '@material-ui/core';

import CapabilityDialog from './cap-dialog'
import DependencyDialog from './dep-dialog'

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

}));

export default function BBForm(props) {
  const classes = useStyles();
  const [ description, setDescription ] = useState('');
  const [ type, setType ] = useState('');
  const [ name, setName ] = useState('');
  const [ capsCounter, setCapsCounter ] = useState(0);
  const [ depsCounter, setDepsCounter ] = useState(0);
  const { selectedBB, selectBB } = useContext(AdminContext);

  const { openCapDialog, setOpenCapDialog } = useContext(NewBBContext);
  const { selectedCaps, selectCaps } = useContext(NewBBContext);
  const { openDepDialog, setOpenDepDialog } = useContext(NewBBContext);
  const { selectedBBs, selectBBs } = useContext(NewBBContext);

  const [personName, setPersonName] = useState([]);

  const [snack, setSnack] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  });

  const { vertical, horizontal, open, message } = snack;

  useEffect(() => {
    if(!!selectedBB) {
      setDescription(selectedBB.description)
      setName(selectedBB.name)
      setType(selectedBB.type)
    }
  }, [selectedBB, selectedCaps])

  async function handleSubmit(event) {
    event.preventDefault();

    let bb = {
      id: null,
      name: name,
      description: description,
      type: type,
    }

    //const res = await api.post('/building-blocks', bb);

    // const res = await api.post('/bb-capability/11', {caps: [1,2]})
    const res = await api.post('/bb-dependency/11', {deps: [1,2]})

    console.log(res)

   
  }

 

  function clear() {
    selectBB('');
    setDescription('');
    setName('');
    setType('');
  }

  const handleOpenSnack = (newState) => () => {
    setSnack({ open: true, ...newState });
  };

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const handleChangeCapability = (event) => {
    setPersonName(event.target.value);
  };

  const handleNewCapability = () => {
    setOpenCapDialog(true);
  };

  const handleCloseCapDialog = () => {
    setOpenCapDialog(false);
  };

  function handleDeleteCapability(cap) {
    let selectedIndex = selectedCaps.map(function(c) {return c.id; }).indexOf(cap.id);
    let newSelectedCaps = selectedCaps;

    if(selectedCaps.length === 1) {
      newSelectedCaps = [];
    } else if(selectedCaps.length > 1) {
      newSelectedCaps.splice(selectedIndex, 1)
    }

    selectCaps(newSelectedCaps)
    setCapsCounter(newSelectedCaps.length)
  }

  const handleNewDependency = () => {
    setOpenDepDialog(true);
  };

  function handleDeleteDependency(bb) {

    let selectedIndex = selectedBBs.map(function(b) {return b.id; }).indexOf(bb.id);
    let newSelectedBBs = selectedBBs;

    if(selectedBBs.length === 1) {
      newSelectedBBs = [];
    } else if(selectedBBs.length > 1) {
      newSelectedBBs.splice(selectedIndex, 1)
    }

    selectBBs(newSelectedBBs)
    setDepsCounter(newSelectedBBs.length)

  }

  return (
    <Container component="main" >
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Building Block {selectedBB ? '#' + selectedBB.id : ''}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container direction="row">
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
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="type"
                  label="Type"
                  name="type"
                  autoComplete="type"
                  value={type} onChange={e => setType(e.target.value)}
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
                <Typography component="div" variant="subtitle2" color="textSecondary" >Block Capabilities</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewCapability}>New Capability</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                selectedCaps.map((cap) => 
                
                  <Paper  elevation={3} className={classes.capability} key={cap.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {cap.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteCapability(cap)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                
                )
              }
              </Grid>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Block Dependencies</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewDependency}>New Dependency</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                selectedBBs.map((bb) => 
                
                  <Paper  elevation={3} className={classes.capability} key={bb.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {bb.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteDependency(bb)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                
                )
              }
              </Grid>

              
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

    <CapabilityDialog />
    <DependencyDialog />
    
    </Container>
  );
}