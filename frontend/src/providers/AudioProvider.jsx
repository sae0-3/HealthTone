import portada from '@assets/med.jpg'
import { AudioContext } from '@contexts/AudioContext'
import { useEffect, useState } from 'react'


const defaultTrack = {
  title: 'Unknow Title',
  author: 'Unknow Author',
  cover: portada,
  url: null
}

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack)
  const [isPlay, setIsPlay] = useState(false)

  const playTrack = (track = defaultTrack) => setCurrentTrack(track)

  return (
    <AudioContext.Provider value={{ currentTrack, playTrack, isPlay, setIsPlay }}>
      {children}
    </AudioContext.Provider>
  )
}
