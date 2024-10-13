import { useStore } from '@hooks/useStore'
import { useEffect } from 'react'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'


export const PlayerControls = ({ className }) => {
  const {
    currentAudio,
    duration,
    isPlaying,
    togglePlay,
    playbackPosition,
    setPosition
  } = useStore()

  useEffect(() => {
    if (!isPlaying || duration <= 0) return

    const interval = setInterval(() => {
      setPosition(Math.min(playbackPosition + 1, duration))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, playbackPosition, duration])

  const handleClickBar = (e) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newTime = ((clientX - left) / width) * duration
    setPosition(newTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
  }

  if (!currentAudio) {
    return null
  }

  return (
    <section className={`${className} d-flex flex-column align-items-center justify-content-center gap-3`}>
      <div className='d-flex justify-content-center gap-4'>
        <button className='btn'
          onClick={() => { setPosition(Math.max(playbackPosition - 10, 0)) }}
        >
          <i className='bi bi-skip-backward fs-2 text-light'></i>
        </button>
        <button className='btn' disabled>
          <i className='bi bi-skip-start-fill fs-1'></i>
        </button>
        <button className='btn' onClick={() => { togglePlay() }}>
          <i className={`bi bi-${isPlaying ? 'pause' : 'play'}-fill fs-1 text-light`}></i>
        </button>
        <button className='btn' disabled>
          <i className='bi bi-skip-end-fill fs-1'></i>
        </button>
        <button className='btn'
          onClick={() => { setPosition(Math.min(playbackPosition + 10, duration)) }}
        >
          <i className='bi bi-skip-forward fs-2 text-light'></i>
        </button>
      </div>

      <div
        className='d-flex justify-content-center align-items-center flex-row gap-3'
        style={{ width: '100%', maxWidth: '60rem' }}
      >
        <span>{formatTime(playbackPosition)}</span>
        <ProgressBar
          now={playbackPosition}
          max={duration}
          style={{ width: '100%', maxWidth: '60rem', cursor: 'pointer' }}
          onClick={handleClickBar}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </section>
  )
}
