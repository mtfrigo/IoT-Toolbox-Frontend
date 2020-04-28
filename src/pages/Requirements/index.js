import React from 'react';

import './styles.css';

import ReqTable from '../../components/ReqTable';


export default function RequirementsPage() {

  return (
    <div className="table-container">
      <div className="table">
        <ReqTable  />
      </div>
    </div>
  )
}