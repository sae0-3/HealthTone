import React from 'react'
import '../styles/header.css'
import threeIcon from '../icons/three.svg';
import searchIcon from '../icons/search.svg';
import { useState } from 'react';

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
                <img className='header-logo' src="../../public/healthTone.svg" alt="logo" />
                <form onSubmit={onSubmit} className="search-form">
                    <button 
                        className='advancedSearch-button' 
                        type="button">
                            <img src={threeIcon} alt="buscarAvanzado" className="advancedSearch-icon" />
                    </button>
                    <input 
                        className='search-input' 
                        type='text' 
                        placeholder='Buscar' 
                        value={search}
                        onChange={handleChange}
                    />
                    <button className='search-button' type="button">
                        <img src={searchIcon} alt="Buscar" className="search-icon" />
                    </button>
                </form>
            </header>
        </div>
    )
}
