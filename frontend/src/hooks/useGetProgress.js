import { getProgress } from '@/api/getProgress';
import { useQuery } from '@tanstack/react-query';

export const useGetProgress = (id_usuario, id_contenido) => {
  return useQuery({
    queryKey: ['progreso', id_usuario, id_contenido],
    queryFn: () => getProgress(id_usuario, id_contenido),
    enabled: !!id_usuario && !!id_contenido,
  });
};
