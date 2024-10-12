export const CardBook = ({ url_image, title, author, type }) => {
  return (
    <div className='card text-center' style={styles}>
      <img src={url_image} className='card-img-top' alt={title} />

      <div className='card-body'>
        <p className='card-text'>{title}</p>
        <p className='card-text'>
          <small style={{ opacity: .7 }}>{author}</small>
        </p>
      </div>
    </div>
  )
}

const styles = {
  background: 'var(--lightblue)',
  color: 'var(--white)'
}
