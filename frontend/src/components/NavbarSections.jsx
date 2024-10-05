import { useState } from 'react'
import '../styles/navbarSections.css'


export const NavbarSections = () => {
  const [currentSection, setCurrentSection] = useState('btn-section-sugerencias')

  return (
    <div className="container d-flex justify-content-between">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          id={id}
          className={`btn btn-lg btn-primary ${currentSection === id ? 'active' : ''}`}
          onClick={() => setCurrentSection(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

const sections = [
  {
    id: 'btn-section-sugerencias',
    label: 'Sugerencias'
  },
  {
    id: 'btn-section-nuevos_lanzamientos',
    label: 'Nuevos Lanzamientos'
  },
  {
    id: 'btn-section-populares',
    label: 'Populares'
  },
  {
    id: 'btn-section-proximos_lanzamientos',
    label: 'Próximos Lanzamientos'
  },
]
