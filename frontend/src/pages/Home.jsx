import { NavbarSections } from '@components/NavbarSections'
import { LayoutContent } from '@layouts/LayoutContent'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


const sections = [
  { id: 'btn-section-sugerencias', label: 'Sugerencias' },
  { id: 'btn-section-nuevos_lanzamientos', label: 'Nuevos Lanzamientos' },
  { id: 'btn-section-populares', label: 'Populares' },
  { id: 'btn-section-proximos_lanzamientos', label: 'Próximos Lanzamientos' },
]

const MainPage = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [onSearch, setOnSearch] = useState(false)
  const [question, setQuestion] = useState('')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const searchQuery = params.get('search')

    if (searchQuery) {
      setOnSearch(true)
      setQuestion(searchQuery)
    } else {
      setOnSearch(false)
      setQuestion('')
    }
  }, [location.search])

  const toggleSection = (idx) => {
    setCurrentSection(idx)
  }

  return (
    <div className='container'>
      {onSearch ? (
        <div className='mt-5 mb-5'>
          <h2 className='pb-5'>
            <span className='h1 fw-bold'>Resultados: {question}</span>
          </h2>

          <LayoutContent search={question} />
        </div>
      ) : (
        <div className='pb-5'>
          <NavbarSections
            currentSection={currentSection}
            toggleSection={toggleSection}
            sections={sections}
          />

          <section>
            <h2 className='h1 fw-bold pt-2 pb-5'>{sections[currentSection].label}</h2>

            <LayoutContent
              section={sections[currentSection].label.split('-').pop()}
            />
          </section>
        </div>
      )}
    </div>
  )
}

export default MainPage
