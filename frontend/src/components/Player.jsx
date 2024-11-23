import { PlayerActions } from '@/components/PlayerActions';
import { PlayerControls } from '@/components/PlayerControls';
import { PlayerInfo } from '@/components/PlayerInfo';
import audioStore from '@/store/audioStore';
import authStore from '@/store/authStore';
import { useEffect } from 'react';
import { useGetProgress } from '@/hooks/useGetProgress';

export const Player = () => {
  const { setCurrentAudio, currentAudio, setPosition, howl } = audioStore();
  const { user } = authStore();

  const { data: progreso, isSuccess } = useGetProgress(user?.userId, currentAudio?.id);

  useEffect(() => {
    const initialAudio = {
      id: null,
      title: 'Unknow Title',
      author: 'Unknow Author',
      cover: null,
      url: null,
      userId: user?.userId || null,
    };

    setCurrentAudio(initialAudio);
  }, [setCurrentAudio, user]);

  useEffect(() => {
    if (isSuccess && progreso !== undefined && howl) {
      howl.seek(progreso);
      setPosition(progreso);
    }
  }, [isSuccess, progreso, howl, setPosition]);

  if (!currentAudio) {
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
