import axiosInstance from '@/api/axiosInstance';

export const getProgress = async (id_usuario, id_contenido) => {
  const response = await axiosInstance.get(`/progreso`, {
    params: { id_usuario, id_contenido },
  });
  return response.data.progreso;
};
