import { PlayerActions } from '@/components/PlayerActions';
import { PlayerControls } from '@/components/PlayerControls';
import { PlayerInfo } from '@/components/PlayerInfo';
import audioStore from '@/store/audioStore';
import authStore from '@/store/authStore';
import { useEffect } from 'react';
import { useGetProgress } from '@/hooks/useGetProgress';

export const Player = () => {
  const { setCurrentAudio, currentAudio, howl, setPosition } = audioStore();
  const { user } = authStore();
  
  const { data: progreso, isSuccess } = useGetProgress(
    user?.userId,
    currentAudio?.id
  );

  useEffect(() => {
    if (user) {
      const initialAudio = {
        id: null,
        title: 'Unknown Title',
        author: 'Unknown Author',
        cover: null,
        url: null,
        userId: user.userId,
      };

      setCurrentAudio(initialAudio);
    }
  }, [setCurrentAudio, user]);

  useEffect(() => {
    if (isSuccess && progreso !== undefined && howl) {
      howl.seek(progreso); // Mueve la posición del audio al progreso guardado
      setPosition(progreso); // Actualiza el estado del progreso
    }
  }, [isSuccess, progreso, howl, setPosition]);
    


  // No renderizar el Player si no hay usuario o audio actual
  if (!user || !currentAudio) {
    return null;
  }

  return (
    <div className='h-full mx-3 flex items-center lg:mx-16'>
      <div className='w-4/5 lg:w-3/12'>
        <PlayerInfo />
      </div>

      <div className='w-1/6 lg:w-1/2'>
        <PlayerControls />
      </div>

      <div className='hidden lg:block lg:w-3/12'>
        <PlayerActions />
      </div>
    </div>
  );
};
