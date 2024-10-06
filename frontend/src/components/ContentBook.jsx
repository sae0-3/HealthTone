import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EpubViewer } from './EpubViewer'
import '../styles/contentBook.css'


export const ContentBook = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/book/${id}`)
        if (!response.ok) {
          throw new Error('Error en la red')
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className='container content-container'>
      {loading
        ? <h3 className='text-primary'>Cargando...</h3>
        : error
          ? <h3 className='text-danger'>Surgio un Problema</h3>
          : <>
            <div className='content-container_left'>
              <img className='portada-image' src={data.url_portada} alt={data.nombre} />
              <h2>{data.nombre}</h2>
              <p>{data.autor}</p>
            </div>

            <EpubViewer url={data.url_texto} />
          </>
      }
    </div>
  )
}
