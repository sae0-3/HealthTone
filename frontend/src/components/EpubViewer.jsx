import { useState, useRef } from 'react'
import { ReactReader } from 'react-reader'


export const EpubViewer = ({ url }) => {
  const [location, setLocation] = useState(null)
  const renditionRef = useRef(null)

  const handleLocationChanged = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <ReactReader
      url={url}
      location={location}
      locationChanged={handleLocationChanged}
      getRendition={(rendition) => {
        renditionRef.current = rendition
      }}
    />
  )
}
