import React, { useEffect, useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';


import ProgressBar from '../../components/ProgressBar'
import {ProcessPanel} from './process';

import ProcessContext from '../../contexts/process';
import ProgressContext from '../../contexts/progress';
import { useAuth } from '../../contexts/auth'

import api from '../../services/api'

import BPMNDiagram from '../../components/BPMNDiagram'
import BpmnViewer from 'bpmn-js';


const pageStyles = makeStyles((theme) => ({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    },

    diagram: {
      height: 400,
    },

    diagramContainer: {
      borderBottom: '2px solid black',
    }
  }))

export default function ProcessExecutionPage() {
  const { project } = useAuth();
  const [ xml, setXML ] = useState('')
  const classes = pageStyles();
  const { process, setProcess } = useContext(ProcessContext);
  const { setActiveStep } = useContext(ProgressContext);


    useEffect(() => {
      setActiveStep(3);
    }, [setActiveStep])

    useEffect(() => {
        async function getProcess() {
          const res = await  api.get(`projects/${project.id}`)
          const res2 = await  api.get(`process/${res.data.id_process}`)
          setProcess(res2.data)

          const res3 = await  api.get(`process/xml/${res.data.id_process}`)
          setXML(res3.data.bpmn20Xml)
        }
        getProcess()
    }, [project.id, setProcess])

    return (
      <div className={classes.container}>
        <ProgressBar />
        <div className={classes.diagramContainer}>
          {
            xml ? <BPMNDiagram className={classes.diagram} style={{height: 400}} xml={xml}></BPMNDiagram> : null
          }
        </div>
        <ProcessPanel process={process} />
      </div>
    )
  }