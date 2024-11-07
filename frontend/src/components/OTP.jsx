import React, { useContext, useState } from 'react'
import { RecoveryContext } from '../pages/RecoveryPassword'
import { Link } from 'react-router-dom'

const Email = () => {

  const { setEmail, email, setPage, setOtp, otp } = useContext(RecoveryContext)
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (parseInt(OTPinput.join('')) === otp) {
      setPage('Recover')
      return
    }
    console.log(parseInt(OTPinput.join('')))
    console.log(otp)
    console.log(OTPinput)
    console.log(parseInt(OTPinput.join('') === otp))
    alert(
      "El codigo que ingreso es incorrecto, intente de nuevo"
    )
    return
  }

  return (
    <div className='grid gap-2 max-w-2xl w-full mx-auto'>
      <div className='flex justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-6'>Verificacion de Email</h2>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='otp' className='block text-sm font-medium text-gray-700 pb-2'>
                Nosotros enviamos un codigo al email {email}
              </label>

              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-htc-blue"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>
                {/* 
                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick={() => verfiyOTP()}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div> */}
              </div>

            </div>

            <button
              type='submit'
              className='w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
            >
              Reestablecer Contraseña
            </button>
          </form>
        </div>
      </div>
      <div className='text-sm text-center'>
        <span>¿No tienes una cuenta? Crea una </span>
        <Link to='/register' className='font-medium text-htc-lightblue hover:text-htc-blue border-b border-htc-blue hover:border-htc-blue'>
          aquí
        </Link>
      </div>
    </div>
  )
}

export default Email