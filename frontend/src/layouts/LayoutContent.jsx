import { CardBook } from '@components/CardBook'
import { AudioContext } from '@contexts/AudioContext'
import { useGet } from '@hooks/useGet'
import '@styles/layout.css'
import { useContext } from 'react'


export const LayoutContent = ({ section = 'sugerencias', search = null }) => {
  search = !!search ? search : ''
  const [content, error] = useGet(`http://localhost:4000/api/book/?section=${section}&search=${search}`)
  const { playTrack, setIsPlay } = useContext(AudioContext)

  const handlePlay = (idx) => {
    playTrack({
      id: content[idx].id,
      title: content[idx].nombre,
      author: content[idx].autor,
      cover: content[idx].url_portada,
      url: content[idx].url_audio,
    })

    setIsPlay(true)
  }

  if (error)
    return <h3 className='text-danger'>Surgio un Problema</h3>

  return (
    <section className='row g-5 layoutContent-container'>
      {!!content && content.length == 0 ? (
        <h2 className='text-center fs-2 pt-4'>
          <span>No se encontraron resultados</span>
        </h2>
      ) : (!!content && content.map(({ id, url_portada, nombre, autor }, idx) => {
        return (
          <button
            to={`/book/${id}`}
            key={id}
            className='btn fs-4 col-12 col-md-6 col-lg-3'
            style={{ textDecoration: 'none' }}
            onClick={() => { handlePlay(idx) }}
            disabled={section == 'proximos_lanzamientos'}
          >
            <CardBook url_image={url_portada} title={nombre} author={autor} />
          </button>
        )
      })
      )}
    </section>
  )
}
