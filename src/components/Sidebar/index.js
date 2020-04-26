import React from 'react'
import { Link } from 'react-router-dom';
import { FiHome, FiBox, FiFilter} from 'react-icons/fi';

import './styles.css';

export default function Siderbar() {
  return (
    <div className="sidemenu">

      <div className="header">
        <div className="title">IoT Toolbox</div>
      </div>
      
      <ul className="sidemenu-list">
        <li className="sidemenu-item">
          <Link to="/"><FiHome size={20} />Home</Link>
          <Link to="/requirements"><FiFilter size={20} />Requirements</Link>
          <Link to="/bbs"><FiBox size={20} />Building Blocks</Link>
        </li>
      </ul>
    </div>
  )
}

