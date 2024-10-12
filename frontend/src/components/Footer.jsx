import { AudioContext } from '@contexts/AudioContext'
import '@styles/footer.css'
import { useContext, useEffect, useRef, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


export const Footer = () => {
  const { currentTrack, isPlay, setIsPlay } = useContext(AudioContext)
  const [barVisible, setBarVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const audioRef = useRef(new Audio(currentTrack.url))
  const intervalRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { duration } = audioRef.current
  const currentPercentageProgress = duration ? (trackProgress / duration) * 100 : 0

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(currentTrack.url)
    setTrackProgress(0)
    // setIsPlay(false)
    audioRef.current.addEventListener('canplaythrough', () => {
      if (isPlay) {
        audioRef.current.play().catch(error => console.error('Error al reproducir el audio:', error))
        startTimer()
      }
    })
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlay) {
        audioRef.current.play().catch(error => {
          console.error("Error al reproducir el audio:", error)
        })
        startTimer()
      } else {
        clearInterval(intervalRef.current)
        audioRef.current.pause()
      }
    } else {
      if (isPlay) {
        audioRef.current = new Audio(audioSrc)
        audioRef.current.play().catch(error => {
          console.error("Error al reproducir el audio:", error)
        })
        startTimer()
      } else {
        clearInterval(intervalRef.current)
        audioRef.current.pause()
      }
    }
  }, [isPlay])

  const handleVolumeClick = () => {
    setBarVisible(!barVisible)
  }

  const handleClickBar = (e) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const actualCurrentTime = (clientX - left) / width * duration
    audioRef.current.currentTime = actualCurrentTime
    setTrackProgress(audioRef.current.currentTime)
  }

  const handleDecrease = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    setTrackProgress(audioRef.current.currentTime)
  }

  const handleIncrease = () => {
    audioRef.current.currentTime = (audioRef.current.currentTime + 10 < audioRef.current.duration)
      ? audioRef.current.currentTime + 10
      : audioRef.current.duration
    setTrackProgress(audioRef.current.currentTime)
  }

  const handleReplay = () => {
    audioRef.current.currentTime = 0
    setIsPlay(true)
  }

  const handleVolumeBar = (e) => {
    const { clientY } = e
    const { width, bottom } = e.currentTarget.getBoundingClientRect()
    const currentVolume = (window.innerHeight - clientY) - (window.innerHeight - bottom)
    const actual = currentVolume > 0 ? currentVolume : 0 / width * 100
    audioRef.current.volume = actual / 100
    setVolume(actual)
  }

  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!audioRef.current.ended) {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  const addZero = (n) => {
    return n > 9 ? '' + n : '0' + n
  }

  useEffect(() => {
    isOpen?navigate(`/book/${currentTrack.id}`):navigate(`/`)
  }, [isOpen])

  useEffect(() => {
    if(location.pathname === '/') setIsOpen(false)
  }, [location.pathname])


  return (
    <footer className='fixed-bottom footer-container-reproductor w-100 pt-3 pb-3'>
      <div className='row footer-subcontainer-reproductor d-flex justify-content-between'>
        <section className='col-2 d-flex align-items-center justify-content-start reproductor-section_left gap-4'>
          <img src={currentTrack.cover} alt={currentTrack.title} />
          <div className='d-flex flex-column align-items-center justify-content-center'>
            {/* <p className='text-center'>{currentTrack.title}</p> */}
            <p className='text-center'>{currentTrack.author}</p>
          </div>
        </section>

        <section className='col-8 d-flex flex-column align-items-center justify-content-center gap-2'>
          <div className='d-flex justify-content-center gap-4'>
            <button className='btn' onClick={handleDecrease}>
              <i className='bi bi-skip-backward fs-2'></i>
            </button>
            <button className='btn' disabled>
              <i className='bi bi-skip-start-fill fs-1'></i>
            </button>
            <button className='btn' onClick={() => { setIsPlay(!isPlay) }}>
              <i className={`${isPlay ? 'bi bi-pause-fill' : 'bi bi-play-fill'} fs-1`}></i>
            </button>
            <button className='btn' disabled>
              <i className='bi bi-skip-end-fill fs-1'></i>
            </button>
            <button className='btn' onClick={handleIncrease}>
              <i className='bi bi-skip-forward fs-2'></i>
            </button>
          </div>

          <div
            className='d-flex justify-content-center align-items-center flex-row gap-3'
            style={{ width: '100%', maxWidth: '60rem' }}
          >
            <span>{`${isNaN(duration)
              ? '00'
              : addZero(Math.floor(trackProgress / 60))}:${isNaN(duration)
                ? '00'
                : addZero(Math.floor(trackProgress % 60))}
            `}
            </span>
            <ProgressBar
              now={currentPercentageProgress}
              style={{ width: '100%', maxWidth: '60rem' }}
              onClick={handleClickBar}
            />
            <span>{`${isNaN(duration)
              ? '00'
              : addZero(Math.floor(duration / 60))}:${isNaN(duration)
                ? '00'
                : addZero(Math.floor(duration % 60))}
            `}
            </span>
          </div>
        </section>

        <section className='col-2 d-flex align-items-center justify-content-end gap-3'>
          <button
            className='btn'
            onClick={handleReplay}
            style={{ height: '5rem' }}>
            <i className='bi bi-arrow-counterclockwise fs-1'></i>
          </button>

          <div
            className='volume-settings d-flex align-items-center'
            style={{ position: 'relative' }}>
            <button
              className='btn'
              onClick={handleVolumeClick}>
              <i className='bi bi-volume-up fs-1'></i>
            </button>
            {barVisible && (
              <div className='volume-bar'>
                <ProgressBar
                  now={volume}
                  style={{ height: '1.5rem' }}
                  onClick={handleVolumeBar} />
              </div>
            )}
          </div>

          <button
            className='btn'
            style={{ height: '5rem' }}>
            <i
              className={isOpen && location.pathname !== '/' ?
                'bi bi-caret-up-fill fs-1' :
                'bi bi-caret-down-fill fs-1'
              }
              onClick={() => setIsOpen(isOpen => !isOpen)}
            ></i>
          </button>
        </section>
      </div>
    </footer>
  )
}
