import React, { useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { FiFile } from 'react-icons/fi';

import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import ProcessContext from '../../contexts/process';

const useStyle = makeStyles((theme) => ({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },

    card: {
        margin: '20px 10px',
        padding: 15
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    label: {
        fontSize: 16,
        paddingLeft: 10,
    },

    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    description: {
        textAlign: 'center',
        margin: '10px 0px',
    },

    btn: {
        width: '100%',
        height: 24,
        fontSize: 12
    },

    file: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto',
        maxWidth: 300,
    
    },

    fileName: {

    },

    trash: {
      color: 'red'
    },
  }))


const CardContent = (props) => {
    const classes = useStyle();
    const { updateProject } = useContext(ProcessContext);

    const { project } = props;

    const handleCreationRequest = () => {
        project.step = 1;
        updateProject(project)
    }

    const handleDeleteRequest = () => {
        project.step = 0;
        updateProject(project)
    }

    return (
        <div>
            {
                project.step === 0 ? 
                <div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="secondary">You need to request the proccess creation for your project. </Typography>
                        <Typography variant="body2" color="primary">Once the request is created, an IoT expert will create and prepare it for the next step. </Typography>
                        <Typography variant="body2" color="primary">You will receive a notification when it is ready for its execution. </Typography>
                    </div>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" className={classes.btn} onClick={handleCreationRequest}>
                            Request process creation
                        </Button> 
                    </div>
                </div>
                : project.step === 1 ?
                <div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="secondary">Request already created. </Typography>
                        <Typography variant="body2" color="primary">Please, wait for the process creation. </Typography>
                        <Typography variant="body2" color="primary">You will receive a notification when it is ready for its execution. </Typography>
                    </div>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="secondary" className={classes.btn} onClick={handleDeleteRequest}>
                            Delete request
                        </Button> 
                    </div>
                </div>
                : 
                <div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="secondary">Process ready. </Typography>
                        <Typography variant="body2" color="primary">Your process is ready for execution, please go for the next step. </Typography>
                    </div>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" className={classes.btn} >
                            Go for process execution
                        </Button> 
                    </div>
                </div>
            }
            
            
        </div> 
        
    )
}

const AdminCardContent = (props) => {
    const classes = useStyle();
    const { updateProject, reloadProjects } = useContext(ProcessContext);
    const [ formData, setFormData ] = useState({
        file: '',
      });

    const { project } = props;


    async function handleDeleteProcess() {
        const response = await api.delete(`/process/${project.id_process}`);

        if(response.status === 204) {
            project.id_process = null;
            project.step = 1;
            updateProject(project)
        }
    }

    function handleUploadProcess(file) {
        console.log(file)
        setFormData({file})
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();

        data.append('process', formData['file']);
        data.append('id_project', project.id);

        const response = await api.post('process', data);

        if(response.status === 200) {
            const project = response.data
            project.step = 2;
            updateProject(project)
        }
    }

    return (
        <div>
            {
                project.step === 1 ? 
                <div>
                    <div className={classes.description}>
                        {
                            formData.file === '' ? 
                            <Dropzone onFileUploaded={handleUploadProcess} /> :

                            <Paper  elevation={3} className={classes.file} key={formData.file.name}>
                                <FiFile size={36}/>
                                
                                <Typography variant="body1"  color="primary" className={classes.fileName}>
                                    {formData.file.name }
                                </Typography>

                                <IconButton aria-label="delete" size="small" className={classes.trash} onClick={() => setFormData({file: ''})}>
                                    <DeleteIcon />
                                </IconButton>
                            </Paper>
                        }
                    </div>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" type="submit" className={classes.btn} onClick={handleSubmit}>
                            Upload Process
                        </Button> 
                    </div>
                </div>
                : project.step === 2 ?
                <div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="secondary">Process created. </Typography>
                        <Paper  elevation={3} className={classes.file} key={project.Process.name}>
                            <FiFile size={36}/>

                            <Typography variant="body1"  color="primary" className={classes.fileName}>
                                {project.Process.name }
                            </Typography>
                        </Paper>
                    </div>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="secondary" className={classes.btn} onClick={handleDeleteProcess}>
                            Delete process
                        </Button> 
                    </div>
                </div>
                :  null
            }
            
            
        </div> 
        
    )
}

export const AdminProjectProcess = (props) => {
    const classes = useStyle();

    const { project } = props;

    const status = 2;

    const stepMap = {
        0: 'Not created',
        1: 'In Progress',
        2: 'Ready'
    }

    return (
        <Paper elevation={3} className={classes.card}>
            <div className={classes.header}>
                <Typography variant="body1" color="textSecondary">Current Project</Typography>
                <Typography variant="body2" color="textPrimary" className={classes.label}>{project.name}</Typography>
            </div>
            
            <div className={classes.content}>
                <Typography variant="body1" color="textSecondary">Process Creation Status</Typography>
                <Typography variant="body2" color="textPrimary" className={classes.label}>{stepMap[project.step]}</Typography>
            </div>

           <AdminCardContent project={project} />
            
        </Paper>
    )
}

export const ProjectProcess = (props) => {
    const classes = useStyle();

    const { project } = props;

    const status = 2;

    const stepMap = {
        0: 'Not created',
        1: 'In Progress',
        2: 'Ready'
    }

    return (
        <Paper elevation={3} className={classes.card}>
            <div className={classes.header}>
                <Typography variant="body1" color="textSecondary">Current Project</Typography>
                <Typography variant="body2" color="textPrimary" className={classes.label}>{project.name}</Typography>
            </div>
            
            <div className={classes.content}>
                <Typography variant="body1" color="textSecondary">Process Creation Status</Typography>
                <Typography variant="body2" color="textPrimary" className={classes.label}>{stepMap[project.step]}</Typography>
            </div>

           <CardContent project={project} />
            
        </Paper>
    )
}

export default ProjectProcess;

