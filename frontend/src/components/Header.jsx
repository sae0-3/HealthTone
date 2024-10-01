import React from 'react'
import '../styles/header.css'
import threeIcon from '../icons/three.svg';
import searchIcon from '../icons/search.svg';
export const Header = () => {
    return (
        <div>
            <header className='header-container'>
                <img className='header-logo' src="../../public/healthTone.svg" alt="logo" />
                <form className="search-form">
                    <button className='advancedSearch-button' type="button">
                        <img src={threeIcon} alt="buscarAvanzado" className="advancedSearch-icon" />
                    </button>
                    <input className='search-input' type='text' placeholder='Buscar' />
                    <button className='search-button' type="button">
                        <img src={searchIcon} alt="Buscar" className="search-icon" />
                    </button>
                </form>
            </header>
        </div>
    )
}
