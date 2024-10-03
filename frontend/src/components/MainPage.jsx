import React from 'react'
import '../styles/mainPage.css'
import img from '../icons/med.jpg'
const MainPage = () => {
    const obj = [
        {
            id: 0,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
        {
            id: 1,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
        {
            id: 2,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
        {
            id: 3,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
        {
            id: 4,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
        {
            id: 5,
            poster_path: img,
            title: 'Title',
            autor: 'Autor'
        },
    ];


    return (
        <>
            <div className="container">
                <div className='book-list-container'>
                    {obj.map(book => (
                        <div key={book.id} className="book-card">
                            <img src={book.poster_path} alt={book.title}></img>
                            <h2>{book.title}</h2>
                            <p>{book.autor}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}

export default MainPage