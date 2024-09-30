import React from 'react'
import '../styles/header.css'

export const Header = () => {
    return (
        <div>
            <header className='header-container'>
                <img className='header-logo' src="../../public/healthTone.svg" alt="logo" />
                <form className="search-form">
                    <input className='search-input' type='text' />
                    <button className='search-button' type="button">buscar</button>
                </form>
            </header>
        </div>
    )
}
