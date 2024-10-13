import { PlayerActions } from '@components/PlayerActions'
import { PlayerControls } from '@components/PlayerControls'
import { PlayerInfo } from '@components/PlayerInfo'


export const Player = () => {
  return (
    <div className='fixed-bottom ps-4 px-4'
      style={{ backgroundColor: 'var(--blue)', color: 'var(--white)', height: '10rem' }}
    >
      <div className='row d-flex align-items-center h-100'>
        <PlayerInfo className='col-3' />
        <PlayerControls className='col-6' />
        <PlayerActions className='col-3' />
      </div>
    </div>
  )
}
