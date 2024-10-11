import { useGet } from '@hooks/useGet'
import { useParams } from 'react-router-dom'
import { EpubViewer } from '@components/EpubViewer'
import '@styles/contentBook.css'


export const ContentBook = () => {
  const { id } = useParams()
  const [data, error] = useGet(`http://localhost:4000/api/book/${id}`)

  if (error)
    return <h3 className='text-danger'>Surgio un Problema</h3>

  return (
    <div className='container'>
      {!!data && (
        <div className='content-container row g-5'>
          <div className='content-container_left col-3 d-flex flex-column justify-content-center align-items-center'>
            <img className='content-portada_image' src={data.url_portada} alt={data.nombre} />
            <h2 className='mt-4 text-center'>{data.nombre}</h2>
            <p className='text-center'>{data.autor}</p>
          </div>
          <div className='content-container_right col-9'>
            <EpubViewer url={data.url_texto} />
          </div>
        </div>
      )}
    </div>
  )
}