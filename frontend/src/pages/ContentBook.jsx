import { Card } from '@/components/Card'
import { EpubViewer } from '@/components/EpubViewer'
import { Error } from '@/components/Error'
import { Loading } from '@/components/Loading'
import { Modal } from '@/components/Modal'
import { useGetBook, useGetBooksFavorites } from '@/hooks/useBooks'
import audioStore from '@/store/audioStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export const ContentBook = () => {
  const { id } = useParams()
  const [isReading, setIsReading] = useState(false)
  const { currentAudio, setCurrentAudio } = audioStore()
  const { data, isLoading, error } = useGetBook(id)
  const favoritos = useGetBooksFavorites()
  const [viewCalif, setViewCalif] = useState(false)
  const [valueStar, setValueStar] = useState(0)

  const book = data?.data
  const favs = new Set(favoritos.data?.data.books.map((book) => book.id))

  useEffect(() => {
    if (!currentAudio?.id && !!book) {
      setCurrentAudio({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover_path,
        url: book.audio_path
      })
    }
  }, [book])

  const toggleReading = () => {
    setIsReading(!isReading)
  }

  const handleCloseCalif = () => {
    setViewCalif(false)
    setValueStar(0)
  }

  if (isLoading || favoritos.isLoading)
    return <Loading />
  if (error)
    return <Error>{error.response.data.message}</Error>
  if (favoritos.error) {
    return <Error>{favoritos.error.response.data.message}</Error>
  }

  return (
    <div className='h-full flex flex-col items-center justify-evenly gap-2 pt-4'>
      {!!book && (
        <>
          <section className='flex flex-col items-center justify-center w-11/12 h-full lg:w-full lg:flex-row'>
            <div className={`mx-auto ${isReading && 'hidden'}`}>
              <Card id={book.id}
                title={book.title}
                author={book.author}
                url_cover={book.cover_path}
                url_audio={book.audio_path}
                categories={book.categories}
                isFav={favs.has(book.id)}
                isContent
              />
            </div>
            <div className={`${!isReading && 'hidden'} w-full mx-auto h-full lg:block`}>
              <EpubViewer url={book.text_path} />
            </div>
          </section>

          <section className='w-full flex justify-between items-center text-xl text-white lg:pb-5 flex-wrap gap-2'>
            <button
              className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => { }}
            >
              <i className='bi bi-chat-dots-fill'></i>
              <small>Comentarios</small>
            </button>

            <button
              className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => setViewCalif(true)}
            >
              <i className='bi bi-star-fill'></i>
              <small>Calificar</small>
            </button>

            <button
              className='lg:hidden flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => toggleReading()}
            >
              <i className='bi bi-book-fill'></i>
              <small>Leer</small>
            </button>
          </section>
        </>
      )}

      {viewCalif && (
        <Modal
          title="Califica el contenido"
          onClose={handleCloseCalif}
        >
          <div className='flex justify-around text-2xl text-yellow-500'>
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                onClick={() => setValueStar(index + 1)}
              >
                <i className={`${index < valueStar ? 'bi bi-star-fill' : 'bi bi-star'}`}></i>
              </button>
            ))}
          </div>

          <div className='flex justify-between mt-5 mb-1'>
            <button
              type='button'
              className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              onClick={handleCloseCalif}
            >Cancelar</button>
            <button
              type='button'
              className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            // onClick={ }
            >Aceptar</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
