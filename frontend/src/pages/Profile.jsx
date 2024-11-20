import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PasswordUpdate from '../components/PasswordUpdate'
import Select from 'react-select'
import { useGetCountries } from '../hooks/useCountries'
import authStore from '../store/authStore'
import { useUpdateProfile } from '../hooks/useUsers'

const Profile = () => {
  const [card, setCard] = useState()
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isEditOpen, setisEditOpen] = useState(false)
  const [date, setDate] = useState( new Date(null))
  const { data } = useGetCountries()
  const [countriesName, setCountriesName] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const {user} = authStore()
  const [form, setForm] = useState({
    email: user.email, 
    nacimiento: user.nacimiento?new Date(user.nacimiento):null, 
    pais: user.pais, 
    telefono: user.number, 
    genero: user.genero, 
    se_unio: new Date(user.se_unio)
  })
  console.log('user', user)
  const { mutate: updateProfile, error, isPending, isSuccess } = useUpdateProfile()
  

  useEffect(() => {
    if (data) {
      setCountriesName((prevCountries) => [
        ...prevCountries,
        ...data.map((data) => data.translations.spa.common)
      ])
    }
  }, [data])


  const sendData = () => {
    console.log(form)
    updateProfile(form)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleDateChange = (date) => {
    setForm((prevForm) => ({
      ...prevForm,
      ['nacimiento']: date,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const showUrl = URL.createObjectURL(file)
      setImageUrl(showUrl)
    }
  }

  const style = {
    control: (provided) => ({
      ...provided,
      borderColor: '#3E5C76',
      color: '#cbd5e1',
      borderWidth: '2px',
      borderRadius: '0.2rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3E5C76',
        cursor: 'text',
      },
      '&:focus': {
        outline: 'none',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d9e2ec': 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#9ca3af',
      },
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    })
  }

  const inputStyles = {
    border: '2px solid #3e5c76', 
    borderRadius: '4px', 
    padding: '6px 12px', 
    fontSize: '16px', 
    color: '#333', 
    backgroundColor: '#f9f9f9', 
    width: '255px',
    outline: 'none',
  };


  const genderOptions = [
    { value: "Hombre", label: "Hombre" },
    { value: "Mujer", label: "Mujer" },
  ]

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
              src={imageUrl ? imageUrl : '/src/assets/med.jpg'}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-semibold text-gray-800">Kisnes Huges</h3>
            <p className="text-gray-600">Se unio el: {`${form.se_unio.getFullYear()}/${form.se_unio.getMonth()+1}/${form.se_unio.getDate()}`}</p>
          </div>
        </div>

        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-gray-300 hover:bg-htc-lightblue font-bold py-2 text-center w-1/4 rounded-md transition duration-300"
        >
          Cambiar foto de Perfil
        </label>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Correo Electronico:</span>
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="No especificado"
              onChange={handleChange}
              className='text-gray-800 w-64 border-htc-blue border-2 rounded-sm h-8 px-2 focus:outline-none py-4'
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Fecha de Nacimiento:</span>
            <div className="contenedor w-64">
              <DatePicker
                name='nacimiento'
                {...(form.nacimiento ? { selected: form.nacimiento } : {})}
                onChange={handleDateChange}
                placeholderText="Escriba su fecha de nacimiento"
                customInput={<input style={inputStyles} />} 
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">País:</span>
            {countriesName &&
              <Select
                name="pais"
                value={countriesName.find(country => country === form.pais) ? { value: form.pais, label: form.pais } : null}
                onChange={(selectedOption) => setForm({ ...form, pais: selectedOption.value })}
                options={countriesName.map((country) => ({ value: country, label: country }))}
                className="w-64"
                placeholder="No especificado"
                styles={style}
              />
            }
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Número de teléfono:</span>
            <input
              type="text"
              name="telefono"
              value={form.telefono || ''}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d*$/.test(value) && value.length <= 8) {
                  handleChange(e)
                }
              }}
              placeholder="No especificado"
              className='w-64 border-htc-blue border-2 rounded-sm px-2 h-8 focus:outline-none focus:none py-4'
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <span className="text-gray-600 font-medium">Género:</span>
            <Select
              name="genero"
              value={genderOptions.find(option => option.value === form.genero) || null}
              onChange={(selectedOption) => setForm({ ...form, genero: selectedOption.value })}
              options={genderOptions}
              className='w-64'
              placeholder="No especificado"
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
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white transition duration-300"
              onClick={sendData} >
              Editar Perfil
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-htc-blue hover:text-white transition duration-300"
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
