import { useStore } from '@hooks/useStore'
import imgAux from '@assets/med.jpg'


export const PlayerInfo = ({ className }) => {
  const { currentAudio } = useStore()

  if (!currentAudio) {
    return null
  }

  return (
    <section className={`${className} d-flex align-items-center justify-content-start`}>
      <img src={currentAudio.cover || imgAux} alt={currentAudio.title}
        style={{ width: '6rem', height: '6rem', objectFit: 'contain' }}
      />
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <p className='text-center p-0 m-0'>{currentAudio.title}</p>
        <p className='text-center p-0 m-0'>{currentAudio.author}</p>
      </div>
    </section>
  )
}
