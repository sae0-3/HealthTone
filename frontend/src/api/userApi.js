import axiosInstance from '@/api/axiosInstance'

export const putUpdatePassword = (email, password) => axiosInstance.put('/users/update-password', { email, password })

export const updateProfile = (email, genero, nacimiento, pais, se_unio, telefono) => axiosInstance.put('/users/updateProfile',  {email, genero, nacimiento, pais, se_unio, telefono})

export const putUpdatePasswordWithPassword = (email, password, newPassword) => axiosInstance.put('/users/update-password-withPassword', {email, password, newPassword})