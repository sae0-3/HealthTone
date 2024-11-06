import { Card } from '@/components/Card'
import { EpubViewer } from '@/components/EpubViewer'
import { Error } from '@/components/Error'
import { Loading } from '@/components/Loading'
import { useGetBook } from '@/hooks/useBooks'
import audioStore from '@/store/audioStore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export const ContentBook = () => {
  const { id } = useParams()
  const [isReading, setIsReading] = useState(false)
  const { currentAudio, setCurrentAudio } = audioStore()
  const { data, isLoading, error } = useGetBook(id)

  const book = data?.data

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

  if (isLoading)
    return <Loading />
  if (error)
    return <Error>{error.response.data.message}</Error>

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
                disabled
              />
            </div>

            <div className={`${!isReading && 'hidden'} w-full mx-auto h-full lg:block`}>
              <EpubViewer url={book.text_path} />
            </div>
          </section>

          <section className='w-full flex justify-between items-center text-xl text-white lg:pb-5'>
            <button
              className='lg:hidden flex gap-3 items-center bg-htc-lightblue rounded-md py-2 px-3'
              onClick={() => { toggleReading() }}
            >
              <i className='bi bi-book'></i>
              <small>Leer</small>
            </button>
          </section>
        </>
      )}
    </div>
  )
}
