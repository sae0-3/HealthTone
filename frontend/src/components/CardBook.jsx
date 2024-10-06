export const CardBook = ({ url_image, title, author }) => {
  return (
    <div className='card text-center'>
      <img src={url_image} className='card-img-top' alt={title} />

      <div className='card-body'>
        <blockquote className='blockquote mb-0'>
          <p>{title}</p>
          <footer className='blockquote-footer'>{author}</footer>
        </blockquote>
      </div>
    </div>
  )
}
