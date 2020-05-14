import React, { useContext, useEffect } from 'react';

import ProgressContext from '../../../contexts/progress';

export default function AdminBBPage() {
  const { setShowBar } = useContext(ProgressContext);

  useEffect(() => {
    setShowBar(false)
  })

  return (
    <div >
      aaaa
    </div>
  )
}