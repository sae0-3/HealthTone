import { PlayerActions } from '@/components/PlayerActions'
import { PlayerControls } from '@/components/PlayerControls'
import { PlayerInfo } from '@/components/PlayerInfo'
import audioStore from '@/store/audioStore'
import { useEffect,useState } from 'react'
import { getProgress, updateProgress } from '@/api/audioProgress'


export const Player = () => {
  const { setCurrentAudio, currentAudio } = audioStore()
  const [progress, setProgress] = useState(0) ////////

  useEffect(() => {
    const initialAudio = {
      id: null,
      title: 'Unknow Title',
      author: 'Unknow Author',
      cover: null,
      url: null
    }

    setCurrentAudio(initialAudio)
    /////
    if(currentAudio && currentAudio.id){
      getProgress(currentAudio.id).then((savedProgress) => {
        setProgress(savedProgress)
      })
    }
  }, [setCurrentAudio, currentAudio])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentAudio && currentAudio.id) {
        updateProgress(currentAudio.id, progress)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [progress, currentAudio])


  if (!currentAudio) {
    return null
  }

  return (
    <div className='h-full mx-3 flex items-center lg:mx-16'>
      <div className='w-4/5 lg:w-3/12'>
        <PlayerInfo />
      </div>

      <div className='w-1/6 lg:w-1/2'>
        <PlayerControls onProgressChange={setProgress} progress={progress} />
      </div>

      <div className='hidden lg:block lg:w-3/12'>
        <PlayerActions />
      </div>
    </div>
  )
}
