import React from 'react'
import '../styles/card.css';
import med from '../icons/med.jpg'

export const CardBook = () => {
  return (
    <div className='card-container'>
      <div className='card-poster'>
        <img src={med} alt="img"/>
      </div>
      <div className='card-text'>
        <h2>Titulo</h2>
        <p>Autor</p>
      </div>
    </div>
  )
}
