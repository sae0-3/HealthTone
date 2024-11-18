import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import PasswordUpdate from '../components/PasswordUpdate'

const Profile = () => {
  const [card, setCard] = useState('')
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isEditOpen, setisEditOpen] = useState(false)

  return (
    <div className="container mx-auto px-4">
      <section className="py-4">
        <h2 className="text-2xl font-bold">Mi Perfil</h2>
      </section>
      <p className="text-lg mb-6">
        ¡Gracias por ser parte de la comunidad de lectores y oyentes de Healthtone! <br />
        ¡Apreciamos que seas un miembro de nuestra comunidad!
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-htc-blue">
            <img
              src="src/assets/med.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800">Kisnes Huges</h3>
            <p className="text-gray-600">Correo: usuario@email.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Contraseña:</span>
            <span className="text-gray-800 font-semibold">********</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Fecha de Nacimiento:</span>
            <span className="text-gray-800">16 de Noviembre, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">País:</span>
            <span className="text-gray-800">Bolivia</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Numero de teléfono:</span>
            <span className="text-gray-800">78340433</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Género:</span>
            <span className="text-gray-800">Hombre</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-between">
          <button className="text-left my-auto font-medium text-htc-lightblue hover:text-htc-blue">
            <span className="border-b border-htc-blue hover:border-htc-blue">
              Nuestros términos y condiciones
            </span>
          </button>
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white"
              onClick={() => {setisEditOpen(true)}}>
              Editar Perfil
            </button>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white"
              onClick={() => {setIsPasswordOpen(true)}}>
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {isPasswordOpen && (
        <PasswordUpdate setOpen={setIsPasswordOpen} />
      )}
      
      {isEditOpen && (
        <EditProfile setOpen={setisEditOpen} />
      )}
    </div>
  )
}

export default Profile