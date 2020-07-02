import React, { useContext, useEffect, useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import ProgressContext from '../../contexts/progress';
import MatchingContext from '../../contexts/matching';
import ProcessContext from '../../contexts/process';
import RequirementsContext from '../../contexts/requirements';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import BuildIcon from '@material-ui/icons/Build';
import { FiBox, FiCodesandbox } from 'react-icons/fi';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ProgressBar from '../../components/ProgressBar'
import { useAuth } from '../../contexts/auth'

import './styles.css';

import api from '../../services/api';

import {ProjectProcess, AdminProjectProcess} from './process';


const pageStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
}))

export default function ProcessCreationPage() {
  const { setActiveStep} = useContext(ProgressContext);
  const { projects, selectedProject, getProjects, getProject } = useContext(ProcessContext);
  const [ tab, setTab ] = useState(0); 
  const { user, project } = useAuth();

  const classes = pageStyles();

  useEffect(() => {
    getProjects()
    getProject(project.id)
    setActiveStep(2)
  }, [])
    
  const handleChangeTab = (event, newValue) => {
    getProject(project.id)
    setTab(newValue);
  };


  return (
    <div className={classes.container}>

    <ProgressBar />

    <Tabs
      value={tab}
      onChange={handleChangeTab}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
      aria-label="icon label tabs example"
    >
      <Tab label="YOUR REQUESTS" />
      <Tab label="OTHERS REQUESTS" />
    </Tabs>

    {
      tab === 0 ? <ProjectProcess key={project.id} project={selectedProject}/>
      : projects.map(project => <AdminProjectProcess key={project.id} project={project}/>)
    }


      
     
    </div>
  )
}