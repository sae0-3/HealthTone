import { useState } from 'react'
import { usePostComment } from '@/hooks/useBooks'

export const CommentInput = ({ id }) => {
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState(null) // Estado para la notificación
  const { mutate: post, isPending } = usePostComment(id)

  const handleSubmit = () => {
    if (comment.trim()) {
      try {
        post({
          message: comment,
        })
        setNotification({ type: 'success', message: 'Comentario publicado correctamente.' })
      } catch (err) {
        console.error(err)
        setNotification({ type: 'error', message: 'Error al publicar el comentario.' })
      } finally {
        setComment('')
        setTimeout(() => setNotification(null), 3000) // Oculta la notificación después de 3 segundos
      }
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Notificación */}
      {notification && (
        <div
          className={`p-3 text-white rounded-md ${
            notification.type === 'success'
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Input de comentario */}
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
            disabled={isPending}
          >
            <i className='bi bi-send-fill text-lg'></i>
          </button>
        </div>
      </div>
    </div>
  )
}
