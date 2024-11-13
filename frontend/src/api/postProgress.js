import axios from 'axios';

export const postProgress = (id_usuario, id_contenido, progreso) => {
  return axios.post('/api/progreso', {
    id_usuario,
    id_contenido,
    progreso,
  });
};