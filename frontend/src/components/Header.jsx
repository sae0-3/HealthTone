import { useState } from 'react'
import { Link } from 'react-router-dom'
import '@styles/header.css'


export const Header = () => {
  const [search, setSearch] = useState('')

  const handleChange = (input) => {
    setSearch(input.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <header className='header-container'>
        <Link to='/'>
          <img className='header-logo' src='/healthTone.svg' alt='logo' />
        </Link>

        <form onSubmit={onSubmit} className='search-form'>
          <button className='advancedSearch-button' type='button' disabled style={{ opacity: .2 }}>
            <i className='bi bi-list fs-1 text-dark'></i>
          </button>
          <input
            className='search-input'
            type='text'
            placeholder='Buscar'
            value={search}
            onChange={handleChange}
          />
          <button className='search-button' type='button'>
            <i className='bi bi-search text-dark'></i>
          </button>
        </form>
      </header>
    </div>
  )
}
