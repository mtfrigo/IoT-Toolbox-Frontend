import React, { useContext, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ProgressContext from '../../../contexts/progress';
import AdminContext from '../../../contexts/admin';

import BBIForm from './form'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyConten: 'center',
    height: '100vh',
  },
  form: {
    width: "100%",
    height: '50%'
  },
  bbs: {
    borderTop: '2px solid rgba(0, 0, 0, 0.12)',
    flexGrow: 2,
    width: "100%",
    height: '50%',
    background: '#f1f1f1',
    padding: 20,
    overflow: 'auto',
  },
  bb: {
    padding: 15,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,

  },
  description: {
    padding: 10,
    flexGrow: 2
  },
  edit: {
    color: 'green'
  },
  trash: {
    color: 'red'
  }

}));

export default function AdminBBIPage() {
  const classes = useStyles();
  const { setShowBar } = useContext(ProgressContext);
  const { selectedBBI } = useContext(AdminContext);

  useEffect(() => {
    setShowBar(false);
  }, [selectedBBI])


  return (
    <div className={classes.root}>

      <BBIForm />

    </div>
  )
}