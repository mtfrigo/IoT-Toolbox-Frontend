import React, { useContext, useEffect } from 'react';

import './styles.css';

import VerticalStepper from '../../components/VerticalStepper';

import ProgressContext from '../../contexts/progress';
import Typography from '@material-ui/core/Typography';


import { FiBox} from 'react-icons/fi';
import SettingsIcon from '@material-ui/icons/Settings';
import ToysIcon from '@material-ui/icons/Toys';


import Paper from '@material-ui/core/Paper';

export default function HomePage() {
    const { setShowBar } = useContext(ProgressContext);

    useEffect(() => {
        setShowBar(false);
    })

    const items = [
        { name: 'Requirements', total: 32, icon: <SettingsIcon/> },
        { name: 'B. Blocks', total: 12, icon: <FiBox/> },
        { name: 'B. Blocks Imp.', total: 7, icon: <FiBox/> },
        { name: 'Projects', total: 2, icon: <ToysIcon/> },
    ]

    return (
        <div className="home-page-container">
            <div className='dashboard'>
            {
                items.map((item,i ) => 
                <Paper className="item" key={i}>
                    <div className='icon-container'>
                        <Paper className="item-icon">
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
                </Paper>
                )
            }
                
            </div>
            <Paper className='stepper'>
                <VerticalStepper />
            </Paper>
        </div>
    )
}