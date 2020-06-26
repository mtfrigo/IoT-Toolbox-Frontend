import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [ user, setUser ] = useState(null);
  const [ project, setProject ] = useState(null);
  const [ loading, setLoading ] = useState(true);


  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem('@RAuth:user');
      const storagedToken = await localStorage.getItem('@RAuth:token');
      const storagedProject = await localStorage.getItem('@RAuth:project');

      if(storagedUser && storagedToken) {
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`

        if(storagedProject) {
          setProject(JSON.parse(storagedProject))
        }

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  }, [])

  async function updateProjectRequirements(requirements) {
    const res = await api.post('projects/requirements', {
      requirements,
      id_project: project.id
    })

    setProject(res.data);
  }

  

  async function signIn(user) {
    api.post('/user/login', {
      username: user.username,
      password: user.password
    }).then(res =>  {
      
      
      if(res.status === 200) {
        api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`

        localStorage.setItem('@RAuth:user', JSON.stringify(res.data.user));
        localStorage.setItem('@RAuth:token', res.data.token);

        setUser(res.data.user);
      }

    }).catch(error => {
      console.log(error.response)
    })
  }

  async function signUp(user) {


    return await api.post('/user', {
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
    }).then(res =>  {
      if(res.status === 200) {

        api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`

        localStorage.setItem('@RAuth:user', JSON.stringify(res.data.user));
        localStorage.setItem('@RAuth:token', res.data.token);

        setUser(res.data.user);

        return res;
      }

    }).catch(error => {
      console.log(error.response)

      return error.response;
    })
  }

  async function signOut() {
    localStorage.clear();
    api.defaults.headers['Authorization'] = '';
    setUser(null);
  }

  if(loading) {
    //algo para loading
  } 

  return (
    <AuthContext.Provider value={{signed: !!user, activeProject: !!project, updateProjectRequirements, user, project, setProject, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}