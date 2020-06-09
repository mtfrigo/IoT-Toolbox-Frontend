import React from 'react';

import './styles.css';

import ReqTable from '../../components/ReqTable';
import ProgressBar from '../../components/ProgressBar';


export default function RequirementsPage() {
  // const [ showProgressBar, setProgressBar ] = useState(true);

  return (
    <div className="requirements-page">
      <ProgressBar />
      <div className="table-container">
        <ReqTable  />
      </div>
    </div>
  )
}