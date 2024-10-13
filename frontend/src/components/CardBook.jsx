export const CardBook = ({ url_image, title, author }) => {
  return (
    <div className='card text-center'>
      <img src={url_image} alt={title} style={{ height: '16rem', objectFit: 'contain' }} />

      <div className='card-body'>
        <p className='card-text p-0 m-0'>{title}</p>
        <p className='card-text p-0 m-0' style={{ opacity: .8 }}>
          <small>{author}</small>
        </p>
      </div>
    </div>
  )
}
