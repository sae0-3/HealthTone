import { Comment } from '@/components/Comment'
import { CommentInput } from '@/components/CommentInput'
import { Loading } from '@/components/Loading'
import { useGetComments } from '@/hooks/useBooks'

export const Comments = ({ id_content }) => {
  const { data: dataComments, isLoading } = useGetComments(id_content)
  const comments = dataComments?.data.comments || []

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='w-full pt-6 border-t border-gray-300 flex flex-col items-center lg:px-20 relative'>
      <div className='absolute top-0 left-0 mt-2 mr-4 text-gray-600 text-sm'>
        {comments.length} {comments.length === 1 ? 'Comentario' : 'Comentarios'}
      </div>

      <CommentInput id={id_content} />

      <div className='flex flex-col w-full mt-5'>
        {comments.map(({ id, author, message, date }, idx) => (
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
