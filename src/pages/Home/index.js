import React, { useContext, useEffect, useState } from 'react';

import './styles.css';

import VerticalStepper from '../../components/VerticalStepper';

import ProgressContext from '../../contexts/progress';
import Typography from '@material-ui/core/Typography';

import { FiBox, FiCodesandbox} from 'react-icons/fi';
import SettingsIcon from '@material-ui/icons/Settings';
import ToysIcon from '@material-ui/icons/Toys';

import Paper from '@material-ui/core/Paper';

import api from '../../services/api';

export default function HomePage() {
    const { setShowBar } = useContext(ProgressContext);
    const [ counters, setCounters ] = useState('');

    useEffect(() => {

      async function getCounters() {
        const res = await api.get('panel');
        setCounters(res.data)
      }

      setShowBar(false);
      getCounters();
    }, [])

    const items = [
        { name: 'Requirements', total: counters.Requirements, icon: <SettingsIcon/>, color: '#eb4d48' },
        { name: 'Building Blocks', total: counters.BBs, icon: <FiBox/>, color: '#eb4d48' },
        { name: 'Blocks Implementations', total: counters.BBIs, icon: <FiCodesandbox/>, color: '#eb4d48' },
        { name: 'Projects', total: 0, icon: <ToysIcon/>, color: '#eb4d48' },
    ]

    return (
        <div className="home-page-container">
          <div className='dashboard'>
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
          <Paper className='stepper'>
            <VerticalStepper />
          </Paper>
        </div>
    )
}