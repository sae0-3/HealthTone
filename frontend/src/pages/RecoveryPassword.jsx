
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RecoverEmail from '../components/Email'


const RecoveryPassword = () => {

  const handleSubmitEmail = async (e) => {
    e.preventDefault()
    login(formData)
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-2 py-5'>
      <div className='grid gap-2 max-w-2xl w-full mx-auto'>
        <div className='flex justify-center'>
          <img src='/healthtone_black.svg' className='w-24' alt='logo-healthtone' />
        </div>

        <div className='text-4xl text-center'>
          <h1>
            Bienvenido a <br />
            <span className='text-htc-lightblue'>Healthtone</span>
          </h1>
        </div>
          <RecoverEmail onSubmit={handleSubmitEmail}/>
        <div className='text-sm text-center'>
          <span>¿No tienes una cuenta? Crea una </span>
          <Link to='/register' className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'>
            aquí
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPassword