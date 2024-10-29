import { useStore } from '@/hooks/useStore'
import { useState } from 'react'

export const Card = ({ id, title, author, url_cover, url_audio, categories, disabled }) => {
  const { setPlaying, setCurrentAudio, startAudio } = useStore()
  const [isFavorite, setIsFavorite] = useState(false) // Estado para el botón de favoritos

  const handlePlay = () => {
    if (!disabled) {
      setCurrentAudio({ id, title, author, cover: url_cover, url: url_audio })
      startAudio()
      setPlaying(true)
    }
  }

  const handleFavorite = (e) => {
    e.stopPropagation() // Evita que el clic en el botón active handlePlay
    setIsFavorite(!isFavorite) // Alterna el estado de favorito
  }

  return (
      <button
          className={`group ${disabled && 'cursor-auto'}`}
          onClick={handlePlay}
      >
        <div className='aspect-square overflow-hidden relative'>
          <img
              className={`m-auto h-full ${!disabled && 'group-hover:scale-105 group-focus:scale-105 transition-transform duration-500'}`}
              src={url_cover}
              alt={`portada_${title}`}
          />

          {/* Botón de Favoritos en forma de corazón */}
          <button
              onClick={handleFavorite}
              className={`absolute bottom-2 right-2 rounded-full p-2 transition-colors duration-300 ${
                  isFavorite ? 'bg-white text-black' : 'bg-black text-white'
              }`}
              style={{ width: '40px', height: '40px' }}
          >
            ♥
          </button>
        </div>

        <div className='px-3 py-4'>
          <p className='font-bold text-base mb-2'>{title}</p>
          <p className='text-gray-700 text-xs'>{author}</p>
        </div>

        {!!categories && categories.length > 0 && (
            <div className='px-6 pt-4 pb-2'>
              {categories.map(({ nombre }, idx) => (
                  <span key={`${nombre}-${idx}`}
                        className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                  >
              #{nombre}
            </span>
              ))}
            </div>
        )}
      </button>
  )
}
