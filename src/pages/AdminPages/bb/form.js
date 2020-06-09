import React, {useEffect, useState } from 'react';

// Material Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { TextareaAutosize } from '@material-ui/core';

//Material Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Material Icons
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import api from '../../../services/api';

import ItemListDialog from '../../../components/Dialog/dialog'

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
  const [ openDialog, setOpenDialog ] = useState(false);
  const [ capabilities, setCapabilities ] = useState([]);
  const [ dependencies, setDependencies ] = useState([]);
  const [ itemList, setItemList ] = useState([]);
  const [ selectedItems ] = useState([]);
  const [ selectedFeature, setFeature ] = useState('');
  const { handleOpenSnack, getBBs, bb } = props;

  const [ formData, setFormData ] = useState({
    name: '',
    type: '',
    description: '',
    id: 0,
    caps: [],
    deps: []
  });

  
  useEffect(() => {
    getCapabilities(); 
  }, [])

  useEffect(() => {
    getDependencies(); 
  }, [])

  useEffect(() => {
    if(!!bb) 
      setFormData({ 
        name: bb.name,
        type: bb.type,
        description: bb.description,
        id: bb.id,
        caps: bb.BlockCapabilities.map(item => item.id), 
        deps: bb.BlockDependencies.map(item => item.id)
      }) 
  }, [bb])

  useEffect(() => {
    setFormData({ ...formData, [selectedFeature]: selectedItems }) 
  }, [selectedItems])

  async function getCapabilities() {
    const res = await api.get('/capability');
    setCapabilities(res.data);
  }

  async function getDependencies() {
    const res = await api.get('/building-blocks');
    setDependencies(res.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: formData['name'],
      description: formData['description'],
      type: formData['type'],
      deps: formData['deps'],
      caps: formData['caps'],
    }

    if(!!formData['id']) {
      //true = edit bb
      const response = await api.put(`building-blocks/${formData['id']}`, data);
      if(response.status === 200) {
        handleOpenSnack({ message: 'Building block updated!' });
      }
    } else {
      //true = create bb
      const response = await api.post('building-blocks', data);
      if(response.status === 200) {
        handleOpenSnack({message: 'Building block created!'})
      }
    }
    
    getBBs();
    clearFormData();
  }

  function clearFormData() {
    setFormData({
      name: '',
      type: '',
      description: '',
      caps: [],
      deps: [],
      id: 0,
    });
    
  }

  const handleNewCapability = () => {
    setFeature('caps');
    setItemList(capabilities);
    setOpenDialog(true);
  };

  const handleNewDependency = () => {
    setFeature('deps');
    setItemList(dependencies);
    setOpenDialog(true);
  };

  function handleDeleteItem(feature, item) {
    const filteredItems = formData[feature].filter(i => i !== item.id);
    setFormData({...formData, [feature]: filteredItems});
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Container component="main" >
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Building Block {/* Building Block {selectedBB ? '#' + selectedBB.id : ''} */}
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
                  value={formData['name']} onChange={handleInputChange}
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
                  value={formData['type']} onChange={handleInputChange}
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
                  value={formData['description']} onChange={handleInputChange}
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
                capabilities.filter(cap => formData['caps'].includes(cap.id)).map((cap) => 
                  <Paper  elevation={3} className={classes.capability} key={cap.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {cap.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteItem('caps', cap)}>
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
                dependencies.filter(dep => formData['deps'].includes(dep.id)).map((bb) => 
                
                  <Paper  elevation={3} className={classes.capability} key={bb.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {bb.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteItem('deps', bb)}>
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
            onClick={() => clearFormData()}
          >
            Clear
          </Button>

          
        </form>
      </div>

      
      <ItemListDialog open={openDialog} setOpen={setOpenDialog} items={itemList} feature={selectedFeature} selectedItems={formData[selectedFeature]} setFormData={setFormData} formData={formData}/>
    
    </Container>
  );
}