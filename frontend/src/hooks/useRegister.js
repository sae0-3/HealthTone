import { postRegister } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'


export const useRegister = () => useMutation({
  mutationFn: ({ name, email, password }) => postRegister(name, null, email, password),
})
