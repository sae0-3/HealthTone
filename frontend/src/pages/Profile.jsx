import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import PasswordUpdate from '../components/PasswordUpdate'
import Select from 'react-select' // Importa el componente Select

const Profile = () => {
  const [card, setCard] = useState('')
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isEditOpen, setisEditOpen] = useState(false)
  const [date, setDate] = useState(Date())

  const [data, setData] = useState({
    correo: "",
    fechaNacimiento: "",
    pais: "",
    numero: "",
    genero: "Mujer",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const [isFocused, setIsFocused] = useState({
    birthDate: false,
    country: false,
    phone: false,
    gender: false,
    password: false,
  })

  const handleFocus = (field) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [field]: true,
    }))
  }

  const handleBlur = (field) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [field]: false,
    }))
  }

  const genderOptions = [
    { value: 'Hombre', label: 'Hombre' },
    { value: 'Mujer', label: 'Mujer' },
  ]
  
  const countryOptions = [
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Brasil', label: 'Brasil' },
  ]

  const style = {
    control: (provided) => ({
      ...provided,
      borderColor: '#3E5C76',
      borderWidth: '1px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3E5C76',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3E5C76' : state.isFocused ? '#d9e2ec' : 'white',
      color: state.isSelected ? 'white' : '#3E5C76',
      '&:hover': {
        backgroundColor: '#d9e2ec',
      },
    }),
  }

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-6">
          <div className="md:text-left w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-htc-blue">
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
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Contraseña:</span>
            <div className="text-gray-800 w-64">
              <p>passwords</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Fecha de Nacimiento:</span>
            <div className="contenedor w-64">
              <DatePicker
                selected={date}
                onChange={(fecha) => setDate(fecha)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">País:</span>
            <Select
              name="genero"
              value={countryOptions.find(option => option.value === data.pais) || null}
              onChange={(selectedOption) => setData({ ...data, pais: selectedOption.value })}
              options={countryOptions}
              className='w-64'
              styles={style}
              />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Número de teléfono:</span>
            <input
              type="text"
              name="numero"
              value={data.numero || '78340433'}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              onChange={handleChange}
              className={`text-gray-800 w-64 ${isFocused.phone ? 'border-b-2 border-htc-blue' : ''} focus:outline-none`}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Género:</span>
            <Select
              name="genero"
              value={genderOptions.find(option => option.value === data.genero) || null}
              onChange={(selectedOption) => setData({ ...data, genero: selectedOption.value })}
              options={genderOptions}
              className='w-64'
              styles={style}
              />
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
              onClick={() => { setisEditOpen(true) }} >
              Editar Perfil
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white"
              onClick={() => { setIsPasswordOpen(true) }} >
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
