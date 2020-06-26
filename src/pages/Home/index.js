import React, { useContext, useEffect, useState } from 'react';

import './styles.css';
import { makeStyles } from '@material-ui/core/styles';

import VerticalStepper from '../../components/VerticalStepper';

import ProgressContext from '../../contexts/progress';
import { useAuth } from '../../contexts/auth';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { FiBox, FiCodesandbox, FiLoader} from 'react-icons/fi';
import SettingsIcon from '@material-ui/icons/Settings';
import ToysIcon from '@material-ui/icons/Toys';

import Paper from '@material-ui/core/Paper';

import api from '../../services/api';

import TextField from '@material-ui/core/TextField';

import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    margin: 20,
    height: 'auto',
    padding: 16,
    maxWidth: 600
  },

  header: {
    fontSize: 16,
    display: 'flex',
    flexDirection: 'row',
  },

  headerTitle: {
    fontSize: 16,
    flexGrow: 2,
    display: 'flex',
    alignItems: 'flex-end'
  },

  title: {
    fontSize: 16,
  },

  name: {
    fontSize: 20,
  },

  selections: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },

  item: {
    flex: '1 1 auto',
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: '100%'
  },

  iconContainer: {

  },

  itemIcon: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eb4d48',
    color: 'white',
    fontSize: 20,
  },

  itemCounter: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepIconContainer: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    marginRight: 10,
  },

  footer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  btn: {
    margin: 5,
    height: 24,
    fontSize: 12,
  },

  btn2: {
    flex: 1,
    margin: 5,

    marginTop: 15,
    height: 24,
    fontSize: 12,
  },

  formField: {
    marginTop: 10,
  },

  listItem: {
    marginTop: 5,
    padding: 5,
    paddingLeft: 10,
    height: 40,
    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',

  },

  itemName: {
    fontSize: 14,
  }

}))

const NewProject = (props) => {
  const classes = useStyles();

  const { setCreating } = props;
  const { setProject } = useAuth();

  const [ formData, setFormData ] = useState({
    name: ''
  });

  async function createProject() {
    const res = await api.post('/projects', formData);

    setProject(res.data);
    localStorage.setItem('@RAuth:project', JSON.stringify(res.data));
    setCreating(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Paper className={classes.container}>

      <div className={classes.header}>
        <Typography variant="body1" color="textPrimary" className={classes.headerTitle}>
          Project name
        </ Typography>
      </div>

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

      <div className={classes.buttons}>
        <Button variant="contained" color="primary" className={classes.btn2} onClick={() => createProject()}>
          Create
        </Button> 

        <Button variant="contained" color="secondary" className={classes.btn2} onClick={() => setCreating(false)}>
          Cancel
        </Button> 
      </div>
    </Paper>
  )
}

const ProjectList = (props) => {
  const classes = useStyles();
  const [ projects, setProjects ] = useState([]);

  const { setCreating, setSelecting, setProject } = props;

  useEffect(() => {
    async function getProjects() {
      const res = await api.get('/projects');
      setProjects(res.data);
    }

    getProjects();
  }, [])

  const handleProjectClick = (project) => {
    setProject(project);
    
    localStorage.setItem('@RAuth:project', JSON.stringify(project));
    setSelecting(false);
  }


  return (
    <Paper className={classes.container}>

      <div className={classes.header}>
        <Typography variant="body1" color="textSecondary" className={classes.headerTitle}>
          Your projects
        </ Typography>
      </div>

      {
        projects.length ? projects.map(project => (
          <Paper className={classes.listItem} key={project.id} onClick={() => handleProjectClick(project)}>
            <Typography variant="body1" color="primary" component="div" className={classes.itemName}>
              {project.name}
            </ Typography>
          </Paper>

        )) : 
        
        <Typography variant="body1" color="secondary" component="div" className={classes.name}>
          You don't have projects. Please create a new one.
        </ Typography>
      }

      <div className={classes.buttons}>
        <Button variant="contained" color="primary" className={classes.btn2} onClick={() => setCreating(true)}>
          Create New Project
        </Button> 
      </div>
    </Paper>
  )
}

const EmptyProject = (props) => {
  const classes = useStyles();

  const { setCreating, setSelecting } = props;

  return (
    <Paper className={classes.container}>

      <div className={classes.header}>
        <Typography variant="body1" color="textSecondary" className={classes.headerTitle}>
          Current project
        </ Typography>
      </div>

      <Typography variant="body1" color="secondary" component="div" className={classes.name}>
        No active project
      </ Typography>
     
      <Typography variant="h2" color="textPrimary" component="div" className={classes.name}>
        Please create or select an existing project
      </ Typography>

      <div className={classes.buttons}>
        <Button variant="contained" color="primary" className={classes.btn2} onClick={() => setCreating(true)}>
          Create New Project
        </Button> 

        <Button variant="contained" color="secondary" className={classes.btn2} onClick={() => setSelecting(true)}>
          Select Existing Project
        </Button> 
      </div>
    </Paper>
  )
}

const CurrentProject = (props) => {
  const classes = useStyles();
  const [ project, setProject ] = useState('');
  const { steps } = useContext(ProgressContext);

  useEffect(() => {
    async function loadProject() {
      const res = await api.get(`projects/${props.project.id}`);
      setProject(res.data);
    }
    loadProject()
  }, [props])

  const handleChange = () => {
    props.change(null)
    localStorage.removeItem('@RAuth:project');
  }
  
  return (
    <Paper className={classes.container}>

      <div className={classes.header}>
        <Typography variant="body1" color="textSecondary" className={classes.headerTitle}>
          Current project
        </ Typography>

        <div className={classes.buttons}>
          <Button variant="contained" color="secondary" className={classes.btn} onClick={handleChange}>
            Change
          </Button> 
        </div>
      </div>

      <Typography variant="body1" color="textPrimary" component="div" className={classes.name}>
        {project?.name}
      </ Typography>
      
      <div className={classes.selections}>
        <Paper className={classes.item}>
          <div className={classes.iconContainer}>
            <Paper className={classes.itemIcon} >
              <SettingsIcon/>
            </Paper>
          </div>
          <Typography variant="body1" color="textPrimary" component="div" className={classes.itemCounter}>
            { project?.Requirements ? project.Requirements.length : 0 }
          </ Typography>
        </Paper>
        <Paper className={classes.item}>
          <div className={classes.iconContainer}>
            <Paper className={classes.itemIcon} >
              <FiBox/>
            </Paper>
          </div>
          <Typography variant="body1" color="textPrimary" component="div" className={classes.itemCounter}>
            { project?.bbs ? project.bbs.length : 0 }
          </ Typography>
        </Paper>
        <Paper className={classes.item}>
          <div className={classes.iconContainer}>
            <Paper className={classes.itemIcon} >
              <FiCodesandbox/>
            </Paper>
          </div>
          <Typography variant="body1" color="textPrimary" component="div" className={classes.itemCounter}>
            { project.bbs ? 
              project.bbs.reduce((r, v) => {
                return r + v.bbis.length;
              }, 0) : 0 }
          </ Typography>
        </Paper>
      </div>
    
      <Typography variant="body1" color="textSecondary" className={classes.title}>
        Current project step
      </ Typography>
      
      <div className={classes.footer}>
        
        <div className={classes.stepIconContainer}>
          { project.step ? steps[project.step - 1].icon : <FiLoader />}
        </div>
        <Typography variant="body1" color="textPrimary" className={classes.title}>
        { project.step ? steps[project.step - 1].name : 'Project not started'}
        </ Typography>
      </div>
    </Paper>
  )
}

export default function HomePage() {
    const { setShowBar } = useContext(ProgressContext);
    const { activeProject, project, setProject } = useAuth();
    const [ counters, setCounters ] = useState('');
    const [ creating, setCreating ] = useState(false);
    const [ selecting, setSelecting ] = useState(false);

    useEffect(() => {

      async function getCounters() {
        const res = await api.get('panel');
        setCounters(res.data)
      }

      setShowBar(false);
      getCounters();
    }, [])

    const items = [
      { name: 'Projects', total: counters.Projects, icon: <ToysIcon/>, color: '#eb4d48' },
      { name: 'Requirements', total: counters.Requirements, icon: <SettingsIcon/>, color: '#eb4d48' },
      { name: 'BBs', total: counters.BBs, icon: <FiBox/>, color: '#eb4d48' },
      { name: 'BBIs', total: counters.BBIs, icon: <FiCodesandbox/>, color: '#eb4d48' },
  ]

  return (
        <div className="home-page-container">
          <div className='dashboard'>
            {/* < CurrentProject project={project}/> */}
            {
              activeProject ? < CurrentProject project={project} change={setProject}/> :
              creating  ? < NewProject setCreating={setCreating} /> :  
              selecting ?  < ProjectList setCreating={setCreating} setSelecting={setSelecting} setProject={setProject} /> : 
              < EmptyProject setCreating={setCreating} setSelecting={setSelecting}  />
            }
            <div className='statistics'>
            {
              items.map((item,i ) => 
                <Paper className="item" key={i}>
                  <div className='icon-container'>
                    <Paper className="item-icon" style={{background: item.color}}>
                      {item.icon}
                    </Paper>
                  </div>
                  <div className="labels">
                    <Typography variant="body1" color="textSecondary" className='label'>
                      {item.name}
                    </ Typography>
                    <Typography variant="body1" color="textPrimary" component="div" className='label total'>
                      {item.total}
                    </ Typography>
                  </div>
                </Paper>)
            }
            </div>

          </div>
          <Paper className='stepper'>
            <VerticalStepper />
          </Paper>
        </div>
    )
}