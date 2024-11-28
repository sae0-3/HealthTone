import axiosInstance from '@/api/axiosInstance';

export const getProgress = async (id_usuario, id_contenido) => {
  try {
    const response = await axiosInstance.get(`/progreso`, {
      params: { id_usuario, id_contenido },
    });
    return response.data.progreso; // Retorna el progreso si la respuesta es exitosa
  } catch (error) {
    // Manejar errores de manera específica
    if (error.response && error.response.status === 404) {
      console.warn('No se encontró progreso, devolviendo 0.');
      return 0; // Valor predeterminado para progreso inexistente
    }
    console.error('Error al obtener el progreso:', error);
    throw error; // Re-lanza otros errores no controlados
  }
};
