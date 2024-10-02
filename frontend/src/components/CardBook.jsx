import React from 'react'
import '../styles/card.css';

export const CardBook = () => {
  return (
    <div className='card-container'>
      <div className='card-poster'>
        <img src="../hola" alt="img"/>
      </div>
      <div className='card-content'>
        <h2>Titulo</h2>
        <p>Autor</p>
      </div>
    </div>
  )
}
