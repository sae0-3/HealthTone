import { useState } from 'react'


export const CommentInput = () => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      console.log('Comentario enviado:', comment)
      setComment('')
    }
  }

  return (
    <div className='flex items-center gap-4 bg-white w-full'>
      <div className='w-10 h-10 bg-gray-300 rounded-full'></div>

      <div className='flex-1 flex items-center'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Añade un comentario'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-htc-lightblue resize-none'
          rows={1}
        ></textarea>
        <button
          onClick={handleSubmit}
          className='ml-3 p-2 bg-htc-lightblue text-white rounded-md hover:bg-htc-darkblue transition focus:outline-none'
        >
          <i className='bi bi-send-fill text-lg'></i>
        </button>
      </div>
    </div>
  )
}
