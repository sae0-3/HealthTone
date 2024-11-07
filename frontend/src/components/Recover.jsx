import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecoveryContext } from '../pages/RecoveryPassword'

const Recover = () => {

  const { setEmail, email, setPage, setOtp } = useContext(RecoveryContext)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === confirmPassword && validatePassword(password)) {
      navigate('/')
    } else {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Reestablecer Contraseña</h2>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Ingrese la nueva contraseña
            </label>
            <div className='relative'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                required
                className='mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                placeholder='Ingrese su contraseña'
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrorMessage('') // Limpiar el error al cambiar la contraseña
                }}
              />
              <button
                type='button'
                className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi bi-eye${showPassword ? '-fill' : ''}`}></i>
              </button>
            </div>
          </div>

          <div className='relative'>
            <label htmlFor='passwordConfirmation' className='block text-sm font-medium text-gray-700'>
              Confirme la contraseña
            </label>

            <div className='relative'>
              <input
                id='passwordConfirmation'
                type={showConfirmPassword ? 'text' : 'password'}
                name='passwordConfirmation'
                required
                className='mt-1 w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                placeholder='Confirme su contraseña'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type='button'
                className='absolute right-3 top-[calc(50%+1px)] transform -translate-y-1/2 flex items-center'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`bi bi-eye${showConfirmPassword ? '-fill' : ''}`}></i>
              </button>
            </div>
          </div>

          {errorMessage && <p className='text-red-500 text-xs'>{errorMessage}</p>}

          <button
            type='submit'
            className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            disabled={
              password !== confirmPassword
            }
          >
            Reestablecer
          </button>
        </form>
      </div>
    </div>
  )
}

export default Recover
