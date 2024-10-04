import img from '../assets/med.jpg'
import '../styles/mainPage.css'


const MainPage = () => {
  return (
    <div className='container'>
      <div className='book-list-container'>
        {obj.map(({ id, poster_path, title, author }) => {
          return (
            <div key={id} className='book-card'>
              <img src={poster_path} alt={title} />
              <h2>{title}</h2>
              <p>{author}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const obj = [
  {
    id: 0,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
  {
    id: 1,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
  {
    id: 2,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
  {
    id: 3,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
  {
    id: 4,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
  {
    id: 5,
    poster_path: img,
    title: 'Title',
    author: 'Autor'
  },
]

export default MainPage
