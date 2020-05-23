import React from 'react'
import { Link } from 'react-router-dom';
import { FiBox, FiCodesandbox, FiLogOut} from 'react-icons/fi';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
//import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
//import TransformIcon from '@material-ui/icons/Transform';
import SettingsIcon from '@material-ui/icons/Settings';
//import VideoLabelIcon from '@material-ui/icons/VideoLabel';
//import WeekendIcon from '@material-ui/icons/Weekend';

import './styles.css';

export default function Siderbar() {
  return (
    <div className="sidemenu">

      <div>
        <div className="header">
          <div className="title">IoT Toolbox</div>
          <AccountCircleIcon color='secondary'   />
          <p className="account-name">Admin </p>
          <FiLogOut className="sign-out-icon" />


        </div>
        
        <ul className="sidemenu-list">
          <li className="sidemenu-item">
            <Link to="/"><DashboardIcon size={20}  />Dashboard</Link>
            <Link to="/requirements"><SettingsIcon size={20}  />Requirements</Link>
            <Link to="/bbs"><FiBox size={20}  />Building Blocks</Link>
            <Link to="/"><AccountTreeIcon size={20}  />Process</Link>
          </li>
        </ul>
      </div>

      <div>
        <div className="subheader">
          <div className="title">Admin</div>
        </div>

        <ul className="secondary-sidemenu-list ">
          <li className="sidemenu-item">
            <Link to="/admin/requirement"><DashboardIcon size={20} />Requirements</Link>
            <Link to="/admin/building-block"><FiBox size={20}  />BB</Link>
            <Link to="/admin/bbi"><FiCodesandbox size={20} />BBI</Link>
          </li>
        </ul>
      </div>

      
      
    </div>
  )
}

