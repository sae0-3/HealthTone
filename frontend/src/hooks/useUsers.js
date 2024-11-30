import { putUpdatePassword } from '@/api/userApi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { updateProfile , putUpdatePasswordWithPassword, getInfoUser } from '../api/userApi'
import authStore from '@/store/authStore'
import queryClient from '@/utils/queryClient'


export const usePutUpdatePassword = () => useMutation({
  mutationFn: ({ email, password }) => putUpdatePassword(email, password),
})

export const useUpdateProfile = () => {
  const { user : {id} } = authStore()
  return useMutation({
  mutationFn: ({actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero}) => updateProfile(actualEmail, email, nacimiento, nombre, apellidos, perfil, username, pais, telefono, genero),
  onSucces: () => {queryClient.invalidateQueries(['user','info',id])}
})}

export const usePutUpdatePasswordWithPassword = () => useMutation({
  mutationFn: ({ email, password , newPassword}) => putUpdatePasswordWithPassword(email, password , newPassword),
})

export const useGetInfoUser = () => {
  const { user : {id} } = authStore()
  return useQuery({
    queryKey: ['user', 'info', id],
    queryFn: getInfoUser
})}