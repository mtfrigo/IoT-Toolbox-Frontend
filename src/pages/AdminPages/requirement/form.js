import React, { useState, useEffect } from 'react';

// Material Components
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Material Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Icons
import SettingsIcon from '@material-ui/icons/Settings';

import api from '../../../services/api';

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

const RequirementForm = (props) => {
  const classes = useStyles();
  const { requirement, getRequirements, handleOpenSnack } = props;
  const [ formData, setFormData ] = useState({
    reference: '',
    description: '',
    id: 0,
  });

  useEffect(() => {
    setFormData({
      reference: requirement.reference,
      description: requirement.description,
      id: requirement.id,
    })
  }, [requirement])


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      reference: formData['reference'],
      description: formData['description']
    }

    if(!!formData['id']) {
      //true = edit requirement
      const response = await api.put(`requirements/${formData['id']}`, data);
      if(response.status === 200) {
        handleOpenSnack({ message: 'Requeriment updated!' });
      }

    } else {
      //true = create requirement
      const response = await api.post('requirements', data);
      if(response.status === 200) {
        handleOpenSnack({ message: 'Requeriment created!' });
      }
    }

    getRequirements();
    clearFormData();
  }

  function clearFormData() {
    setFormData({
      reference: '',
      description: '',
      id: 0,
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Requirement
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
                autoComplete="reference"
                value={formData['reference']}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                value={formData['description']} onChange={handleInputChange}
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
            onClick={clearFormData}
          >
            Clear
          </Button>
        </form>
      </div>
    </Container>
  )

}

export default RequirementForm;