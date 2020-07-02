import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';

const ProcessContext = createContext();

export const ProcessProvider = ({children}) => {
  const [ selectedProject, setSelectedProject ] = useState([]);
  const [ projects, setProjects ] = useState([]);

  function getProjects() {
      api.get('/projects/admin').then(res => { setProjects(res.data) })
  }

  function getProject(id) {
    api.get(`/projects/${id}`).then(res => {setSelectedProject(res.data)})
  }

  async function updateProject(project) {
    api.put(`projects/${project.id}`, { step: project.step}).then(res => { getProjects(2); getProjects(1);})
  }

  return (
    <ProcessContext.Provider value={{ projects,  selectedProject, getProject, updateProject, getProjects}}>
      {children}
    </ProcessContext.Provider>
  );
};

export default ProcessContext;