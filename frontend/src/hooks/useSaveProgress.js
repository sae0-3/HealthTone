import { postProgress } from '@/api/postProgress';
import { useMutation } from '@tanstack/react-query';

export const useSaveProgress = () => {
  return useMutation({
    mutationFn: ({ id_usuario, id_contenido, progreso }) => 
      postProgress(id_usuario, id_contenido, progreso),
  });
};
