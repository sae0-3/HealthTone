import '@styles/header.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Header = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleChange = (input) => {
    setSearch(input.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    navigate(`/?search=${search}`)
  }

  return (
    <header className='header-container fixed-top'>
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
          maxLength={100}
        />

        <button className='search-button' type='submit'>
          <i className='bi bi-search text-dark'></i>
        </button>
      </form>
    </header>
  )
}
