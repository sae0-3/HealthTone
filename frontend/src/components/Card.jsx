import { Modal } from '@/components/Modal'
import { useDeleteBookFavorites, usePostBookFavorites } from '@/hooks/useBooks'
import audioStore from '@/store/audioStore'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const Card = ({ id, title, author, url_cover, url_audio, categories, disabled, isFav }) => {
  const { setPlaying, setCurrentAudio, startAudio, currentAudio, setIsOpenDescription } = audioStore()
  const [iconHeart, setIconHeart] = useState(isFav)
  const { mutate: saveFavorite, isPending: isPendingPost } = usePostBookFavorites(id)
  const { mutate: deleteFavorite, isPending: isPendingDelete } = useDeleteBookFavorites(id)
  const [showNotification, setShowNotification] = useState(false)
  const isPlaying = currentAudio?.id === id

  const handleClick = () => {
    setIsOpenDescription(currentAudio.id === id)
  }

  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isPlaying) setPlaying(true)

    setCurrentAudio({ id, title, author, cover: url_cover, url: url_audio })
    startAudio()
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowNotification(true)
  }

  const confirmFavorite = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (iconHeart) deleteFavorite(id)
    else saveFavorite(id)

    setIconHeart(!iconHeart)
    setShowNotification(false)
  }

  return (
    <>
    <Link
      to={!disabled && `/book/${id}`}
      className='border shadow-sm rounded-xl hover:shadow-lg transition'
      onClick={handleClick}
    >
      <div className={`group ${disabled && 'cursor-auto'} relative group`}>
        <div className='aspect-square overflow-hidden relative'>
          <img
            className={`m-auto h-full ${!disabled && 'group-hover:scale-105 group-focus:scale-105 transition-transform duration-500'}`}
            src={url_cover}
            alt={`portada_${title}`}
          />
          {!disabled && (
            <button
              onClick={handlePlay}
              className={`absolute bottom-2 left-2 rounded-md p-2 transition-colors duration-300 lg:hidden lg:group-hover:block
                          ${isPlaying ? 'bg-htc-lightblue text-white' : 'bg-htc-white text-black'}
              `}
            >
              <div className="flex items-center justify-center h-full">
                <i className={isPlaying ? `bi bi-play-fill text-2xl` : `bi bi-play text-2xl`}></i>
              </div>
            </button>
          )}

          {!disabled && (
            <button
              onClick={handleFavorite}
              className={`absolute bottom-2 right-2 rounded-md p-2 transition-colors duration-300 lg:hidden lg:group-hover:block
                ${iconHeart ? 'bg-htc-lightblue text-white' : 'bg-htc-white text-black'}`}
              disabled={isPendingPost || isPendingDelete}
            >
              <i className={iconHeart ? `bi bi-heart-fill text-lg` : `bi bi-heart text-lg`}></i>
            </button>
          )}
        </div>

        <div className='px-3 py-4'>
          <p className='font-bold text-base mb-2'>{title}</p>
          <p className='text-gray-700 text-xs'>{author}</p>
        </div>

        {!!categories && categories.length > 0 && (
          <div className='px-6 pt-4 pb-2'>
            {categories.map(({ nombre }, idx) => (
              <span
                key={`${nombre}-${idx}`}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
              >
                #{nombre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>

    {showNotification && (
      <Modal
        title={isFav ? '¿Se eliminará de Favoritos?' : '¿Se agregará a Favoritos?'}
        onClose={() => setShowNotification(false)}
      >
        <div className='flex justify-between'>
          <button
            type='button'
            className='py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            onClick={() => setShowNotification(false)}
          >Cancelar</button>
          <button
            type='button'
            className='py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            onClick={confirmFavorite}
          >Aceptar</button>
        </div>
      </Modal>
    )}
    </>
  )
}
