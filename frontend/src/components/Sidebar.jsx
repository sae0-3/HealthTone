import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


export const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation()
  const options = [
    { label: 'Para ti', icon: 'house', to: '/' },
    { label: 'Explorar', icon: 'search', to: '/explore' },
  ]

  return (
    <aside className='bg-htc-white h-screen w-full lg:w-52'>
      <div className='h-20 flex justify-between items-center px-3 lg:justify-center'>
        <Link to='/'>
          <img src='/healthtone_black.svg' className={`w-16 ${location.pathname === '/'?'from-htc-lightblue':'from-gray'}`} alt='logo-healthtone' />
        </Link>
        <button type='button' onClick={() => { toggleSidebar() }}>
          <i className='bi bi-x text-5xl lg:hidden'></i>
        </button>
      </div>

      <div className='flex flex-col pt-16'>
        {options.map(({ label, icon, to }) => (
          <Link to={to}
            key={to}
            className={`flex gap-4 items-center justify-center bg-gradient-to-r ${location.pathname === to?'from-htc-lightblue':'from-gray'} to-white-500 py-3`}
            onClick={() => { toggleSidebar() }}
          >
            <i className={`bi bi-${icon} text-lg`}></i>
            <small className='text-lg'>{label}</small>
          </Link>
        ))}
      </div>
    </aside>
  )
}
