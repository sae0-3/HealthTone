import { useStore } from '@hooks/useStore'
import { Howler } from 'howler'
import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useLocation, useNavigate } from 'react-router-dom'


export const PlayerActions = ({ className }) => {
  const {
    currentAudio,
    volume,
    setVolume,
    setPosition,
    muted,
    toggleMuted
  } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(isOpen ? `/book/${currentAudio.id}` : '/')
  }, [isOpen])

  useEffect(() => {
    setIsOpen(!(location.pathname === '/') && currentAudio)
  }, [location.pathname])

  const handleVolumeBarClick = (e) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newVolume = (clientX - left) / width

    Howler.volume(Math.min(Math.max(newVolume, 0), 1))
    setVolume(newVolume * 100)
  }

  return (
    <section className={`${className} col-2 d-flex align-items-center justify-content-end gap-3`}>
      <button className='btn' onClick={() => { setPosition(0) }} style={{ height: '5rem' }}>
        <i className='bi bi-arrow-counterclockwise fs-1 text-light'></i>
      </button>

      <div className='d-flex align-items-center w-100' style={{ maxWidth: '15rem' }}>
        <button className='btn' onClick={() => { toggleMuted() }}>
          <i className={`bi fs-1 text-light
            bi-volume-${muted || volume === 0 ? 'mute' : 'up'}-fill`}
          ></i>
        </button>

        <ProgressBar now={volume}
          max={100}
          style={{ width: '100%', maxWidth: '15rem', cursor: 'pointer' }}
          onClick={handleVolumeBarClick}
        />
      </div>

      <button className='btn' onClick={() => { setIsOpen(!isOpen) }}>
        <i className={`bi bi-caret-${isOpen ? 'down' : 'up'}-fill fs-1 text-light`}></i>
      </button>
    </section>
  )
}
