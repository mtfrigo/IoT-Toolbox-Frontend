import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api'

import ProcessContext from '../../contexts/process'
import { Paper } from '@material-ui/core';


const useStyle = makeStyles((theme) => ({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexGrow: '2',
      background: 'white'
    },

    centeredContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },

    label: {
      marginBottom: 10,
      fontSize: 20
    },

    startButton: {
      margin: '0 100px',
      width: 200,
    },

    completeButton: {
      margin: '20px 0',
      width: '100%',
    },

    tasksPanel: {
      padding: 10,
      height: '100%',
      width: '100%'
    },

    taskPanelTitle: {
      textAlign: 'center',
      fontSize: 20,
      margin: '10px 0px'
    },

    task: {
      padding: 20,
      // background: '#3f51b5',
    },

    formField: {
      // width: 300
    },
    
  }))

const Task = (props) => {
  const classes = useStyle() 
  const { task, setTrigger, trigger } = props;

  const [ formData, setFormData ] = useState({name: ''});

  const [ variables, setVariables ] = useState([])

  useEffect(() => {

    let obj = {};
    let variables = [];
    task.variables.map(variable => {
      obj[variable.name] = variable.value ? variable.value : '';

      if(!variable.value) variables.push(variable);
    })

    setVariables(variables)
    setFormData(obj)
  }, [task.variables])

  const handleCompleteTask = async () => {
    let body = Object.keys(formData).reduce((r, c) => {
      r['variables'][c] = {'value': formData[c]}
      return r
    }, {'variables': {}})

    const res = await api.post(`process/task/${task.id}/complete`, body)
    setTrigger(!trigger);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Paper className={classes.task}>
      <Typography variant="body2" color="primary" className={classes.label}>{task.name}</Typography>
      {
        variables.length ? 
        <Typography variant="body2" color="secondary" className={classes.label}>Variables</Typography> :
        null
      }
      {
        variables.map(variable =>  (
          <div key={variable.name}>
            <TextField
                variant="outlined"
                fullWidth
                id={variable.name}
                label={variable.name}
                name={variable.name}
                // value={formData[variable.name]}
                onChange={handleInputChange}
                className={classes.formField}
            />
          </div>
        ))
      }
      <Button variant="contained" color="secondary" className={classes.completeButton} onClick={handleCompleteTask}>Complete Task</Button>  
    </Paper>
  )
}

const TaskPanel = (props) => {
  const classes = useStyle() 
  const [ tasks, setTasks] = useState([]);
  const [ trigger, setTrigger] = useState(false);

  const { process } = props;

  useEffect(() => {
    async function getTasks() {
      const res = await api.get(`process/${process.id_instance}/tasks`)
      let tasks = res.data;

      for(const task of tasks) {
        const res = await api.get(`process/${task.id}/form-variables`)

        const variables = Object.keys(res.data).reduce((r, c) => {
          r.push({name: c, type: res.data[c].type, value: res.data[c].value})
          return r;
        }, [])

        task.variables = variables;
      }

      setTasks(tasks);
      
    }

    getTasks();
  }, [process.id_instance, trigger])


  return (
    <div className={classes.tasksPanel}>
      {
        tasks.length ? 
        <Typography variant="body2" color="textPrimary" className={classes.taskPanelTitle}>Current Tasks</Typography> :
        null
      }
      {
        tasks.length ? 
        tasks.map(task => <Task key={task.id} task={task} setTrigger={setTrigger} trigger={trigger} />) :
        <ProcessEnded />
      }
    </div>
  )
}

const NotStartedProcess = (props) => {
  const classes = useStyle() 

  const { handleStartProcess } = props;

  return (
    <div className={classes.centeredContainer}>
      <Typography variant="body2" color="textPrimary" className={classes.label}>Process not started.</Typography>
      <Button variant="contained" color="secondary" className={classes.startButton} onClick={handleStartProcess}>Start</Button>  
    </div>
  )

}

const ProcessEnded = (props) => {
  const classes = useStyle() 

  return (
    <div className={classes.centeredContainer}>
      <Typography variant="body2" color="textPrimary" className={classes.label}>Process Ended</Typography>
      <Button variant="contained" color="secondary" className={classes.startButton} > Next Step</Button>  
    </div>
  )

}

export const ProcessPanel = (props) => {
    const classes = useStyle()
    const { setProcess } = useContext(ProcessContext)

    const { process } = props;

    const handleStartProcess = async () => {
        const res = await api.post(`process/${process.id}/start`, { id_definition: process.id_definition })
        setProcess(res.data);
      }

    return (
        <div className={classes.container}>
        { 
            process?.id_instance ? 
            <TaskPanel process={process} /> : 
            <NotStartedProcess handleStartProcess={handleStartProcess}/>
        }
        </div>
    )
}

