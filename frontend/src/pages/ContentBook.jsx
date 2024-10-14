import { Card } from '@/components/Card'
import { EpubViewer } from '@/components/EpubViewer'
import { useGet } from '@/hooks/useGet'
import { useStore } from '@/hooks/useStore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'


export const ContentBook = () => {
  const { id } = useParams()
  const [isReading, setIsReading] = useState(false)
  const { setCurrentAudio, startAudio } = useStore()
  const [book, error] = useGet(`http://localhost:4000/api/book/${id}`)

  const toggleReading = () => {
    setIsReading(!isReading)
  }

  const handlePlay = () => {
    if (book) {
      setCurrentAudio({
        id: book.id,
        title: book.nombre,
        author: book.autor,
        cover: book.url_portada,
        url: book.url_audio
      })
      startAudio()
    }
  }

  if (error) {
    return (
      <p className='font-semibold text-red-600 text-center pt-5'>
        No se logro recupear la información
      </p>
    )
  }

  return (
    <div className='h-full flex flex-col items-center justify-evenly gap-2 pt-4'>
      {!!book && (
        <>
          <section className='flex flex-col items-center justify-center w-11/12 h-full lg:w-full lg:flex-row'>
            <div className={`mx-auto ${isReading && 'hidden'}`}>
              <Card id={book.id}
                title={book.nombre}
                author={book.autor}
                url_cover={book.url_portada}
                url_audio={book.url_audio}
                categories={book.categorias}
                disabled
              />
            </div>

            <div className={`${!isReading && 'hidden'} w-full mx-auto h-full lg:block`}>
              <EpubViewer url={book.url_texto} />
            </div>
          </section>

          <section className='lg:hidden w-full flex justify-between items-center text-xl text-white'>
            <button
              className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => { toggleReading() }}
            >
              <i className='bi bi-book'></i>
              <small>Leer</small>
            </button>
            <button
              className='flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => { handlePlay() }}
            >
              <i className='bi bi-play-circle'></i>
              <small>Reproducir</small>
            </button>
          </section>
        </>
      )}
    </div>
  )
}
