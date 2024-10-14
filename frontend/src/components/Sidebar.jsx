import { Link } from 'react-router-dom'


export const Sidebar = ({ toggleSidebar }) => {
  const options = [
    { label: 'Para ti', icon: 'house', to: '/' },
    { label: 'Explorar', icon: 'search', to: '/explore' },
  ]

  return (
    <aside className='bg-htc-white h-screen w-full lg:w-52'>
      <div className='h-20 flex justify-between items-center px-3 lg:justify-center'>
        <Link to='/'>
          <img src='/healthtone_black.svg' className='w-16' alt='logo-healthtone' />
        </Link>
        <button type='button' onClick={() => { toggleSidebar() }}>
          <i className='bi bi-x text-5xl lg:hidden'></i>
        </button>
      </div>

      <div className='flex flex-col pt-16 gap-5'>
        {options.map(({ label, icon, to }) => (
          <Link to={to}
            key={to}
            className='flex gap-4 items-center justify-center'
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
