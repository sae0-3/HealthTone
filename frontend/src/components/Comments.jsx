import { Comment } from '@/components/Comment'
import { CommentInput } from '@/components/CommentInput'


export const Comments = ({ comments = [] }) => {
  return (
    <div className='w-full pt-6 border-t border-gray-300 flex flex-col items-center lg:px-20'>
      <CommentInput />

      <div className='flex flex-col w-full mt-5'>
        {comments.map(({ id, name, profile, comment, date }, idx) => {
          return (
            <Comment
              key={`${id}-${idx}`}
              name={name}
              profile={profile}
              message={comment}
              date={date}
            />
          )
        })}
      </div>
    </div>
  )
}
