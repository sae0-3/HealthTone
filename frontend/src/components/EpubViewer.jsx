import React, { useState } from 'react'
import { ReactReader } from 'react-reader'


export const EpubViewer = ({ url }) => {
  const [location, setLocation] = useState(null)
  
  const handleLocationChanged = (newLocation) => {
    setLocation(newLocation)
    console.log('Location changed to:', newLocation)
  }

  return (
    <div style={{ height: '70vh', width: '50%' }}>
      <ReactReader
        url={url}
        location={location}
        locationChanged={handleLocationChanged}
      />
    </div>
  )
}
