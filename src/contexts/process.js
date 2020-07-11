import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const ProcessContext = createContext();

export const ProcessProvider = ({children}) => {
  const [ selectedProject, setSelectedProject ] = useState([]);
  const [ projects, setProjects ] = useState([]);
  const [ process, setProcess ] = useState();

  function getProjects() {
      api.get('/projects/admin').then(res => { setProjects(res.data) })
  }

  function getProject(id) {
    api.get(`/projects/${id}`).then(res => {setSelectedProject(res.data)})
  }

  async function updateProject(project) {
    api.put(`projects/${project.id}`, { step_process: project.step_process}).then(res => { getProjects(); })
  }

  async function updateProcess(process) {
    const res = await api.put(`process/${process.id}`, process)
    return res.data;
  }

  return (
    <ProcessContext.Provider value={{ projects,  selectedProject, process, setProcess, getProject, updateProject, getProjects}}>
      {children}
    </ProcessContext.Provider>
  );
};

export default ProcessContext;