import { ProgressBar } from '@/components/ProgressBar'
import { useStore } from '@/hooks/useStore'
import { useEffect } from 'react'


export const PlayerControls = () => {
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

  return (
    <div className='text-white lg:flex lg:flex-col lg:gap-1'>
      <section className='w-full flex justify-end text-4xl lg:text-3xl lg:justify-center lg:gap-3'>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.max(playbackPosition - 10, 0)) }}
          disabled={!currentAudio.url}
        >
          <i className='bi bi-skip-backward'></i>
        </button>
        <button className='hidden lg:block disabled:opacity-50' disabled>
          <i className='bi bi-skip-start-fill'></i>
        </button>
        <button className='disabled:opacity-50'
          onClick={() => { togglePlay() }} disabled={!currentAudio.url}
        >
          <i className={`bi bi-${isPlaying ? 'pause' : 'play'}-fill`}></i>
        </button>
        <button className='hidden lg:block disabled:opacity-50' disabled>
          <i className='bi bi-skip-end-fill'></i>
        </button>
        <button className='hidden lg:block disabled:opacity-50'
          onClick={() => { setPosition(Math.min(playbackPosition + 10, duration)) }}
          disabled={!currentAudio.url}
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
