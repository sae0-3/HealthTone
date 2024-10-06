import { useState, useRef } from 'react'
import { ReactReader } from 'react-reader'


export const EpubViewer = ({ url }) => {
  const [location, setLocation] = useState(null)
  const renditionRef = useRef(null)

  const handleLocationChanged = (newLocation) => {
    setLocation(newLocation)
  }

  const narrateCurrentPage = () => {
    if (renditionRef.current) {
      const iframe = renditionRef.current.getContents()[0].document
      const text = iframe.body.innerText
      speak(text)
    }
  }

  const speak = (text) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    } else {
      console.error("API SpeechSynthesis no disponible en este navegador.")
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactReader
        url={url}
        location={location}
        locationChanged={handleLocationChanged}
        getRendition={(rendition) => {
          renditionRef.current = rendition
        }}
      />
      <div className='btn-group'>
        <button onClick={narrateCurrentPage}>
          Narrar Página
        </button>
        <button onClick={() => { window.speechSynthesis.cancel() }}>
          Detener
        </button>
        <button onClick={() => { window.speechSynthesis.pause() }}>
          Pausar
        </button>
        <button onClick={() => { window.speechSynthesis.resume() }}>
          Continuar
        </button>
      </div>
    </div>
  )
}
