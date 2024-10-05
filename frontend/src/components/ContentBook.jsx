import { useParams } from 'react-router-dom'
import '../styles/contentBook.css'


export const ContentBook = () => {
  const { id } = useParams()

  return (
    <div className='container content-container'>
      <h1>{id}</h1>
    </div>
  )
}
