import React, {useEffect, useState} from 'react';

//Material Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { TextareaAutosize } from '@material-ui/core';

// Material Style
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

// Material Icons
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import api from '../../../services/api';

import ItemListDialog from '../../../components/Dialog/dialog'
import Dropzone from '../../../components/Dropzone';

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
  const { handleOpenSnack, bbi, bbis, getBBIs } = props;

  const [ openDialog, setOpenDialog ] = useState(false);
  const [ selectedFeature, setFeature ] = useState('');
  const [ itemList, setItemList ] = useState([]);

  const [ bbs, setBBs ] = useState([]);
  const [ dependencies, setDependencies ] = useState([]);
  const [ formData, setFormData ] = useState({
    name: '',
    type: '',
    description: '',
    id: 0,
    bbiDeps: [],
    deps: [],
    bbs: [],
    artifacts: [],
    interfaces: [],
    artifactFiles: [],
    interfaceFiles: [],
  });



  useEffect(() => {
    getBBIs(); 
  }, [])

  useEffect(() => {
    getDependencies(); 
  }, [])

  useEffect(() => {
    getBBs(); 
  }, [])

  useEffect(() => {
    

    if(!!bbi) {
      bbi.Artifacts.map(artifact => {
        // const file = new File(artifact.fileUrl);
        // console.log(file)
      })

      console.log(bbi)
      
      setFormData({ 
        name: bbi.name,
        description: bbi.description,
        id: bbi.id,
        bbiDeps: bbi.BBIDependents.map(item => item.id), 
        deps: bbi.BlockDependencies.map(item => item.id),
        bbs: bbi.Implements.map(item => item.id), 
        artifacts: bbi.Artifacts,
        interfaces: bbi.Interfaces, 
        artifactFiles: [],
        interfaceFiles: [],
      }) 
    }
      
  }, [bbi])

  async function getBBs() {
    const res = await api.get('/building-blocks');
    setBBs(res.data);
  }

  async function getDependencies() {
    const res = await api.get('/bbis-dependencies');
    setDependencies(res.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', formData['name'])
    data.append('type', formData['type'])
    data.append('description', formData['description'])
    data.append('bbiDeps', formData['bbiDeps'].join(','))
    data.append('deps', formData['deps'].join(','))
    data.append('bbs', formData['bbs'].join(','))

    if(!!formData['id']) {
      //true = edit BBI

      data.append('interfaces', formData['interfaces'].map(item => item.id).join(','))
      data.append('artifacts', formData['artifacts'].map(item => item.id).join(','))

      for(let artifact of formData['artifactFiles']) {
        data.append('artifactFiles', artifact)
      }
  
      for(let interfaceFile of formData['interfaceFiles']) {
        data.append('interfaceFiles', interfaceFile)
      }

      const response = await api.put(`bbis/${formData['id']}`, data);
      if(response.status === 200) {
        handleOpenSnack({ message: 'BBI updated!' });
      }
    } else {
      //true = create BBI

      data.append('artifacts', formData['artifacts'].join(','))
      data.append('interfaces', formData['interfaces'].join(','))

      for(let artifact of formData['artifactFiles']) {
        data.append('artifactFiles', artifact)
      }
  
      for(let interfaceFile of formData['interfaceFiles']) {
        data.append('interfaceFiles', interfaceFile)
      }
      
      const response = await api.post('bbis', data);
      if(response.status === 200) {
        handleOpenSnack({message: 'BBI created!'})
      }
    }
    
    getBBIs();
    clearFormData();
  }

  function clearFormData() {
     setFormData({
      name: '',
      type: '',
      description: '',
      id: 0,
      bbiDeps: [],
      deps: [],
      bbs: [],
      artifacts: [],
      interfaces: [],
      artifactFiles: [],
      interfaceFiles: [],
     })
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleNewBBIDependency = () => {
    setFeature('bbiDeps');
    setItemList(bbis);
    setOpenDialog(true);
  };

  const handleNewDependency = () => {
    setFeature('deps');
    setItemList(dependencies);
    setOpenDialog(true);
  };

  const handleNewBB = () => {
    setFeature('bbs');
    setItemList(bbs);
    setOpenDialog(true);
  };

  function handleDeleteItem(feature, item) {
    const filteredItems = formData[feature].filter(i => i !== item.id);
    setFormData({...formData, [feature]: filteredItems});
  }

  function handleDeleteObjectItem(feature, item) {
    const filteredItems = formData[feature].filter(i => i.id !== item.id);
    setFormData({...formData, [feature]: filteredItems});
  }

  function handleDeleteFile(feature, item) {
    const filteredItems = formData[feature].filter(i => i.name !== item.name);
    setFormData({...formData, [feature]: filteredItems});
  }

  function handleSelectedArtifactFile(file) {
    let artifacts = formData['artifactFiles'];
    artifacts.push(file)
    setFormData({ ...formData,  ['artifactFiles']: artifacts})
  }

  function handleSelectedInterfaceFile(file) {
    let interfaces = formData['interfaceFiles'];
    interfaces.push(file)
    
    setFormData({ ...formData,  ['interfaceFiles']: interfaces})
  }

  return (
    <Container component="main" >
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          BBI
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
                  value={formData['name']} onChange={handleInputChange}
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
                <Typography component="div" variant="subtitle2" color="textSecondary" >BBI Dependencies</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Button  fullWidth variant="outlined" size="large" color="primary" onClick={handleNewBBIDependency}>New BBI Dependency</Button>
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                bbis.filter(item => formData['bbiDeps'].includes(item.id)).map((dep) => 
                
                  <Paper  elevation={3} className={classes.capability} key={dep.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {dep.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteItem('bbiDeps', dep)}>
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
                dependencies.filter(item => formData['deps'].includes(item.id)).map((dep) => 
                
                  <Paper  elevation={3} className={classes.capability} key={dep.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {dep.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteItem('deps', dep)}>
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
                bbs.filter(item => formData['bbs'].includes(item.id)).map((bb) => 
                
                  <Paper  elevation={3} className={classes.capability} key={bb.id}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {bb.name}
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteItem('bbs', bb)}>
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
                <Dropzone onFileUploaded={handleSelectedArtifactFile} />
              </Grid>

              <Grid item className={classes.fullWidthItem}>
              {
                formData['artifactFiles'].map(artifact => 
                <Paper  elevation={3} className={classes.capability} key={artifact.name}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {artifact.name }
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteFile('artifactFiles', artifact)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>)
              }
              {
                formData['artifacts'].map(artifact => 
                <Paper  elevation={3} className={classes.capability} key={artifact.name}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {artifact.filename }
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteObjectItem('artifacts', artifact)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>)
              }
              </Grid>

            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2} className={classes.formGroup}>
              <Grid  item  >
                <Typography component="div" variant="subtitle2" color="textSecondary" >Interfaces</Typography>
              </Grid>
              <Grid   item className={classes.fullWidthItem}>
                <Dropzone onFileUploaded={handleSelectedInterfaceFile} />
              </Grid>
              <Grid item className={classes.fullWidthItem}>
              {
                formData['interfaceFiles'].map(interfaceFile => 
                <Paper  elevation={3} className={classes.capability} key={interfaceFile.name}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {interfaceFile.name }
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteFile('interfaceFiles', interfaceFile)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>)
              }
              {
                formData['interfaces'].map(interfaceFile => 
                <Paper  elevation={3} className={classes.capability} key={interfaceFile.name}>
                    <Typography variant="body1"  color="primary" className={classes.capName}>
                      {interfaceFile.filename }
                    </Typography>

                    <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => handleDeleteObjectItem('interfaces', interfaceFile)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>)
              }
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
              onClick={() => clearFormData()}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>

      <ItemListDialog open={openDialog} setOpen={setOpenDialog} items={itemList} feature={selectedFeature} selectedItems={formData[selectedFeature]} setFormData={setFormData} formData={formData}/>

    </Container>
  );
}