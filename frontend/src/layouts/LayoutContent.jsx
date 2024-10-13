import { CardBook } from '@components/CardBook'
import { useGet } from '@hooks/useGet'
import { useStore } from '@hooks/useStore'
import { Link } from 'react-router-dom'


export const LayoutContent = ({ section = 'sugerencias', search = null }) => {
  search = !!search ? search : ''
  const [content, error] = useGet(`http://localhost:4000/api/book/?section=${section}&search=${search}`)
  const { setCurrentAudio, startAudio } = useStore()

  const handlePlay = (idx) => {
    setCurrentAudio({
      id: content[idx].id,
      title: content[idx].nombre,
      author: content[idx].autor,
      cover: content[idx].url_portada,
      url: content[idx].url_audio,
    })
    startAudio()
  }

  if (error)
    return <h3 className='text-danger'>Surgio un Problema</h3>

  return (
    <section className='row g-5'>
      {!!content && content.length == 0 ? (
        <h2 className='text-center fs-2 pt-4'>
          <span>No se encontraron resultados</span>
        </h2>
      ) : (!!content && content.map(({ id, url_portada, nombre, autor }, idx) => {
        return section === 'proximos_lanzamientos' ? (
          <div
            key={id}
            className='fs-4 col-12 col-md-6 col-lg-3'
            style={{ textDecoration: 'none', opacity: '.8' }}
          >
            <CardBook url_image={url_portada} title={nombre} author={autor} />
          </div>
        ) : (
          <Link
            to={`/book/${id}`}
            key={id}
            className='fs-4 col-12 col-md-6 col-lg-3'
            style={{ textDecoration: 'none' }}
            onClick={() => { handlePlay(idx) }}
            disabled={section == 'proximos_lanzamientos'}
          >
            <CardBook url_image={url_portada} title={nombre} author={autor} />
          </Link>
        )
      })
      )}
    </section>
  )
}
