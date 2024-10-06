import { CardBook } from '@components/CardBook'
import { useGet } from '@hooks/useGet'
import { Link } from 'react-router-dom'
import '@styles/layout.css'


export const LayoutContent = ({ title, path }) => {
  const [content, error] = useGet(`http://localhost:4000/api/book?section=${path}`)

  if (error)
    return <h3 className='text-danger'>Surgio un Problema</h3>

  return (
    <div className='layoutContent-container'>
      <h2 className='h1 fw-bold pt-2 pb-5'>{title}</h2>

      <section className='row g-5'>
        {!!content && content.map(({ id, url_portada, nombre, autor }) => {
          return (
            <Link to={`/book/${id}`} key={id} className='col-12 col-md-6 col-lg-3'>
              <CardBook url_image={url_portada} title={nombre} author={autor} />
            </Link>
          )
        })}
      </section>
    </div>
  )
}
