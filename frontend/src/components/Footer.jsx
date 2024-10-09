import { useState, useRef, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import '@styles/footer.css'

const listMusic = [{
  mp3_music: 'http://localhost:4000/uploads/song.mp3',
  Autor: 'Nine Inch Nails',
  Title: 'The Fragile',
}, {
  mp3_music: '/Audio/The_Fragile.mp3',
  Autor: 'Nine Inch Nails',
  Title: 'Closer',
}]

export const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isPlay, setIsPlay] = useState(false)
  const [barVisible, setBarVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const audioRef = useRef(new Audio(listMusic[currentIndex].mp3_music))
  const { duration } = audioRef.current
  const intervalRef = useRef()
  const [volume,setVolume] = useState(1);

  const currentPercentageProgress = duration ? (trackProgress / duration) * 100 : 0

  const handleVolumeBar = (e) => {
    const {clientY} = e
    const {width,top, bottom} = e.currentTarget.getBoundingClientRect()
    const currentVolume = (window.innerHeight - clientY) - (window.innerHeight - bottom)
    const actual = currentVolume>0?currentVolume:0 / width * 100
    audioRef.current.volume = actual / 100
    setVolume(actual)
  }
  
  
  const handleClickBar = (e) => {
    const {clientX} = e
    const {left, width} = e.currentTarget.getBoundingClientRect()
    const actualCurrentTime = (clientX - left) / width * duration
    console.log(actualCurrentTime)
    audioRef.current.currentTime = actualCurrentTime
    setTrackProgress(audioRef.current.currentTime)
  }


  const handleDecrease = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
    setTrackProgress(audioRef.current.currentTime)
  }

  const handleIncrease = () => {
    audioRef.current.currentTime = (audioRef.current.currentTime + 10 < audioRef.current.duration) ? audioRef.current.currentTime + 10 : audioRef.current.duration
    setTrackProgress(audioRef.current.currentTime)
  }


  const handleReplay = () => {
    audioRef.current.currentTime = 0
    setIsPlay(isPlay => true)
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + listMusic.length) % listMusic.length
    setCurrentIndex(prevIndex)
    setIsPlay(isPlay => true)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % listMusic.length
    setCurrentIndex(nextIndex)
    setIsPlay(isPlay => true)
  }

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current = new Audio(listMusic[currentIndex].mp3_music)
    if (isPlay) {
      audioRef.current.play()
    }
    return () => {
      audioRef.current.pause()
    }
  }, [currentIndex])

  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlay) {
        audioRef.current.play().catch(error => {
          console.error('Error al reproducir el audio:', error)
        })
        startTimer()
      } else {
        clearInterval(intervalRef.current)
        audioRef.current.pause()
      }
    } else {
      if (isPlay) {
        audioRef.current = new Audio(listMusic[currentIndex].mp3_music)
        audioRef.current.play().catch(error => {
          console.error('Error al reproducir el audio:', error)
        })
        startTimer()
      } else {
        clearInterval(intervalRef.current)
        audioRef.current.pause()
      }
    }
  }, [isPlay])

  const addZero = (n) => {
    return n > 9 ? '' + n : '0' + n
  }

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])


  const handleVolumeClick = () => {
    setBarVisible(barVisible ? false : true)
  }

  return (
    <footer className='text-white text-center align-items-center fixed-bottom'>
      <div className='content-footer d-flex justify-content-between align-items-center'>
        <div className='d-flex justify-content-start align-items-center ms-3'>
          <img src='foto' alt='poster-img' style={{ width: '100%', height: '6rem', maxWidth: '6rem', background: 'blue' }} />
          <div className='d-flex flex-column justify-content-center ms-3'>
            <h3>{listMusic[currentIndex].Title}</h3>
            <p>{listMusic[currentIndex].Autor}</p>
          </div>
        </div>

        <div className='d-flex flex-column align-items-center' style={{ width: '100%', maxWidth: '75rem' }}>
          <div className='d-flex justify-content-center'>
            <button className='large-icon mx-2'>
              <i
                className='bi bi-skip-backward'
                style={{ fontSize: '3rem' }}
                onClick={handleDecrease}
              ></i>
            </button>
            <button className='large-icon mx-2'>
              <i
                className='bi bi-skip-start-fill'
                style={{ fontSize: '3rem' }}
                onClick={handlePrev}></i>
            </button>
            <button
              className='large-icon mx-2'
              onClick={() => { setIsPlay(!isPlay) }}>
              <i
                className={isPlay ? 'bi bi-pause-fill' : 'bi bi-play-fill'}
                style={{ fontSize: '3rem' }}
              >
              </i>
            </button>
            <button className='large-icon mx-2'>
              <i
                className='bi bi-skip-end-fill'
                style={{ fontSize: '3rem' }}
                onClick={handleNext}></i>
            </button>
            <button className='large-icon mx-2'>
              <i
                className='bi bi-skip-forward'
                style={{ fontSize: '3rem' }}
                onClick={handleIncrease}
              ></i>
            </button>
          </div>
          <div className='d-flex justify-content-center align-items-center flex-row mt-2' style={{ width: '100%', maxWidth: '75rem' }}>
            <p className='me-2' style={{ margin: '0' }}>{`
                                ${isNaN(duration) ? '00' : addZero(Math.round(trackProgress / 60))}
                                :
                                ${isNaN(duration) ? '00' : addZero(Math.round(trackProgress % 60))}
                                `}</p>
            <ProgressBar
                now={currentPercentageProgress}
                style={{ width: '100%', maxWidth: '60rem' }}
                onClick={handleClickBar}/>
            <p className='ms-2' style={{ margin: '0' }}>{`
                                ${isNaN(duration) ? '00' : addZero(Math.round(duration / 60))}
                                :
                                ${isNaN(duration) ? '00' : addZero(Math.round(duration % 60) - 1)}
                                `}</p>
          </div>
        </div>

        <div className='d-flex align-items-center'>
          <button className='large-icon mx-2'>
            <i
              className='bi bi-arrow-counterclockwise'
              style={{ fontSize: '3rem' }}
              onClick={handleReplay}></i>
          </button>

          <div className='volume-settings d-flex align-items-center mx-2' style={{ position: 'relative' }}>
            <button className='large-icon ms-2' onClick={handleVolumeClick}>
              <i className='bi bi-volume-up' style={{ fontSize: '3rem' }}></i>
            </button>
            {barVisible &&
              <div className='volume-bar'>
                <ProgressBar 
                    now={volume} 
                    style={{ height: '1.5rem' }} 
                    onClick={handleVolumeBar}/>
              </div>}
          </div>
          <button
            className='large-icon mx-2'
            style={{ border: 'none', borderRadius: '.7rem', fontSize: '2.5rem', margin: '0', padding: '0', lineHeight: '1' }}
          >
            <i className='bi bi-chevron-up me-3' style={{ fontSize: '3rem', display: 'block', margin: '0' }}></i>
          </button>
        </div>
      </div>
    </footer>
  )
}