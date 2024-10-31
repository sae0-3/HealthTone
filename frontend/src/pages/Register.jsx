import { useRegister } from '@/hooks/useRegister'
import authStore from '@/store/authStore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const { isAuthenticated } = authStore()
  const navigate = useNavigate()
  const { mutate: register, error, isPending, isSuccess } = useRegister()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    register(formData)
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-2 py-5'>
      <div className='grid gap-2 max-w-2xl w-full mx-auto'>
        <div className='flex justify-center'>
          <img src='/healthtone_black.svg' className='w-16' alt='logo-healthtone' />
        </div>

        <div className='text-4xl text-center'>
          <h1>
            Bienvenido a <br />
            <span className='text-htc-lightblue'>Healthtone</span>
          </h1>
        </div>

        <div className='flex justify-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center mb-6'>Registro de Usuarios</h2>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Nombre
                </label>
                <input
                  id='name'
                  type='text'
                  name='name'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su nombre'
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Correo Electrónico
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  required
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='Ingrese su correo'
                  onChange={handleChange}
                />
              </div>

              <div className='relative'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Contraseña
                </label>

                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    required
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Ingrese su contraseña'
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi bi-eye${showPassword ? '-fill' : ''}`}></i>
                  </button>
                </div>

                {error && (
                  <p className='text-red-600'>{error?.response?.data?.error}</p>
                )}
              </div>

              <div className='relative'>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                  Confirmar Contraseña
                </label>

                <div className='relative'>
                  <input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    name='confirmPassword'
                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    placeholder='Confirme su contraseña'
                    onChange={handleChange}
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`bi bi-eye${showConfirmPassword ? '-fill' : ''}`}></i>
                  </button>
                </div>

                {formData.password !== formData.confirmPassword && (
                  <p className='text-red-600'>La contraseña no coincide</p>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-40'
                disabled={formData.password !== formData.confirmPassword || isPending}
              >
                {isPending ? 'Registrandose...' : 'Registrarse'}
              </button>
            </form>
          </div>
        </div>

        <div className='text-sm text-center'>
          <span>¿Ya tienes una cuenta? Inicia sesión </span>
          <Link
            to='/login'
            className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'
          >
            aquí
          </Link>
        </div>
      </div>
    </div>
  )
}