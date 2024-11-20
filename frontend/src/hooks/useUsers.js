import { putUpdatePassword } from '@/api/userApi'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '../api/userApi'


export const usePutUpdatePassword = () => useMutation({
  mutationFn: ({ email, password }) => putUpdatePassword(email, password),
})

export const useUpdateProfile = () => useMutation({
  mutationFn: ({email, genero, nacimiento, pais, se_unio, telefono}) => updateProfile(email, genero, nacimiento, pais, se_unio, telefono)
})
 