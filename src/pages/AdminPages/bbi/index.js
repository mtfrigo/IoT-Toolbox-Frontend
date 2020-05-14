import React, { useContext, useEffect } from 'react';

import ProgressContext from '../../../contexts/progress';

export default function AdminBBIPage() {
  const { setShowBar } = useContext(ProgressContext);

  useEffect(() => {
    setShowBar(false)
  })

  return (
    <div >
      bbbb
    </div>
  )
}