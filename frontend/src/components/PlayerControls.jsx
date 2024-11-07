import { ProgressBar } from '@/components/ProgressBar'
import audioStore from '@/store/audioStore'
import { useEffect, useRef } from 'react'
import axios from 'axios' // Importa axios para las solicitudes HTTP

export const PlayerControls = () => {
  const {
    currentAudio,
    howl,
    duration,
    isPlaying,
    togglePlay,
    playbackPosition,
    setPosition
  } = audioStore()

  const animationRef = useRef(null)
  const playbackRef = useRef(playbackPosition)

  useEffect(() => {
    playbackRef.current = playbackPosition
  }, [playbackPosition])

  useEffect(() => {
    if (!currentAudio.id || !isPlaying) return

    const saveProgress = () => {
      axios.post('/api/progreso', {
        id_usuario: currentAudio.userId,
        id_contenido: currentAudio.id,
        progreso: Math.floor(playbackRef.current)
      }).catch(err => console.error('Error al guardar el progreso:', err))
    }

    const interval = setInterval(saveProgress, 15000)

    return () => clearInterval(interval)
  }, [isPlaying, currentAudio])

  // Guardar progreso al pausar la reproducción
  const handlePause = () => {
    togglePlay()
    if (!isPlaying && currentAudio.id) {
      axios.post('/api/progreso', {
        id_usuario: currentAudio.userId,
        id_contenido: currentAudio.id,
        progreso: Math.floor(playbackRef.current)
      }).catch(err => console.error('Error al guardar el progreso:', err))
    }
  }

  useEffect(() => {
    if (!isPlaying || !howl) return

    const updatePosition = () => {
      const currentPos = howl.seek() || 0
      playbackRef.current = currentPos

      if (Math.abs(currentPos - playbackPosition) > 0.5) {
        setPosition(currentPos)
      }

      animationRef.current = requestAnimationFrame(updatePosition)
    }

    animationRef.current = requestAnimationFrame(updatePosition)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, howl, setPosition, playbackPosition])

  const handleClickBar = (e) => {
    const { clientX } = e
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const newTime = ((clientX - left) / width) * duration
    setPosition(newTime)
    howl.seek(newTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
  }

  return (
    <div className='text-white lg:flex lg:flex-col lg:gap-1'>
      <section className='w-full flex justify-end text-4xl lg:text-3xl lg:justify-center lg:gap-8'>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.max(playbackPosition - 10, 0)) }}
          disabled={!currentAudio.id}
        >
          <i className='bi bi-skip-backward'></i>
        </button>
        <button className='disabled:opacity-50'
          onClick={handlePause} // Usa la función para guardar al pausar
          disabled={!currentAudio.id}
        >
          <i className={`bi bi-${isPlaying ? 'pause' : 'play'}-fill`}></i>
        </button>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.min(playbackPosition + 10, duration)) }}
          disabled={!currentAudio.id}
        >
          <i className='bi bi-skip-forward'></i>
        </button>
      </section>

      <section className='hidden lg:flex gap-2 items-center justify-center'>
        <span>{formatTime(playbackPosition)}</span>
        <ProgressBar
          now={playbackPosition}
          max={duration}
          onClick={handleClickBar}
        />
        <span>{formatTime(duration)}</span>
      </section>
    </div>
  )
}
