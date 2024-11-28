import { Modal } from '@/components/Modal'
import { usePostQualification } from '@/hooks/useBooks'
import { useState } from 'react'

export const Qualification = ({ id, initValue = 0, setView }) => {
  const [value, setValue] = useState(initValue) // Valor de la calificación seleccionada
  const [hoverIndex, setHoverIndex] = useState(0) // Índice de la estrella bajo el mouse
  const { mutate: post, isPending } = usePostQualification(id)

  const handleCloseCalif = () => {
    setView(false)
  }

  const handleSubmit = async () => {
    try {
      if (value !== 0) {
        await post({
          qualification: value,
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      handleCloseCalif()
    }
  }

  return (
    <Modal title='Califica el contenido' onClose={handleCloseCalif}>
      <div className='flex justify-around text-2xl text-yellow-500'>
        {Array.from({ length: 5 }, (_, index) => {
          const isHovered = hoverIndex > index // Determina si la estrella está "hovered"
          const isSelected = value > index // Determina si la estrella está seleccionada
          return (
            <button
              key={index}
              onClick={() => setValue(index + 1)} // Actualiza el valor de calificación al hacer clic
              onMouseEnter={() => setHoverIndex(index + 1)} // Cambia el índice de hover
              onMouseLeave={() => setHoverIndex(0)} // Resetea el índice de hover al salir
              className='transition duration-200 cursor-pointer'
            >
              <i
                className={`${
                  isHovered || isSelected ? 'bi bi-star-fill text-yellow-300' : 'bi bi-star'
                }`}
              ></i>
            </button>
          )
        })}
      </div>

      <div className='flex justify-between mt-5 mb-1'>
        <button
          type='button'
          className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          onClick={handleCloseCalif}
        >
          Cancelar
        </button>
        <button
          type='button'
          className='py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white bg-htc-lightblue hover:bg-htc-blue focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          disabled={isPending}
          onClick={handleSubmit}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  )
}
