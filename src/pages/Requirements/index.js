import React, { useContext, useEffect } from 'react';

import './styles.css';

import ReqTable from '../../components/ReqTable';

import ProgressContext from '../../contexts/progress';

export default function RequirementsPage() {
  const { setShowBar } = useContext(ProgressContext);

  useEffect(() => {
    setShowBar(true)
  })

  return (
    <div className="table-container">
      <div className="table">
        <ReqTable  />
      </div>
    </div>
  )
}