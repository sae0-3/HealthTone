import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavbarSections } from './NavbarSections'
import '../styles/mainPage.css'


const MainPage = () => {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:4000/book')
        if (!response.ok) {
          throw new Error('Error en la red')
        }
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <div className='container'>
      {loading
        ? <h3 className='text-primary'>Cargando...</h3>
        : error
          ? <h3 className='text-danger'>Surgio un Problema</h3>
          : <>
            <NavbarSections />
            <div className='book-list-container'>
              {content.map(({ id, url_portada, nombre, autor }) => {
                return (
                  <Link to={`/book/${id}`} key={id} className='book-card'>
                    <img src={url_portada} alt={nombre} />
                    <h2>{nombre}</h2>
                    <p>{autor}</p>
                  </Link>
                )
              })}
            </div>
          </>
      }
    </div>
  )
}

export default MainPage
