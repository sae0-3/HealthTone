import axiosInstance from '@/api/axiosInstance';

export const postProgress = (id_usuario, id_contenido, progreso) => {
  return axiosInstance.post('/progreso', {
    id_usuario,
    id_contenido,
    progreso,
  });
};