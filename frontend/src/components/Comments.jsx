import { Comment } from '@/components/Comment'
import { CommentInput } from '@/components/CommentInput'
import { Loading } from '@/components/Loading'
import { useGetComments } from '@/hooks/useBooks'
import { useState } from 'react'

export const Comments = ({ id_content }) => {
  const { data: dataComments, isLoading } = useGetComments(id_content)
  const [isAscending, setIsAscending] = useState(true) // Estado para el orden
  const comments = dataComments?.data.comments || []

  if (isLoading) {
    return <Loading />
  }

  // Ordenar comentarios según el estado
  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return isAscending ? dateA - dateB : dateB - dateA
  })

  const handleSortToggle = () => {
    setIsAscending(!isAscending)
  }

  return (
    <div className='w-full pt-6 border-t border-gray-300 flex flex-col items-center lg:px-20 relative'>
      <div className='absolute top-0 left-0 mt-2 mr-4 flex items-center gap-4'>
        <span className='text-gray-600 text-sm'>
          {comments.length} {comments.length === 1 ? 'Comentario' : 'Comentarios'}
        </span>
      </div>

      <div className='absolute top-0 right-0 mt-2 mr-4 flex items-center gap-4'>
        <button
          onClick={handleSortToggle}
          className='px-3 py-1 text-sm bg-htc-lightblue text-white rounded-md hover:bg-htc-darkblue hover:shadow-lg transition duration-300'
        >
          {isAscending ? 'Más recientes' : 'Más antiguos'}
        </button>
      </div>
      <br></br>
      <br></br>

      <CommentInput id={id_content} />

      <div className='flex flex-col w-full mt-5'>
        {sortedComments.map(({ id, author, message, date }, idx) => (
          <Comment
            key={`${id}-${idx}`}
            author={author}
            message={message}
            date={date}
          />
        ))}
      </div>
    </div>
  )
}
