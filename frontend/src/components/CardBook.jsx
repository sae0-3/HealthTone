import med from '../assets/med.jpg'
import '../styles/card.css'


export const CardBook = () => {
  return (
    <div className='card-container'>
      <div className='card-poster'>
        <img src={med} alt='img' />
      </div>
      <div className='card-text'>
        <h2>Titulo</h2>
        <p>Autor</p>
      </div>
    </div>
  )
}
