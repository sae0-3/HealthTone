import { getProgress, postProgress } from '@/api/bookApi'
import authStore from '@/store/authStore'
import { useMutation, useQuery } from '@tanstack/react-query'


export const useGetProgress = () => {
  const { user: { id } } = authStore()

  return useQuery({
    queryKey: ['books', 'progress', id],
    queryFn: getProgress,
  })
}

export const usePostProgress = () => useMutation({
  mutationFn: ({ id_content, progress }) => postProgress(id_content, progress),
})
