import { CardBook } from '@components/CardBook'
import { useGet } from '@hooks/useGet'
import { Link } from 'react-router-dom'
import '@styles/layout.css'


export const LayoutContent = ({ section, search = null }) => {
  const params = !!search ? `search=${search}` : ''
  const [content, error] = useGet(`http://localhost:4000/api/book/?${params}`)

  if (error)
    return <h3 className='text-danger'>Surgio un Problema</h3>

  return (
    <section className='row g-5 layoutContent-container'>
      {!!content && content.length == 0 ? (
        <h2 className='text-center fs-2 pt-4'>
          <span>No se encontraron resultados</span>
        </h2>
      ) : (!!content && content.map(({ id, url_portada, nombre, autor }) => {
        return (
          <Link to={`/book/${id}`} key={id} className='col-12 col-md-6 col-lg-3'>
            <CardBook url_image={url_portada} title={nombre} author={autor} />
          </Link>
        )
      })
      )}
    </section>
  )
}
