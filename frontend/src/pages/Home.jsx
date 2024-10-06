import { NavbarSections } from '@components/NavbarSections'
import { LayoutContent } from '@layouts/LayoutContent'
import { useState } from 'react'


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

const MainPage = () => {
  const [currentSection, setCurrentSection] = useState(0)

  const toggleSection = (idx) => {
    setCurrentSection(idx)
  }

  return (
    <div className='container'>
      <NavbarSections
        currentSection={currentSection}
        toggleSection={toggleSection}
        sections={sections}
      />

      <LayoutContent
        title={sections[currentSection].label}
        path={sections[currentSection].label.split('-').pop()}
      />
    </div>
  )
}

export default MainPage
